const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TeamSubscription extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
    }
  }
  TeamSubscription.init(
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
      teamId: {
        type: DataTypes.UUID,
        required: true,
      },
      subscriberId: {
        type: DataTypes.STRING,
      },
      subscriptionStatus: {
        type: DataTypes.ENUM('ACTIVE', 'COMPLETED', 'PENDING', 'CANCELLED', 'PAYMENT_DUE', 'EXPIRED'),
        defaultValue: 'PENDING',
      },
      isAddons: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      subscriptionAmount: {
        type: DataTypes.FLOAT,
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
      subscriptionRenewalDate: {
        type: DataTypes.DATE,
      },
      subscriptionCancellationDate: {
        type: DataTypes.DATE,
      },
      lastWebhookSyncTime: {
        type: DataTypes.DATE,
      },
      paymentMethod: {
        type: DataTypes.STRING,
      },
      customerId: {
        type: DataTypes.STRING,
      },
      metaData: {
        type: DataTypes.JSONB,
      },
    },
    {
      sequelize,
      modelName: 'teamSubscription',
      tableName: 'team_subscriptions',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  );

  TeamSubscription.associate = models => {
    TeamSubscription.belongsTo(models.team, { as: 'team', foreignKey: 'teamId', targetKey: 'id' });
    TeamSubscription.belongsTo(models.subscriptionPlan, { as: 'subscriptionPlan', foreignKey: 'subscriptionId', targetKey: 'id' });
    TeamSubscription.hasMany(models.teamSubscriptionHistory, {
      as: 'teamSubscriptionHistories', foreignKey: 'teamSubscriptionId', sourceKey: 'id',
    });
  };

  return TeamSubscription;
};
