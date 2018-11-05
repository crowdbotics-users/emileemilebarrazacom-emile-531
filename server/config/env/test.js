'use strict';

var defaultEnvConfig = require('./default');

module.exports = {
  log: {
    // logging with Morgan - https://github.com/expressjs/morgan
    // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
    format: process.env.LOG_FORMAT || 'combined',
    options: {
      // Stream defaults to process.stdout
      // Uncomment/comment to toggle the logging to a log on the file system
      stream: {
        directoryPath: process.cwd(),
        fileName: 'access.log',
        rotatingLogs: { // for more info on rotating logs - https://github.com/holidayextras/file-stream-rotator#usage
          active: false, // activate to use rotating logs 
          fileName: 'access-%DATE%.log', // if rotating logs are active, this fileName setting will be used
          frequency: 'daily',
          verbose: false
        }
      }
    }
  },
  port: process.env.PORT || 3001,
  app: {
    title: defaultEnvConfig.app.title + ' - Test Environment'
  },
  mailer: {
    from: process.env.MAILER_FROM || 'MAILER_FROM',
    options: {
      service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
      auth: {
        user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
        pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
      }
    }
  },
  roles: ['admin', 'guest', 'user'],
  db: {
    options: {
      logging: process.env.DB_LOGGING === 'true' ? console.log : false,
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || '5432'
    },
    sync: {
      force: process.env.DB_FORCE === 'true' ? true : false
    }
  },
  seed: {
    data: {
      user: {
        username: process.env.DB_SEED_USER_USERNAME || 'user',
        provider: 'local',
        email: process.env.DB_SEED_USER_EMAIL || 'user@localhost.com',
        firstName: 'User',
        lastName: 'Local',
        displayName: 'User Local',
        roles: ['user']
      },
      admin: {
        username: process.env.DB_SEED_ADMIN_USERNAME || 'admin',
        provider: 'local',
        email: process.env.DB_SEED_ADMIN_EMAIL || 'admin@localhost.com',
        firstName: 'Admin',
        lastName: 'Local',
        displayName: 'Admin Local',
        roles: ['user', 'admin']
      }
    },
    init: process.env.DB_SEED === 'true' ? true : false,
    logging: process.env.DB_SEED_LOGGING === 'false' ? false : true
  },
  // This config is set to true during grunt coverage
  coverage: process.env.COVERAGE || false
};
