const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ReleaseDownloadHistory extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
    }
  }
  ReleaseDownloadHistory.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      appDetailsId: {
        type: DataTypes.UUID,
        required: true,
      },
      os: {
        type: DataTypes.STRING,
      },
      browser: {
        type: DataTypes.STRING,
      },
      deviceType: {
        type: DataTypes.STRING,
      },
      userAgent: {
        type: DataTypes.JSONB,
      },
      reqIp: {
        type: DataTypes.STRING,
      },
      geoLocation: {
        type: DataTypes.JSON,
      },
      country: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'releaseDownloadHistory',
      tableName: 'release_download_history',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  );

  ReleaseDownloadHistory.associate = models => {
    ReleaseDownloadHistory.belongsTo(models.applicationDetail, { as: 'applicationDetail', foreignKey: 'appDetailsId', targetKey: 'id' });
  };

  return ReleaseDownloadHistory;
};
