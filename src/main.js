import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import './styles/default.scss';

Vue.use(ElementUI);
//import dir from './directives'
new Vue({
	el: '#app',
	// store,
	// router,
	template: '<app></app>',
	components: { App },
    data: {
    	a: 1
    }
})