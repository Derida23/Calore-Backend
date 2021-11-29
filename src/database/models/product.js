'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Uoms, {
        foreignKey: 'uomId',
        as: 'uoms',
      });
      Product.belongsTo(models.Categories, {
        foreignKey: 'categoryId',
        as: 'category',
      });
      Product.belongsTo(models.Discounts, {
        foreignKey: 'discountId',
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
      productCode: {
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
        allowNull: false,
        type: DataTypes.TEXT,
        field: 'image',
      },
      unitInStock: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'unit_in_stock',
      },
      unitPrice: {
        allowNull: false,
        type: DataTypes.DECIMAL(25, 2),
        field: 'unit_price',
      },
      uomId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'uom_id',
      },
      categoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'category_id',
      },
      status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        field: 'status',
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
      modelName: 'Products',
      tableName: 'cre_products',
      underscored: true,
      freezeTableName: true,
    }
  );

  return Product;
};
