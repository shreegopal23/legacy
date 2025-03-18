const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class IntegrationEvent extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
    }
  }
  IntegrationEvent.init(
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
      createdBy: {
        type: DataTypes.UUID,
      },
      updatedBy: {
        type: DataTypes.UUID,
      },
    },
    {
      sequelize,
      modelName: 'integrationEvent',
      tableName: 'integration_events',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  );

  IntegrationEvent.associate = models => {
    IntegrationEvent.belongsTo(models.user, { as: 'creator', foreignKey: 'createdBy', targetKey: 'id' });
    IntegrationEvent.belongsTo(models.user, { as: 'lastModifiedBy', foreignKey: 'updatedBy', targetKey: 'id' });
    IntegrationEvent.belongsTo(models.integrationConfig, { as: 'integrationConfig', foreignKey: 'integrationConfigId', targetKey: 'id' });
    IntegrationEvent.belongsTo(models.event, { as: 'event', foreignKey: 'eventKey', targetKey: 'key' });
  };

  return IntegrationEvent;
};
