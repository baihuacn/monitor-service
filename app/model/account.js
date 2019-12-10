'use strict';

const moment = require('moment');

module.exports = app => {
  const { STRING, BIGINT, INTEGER, DATE } = app.Sequelize;
  const Account = app.model.define('account', {
    id: { type: BIGINT(16), primaryKey: true, autoIncrement: true },
    name: STRING(32),
    email: STRING(32),
    phone: STRING(11),
    password: STRING(16),
    status: { type: INTEGER, defaultValue: 1 },
    createdAt: {
      type: DATE,
      get() {
        return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    updatedAt: {
      type: DATE,
      get() {
        return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
  });

  return Account;
};
