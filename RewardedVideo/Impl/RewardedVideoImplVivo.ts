/**
* name 
*/
module FatLayaHelper{
	export class RewardedVideoImplVivo implements RewardedVideoImpl{

		private _rewardedVideoAd:any = null;
		
		// 上次加载时间, vivo广告限制一分钟内只能请求一次, 需要进行处理
		// TODO 以后的版本会取消限制? 根据版本进行区分
		private _lastLoadTime:number = 0;

		public create(videoId:string, spId:string):void
		{
			//不支持激励视频
			if (Laya.Browser.window.qg.createRewardedVideoAd == undefined) {
				RewardedVideoManager.instance.isLoadFailed = true;
				RewardedVideoManager.instance.loadFailedHandler && RewardedVideoManager.instance.loadFailedHandler.runWith({errMsg: "nor support"});
				return;
			}

			this._rewardedVideoAd = Laya.Browser.window.qg.createRewardedVideoAd({
				posId: videoId
			});

			this._lastLoadTime = Date.now();

			this._rewardedVideoAd.onLoad(() => {
				//加载成功
				RewardedVideoManager.instance.isLoadFailed = false;
				RewardedVideoManager.instance.loadSuccessHandler && RewardedVideoManager.instance.loadSuccessHandler.run();
			});

			this._rewardedVideoAd.onClose((res) =>{
				if (res.isEnded) {
					RewardedVideoManager.instance.playSuccessHandler && RewardedVideoManager.instance.playSuccessHandler.run();
				} else {
					RewardedVideoManager.instance.playFailedsHandler && RewardedVideoManager.instance.playFailedsHandler.run();
				}

				// vivo 的一分钟只能请求一次，竟然不是针对拉取，而是针对展示， 很无奈， 那就， 关闭的时候重新计时好了
				this._lastLoadTime = Date.now();
				this.load();
			});

			this._rewardedVideoAd.onError((err) =>{
				RewardedVideoManager.instance.isLoadFailed = true;
				RewardedVideoManager.instance.loadFailedHandler && RewardedVideoManager.instance.loadFailedHandler.runWith(err);
			});
		}

		public load():void
		{
			if (this._rewardedVideoAd) {
				if (Date.now() - this._lastLoadTime > 60000) { //一分钟的限制
					this._rewardedVideoAd.load();
					this._lastLoadTime = Date.now();
				} else {
					RewardedVideoManager.instance.isLoadFailed = true;
					RewardedVideoManager.instance.loadFailedHandler && RewardedVideoManager.instance.loadFailedHandler.runWith({errMsg: "load twice in less than 1 minute"});
				}
			}
		}

		public show(needLoad: boolean = false, errorHandler: Laya.Handler = null):void
		{
			//不支持激励视频
			if (Laya.Browser.window.qg.createRewardedVideoAd == undefined) {
				RewardedVideoManager.instance.playFailedsHandler && RewardedVideoManager.instance.playFailedsHandler.run();
				return;
			}

			if (this._rewardedVideoAd) {
				if (needLoad) {
					if (Date.now() - this._lastLoadTime > 60000) {
						this._rewardedVideoAd.load().
						then(() => {
							return this._rewardedVideoAd.show();
						})
						.catch((err) => {
							errorHandler && errorHandler.run();
							RewardedVideoManager.instance.playFailedsHandler && RewardedVideoManager.instance.playFailedsHandler.run();
						});

						this._lastLoadTime = Date.now();
					} else {
						RewardedVideoManager.instance.isLoadFailed = true;
						RewardedVideoManager.instance.loadFailedHandler && RewardedVideoManager.instance.loadFailedHandler.runWith({errMsg: "load promise error"});

						errorHandler && errorHandler.run();
						RewardedVideoManager.instance.playFailedsHandler && RewardedVideoManager.instance.playFailedsHandler.run();
					}
				} else {
					this._rewardedVideoAd.show()
					.catch((err) => {
						errorHandler && errorHandler.run();
						RewardedVideoManager.instance.playFailedsHandler && RewardedVideoManager.instance.playFailedsHandler.run();
					});
				}
			} else {
				RewardedVideoManager.instance.playFailedsHandler && RewardedVideoManager.instance.playFailedsHandler.run();
				return;
			}
		}
	}
}