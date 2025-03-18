const moment = require('moment');
const {
  models: {
    teamConfig: TeamConfigModel,
    teamSubscription: teamSubscriptionModel,
    teamMember: TeamMemberModel,
    subscriptionPlan: SubscriptionPlansModel,
    team: TeamModel,
  }, sequelize,
} = require('./sequelize-client');
const { CUSTOM_PLAN, FREE_PLAN_CONFIG, USER_ROLE, ADDONS_SLUG } = require('./constant/service-constant');
const { Op } = require('sequelize');
const CONFIG = require('./config/config');

(async() => {
  let transaction;
  try {
  
  const todayDate = moment();

  transaction = await sequelize.transaction();

  // GET ALL LEGACY TEAMS WITHOUT LOGICWIND & C@ppital WORKSPACE
  const teams = await TeamModel.findAll({ where: { isLegacy: true, id: { [Op.notIn]: CONFIG.TEAM_IDS } }, transaction });

  console.log(`${teams.length} LEGACY TEAM FOUND!`);
  let teamCounter = 0;

  const legacyPlan = await SubscriptionPlansModel.findOne({
    where: { slug: CUSTOM_PLAN.SLUG },
    transaction,
  });
  
  const appAddon = await SubscriptionPlansModel.findOne({
    where: { slug: ADDONS_SLUG.APP },
    transaction,
  })
  const storageAddon = await SubscriptionPlansModel.findOne({
    where: { slug: ADDONS_SLUG.STORAGE },
    transaction,
  })
  const TeamMemberAddon = await SubscriptionPlansModel.findOne({
    where: { slug: ADDONS_SLUG.TEAM_MEMBERS },
    transaction,
  })
  const codePushAddon = await SubscriptionPlansModel.findOne({
    where: { slug: ADDONS_SLUG.CODE_PUSH_BUNDLE },
    transaction,
  })

  for (const team of teams) {
    try {
      teamCounter++;
      console.log(`Processing team ${teamCounter}/${teams.length}: ID ${team.id}, Name ${team.teamName}`);

      const teamLegacyPlan = await teamSubscriptionModel.findOne({ 
        where: { subscriptionId: legacyPlan.id, teamId: team.id },
        transaction,
      });      

      // if (teamLegacyPlan && (moment(teamLegacyPlan.subscriptionRenewalDate).isSame(todayDate, 'day')) ) {
      if (teamLegacyPlan) {
        const teamSubscriptions = await teamSubscriptionModel.findAll({ 
          where: { teamId: team.id, subscriptionStatus: 'COMPLETED'} ,
          transaction,
        });
    
        let config = {
          APP: FREE_PLAN_CONFIG[0],
          STORAGE: FREE_PLAN_CONFIG[1],
          TEAM_MEMBERS: FREE_PLAN_CONFIG[2],
          CODE_PUSH_BUNDLE: FREE_PLAN_CONFIG[3],
        }
    
        const teamAddons = [];
    
        for (const teamSubscription of teamSubscriptions) {
          if (!teamSubscription.isAddons && teamSubscription.id === teamLegacyPlan.id) {      
            // if (moment(teamSubscription.subscriptionRenewalDate).isSame(todayDate, 'day')) {
              const deletedSubscription = await teamSubscriptionModel.destroy({
                where: { id: teamSubscription.id },
                transaction,
              });
              if (deletedSubscription > 0) {
                console.log(`Subscription deleted for Team ID ${team.id}, Name ${team.teamName}`);
              }
            // }
          }
    
          if (teamSubscription.isAddons) {
            teamAddons.push(teamSubscription)
          }
        }
    
        if (teamAddons.length) {
          console.log(`${teamAddons.length} Addons found for Team ID ${team.id}, Name ${team.teamName}`);
          for (const teamAddon of teamAddons) {   
            if (teamAddon.subscriptionId === appAddon.id) {
              const value = teamAddon.quantity * 5
              config.APP.value = value;
              config.APP.isFreePlan = false;
              config.APP.isTeamSubscription = false;
            }
            if (teamAddon.subscriptionId === storageAddon.id) {
              const value = teamAddon.quantity * 10240
              config.STORAGE.value = value;
              config.STORAGE.isFreePlan = false;
              config.STORAGE.isTeamSubscription = false;
            }
            if (teamAddon.subscriptionId === TeamMemberAddon.id) {
              const value = '-';
              config.TEAM_MEMBERS.value = value;
              config.TEAM_MEMBERS.isFreePlan = false;
              config.TEAM_MEMBERS.isTeamSubscription = true;
            }
            if (teamAddon.subscriptionId === codePushAddon.id) {
              const value = teamAddon.quantity * 5000;
              config.TEAM_MEMBERS.value = value;
              config.TEAM_MEMBERS.isFreePlan = false;
            }
          }
          const newConfig = [config.APP, config.STORAGE, config.TEAM_MEMBERS, config.CODE_PUSH_BUNDLE]
    
          const [, [teamConfig]] = await TeamConfigModel.update({ config: newConfig }, {
            where: { teamId: team.id },
            returning: true,
            transaction,
          });
          if (teamConfig) {
            console.log(`Team config updated for Team ID ${team.id}, Name ${team.teamName}`);
          }
    
          if (config.TEAM_MEMBERS.value === 1) {
            await TeamMemberModel.update({ role: USER_ROLE.TESTER }, {
              where: { teamId: team.id , role: { [Op.in]: [USER_ROLE.DEVELOPER, USER_ROLE.ADMIN] } },
              transaction,
            });
          }
        } else {
          const [, [teamConfig]] = await TeamConfigModel.update({ config: FREE_PLAN_CONFIG }, {
            where: { teamId: team.id },
            returning: true,
            transaction,
          });
          if (teamConfig) {
            console.log(`Team config updated for Team ID ${team.id}, Name ${team.teamName}`);
          }
    
          await TeamMemberModel.update({ role: USER_ROLE.TESTER }, {
            where: { teamId: team.id , role: { [Op.in]: [USER_ROLE.DEVELOPER, USER_ROLE.ADMIN] } },
            transaction,
          });
        }
      } else {
        console.log(`Team ID ${team.id}, Name ${team.teamName} has no legacy plan!`);
      }

      // transaction.commit();
    } catch (error) {
      // if (transaction) {
      //   await transaction.rollback();
      // }
      console.error(`Error processing team ID ${team.id} (${team.teamName}):`, error);
    }
  }
  transaction.commit();  
} catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    console.error(`ERROR FROM script ${error}`);
  }
})()