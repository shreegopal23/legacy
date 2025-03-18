const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DynamicLinkAnalytics extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
    }
  }
  DynamicLinkAnalytics.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      dynamicLinkId: {
        type: DataTypes.UUID,
        required: true,
      },
      clicks: {
        type: DataTypes.INTEGER,
        required: false,
        defaultValue: 0,
      },
      os: {
        type: DataTypes.STRING,
      },
      browser: {
        type: DataTypes.STRING,
      },
      deviceType: {
        type: DataTypes.STRING,
      },
      userAgent: {
        type: DataTypes.JSONB,
      },
      reqIp: {
        type: DataTypes.STRING,
      },
      geoLocation: {
        type: DataTypes.JSON,
      },
      country: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'dynamicLinkAnalytics',
      tableName: 'dynamic_link_analytics',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  );

  DynamicLinkAnalytics.associate = models => {
    DynamicLinkAnalytics.belongsTo(models.dynamicLinks, { as: 'dynamicLink', foreignKey: 'dynamicLinkId', targetKey: 'id' });
  };

  return DynamicLinkAnalytics;
};
