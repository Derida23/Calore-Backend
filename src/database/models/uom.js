'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Uom extends Model {}
  Uom.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT(20),
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(50),
        field: 'name',
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
      modelName: 'Uoms',
      tableName: 'cre_uoms',
      underscored: true,
      freezeTableName: true,
    }
  );

  return Uom;
};
