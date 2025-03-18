const bcrypt = require('bcrypt');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ApplicationShare extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
    }
  }
  ApplicationShare.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      link: {
        type: DataTypes.STRING(1000),
        required: true,
        allowNull: false,
      },
      linkExpireTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      applicationUniqueId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      applicationDetailId: {
        type: DataTypes.UUID,
      },
      subLinkId: {
        type: DataTypes.STRING,
        unique: true,
      },
      isPrivate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      password: {
        type: DataTypes.STRING,
        set(value) {
          const hash = bcrypt.hashSync(value, 10);
          this.setDataValue('password', hash);
        },
        allowNull: true,
      },
      linkExpiration: {
        type: DataTypes.STRING,
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
      modelName: 'applicationShare',
      tableName: 'application_share',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  );

  ApplicationShare.associate = models => {
    // eslint-disable-next-line max-len
    ApplicationShare.belongsTo(models.applications, { as: 'appShared', foreignKey: 'applicationId', targetKey: 'id' });
    ApplicationShare.belongsTo(models.applicationDetail, { as: 'applicationDetail', foreignKey: 'applicationDetailId', targetKey: 'id' });
  };

  return ApplicationShare;
};
