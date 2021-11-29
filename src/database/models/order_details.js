'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    static associate(models) {
      OrderDetail.belongsTo(models.Orders, {
        foreignKey: 'orderId',
        as: 'order',
      });
      OrderDetail.belongsTo(models.Products, {
        foreignKey: 'productId',
        as: 'product',
      });
      OrderDetail.belongsTo(models.Discounts, {
        foreignKey: 'discountId',
        as: 'discount',
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
      orderId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'order_id',
      },
      productId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'product_id',
      },
      qty: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'qty',
      },
      subtotal: {
        allowNull: false,
        type: DataTypes.DECIMAL(25, 2),
        field: 'subtotal',
      },
      discountId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        field: 'discount_id',
      },
      total: {
        allowNull: false,
        type: DataTypes.DECIMAL(25, 2),
        field: 'total',
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
      modelName: 'OrderDetails',
      tableName: 'cre_order_details',
      underscored: true,
      freezeTableName: true,
    }
  );

  return OrderDetail;
};
