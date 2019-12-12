/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1572846932678_4897';
  // add your middleware config here
  config.middleware = [ 'passport' ];
  // add your user config here
  config.myAppName = 'monitor-service';
  // cluster
  config.cluster = {
    listen: {
      port: 7001,
      hostname: '0.0.0.0',
    },
  };
  // sequelize
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'monitor',
    define: {
      freezeTableName: true,
      timestamps: true,
      underscored: true,
    },
  };
  // security
  config.security = {
    csrf: {
      enable: false,
    },
  };
  // redis
  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: null,
      db: 0,
    },
  };

  return config;
};
