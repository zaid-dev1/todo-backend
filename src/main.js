const AppModule = require('./app.module');

const appInstance = new AppModule();
module.exports = appInstance.app; 
