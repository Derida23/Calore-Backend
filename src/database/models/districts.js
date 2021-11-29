'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class District extends Model {}
  District.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      regency_id: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'regency_id',
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
      modelName: 'Districts',
      tableName: 'cre_districts',
      underscored: true,
      freezeTableName: true,
    }
  );

  return District;
};
