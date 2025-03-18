const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DynamicLinkDomains extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
    }
  }
  DynamicLinkDomains.init(
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
      domainPrefix: {
        type: DataTypes.STRING,
        unique: true,
      },
      isCustomDomain: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      customDomain: {
        type: DataTypes.STRING,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
      },
      customDomainStatus: {
        type: DataTypes.ENUM('PENDING', 'SUCCESS'),
      },
    },
    {
      sequelize,
      modelName: 'dynamicLinkDomain',
      tableName: 'dynamic_link_domains',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  );

  DynamicLinkDomains.associate = models => {
    DynamicLinkDomains.belongsTo(models.dynamicLinkConfig, { as: 'dynamicLinkConfig', foreignKey: 'configId', targetKey: 'id' });
    DynamicLinkDomains.hasMany(models.dynamicLinks, {
      as: 'dynamicLinks', foreignKey: 'dynamicLinkDomainId', sourceKey: 'id', onDelete: 'RESTRICT',
    });
  };

  return DynamicLinkDomains;
};
