/**
* name 
*/
module FatLayaHelper{
	export class InterstitialAdImplVivo implements InterstitialAdImpl{
		private _adId:string = ""; // 广告id
		private _interstitialAd: any = null; //实际处理的实例

		private _successHandler: Laya.Handler = null; //处理成功的回调

		constructor (adId:string)
		{
			this._adId = adId;

			let info: any = Laya.Browser.window.qg.getSystemInfoSync();

			if (info.platformVersionCode < 1031) { // 不支持插屏广告
				return;
			} 
			
			this._interstitialAd = Laya.Browser.window.qg.createInterstitialAd({
				posId: adId
			});

			//关闭时，调用successHandler，更新下次加载时间
			this._interstitialAd.onClose(() => {
				this._successHandler && this._successHandler.run();
				InterstitialAdManager.instance.updateNextShowTime(this._adId);
			})
		}

		public show(successHandler: Laya.Handler, failedHandler: Laya.Handler):void
		{
			if (this._interstitialAd === null) {
				failedHandler && failedHandler.run();
				return;
			}

			this._successHandler = successHandler;

			this._interstitialAd.show().catch((err) => {
				failedHandler && failedHandler.run();
			});
		}

		public getAdId():string
		{
			return this._adId;
		}
	}
}