const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TeamMember extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
    }
  }
  TeamMember.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      invitedUserEmail: {
        type: DataTypes.STRING,
        required: true,
      },
      role: {
        type: DataTypes.ENUM('OWNER', 'ADMIN', 'DEVELOPER', 'TESTER'),
        required: true,
      },
      userRegisterStatus: {
        type: DataTypes.ENUM('REGISTERED', 'NOT_REGISTERED'),
      },
      teamId: {
        type: DataTypes.UUID,
        required: true,
      },
      invitedBy: {
        type: DataTypes.UUID,
        required: true,
      },
    },
    {
      indexes: [
        {
          fields: ['role'],
        },
        {
          fields: ['invited_user_email'],
        },
        {
          fields: ['role', 'invited_user_email'],
          name: 'combined_team_member_index',
        },
      ],
      hooks: {
        beforeCount(options) {
        // eslint-disable-next-line no-param-reassign
          options.raw = true;
        },
      },
      sequelize,
      modelName: 'teamMember',
      tableName: 'team_member',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  );

  TeamMember.associate = models => {
    TeamMember.hasMany(models.appMember, {
      as: 'appTeamMember',
      foreignKey: 'teamMemberId',
      sourceKey: 'id',
      onDelete: 'RESTRICT',
      constraints: false,
      scope: { referenceType: 'TEAM_MEMBER' },
    });
    TeamMember.belongsTo(models.team, { as: 'team', foreignKey: 'teamId', targetKey: 'id' });
    TeamMember.belongsTo(models.user, { as: 'memberDetails', foreignKey: 'invitedBy', targetKey: 'id' });
  };
  return TeamMember;
};
