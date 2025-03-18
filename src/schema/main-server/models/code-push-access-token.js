const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CodePushAccessToken extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
    }
  }
  CodePushAccessToken.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      accessToken: {
        type: DataTypes.STRING,
        allowNull: false,
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
          fields: ['user_id'],
        },
      ],
      sequelize,
      modelName: 'codePushAccessToken',
      tableName: 'code_push_access_token',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  );

  CodePushAccessToken.associate = models => {
    CodePushAccessToken.belongsTo(models.user, { as: 'user', foreignKey: 'userId', targetKey: 'id' });
  };

  return CodePushAccessToken;
};
