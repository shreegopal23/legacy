const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SubscriptionConfig extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
    }
  }
  SubscriptionConfig.init(
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
      name: {
        type: DataTypes.STRING,
      },
      key: {
        type: DataTypes.STRING,
      },
      value: {
        type: DataTypes.STRING,
      },
      unit: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'subscriptionConfig',
      tableName: 'subscription_config',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  );

  SubscriptionConfig.associate = models => {
    SubscriptionConfig.belongsTo(models.subscriptionPlan, { as: 'subscriptionPlan', foreignKey: 'subscriptionId', targetKey: 'id' });
  };

  return SubscriptionConfig;
};
