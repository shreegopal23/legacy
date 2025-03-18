const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
    }
  }
  Events.init(
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
      textValue: {
        type: DataTypes.TEXT,
      },
      jsonValue: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      type: {
        type: DataTypes.ENUM('WORKSPACE', 'APP'),
      },
    },
    {
      indexes: [
        {
          fields: ['key'],
        },
      ],
      sequelize,
      modelName: 'event',
      tableName: 'events',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  );

  Events.associate = models => {
    Events.hasMany(models.integrationEvent, { as: 'integrationEvents', foreignKey: 'eventKey', sourceKey: 'key' });
  };

  return Events;
};
