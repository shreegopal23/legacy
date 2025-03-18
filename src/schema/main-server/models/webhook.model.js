const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Webhook extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
    }
  }
  Webhook.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      services: {
        type: DataTypes.ENUM('PADDLE'),
      },
      type: {
        type: DataTypes.STRING,
      },
      payload: {
        type: DataTypes.JSONB,
      },
      status: {
        type: DataTypes.ENUM('SUCCESS', 'FAILED', 'PENDING'),
      },
      error: {
        type: DataTypes.JSONB,
      },
    },
    {
      sequelize,
      modelName: 'webhook',
      tableName: 'webhook',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  );

  return Webhook;
};
