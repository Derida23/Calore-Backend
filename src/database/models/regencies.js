'use strict';

module.exports = (sequelize, DataTypes) => {
  Regency.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      provinceId: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'province_id',
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(255),
        field: 'name',
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
      modelName: 'Regencies',
      tableName: 'cre_regencies',
      underscored: true,
      freezeTableName: true,
    }
  );

  return Regency;
};
