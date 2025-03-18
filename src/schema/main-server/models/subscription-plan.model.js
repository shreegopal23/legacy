const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SubscriptionPlan extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
    }
  }
  SubscriptionPlan.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      mode: {
        type: DataTypes.ENUM('PLAN', 'ADDONS'),
      },
      type: {
        type: DataTypes.ENUM('MONTHLY', 'ANNUAL', 'LIFETIME', 'FREE', 'STORAGE', 'APP', 'TEAM_MEMBERS', 'CODE_PUSH_BUNDLE'),
      },
      name: {
        type: DataTypes.STRING,
      },
      label: {
        type: DataTypes.STRING,
      },
      slug: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      amount: {
        type: DataTypes.FLOAT,
      },
      currency: {
        type: DataTypes.STRING,
      },
      priceId: {
        type: DataTypes.STRING,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
      },
      recurring: {
        type: DataTypes.BOOLEAN,
      },
      productId: {
        type: DataTypes.STRING,
      },
      subscriptionFeatures: {
        type: DataTypes.JSONB,
      },
      features: {
        type: DataTypes.JSON,
      },
    },
    {
      sequelize,
      modelName: 'subscriptionPlan',
      tableName: 'subscription_plans',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  );

  SubscriptionPlan.associate = models => {
    SubscriptionPlan.hasMany(models.teamSubscription, {
      as: 'teamSubscriptions', foreignKey: 'subscriptionId', sourceKey: 'id',
    });
    SubscriptionPlan.hasMany(models.subscriptionConfig, {
      as: 'subscriptionConfigs', foreignKey: 'subscriptionId', sourceKey: 'id',
    });
    SubscriptionPlan.hasMany(models.teamSubscription, {
      as: 'teamSubscriptionHistory', foreignKey: 'subscriptionId', sourceKey: 'id',
    });
  };

  return SubscriptionPlan;
};
