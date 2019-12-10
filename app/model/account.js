'use strict';

module.exports = app => {
  const { STRING, BIGINT, INTEGER } = app.Sequelize;
  const Account = app.model.define('account', {
    id: { type: BIGINT(16), primaryKey: true, autoIncrement: true },
    name: STRING(32),
    email: STRING(32),
    phone: STRING(11),
    password: STRING(16),
    status: { type: INTEGER, defaultValue: 1 },
  });

  return Account;
};
