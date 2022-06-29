'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    static associate(models) {
      OrderDetail.belongsTo(models.Orders, {
        foreignKey: 'order_id',
        as: 'order',
      });
      OrderDetail.belongsTo(models.Products, {
        foreignKey: 'product_id',
        as: 'product',
      });
      OrderDetail.belongsTo(models.Uoms, {
        foreignKey: 'uom_id',
        as: 'uom',
      });
      OrderDetail.belongsTo(models.Varieties, {
        foreignKey: 'variety_id',
        as: 'variety',
      });
    }
  }
  OrderDetail.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT(20),
      },
      order_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'order_id',
      },
      product_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'product_id',
      },
      uom_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'uom_id',
      },
      variety_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'variety_id',
      },
      qty: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'qty',
      },
      price: {
        allowNull: false,
        type: DataTypes.DECIMAL(25, 2),
        field: 'price',
      },
      total: {
        allowNull: false,
        type: DataTypes.DECIMAL(25, 2),
        field: 'total',
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
      modelName: 'OrderDetails',
      tableName: 'cre_order_details',
      underscored: true,
      freezeTableName: true,
    }
  );

  return OrderDetail;
};
