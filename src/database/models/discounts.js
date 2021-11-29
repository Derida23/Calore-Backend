'use strict';

module.exports = (sequelize, DataTypes) => {
  Discount.init(
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
      dateFrom: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'date_from',
      },
      dateTo: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'date_to',
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
      modelName: 'Discounts',
      tableName: 'cre_discounts',
      underscored: true,
      freezeTableName: true,
    }
  );

  return Discount;
};
