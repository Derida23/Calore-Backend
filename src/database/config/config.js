const { username, password, database, host, dialect } = require('../../config/env');

const define = {
  timestamps: true,
  freezeTableName: true,
  underscored: true,
  paranoid: true,
  createdAt: 'createdAt',
  updatedAt: 'updateAt',
  deletedAt: 'deletedAt',
};

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect,
    define,
    timezone: '+07:00',
    logging: (query, options, time) => {
      console.log(query);
    },
  },
};
