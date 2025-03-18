const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }

  Feedback.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      type: {
        type: DataTypes.ENUM('SUGGESTION', 'BUG'),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      attachments: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        defaultValue: [],
      },
      appId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      deviceInfo: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
      additionalMetadata: {
        type: DataTypes.JSONB,
      },
      userAgent: {
        type: DataTypes.JSONB,
      },
    },
    {
      indexes: [
        {
          fields: ['type'],
        },
        {
          fields: ['app_id', 'type'],
        },
      ],
      sequelize,
      modelName: 'feedback',
      tableName: 'feedbacks',
      timestamps: true,
      paranoid: true,
      underscored: true,
    },
  );

  Feedback.associate = models => {
    Feedback.belongsTo(models.applications, { as: 'application', foreignKey: 'appId', targetKey: 'id' });
  };

  return Feedback;
};
