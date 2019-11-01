/**
* name 
*/
module FatLayaHelper{
	export class RewardedVideoImplQQ implements RewardedVideoImpl{

		private _rewardedVideoAd:any = null;
		
		public create(videoId:string, spId:string):void
		{
			//开发工具，跳过
			let systemInfo = Laya.Browser.window.qq.getSystemInfoSync();
			if (systemInfo.platform === 'devtools') {
				RewardedVideoManager.instance.isLoadFailed = true;
				RewardedVideoManager.instance.loadFailedHandler && RewardedVideoManager.instance.loadFailedHandler.runWith({errMsg: "skip for devtools"});
				return;
			}

			this._rewardedVideoAd = Laya.Browser.window.qq.createRewardedVideoAd({
				adUnitId: videoId
			});

			this._rewardedVideoAd.onLoad(() => {
				//加载成功
				RewardedVideoManager.instance.isLoadFailed = false;
				RewardedVideoManager.instance.loadSuccessHandler && RewardedVideoManager.instance.loadSuccessHandler.run();
			});

			this._rewardedVideoAd.onClose((res) =>{
				RewardedVideoManager.instance.isLoadFailed = null;

				if (res.isEnded) {
					RewardedVideoManager.instance.playSuccessHandler && RewardedVideoManager.instance.playSuccessHandler.run();
				} else {
					RewardedVideoManager.instance.playFailedsHandler && RewardedVideoManager.instance.playFailedsHandler.runWith({errMsg: "close before end"});
				}
				
				//点击关闭会自动拉取下一条，等待即可
			});

			this._rewardedVideoAd.onError((err) =>{
				RewardedVideoManager.instance.isLoadFailed = true;
				RewardedVideoManager.instance.loadFailedHandler && RewardedVideoManager.instance.loadFailedHandler.runWith(err);
			});
		}

		public load():void
		{
			if (this._rewardedVideoAd) {
				this._rewardedVideoAd.load();
			}
		}

		public show(needLoad: boolean = false, errorHandler: Laya.Handler = null):void
		{
			//开发工具，直接失败处理
			let systemInfo = Laya.Browser.window.qq.getSystemInfoSync();
			if (systemInfo.platform === 'devtools') {
				RewardedVideoManager.instance.playFailedsHandler && RewardedVideoManager.instance.playFailedsHandler.runWith({errMsg: "fail for devtools"});
				return;
			}

			if (this._rewardedVideoAd) {
				if (needLoad) {
					let loadPromise = this._rewardedVideoAd.load();
					if (loadPromise) {
						loadPromise.then(() => {
							return this._rewardedVideoAd.show();
						})
						.catch((err) => {
							errorHandler && errorHandler.run();
							RewardedVideoManager.instance.playFailedsHandler && RewardedVideoManager.instance.playFailedsHandler.runWith(err);
						});
					} else {
						RewardedVideoManager.instance.isLoadFailed = true;
						RewardedVideoManager.instance.loadFailedHandler && RewardedVideoManager.instance.loadFailedHandler.runWith({errMsg: "load promise error"});

						errorHandler && errorHandler.run();
						RewardedVideoManager.instance.playFailedsHandler && RewardedVideoManager.instance.playFailedsHandler.runWith({errMsg: "load promise error"});
					}
				} else {
					this._rewardedVideoAd.show()
					.catch((err) => {
						errorHandler && errorHandler.run();
						RewardedVideoManager.instance.playFailedsHandler && RewardedVideoManager.instance.playFailedsHandler.runWith(err);
					});
				}
			} else {
				RewardedVideoManager.instance.playFailedsHandler && RewardedVideoManager.instance.playFailedsHandler.runWith({errMsg: "no rewarded video instance"});
				return;
			}
		}
	}
}