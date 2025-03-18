const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CodePushAppDeploymentToken extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
    }
  }
  CodePushAppDeploymentToken.init(
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
      appId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      appName: {
        type: DataTypes.STRING,
      },
      deploymentToken: {
        type: DataTypes.STRING,
      },
      deploymentType: {
        type: DataTypes.ENUM('ANDROID', 'IOS'),
      },
      createdBy: {
        type: DataTypes.UUID,
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
          fields: ['team_id', 'app_id'],
        },
        {
          fields: ['team_id'],
        },
        {
          fields: ['app_id'],
        },
      ],
      sequelize,
      modelName: 'codePushAppDeploymentToken',
      tableName: 'code_push_app_deployment_token',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  );

  CodePushAppDeploymentToken.associate = models => {
    CodePushAppDeploymentToken.belongsTo(models.team, { as: 'team', foreignKey: 'teamId', targetKey: 'id' });
    CodePushAppDeploymentToken.belongsTo(models.applications, { as: 'application', foreignKey: 'appId', targetKey: 'id' });
  };

  return CodePushAppDeploymentToken;
};
