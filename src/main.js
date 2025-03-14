// const AppModule = require('./app.module');

// new AppModule();
const AppModule = require('./app.module');

const appInstance = new AppModule();
module.exports = appInstance.app; 
