'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Orders, {
        foreignKey: 'user_id',
        as: 'orders',
      });
    }
  }
  User.init(
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
      password: {
        allowNull: false,
        type: DataTypes.STRING(25),
        field: 'password',
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(50),
        field: 'name',
      },
      role: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: 2,
        field: 'role',
      },
      status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: 1,
        field: 'status',
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING(25),
        unique: true,
        field: 'phone',
      },
      token: {
        allowNull: true,
        type: DataTypes.TEXT,
        field: 'token',
      },
      last_login: {
        allowNull: true,
        defaultValue: new Date(Date.now()),
        type: DataTypes.DATE,
        field: 'last_login',
      },
      address: {
        allowNull: false,
        type: DataTypes.TEXT,
        field: 'address',
      },
      districts: {
        allowNull: false,
        type: DataTypes.INTEGER(20),
        field: 'districts',
      },
      regencies: {
        allowNull: false,
        type: DataTypes.INTEGER(20),
        field: 'regencies',
      },
      provinces: {
        allowNull: false,
        type: DataTypes.INTEGER(20),
        field: 'provinces',
      },
      createdAt: {
        allowNull: false,
        defaultValue: new Date(Date.now()),
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        allowNull: false,
        defaultValue: new Date(Date.now()),
        type: DataTypes.DATE,
        field: 'updated_at',
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
        field: 'deleted_at',
      },
    },
    {
      sequelize,
      modelName: 'Users',
      tableName: 'cre_users',
      underscored: true,
      freezeTableName: true,
    }
  );

  return User;
};
