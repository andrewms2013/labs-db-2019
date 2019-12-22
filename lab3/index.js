const { Controller } = require('./src/controllers/controller');


(async () => {
    const controller = new Controller();
    return controller.init();
})();
