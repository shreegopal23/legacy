const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DynamicLinks extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
    }
  }
  DynamicLinks.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      configId: {
        type: DataTypes.UUID,
        required: true,
      },
      dynamicLinkDomainId: {
        type: DataTypes.UUID,
        require: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      link: {
        type: DataTypes.STRING,
      },
      shortId: {
        type: DataTypes.STRING,
      },
      isArchive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      archiveDate: {
        type: DataTypes.DATE,
      },
      isAndroidCustomUrl: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      androidFallbackUrl: {
        type: DataTypes.STRING,
      },
      isIosCustomUrl: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      iosFallbackUrl: {
        type: DataTypes.STRING,
      },
      socialMetaTags: {
        type: DataTypes.JSON,
      },
    },
    {
      indexes: [
        {
          fields: ['name'],
        },
        {
          fields: ['link'],
        },
      ],
      sequelize,
      modelName: 'dynamicLinks',
      tableName: 'dynamic_links',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  );

  DynamicLinks.associate = models => {
    DynamicLinks.belongsTo(models.dynamicLinkConfig, { as: 'dynamicLinkConfig', foreignKey: 'configId', targetKey: 'id' });
    DynamicLinks.belongsTo(models.dynamicLinkDomain, { as: 'dynamicLinkDomain', foreignKey: 'dynamicLinkDomainId', targetKey: 'id' });
    DynamicLinks.hasMany(models.dynamicLinkAnalytics, {
      as: 'analytics', foreignKey: 'dynamicLinkId', sourceKey: 'id', onDelete: 'RESTRICT',
    });
  };

  return DynamicLinks;
};
