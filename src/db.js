const Sequelize = require('sequelize');
const fs = require('fs');
const info = require('./dbconnection.json');

const sequelize = new Sequelize({
    database: process.env.APP_ENV === 'test' ? info.testbase : info.database,
    username: info.user,
    password: info.password,
    dialect: 'mysql',
    operatorsAliases: false,
    logging: false,
  }); 

  const Notification = sequelize.define('notification', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    content: Sequelize.TEXT,
    header: Sequelize.STRING,
  })
  
  const Response = sequelize.define('response', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    content: Sequelize.STRING,
  })
  
  const User = sequelize.define('user', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: Sequelize.STRING,
    token: Sequelize.STRING,
    password: Sequelize.STRING
  })

  Notification.belongsTo(User);
  Response.belongsTo(Notification);
  Response.belongsTo(User);

  User.hasMany(Notification);
  User.hasMany(Response);
  Notification.hasMany(Response);

  sequelize.sync();

  module.exports = {
      User: User,
      Notification: Notification,
      Response: Response,
      Sequelize: sequelize
  }

