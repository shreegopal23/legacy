const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
    }
  }
  Tag.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
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
      modelName: 'tag',
      tableName: 'tag',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  );

  return Tag;
};
