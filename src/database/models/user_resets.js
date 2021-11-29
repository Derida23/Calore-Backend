'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserReset extends Model {}
  UserReset.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT(20),
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(25),
        unique: true,
        field: 'email',
      },
      token: {
        allowNull: false,
        type: DataTypes.TEXT,
        field: 'token',
      },

      created_at: {
        allowNull: false,
        defaultValue: new Date(Date.now()),
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updated_at: {
        allowNull: false,
        defaultValue: new Date(Date.now()),
        type: DataTypes.DATE,
        field: 'updated_at',
      },
      deleted_at: {
        allowNull: true,
        type: DataTypes.DATE,
        field: 'deleted_at',
      },
    },
    {
      sequelize,
      modelName: 'UserResets',
      tableName: 'cre_user_resets',
      underscored: true,
      freezeTableName: true,
    }
  );

  return UserReset;
};
