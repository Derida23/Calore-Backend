'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.Users, {
        foreignKey: 'userId',
        as: 'user',
      });
      Order.belongsTo(models.Taxs, {
        foreignKey: 'taxId',
        as: 'tax',
      });
      Order.belongsTo(models.Discounts, {
        foreignKey: 'discountId',
        as: 'discount',
      });
      Order.hasMany(models.OrderDetails, {
        foreignKey: 'orderId',
        as: 'orders',
      });
    }
  }
  Order.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT(20),
      },
      orderNumber: {
        allowNull: false,
        type: DataTypes.STRING(50),
        field: 'order_number',
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(50),
        field: 'name',
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'user_id',
      },
      type: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        field: 'type',
      },
      remark: {
        allowNull: true,
        type: DataTypes.TEXT,
        field: 'remark',
      },
      status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        field: 'status',
      },
      reason: {
        allowNull: true,
        type: DataTypes.TEXT,
        field: 'reason',
      },
      total: {
        allowNull: false,
        type: DataTypes.DECIMAL(25, 2),
        field: 'total',
      },
      taxId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'tax_id',
      },
      discountId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        field: 'discount_id',
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
      modelName: 'Orders',
      tableName: 'cre_orders',
      underscored: true,
      freezeTableName: true,
    }
  );

  return Order;
};
