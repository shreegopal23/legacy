const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TeamConfig extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
    }
  }
  TeamConfig.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      teamId: {
        type: DataTypes.UUID,
        required: true,
      },
      features: {
        type: DataTypes.JSONB,
        required: true,
      },
      config: {
        type: DataTypes.JSONB,
      },
    },
    {
      indexes: [
        {
          fields: ['team_id'],
        },
      ],
      sequelize,
      modelName: 'teamConfig',
      tableName: 'team_config',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  );

  TeamConfig.associate = models => {
    TeamConfig.belongsTo(models.team, { as: 'team', foreignKey: 'teamId', targetKey: 'id' });
  };
  return TeamConfig;
};
