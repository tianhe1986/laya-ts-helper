/**
* name 
*/
module FatLayaHelper{
	export class BannerAdManager{
		//全局单例
		private static _instance: BannerAdManager = null;

		//缓存的处理实例
		private _implInstanceMap:Object = {};

		private _systemInfo:Object = null;

		public static get instance() {
			if (! this._instance) {
				this._instance = new BannerAdManager();
			}
			return this._instance;
		}

		constructor(){
			let info:any = null;
			switch (GlobalConfig.platform) {
				case Platform.WEIXIN:
					info = Laya.Browser.window.wx.getSystemInfoSync();
					this._systemInfo = {systemHeight: info.windowHeight, systemWidth: info.windowWidth};
					break;
				case Platform.QQ:
					info = Laya.Browser.window.qq.getSystemInfoSync();
					this._systemInfo = {systemHeight: Laya.Browser.onIOS ? info.screenHeight : info.windowHeight, systemWidth: info.windowWidth};
					break;
				case Platform.BAIDU:
					info = Laya.Browser.window.swan.getSystemInfoSync();
					this._systemInfo = {systemHeight: info.windowHeight, systemWidth: info.windowWidth};
					break;
				case Platform.TOUTIAO:
					info = Laya.Browser.window.tt.getSystemInfoSync();
					this._systemInfo = {systemHeight: info.windowHeight, systemWidth: info.windowWidth};
					break;
				case Platform.VIVO:
					info = Laya.Browser.window.qg.getSystemInfoSync();
					this._systemInfo = {systemHeight: info.screenHeight, systemWidth: info.screenWidth};
					break;
				default:
					this._systemInfo = {systemHeight: Laya.stage.height, systemWidth: Laya.stage.width};
					break;
			}
		}

		private refreshImplInstance(adId:string, style:Object):BannerAdImpl
		{
			while (true) {
				if (this._implInstanceMap[adId]) {
					// 检查参数是否相同， 不相同，则需要刷新
					let existStyle = this._implInstanceMap[adId][1];

					let isSame:boolean = true;

					//检查跟之前的参数是否完全一致
					for (let key in style) {
						if (existStyle[key] != style[key]) {
							isSame = false;
							break;
						}
					}

					for (let key in style) {
						if (existStyle[key] != style[key]) {
							isSame = false;
							break;
						}
					}

					if ( ! isSame) {
						break;
					}

					// 展示次数到了，需要刷新
					this._implInstanceMap[adId][2]--;
					if (this._implInstanceMap[adId][2] <= 0) {
						break;
					}

					return this._implInstanceMap[adId][0];
				}

				break;
			};

			if (this._implInstanceMap[adId]) { //清除旧的
				(this._implInstanceMap[adId][0] as BannerAdImpl).destroy();
				this._implInstanceMap[adId][0] = null;
			}

			// 创建新的instance， 初始化
			let newInstance = this.createNewImplInstance(adId, style);
			// 记录
			this._implInstanceMap[adId] = [newInstance, style, BannerAdConfig.destroyCount];
			return newInstance;
		}

		private createNewImplInstance(adId:string, style:Object):BannerAdImpl
		{
			switch (GlobalConfig.platform) {
				case Platform.WEIXIN:
					return new BannerAdImplWx(adId, style);
				case Platform.QQ:
					return new BannerAdImplQQ(adId, style);
				case Platform.BAIDU:
					return new BannerAdImplBaidu(adId, style);
				case Platform.TOUTIAO:
					return new BannerAdImplTT(adId, style);
				case Platform.VIVO:
					return new BannerAdImplVivo(adId, style);
				default:
					return new BannerAdImplWeb(adId, style);
			}
		}

		private getImplInstance(adId:string):BannerAdImpl
		{
			if (this._implInstanceMap[adId]) {
				return this._implInstanceMap[adId][0];
			}

			return null;
		}

		public get systemInfo():any
		{
			return this._systemInfo;
		}

		//展示banner广告
		public showBanner(adId:string, width:number):void
		{
			//构建参数
			let style = {width: width};
			
			let implInstance = this.refreshImplInstance(adId, style);
			implInstance.show();
		}

		public hideBanner(adId:string):void
		{
			let implInstance = this.getImplInstance(adId);
			implInstance && implInstance.hide();
		}
	}
}