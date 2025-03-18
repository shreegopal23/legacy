/* eslint-disable max-len */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class IntegrationApplicationExcluded extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
    }
  }
  IntegrationApplicationExcluded.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      integrationConfigId: {
        type: DataTypes.UUID,
      },
      applicationId: {
        type: DataTypes.UUID,
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
      modelName: 'integrationApplicationExcluded',
      tableName: 'integration_application_excluded',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  );

  IntegrationApplicationExcluded.associate = models => {
    IntegrationApplicationExcluded.belongsTo(models.user, { as: 'creator', foreignKey: 'createdBy', targetKey: 'id' });
    IntegrationApplicationExcluded.belongsTo(models.user, { as: 'lastModifiedBy', foreignKey: 'updatedBy', targetKey: 'id' });
    IntegrationApplicationExcluded.belongsTo(models.integrationConfig, { as: 'integrationConfig', foreignKey: 'integrationConfigId', targetKey: 'id' });
    IntegrationApplicationExcluded.belongsTo(models.applications, { as: 'application', foreignKey: 'applicationId', targetKey: 'id' });
  };

  return IntegrationApplicationExcluded;
};
