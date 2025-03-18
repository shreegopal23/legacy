const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Integration extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
    }
  }
  Integration.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
      },
      key: {
        type: DataTypes.STRING,
        unique: true,
      },
      config: {
        type: DataTypes.JSONB,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      logo: {
        type: DataTypes.STRING,
      },
      helpLink: {
        type: DataTypes.STRING,
      },
      action: {
        type: DataTypes.ENUM('POPUP', 'REDIRECTION'),
      },
      description: {
        type: DataTypes.TEXT,
      },
      helpContent: {
        type: DataTypes.TEXT,
      },
    },
    {
      indexes: [
        {
          fields: ['key'],
        },
      ],
      sequelize,
      modelName: 'integration',
      tableName: 'integrations',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  );

  Integration.associate = models => {
    Integration.hasMany(models.integrationConfig, { as: 'integrationConfigs', foreignKey: 'integrationId', targetKey: 'id' });
  };

  return Integration;
};
