'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tax extends Model {}
  Tax.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT(20),
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(25),
        field: 'name',
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
        field: 'description',
      },
      percentage: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'percentage',
      },
      type: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'type',
      },
      status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: 1,
        field: 'status',
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
      modelName: 'Taxs',
      tableName: 'cre_taxs',
      underscored: true,
      freezeTableName: true,
    }
  );

  return Tax;
};
