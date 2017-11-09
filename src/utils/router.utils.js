import Vue from 'vue';
import Router from 'vue-router';

import A from '../modules/a/a.router';
import B from '../modules/b/b.router';


Vue.use(Router);

let router = new Router({
	routes: [
		...A,
		...B
	]
});

function GlobalRouterPlugin() {}
GlobalRouterPlugin.install = function(Vue, options) {
	Vue.getRouter = function() {
		return router;
	};
};
Vue.use(GlobalRouterPlugin);

export {
	router
};