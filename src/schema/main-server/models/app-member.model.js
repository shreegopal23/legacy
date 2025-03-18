const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AppMember extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
    }
  }
  AppMember.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      applicationId: {
        type: DataTypes.UUID,
        required: false,
      },
      teamId: {
        type: DataTypes.UUID,
      },
      referenceId: {
        type: DataTypes.UUID,
        required: true,
      },
      referenceType: {
        type: DataTypes.ENUM('GROUP', 'TEAM_MEMBER'),
        required: true,
      },
    },
    {
      indexes: [
        {
          fields: ['reference_id'],
        },
        {
          fields: ['reference_type'],
        },
        {
          fields: ['application_id', 'team_id', 'reference_id', 'reference_type'],
          name: 'combined_application_member_index',
        },
      ],
      hooks: {
        beforeCount(options) {
        // eslint-disable-next-line no-param-reassign
          options.raw = true;
        },
      },
      sequelize,
      modelName: 'appMember',
      tableName: 'app_member',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  );

  AppMember.associate = models => {
    AppMember.belongsTo(models.group, { as: 'appGroupMember', foreignKey: 'groupId', targetKey: 'id' });
    AppMember.belongsTo(models.team, { as: 'team', foreignKey: 'teamId', targetKey: 'id' });
    AppMember.belongsTo(models.teamMember, { as: 'appTeamMember', foreignKey: 'teamMemberId', targetKey: 'id' });
    AppMember.belongsTo(models.applications, { as: 'appMembers', foreignKey: 'applicationId', targetKey: 'id' });
  };
  return AppMember;
};
