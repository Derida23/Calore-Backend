'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Regency extends Model {}
  Regency.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      province_id: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'province_id',
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(255),
        field: 'name',
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
      modelName: 'Regencies',
      tableName: 'cre_regencies',
      underscored: true,
      freezeTableName: true,
    }
  );

  return Regency;
};
