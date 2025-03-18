const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AccessToken extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
    }
  }
  AccessToken.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
      },
      accessToken: {
        type: DataTypes.STRING(1000),
      },
      browser: {
        type: DataTypes.STRING,
      },
      os: {
        type: DataTypes.STRING,
      },
      reqIp: {
        type: DataTypes.STRING,
      },
      lastSessionTime: {
        type: DataTypes.DATE,
      },
      userAgent: {
        type: DataTypes.JSONB,
      },
    },
    {
      sequelize,
      modelName: 'accessToken',
      tableName: 'access_token',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  );

  AccessToken.associate = models => {
    AccessToken.belongsTo(models.user, {
      as: 'userAccessToken', foreignKey: 'userId', sourceKey: 'id', onDelete: 'RESTRICT',
    });
  };
  return AccessToken;
};
