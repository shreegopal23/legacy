/* eslint-disable no-param-reassign */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
    }
  }
  Notification.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refData: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    senderId: {
      type: DataTypes.UUID,
      required: false,
      allowNull: true,
    },
    receiverId: {
      type: DataTypes.UUID,
      required: true,
      allowNull: false,
    },
    hasRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    platform: {
      type: DataTypes.ENUM('ANDROID', 'IOS', 'GENERAL'),
    },
  }, {
    indexes: [
      {
        fields: ['id'],
      },
      {
        fields: ['sender_id'],
      },
      {
        fields: ['receiver_id'],
      },
      {
        fields: ['has_read'],
      },
      {
        fields: ['sender_id', 'receiver_id', 'has_read'],
      },
    ],
    hooks: {
      beforeCount(options) {
        options.raw = true;
      },
    },
    sequelize,
    modelName: 'notification',
    tableName: 'notification',
    paranoid: true,
    timestamps: true,
    underscored: true,
  });

  Notification.associate = models => {
    Notification.belongsTo(models.user, { as: 'receiver', foreignKey: 'receiverId', targetKey: 'id' });
    Notification.belongsTo(models.user, { as: 'sender', foreignKey: 'senderId', targetKey: 'id' });
  };

  return Notification;
};
