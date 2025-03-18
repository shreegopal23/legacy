/* eslint-disable max-lines */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
    }
  }
  Application.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      appName: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
      },
      appLogo: {
        type: DataTypes.STRING(1000),
        required: true,
        allowNull: true,
        defaultValue: null,
      },
      isIosUpdate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isAndroidUpdate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isIosForcedUpdate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isAndroidForcedUpdate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      iosMinBuildVersion: {
        type: DataTypes.STRING,
        required: false,
      },
      androidMinBuildVersion: {
        type: DataTypes.STRING,
        required: false,
      },
      iosBuildNumber: {
        type: DataTypes.STRING,
        required: false,
      },
      androidBuildNumber: {
        type: DataTypes.STRING,
        required: false,
      },
      isMaintenance: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      maintenanceTitle: {
        type: DataTypes.STRING,
      },
      maintenanceDescription: {
        type: DataTypes.TEXT,
      },
      maintenanceImage: {
        type: DataTypes.TEXT,
      },
      backgroundColorCode: {
        type: DataTypes.STRING,
        required: false,
      },
      textColorCode: {
        type: DataTypes.STRING,
        required: false,
      },
      updateDescription: {
        type: DataTypes.TEXT,
      },
      androidUpdateLink: {
        type: DataTypes.STRING,
      },
      iosUpdateLink: {
        type: DataTypes.STRING,
      },
      appCreatedBy: {
        type: DataTypes.UUID,
      },
      teamId: {
        type: DataTypes.UUID,
      },
      tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      isCodePushEnabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      indexes: [
        {
          fields: ['app_name'],
        },
      ],
      hooks: {
        beforeCount(options) {
          // eslint-disable-next-line no-param-reassign
          options.raw = true;
        },
      },
      sequelize,
      modelName: 'applications',
      tableName: 'application',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  );

  Application.associate = models => {
    Application.belongsTo(models.user, { as: 'creator', foreignKey: 'appCreatedBy', targetKey: 'id' });
    Application.belongsTo(models.team, { as: 'team', foreignKey: 'teamId', targetKey: 'id' });
    Application.hasMany(models.applicationDetail, {
      as: 'applicationDetails', foreignKey: 'applicationId', sourceKey: 'id', onDelete: 'RESTRICT',
    });
    Application.hasMany(models.applicationShare, {
      as: 'appShared', foreignKey: 'applicationId', sourceKey: 'id', onDelete: 'RESTRICT',
    });
    Application.hasMany(models.usersUpload, {
      as: 'userReleaseCreator', foreignKey: 'applicationId', sourceKey: 'id', onDelete: 'RESTRICT',
    });
    Application.hasMany(models.appMember, {
      as: 'appMembers', foreignKey: 'applicationId', sourceKey: 'id', onDelete: 'RESTRICT',
    });
    Application.hasMany(models.integrationApplicationExcluded, {
      as: 'integrationApplicationExcluded', foreignKey: 'applicationId', sourceKey: 'id', onDelete: 'RESTRICT',
    });
    Application.hasMany(models.dynamicLinkConfig, {
      as: 'dynamicLinkConfig', foreignKey: 'applicationId', sourceKey: 'id', onDelete: 'RESTRICT',
    });
    Application.hasMany(models.feedback, {
      as: 'feedbacks', foreignKey: 'appId', sourceKey: 'id', onDelete: 'RESTRICT',
    });
    Application.hasMany(models.codePushAppDeploymentToken, {
      as: 'codePushAppDeploymentTokens', foreignKey: 'appId', sourceKey: 'id', onDelete: 'RESTRICT',
    });
  };

  return Application;
};
