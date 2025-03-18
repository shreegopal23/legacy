const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class GroupMember extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
    }
  }
  GroupMember.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      invitedUserEmail: {
        type: DataTypes.STRING,
        required: false,
      },
      groupId: {
        type: DataTypes.UUID,
        required: true,
      },
      invitedBy: {
        type: DataTypes.UUID,
        required: true,
      },
    },
    {
      indexes: [
        {
          fields: ['invited_user_email'],
        },
      ],
      hooks: {
        beforeCount(options) {
          // eslint-disable-next-line no-param-reassign
          options.raw = true;
        },
      },
      sequelize,
      modelName: 'groupMember',
      tableName: 'group_member',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  );

  GroupMember.associate = models => {
    GroupMember.belongsTo(models.group, { as: 'inviteGroupMember', foreignKey: 'groupId', targetKey: 'id' });
    GroupMember.belongsTo(models.user, { as: 'groupMember', foreignKey: 'invitedBy', targetKey: 'id' });
  };
  return GroupMember;
};
