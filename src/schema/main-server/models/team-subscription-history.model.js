const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TeamSubscriptionHistory extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
    }
  }
  TeamSubscriptionHistory.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      subscriptionId: {
        type: DataTypes.UUID,
        required: true,
      },
      teamSubscriptionId: {
        type: DataTypes.UUID,
        required: true,
      },
      teamId: {
        type: DataTypes.UUID,
      },
      amount: {
        type: DataTypes.FLOAT,
      },
      statusHistory: {
        type: DataTypes.ENUM('SUCCESS', 'PENDING', 'FAILED'),
      },
      referenceData: {
        type: DataTypes.JSONB,
      },
      subscriptionStartDate: {
        type: DataTypes.DATE,
      },
      subscriptionEndDate: {
        type: DataTypes.DATE,
      },
      transactionId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'teamSubscriptionHistory',
      tableName: 'team_subscription_history',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  );

  TeamSubscriptionHistory.associate = models => {
    TeamSubscriptionHistory.belongsTo(models.teamSubscription, { as: 'teamSubscription', foreignKey: 'teamSubscriptionId', targetKey: 'id' });
    TeamSubscriptionHistory.belongsTo(models.subscriptionPlan, { as: 'subscriptionPlan', foreignKey: 'subscriptionId', targetKey: 'id' });
    TeamSubscriptionHistory.belongsTo(models.team, { as: 'team', foreignKey: 'teamId', targetKey: 'id' });
  };

  return TeamSubscriptionHistory;
};
