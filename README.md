test-scalable-angular-app
=========================

Sample scalable angular app with require.js and lazy loading of components. This is a WIP.

It's currently based in generator-angular with the adition of ui-router, require.js, and a little library that performs the injection of the angular app and it's controller by checking their dependencies from a JSON file. This way the integration of the components is done in a declarative way.

By now it's just a PoC but may lead to a library to perform lazy loading of angular components. Also, in the future, by reading the dependency json files it could merge and compact the js files in an optimized way.