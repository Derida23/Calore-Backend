'use strict';

module.exports = (sequelize, DataTypes) => {
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
      modelName: 'Uoms',
      tableName: 'cre_uoms',
      underscored: true,
      freezeTableName: true,
    }
  );

  return Uom;
};