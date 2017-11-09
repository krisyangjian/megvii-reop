import HttpUtils from '../utils/http.utils';

const urls = {
		'userinfo': globalConfig.apiPath.v1 + 'api/auth/v1/users/profile',
		'usermenu': globalConfig.apiPath.v1 + 'api/auth/v1/authorities/menu?platformIds=341e63f1-275f-4d00-8149-87cd8bab3df4,app',
		'logout': globalConfig.apiPath.v1 + 'api/auth/v1/logout'
}

let CommSrv = {
	getUserinfo: function (params = {}) {
		return HttpUtils.get(urls.userinfo,params);
	},
	getUsermenu: function(params = {}){//获取上级部门
		return HttpUtils.get(urls.usermenu,params);
	},
	userLogout: function(params = {}){//获取上级部门
        return HttpUtils.get(urls.logout,params);
    }
};

export {CommSrv};
