'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Uoms, {
        foreignKey: 'uom_id',
        as: 'uom',
      });
      Product.belongsTo(models.Categories, {
        foreignKey: 'category_id',
        as: 'category',
      });
      Product.belongsTo(models.Discounts, {
        foreignKey: 'discount_id',
        as: 'discount',
      });
    }
  }
  Product.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT(20),
      },
      product_code: {
        allowNull: false,
        type: DataTypes.STRING(50),
        field: 'product_code',
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
      image: {
        allowNull: true,
        type: DataTypes.TEXT,
        field: 'image',
      },
      unit_in_stock: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'unit_in_stock',
      },
      unit_price: {
        allowNull: false,
        type: DataTypes.DECIMAL(25, 2),
        field: 'unit_price',
      },
      uom_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'uom_id',
      },
      category_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'category_id',
      },
      status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: 1,
        field: 'status',
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
      modelName: 'Products',
      tableName: 'cre_products',
      underscored: true,
      freezeTableName: true,
    }
  );

  return Product;
};
