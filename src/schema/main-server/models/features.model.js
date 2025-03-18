const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Features extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
    }
  }
  Features.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      key: {
        type: DataTypes.STRING,
        required: true,
      },
      name: {
        type: DataTypes.STRING,
        required: true,
      },
    },
    {
      indexes: [
        {
          fields: ['name'],
        },
      ],
      sequelize,
      modelName: 'features',
      tableName: 'features',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  );

  return Features;
};
