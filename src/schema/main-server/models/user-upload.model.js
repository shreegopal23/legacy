const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserUpload extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
    }
  }
  UserUpload.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      fileName: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
      },
      fileType: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
      },
      storageBaseKey: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
      },
      jobId: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
      },
      jobStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdBy: {
        type: DataTypes.UUID,
      },
      applicationId: {
        type: DataTypes.UUID,
      },
    },
    {
      hooks: {
        beforeCount(options) {
          // eslint-disable-next-line no-param-reassign
          options.raw = true;
        },
      },
      sequelize,
      modelName: 'usersUpload',
      tableName: 'user_upload',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  );

  UserUpload.associate = models => {
    UserUpload.belongsTo(models.user, { as: 'uploader', foreignKey: 'createdBy', targetKey: 'id' });
    UserUpload.belongsTo(models.applications, { as: 'userReleaseCreator', foreignKey: 'applicationId', targetKey: 'id' });
  };

  return UserUpload;
};
