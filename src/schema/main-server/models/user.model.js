/* eslint-disable max-lines */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
        unique: true,
      },
      profileImage: {
        type: DataTypes.STRING(1000),
        required: false,
      },
      firstName: {
        type: DataTypes.STRING,
        required: false,
      },
      lastName: {
        type: DataTypes.STRING,
        required: false,
      },
      otp: {
        type: DataTypes.STRING,
        required: false,
      },
      wrongOtpAttempt: {
        type: DataTypes.INTEGER,
        required: false,
        defaultValue: 0,
      },
      otpExpireTime: {
        type: DataTypes.DATE,
        required: false,
      },
      refreshToken: {
        type: DataTypes.STRING(1000),
        required: false,
      },
      notificationPreference: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
      },
      defaultWorkspace: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      customerId: {
        type: DataTypes.STRING,
      },
      deleteAccountReason: {
        type: DataTypes.JSONB,
      },
      isCodePushConnect: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      indexes: [
        {
          fields: ['first_name'],
        },
        {
          fields: ['last_name'],
        },
        {
          fields: ['first_name', 'last_name'],
          name: 'combined_user_index',
        },
      ],
      hooks: {
        beforeCount(options) {
          // eslint-disable-next-line no-param-reassign
          options.raw = true;
        },
      },
      sequelize,
      modelName: 'user',
      tableName: 'user',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  );

  User.associate = models => {
    User.hasMany(models.group, {
      as: 'groupCreator', foreignKey: 'groupCreatedBy', sourceKey: 'id', onDelete: 'RESTRICT',
    });
    User.hasMany(models.applications, {
      as: 'apps', foreignKey: 'appCreatedBy', sourceKey: 'id', onDelete: 'RESTRICT',
    });
    User.hasMany(models.teamMember, {
      as: 'memberDetails', foreignKey: 'invitedBy', sourceKey: 'id', onDelete: 'RESTRICT',
    });
    User.hasMany(models.groupMember, {
      as: 'groupMember', foreignKey: 'invitedBy', sourceKey: 'id', onDelete: 'RESTRICT',
    });
    User.hasMany(models.applicationDetail, {
      as: 'appsDetails', foreignKey: 'createdBy', sourceKey: 'id', onDelete: 'RESTRICT',
    });
    User.hasMany(models.team, {
      as: 'teamCreator', foreignKey: 'teamCreatedBy', sourceKey: 'id', onDelete: 'RESTRICT',
    });
    User.hasMany(models.usersUpload, {
      as: 'uploader', foreignKey: 'createdBy', sourceKey: 'id', onDelete: 'RESTRICT',
    });
    User.hasMany(models.notification, {
      as: 'sender', foreignKey: 'senderId', sourceKey: 'id', onDelete: 'RESTRICT',
    });
    User.hasMany(models.notification, {
      as: 'receiver', foreignKey: 'receiverId', sourceKey: 'id', onDelete: 'RESTRICT',
    });
    User.hasMany(models.accessToken, {
      as: 'userAccessToken', foreignKey: 'userId', sourceKey: 'id', onDelete: 'RESTRICT',
    });
    User.hasMany(models.releaseFeedback, {
      as: 'creator', foreignKey: 'createdBy', sourceKey: 'id', onDelete: 'RESTRICT',
    });
    User.hasMany(models.releaseFeedback, {
      as: 'resolver', foreignKey: 'resolvedBy', sourceKey: 'id', onDelete: 'RESTRICT',
    });
    User.hasMany(models.integrationConfig, {
      as: 'integrationConfigCreator', foreignKey: 'createdBy', sourceKey: 'id', onDelete: 'RESTRICT',
    });
    User.hasMany(models.integrationConfig, {
      as: 'integrationConfigUpdater', foreignKey: 'updatedBy', sourceKey: 'id', onDelete: 'RESTRICT',
    });
    User.hasMany(models.integrationEvent, {
      as: 'integrationEventCreator', foreignKey: 'createdBy', sourceKey: 'id', onDelete: 'RESTRICT',
    });
    User.hasMany(models.integrationEvent, {
      as: 'integrationEventUpdater', foreignKey: 'updatedBy', sourceKey: 'id', onDelete: 'RESTRICT',
    });
    User.hasMany(models.integrationApplicationExcluded, {
      as: 'integrationApplicationExcludedCreator', foreignKey: 'createdBy', sourceKey: 'id', onDelete: 'RESTRICT',
    });
    User.hasMany(models.integrationApplicationExcluded, {
      as: 'integrationApplicationExcludedUpdater', foreignKey: 'updatedBy', sourceKey: 'id', onDelete: 'RESTRICT',
    });
    User.hasMany(models.dynamicLinkConfig, {
      as: 'dynamicLinkConfigs', foreignKey: 'createdBy', sourceKey: 'id', onDelete: 'RESTRICT',
    });
    User.hasMany(models.codePushAccessToken, {
      as: 'codePushAccessTokens', foreignKey: 'userId', sourceKey: 'id', onDelete: 'RESTRICT',
    });
  };
  return User;
};
