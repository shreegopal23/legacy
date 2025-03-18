const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CodePushUserMasterToken extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
    }
  }
  CodePushUserMasterToken.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      teamId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      masterToken: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      refData: {
        type: DataTypes.JSON,
      },
      metaData: {
        type: DataTypes.JSON,
      },
    },
    {
      indexes: [
        {
          fields: ['team_id', 'user_id'],
        },
        {
          fields: ['team_id'],
        },
        {
          fields: ['user_id'],
        },
      ],
      sequelize,
      modelName: 'codePushUserMasterToken',
      tableName: 'code_push_user_master_token',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  );

  CodePushUserMasterToken.associate = models => {
    CodePushUserMasterToken.belongsTo(models.user, { as: 'user', foreignKey: 'userId', targetKey: 'id' });
    CodePushUserMasterToken.belongsTo(models.team, { as: 'team', foreignKey: 'teamId', targetKey: 'id' });
  };

  return CodePushUserMasterToken;
};
