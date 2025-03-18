const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
    }
  }
  Group.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      groupName: {
        type: DataTypes.STRING,
        required: true,
      },
      groupCreatedBy: {
        type: DataTypes.UUID,
        required: true,
      },
      teamId: {
        type: DataTypes.UUID,
        required: true,
      },
    },
    {
      indexes: [
        {
          fields: ['group_name'],
        },
      ],
      hooks: {
        beforeCount(options) {
        // eslint-disable-next-line no-param-reassign
          options.raw = true;
        },
      },
      sequelize,
      modelName: 'group',
      tableName: 'group',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  );

  Group.associate = models => {
    Group.hasMany(models.groupMember, {
      as: 'inviteGroupMember', foreignKey: 'groupId', sourceKey: 'id', onDelete: 'RESTRICT',
    });
    Group.hasMany(models.appMember, {
      as: 'appGroupMember',
      foreignKey: 'groupId',
      sourceKey: 'id',
      onDelete: 'RESTRICT',
      constraints: false,
      scope: { referenceType: 'GROUP' },
    });
    Group.belongsTo(models.team, { as: 'teamGroup', foreignKey: 'teamId', targetKey: 'id' });
    Group.belongsTo(models.user, { as: 'groupCreator', foreignKey: 'groupCreatedBy', targetKey: 'id' });
  };
  return Group;
};
