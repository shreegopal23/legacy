/* eslint-disable max-lines */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ApplicationsDetail extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
    }
  }
  ApplicationsDetail.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      applicationUniqueId: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
      },
      appPlatform: {
        type: DataTypes.ENUM('ANDROID', 'IOS'),
        required: true,
        allowNull: false,
      },
      appPackageName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      appVersion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      appBuild: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      appTag: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      appIcon: {
        type: DataTypes.TEXT,
        required: true,
        allowNull: false,
      },
      appSize: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
      },
      appStorageUrl: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
      },
      appMetadata: {
        type: DataTypes.JSONB,
      },
      plistStorageUrl: {
        type: DataTypes.STRING,
      },
      appExpireTime: {
        type: DataTypes.DATE,
        required: false,
      },
      jobId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.UUID,
        required: true,
      },
      applicationId: {
        type: DataTypes.UUID,
        required: true,
      },
      downloads: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      isSpecificNote: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      androidReleaseNote: {
        type: DataTypes.STRING(5000),
        allowNull: true,
      },
      iosReleaseNote: {
        type: DataTypes.STRING(5000),
        allowNull: true,
      },
      oneReleaseNote: {
        type: DataTypes.STRING(5000),
        allowNull: true,
      },
      tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      isArchived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      archivedDate: {
        type: DataTypes.DATE,
      },
      isDeletedFromStorage: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      indexes: [
        {
          fields: ['app_platform'],
        },
        {
          fields: ['app_package_name'],
        },
        {
          fields: ['app_platform', 'app_package_name'],
          name: 'combined_application_details_index',
        },
      ],
      hooks: {
        beforeCount(options) {
          // eslint-disable-next-line no-param-reassign
          options.raw = true;
        },
      },
      sequelize,
      modelName: 'applicationDetail',
      tableName: 'application_detail',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  );

  ApplicationsDetail.associate = models => {
    ApplicationsDetail.belongsTo(models.user, { as: 'creator', foreignKey: 'createdBy', targetKey: 'id' });
    // eslint-disable-next-line max-len
    ApplicationsDetail.belongsTo(models.applications, { as: 'applicationDetails', foreignKey: 'applicationId', targetKey: 'id' });
    ApplicationsDetail.hasMany(models.applicationShare, {
      as: 'applicationShare', foreignKey: 'applicationDetailId', sourceKey: 'id', onDelete: 'RESTRICT',
    });
    ApplicationsDetail.hasMany(models.releaseFeedback, {
      as: 'releaseFeedbacks', foreignKey: 'releaseId', sourceKey: 'id', onDelete: 'RESTRICT',
    });
    ApplicationsDetail.hasMany(models.releaseDownloadHistory, {
      as: 'releaseDownloadHistories', foreignKey: 'appDetailsId', sourceKey: 'id', onDelete: 'RESTRICT',
    });
  };

  return ApplicationsDetail;
};
