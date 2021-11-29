'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Orders, {
        foreignKey: 'userId',
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
        field: 'role',
      },
      status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        field: 'status',
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING(25),
        unique: true,
        field: 'phone',
      },
      token: {
        allowNull: false,
        type: DataTypes.TEXT,
        field: 'token',
      },
      lastLogin: {
        allowNull: false,
        defaultValue: new Date(Date.now()),
        type: DataTypes.DATE,
        field: 'last_login',
      },
      address: {
        allowNull: false,
        type: DataTypes.TEXT,
        field: 'address',
      },
      district: {
        allowNull: false,
        type: DataTypes.INTEGER(20),
        field: 'district',
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
