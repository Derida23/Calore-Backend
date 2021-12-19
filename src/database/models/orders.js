'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.Users, {
        foreignKey: 'user_id',
        as: 'user',
      });
      Order.belongsTo(models.Taxs, {
        foreignKey: 'tax_id',
        as: 'tax',
      });
      Order.belongsTo(models.Discounts, {
        foreignKey: 'discount_id',
        as: 'discount',
      });
      Order.hasMany(models.OrderDetails, {
        foreignKey: 'order_id',
        as: 'order_detail',
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
        unique: true,
      },
      order_number: {
        allowNull: false,
        type: DataTypes.STRING(50),
        field: 'order_number',
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(50),
        field: 'name',
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'user_id',
      },
      type: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'type',
      },
      remark: {
        allowNull: true,
        type: DataTypes.TEXT,
        field: 'remark',
      },
      status: {
        allowNull: true,
        type: DataTypes.INTEGER,
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
      tax_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'tax_id',
      },
      discount_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
        field: 'discount_id',
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
      modelName: 'Orders',
      tableName: 'cre_orders',
      underscored: true,
      freezeTableName: true,
    }
  );

  return Order;
};
