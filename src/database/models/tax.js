'use strict';

module.exports = (sequelize, DataTypes) => {
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
        type: DataTypes.BOOLEAN,
        field: 'type',
      },
      status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        field: 'status',
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
      modelName: 'Taxs',
      tableName: 'cre_taxs',
      underscored: true,
      freezeTableName: true,
    }
  );

  return Tax;
};
