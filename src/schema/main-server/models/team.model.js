const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
    }
  }
  Team.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      teamName: {
        type: DataTypes.STRING,
        required: true,
      },
      teamLogo: {
        type: DataTypes.STRING(1000),
      },
      teamCreatedBy: {
        type: DataTypes.UUID,
        required: true,
      },
      disableAds: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isLegacy: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      slug: {
        type: DataTypes.STRING,
      },
    },
    {
      indexes: [
        {
          fields: ['team_name'],
        },
      ],
      hooks: {
        beforeCount(options) {
        // eslint-disable-next-line no-param-reassign
          options.raw = true;
        },
      },
      sequelize,
      modelName: 'team',
      tableName: 'team',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  );

  Team.associate = models => {
    Team.hasMany(models.teamMember, {
      as: 'teamMember', foreignKey: 'teamId', sourceKey: 'id', onDelete: 'RESTRICT',
    });
    Team.hasMany(models.appMember, {
      as: 'appTeam', foreignKey: 'teamId', sourceKey: 'id', onDelete: 'RESTRICT',
    });
    Team.hasMany(models.applications, {
      as: 'application', foreignKey: 'teamId', sourceKey: 'id', onDelete: 'RESTRICT',
    });
    Team.hasMany(models.group, {
      as: 'teamGroup', foreignKey: 'teamId', sourceKey: 'id', onDelete: 'RESTRICT',
    });
    Team.hasMany(models.integrationConfig, {
      as: 'integrationConfigs', foreignKey: 'teamId', sourceKey: 'id', onDelete: 'RESTRICT',
    });
    Team.hasOne(models.teamConfig, {
      as: 'teamConfig', foreignKey: 'teamId', sourceKey: 'id', onDelete: 'RESTRICT',
    });
    Team.belongsTo(models.user, { as: 'teamCreator', foreignKey: 'teamCreatedBy', targetKey: 'id' });
    Team.hasMany(models.codePushAppDeploymentToken, {
      as: 'codePushAppDeploymentTokens', foreignKey: 'teamId', sourceKey: 'id', onDelete: 'RESTRICT',
    });
  };
  return Team;
};
