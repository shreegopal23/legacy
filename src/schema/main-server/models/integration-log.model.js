const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class IntegrationLog extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
    }
  }
  IntegrationLog.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      integrationConfigId: {
        type: DataTypes.UUID,
      },
      eventKey: {
        type: DataTypes.STRING,
      },
      eventType: {
        type: DataTypes.STRING,
      },
      payload: {
        type: DataTypes.JSONB,
      },
      webhookUrl: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM('SUCCESS', 'FAIL'),
      },
      error: {
        type: DataTypes.JSONB,
      },
    },
    {
      sequelize,
      modelName: 'integrationLog',
      tableName: 'integration_log',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  );

  IntegrationLog.associate = models => {
    IntegrationLog.belongsTo(models.integrationConfig, { as: 'integration', foreignKey: 'integrationConfigId', targetKey: 'id' });
  };

  return IntegrationLog;
};
