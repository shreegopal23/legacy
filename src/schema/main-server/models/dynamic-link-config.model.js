const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DynamicLinkConfig extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
    }
  }
  DynamicLinkConfig.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      createdBy: {
        type: DataTypes.UUID,
        required: true,
      },
      applicationId: {
        type: DataTypes.UUID,
        required: true,
      },
      isEnable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      isAndroidApp: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      androidPackageName: {
        type: DataTypes.STRING,
      },
      playstoreUrl: {
        type: DataTypes.STRING,
      },
      androidUriSchema: {
        type: DataTypes.STRING,
      },
      shaCertFingerprints: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      isIosApp: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      isInAppStore: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      iosDefaultFallbackUrl: {
        type: DataTypes.STRING,
      },
      iosAppId: {
        type: DataTypes.STRING,
      },
      isInPlayStore: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      androidDefaultFallbackUrl: {
        type: DataTypes.STRING,
      },
      iosTeamId: {
        type: DataTypes.STRING,
      },
      appstoreUrl: {
        type: DataTypes.STRING,
      },
      iosUriSchema: {
        type: DataTypes.STRING,
      },
      defaultWebUrl: {
        type: DataTypes.STRING,
      },
      metaData: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
    },
    {
      sequelize,
      modelName: 'dynamicLinkConfig',
      tableName: 'dynamic_link_config',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  );

  DynamicLinkConfig.associate = models => {
    DynamicLinkConfig.belongsTo(models.applications, { as: 'application', foreignKey: 'applicationId', targetKey: 'id' });
    DynamicLinkConfig.belongsTo(models.user, { as: 'creator', foreignKey: 'createdBy', targetKey: 'id' });
    DynamicLinkConfig.hasMany(models.dynamicLinks, {
      as: 'dynamicLinks', foreignKey: 'configId', sourceKey: 'id', onDelete: 'RESTRICT',
    });
    DynamicLinkConfig.hasMany(models.dynamicLinkDomain, {
      as: 'dynamicLinkDomain', foreignKey: 'configId', sourceKey: 'id', onDelete: 'RESTRICT',
    });
  };

  return DynamicLinkConfig;
};
