const routes = (module.exports = require('next-routes')());

routes.add('/campaigns/new', '/campaigns/new')
routes.add('/campaigns/:address', '/campaigns/show');
