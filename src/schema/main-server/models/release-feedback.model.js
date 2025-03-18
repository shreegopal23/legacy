const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ReleaseFeedback extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
    }
  }
  ReleaseFeedback.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      feedback: {
        type: DataTypes.TEXT,
        required: true,
      },
      releaseId: {
        type: DataTypes.UUID,
        required: true,
      },
      createdBy: {
        type: DataTypes.UUID,
        required: true,
      },
      feedbackImage: {
        type: DataTypes.STRING,
      },
      feedbackVideo: {
        type: DataTypes.STRING,
      },
      isResolved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      blurHash: {
        type: DataTypes.STRING,
      },
      resolveComment: {
        type: DataTypes.STRING,
      },
      resolvedBy: {
        type: DataTypes.UUID,
      },
      resolvedAt: {
        type: DataTypes.DATE,
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
      indexes: [
        {
          fields: ['feedback'],
        },
      ],
      sequelize,
      modelName: 'releaseFeedback',
      tableName: 'release_feedback',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  );

  ReleaseFeedback.associate = models => {
    ReleaseFeedback.belongsTo(models.applicationDetail, { as: 'releaseFeedbacks', foreignKey: 'releaseId', targetKey: 'id' });
    ReleaseFeedback.belongsTo(models.user, { as: 'creator', foreignKey: 'createdBy', targetKey: 'id' });
    ReleaseFeedback.belongsTo(models.user, { as: 'resolver', foreignKey: 'resolvedBy', targetKey: 'id' });
  };

  return ReleaseFeedback;
};
