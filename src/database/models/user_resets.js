'use strict';

module.exports = (sequelize, DataTypes) => {
  UserReset.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT(20),
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(25),
        unique: true,
        field: 'email',
      },
      token: {
        allowNull: false,
        type: DataTypes.TEXT,
        field: 'token',
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
      modelName: 'UserResets',
      tableName: 'cre_user_resets',
      underscored: true,
      freezeTableName: true,
    }
  );

  return UserReset;
};
