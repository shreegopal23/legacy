/* eslint-disable max-len */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class IntegrationConfig extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
    }
  }
  IntegrationConfig.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      integrationKey: {
        type: DataTypes.STRING,
      },
      integrationId: {
        type: DataTypes.UUID,
      },
      teamId: {
        type: DataTypes.UUID,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      configs: {
        type: DataTypes.JSONB,
      },
      configMetadata: {
        type: DataTypes.JSONB,
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
      modelName: 'integrationConfig',
      tableName: 'integration_configs',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  );

  IntegrationConfig.associate = models => {
    IntegrationConfig.belongsTo(models.user, { as: 'creator', foreignKey: 'createdBy', targetKey: 'id' });
    IntegrationConfig.belongsTo(models.user, { as: 'lastModifiedBy', foreignKey: 'updatedBy', targetKey: 'id' });
    IntegrationConfig.belongsTo(models.integration, { as: 'integrationKeyDetail', foreignKey: 'integrationKey', targetKey: 'key' });
    IntegrationConfig.belongsTo(models.integration, { as: 'integration', foreignKey: 'integrationId', targetKey: 'id' });
    IntegrationConfig.belongsTo(models.team, { as: 'team', foreignKey: 'teamId', targetKey: 'id' });
    IntegrationConfig.hasMany(models.integrationEvent, { as: 'integrationEvents', foreignKey: 'integrationConfigId', sourceKey: 'id' });
    IntegrationConfig.hasMany(models.integrationApplicationExcluded, { as: 'integrationApplicationExcluded', foreignKey: 'integrationConfigId', sourceKey: 'id' });
    IntegrationConfig.hasMany(models.integrationLog, { as: 'integrationLogs', foreignKey: 'integrationConfigId', targetKey: 'id' });
  };

  return IntegrationConfig;
};
