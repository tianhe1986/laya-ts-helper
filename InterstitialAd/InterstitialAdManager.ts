/**
* name 
*/
module FatLayaHelper{
	export class InterstitialAdManager{
		//全局单例
		private static _instance: InterstitialAdManager = null;

		//全局展示间隔
		private interShowGlobalKey:string = "fat_laya_inter_ad_all_time";

		//单个广告下次展示时间
		private interShowSingleKeyPrefix:string = "fat_laya_inter_ad_single_time_";

		//下次展示时间戳
		private interShowGlobalNextTime:number = null;
		private interShowSingleNextTimeMap: Object = {};

		public static get instance() {
			if (! this._instance) {
				this._instance = new InterstitialAdManager();
			}
			return this._instance;
		}


		constructor(){
			
		}

		//获取一个新的插屏广告实例
		protected getImplInstance(adId:string):InterstitialAdImpl
		{
			// TODO 微信小游戏， 可以将已创建的实例缓存起来
			switch (GlobalConfig.platform) {
				case Platform.VIVO: //vivo小游戏， 根据文档，如果用户关闭了插屏广告，则需要重新创建，因此缓存起来没有意义，每次都返回一个新实例
					return new InterstitialAdImplVivo(adId);
				default:
					return new InterstitialAdImplWeb(adId);
			}
		}

		//展示插屏广告
		public showInterstitial(adId:string, successHandler: Laya.Handler, failedHandler: Laya.Handler = null):void
		{
			let timeNow:number = Date.now();
			//比较全局展示间隔
			if (timeNow < this.getGlobalNextShowTime()) {
				failedHandler && failedHandler.run();
				return;
			}

			//比较广告实例展示间隔
			if (timeNow < this.getSingleNextShowTime(adId)) {
				failedHandler && failedHandler.run();
				return;
			}

			//可以展示， 处理
			let implInstance = this.getImplInstance(adId);
			implInstance.show(successHandler, failedHandler);
		}

		// 获取全局下次展示时间
		private getGlobalNextShowTime():number
		{
			if (InterstitialAdConfig.globalInterval == 0) { //没有限制
				return 0;
			}

			if (this.interShowGlobalNextTime === null) { //没有的情况下， 从缓存中取
				let valueStr = Laya.LocalStorage.getItem(this.interShowGlobalKey);
				if (valueStr == null || valueStr == undefined || valueStr == "") {
					this.interShowGlobalNextTime = 0;
				} else {
					this.interShowGlobalNextTime = parseFloat(valueStr);
				}
			}

			return this.interShowGlobalNextTime;
		}

		// 获取单个id下次展示时间
		private getSingleNextShowTime(adId:string):number
		{
			if (InterstitialAdConfig.singleInterval == 0) { //没有限制
				return 0;
			}

			if (this.interShowSingleNextTimeMap[adId] == undefined) {
				let valueStr = Laya.LocalStorage.getItem(this.interShowSingleKeyPrefix + adId);
				if (valueStr == null || valueStr == undefined || valueStr == "") {
					this.interShowSingleNextTimeMap[adId] = 0;
				} else {
					this.interShowSingleNextTimeMap[adId] = parseFloat(valueStr);
				}
			}

			return this.interShowSingleNextTimeMap[adId];
		}

		// 更新插屏广告展示时间
		public updateNextShowTime(adId:string):void
		{
			let timeNow:number = Date.now();

			if (InterstitialAdConfig.singleInterval > 0) {
				this.interShowSingleNextTimeMap[adId] = timeNow + InterstitialAdConfig.singleInterval;
				Laya.LocalStorage.setItem(this.interShowSingleKeyPrefix + adId, "" + this.interShowSingleNextTimeMap[adId]);
			}

			if (InterstitialAdConfig.globalInterval > 0) {
				this.interShowGlobalNextTime = timeNow + InterstitialAdConfig.globalInterval;
				Laya.LocalStorage.setItem(this.interShowGlobalKey, "" + this.interShowGlobalNextTime);
			}
		}
	}
}