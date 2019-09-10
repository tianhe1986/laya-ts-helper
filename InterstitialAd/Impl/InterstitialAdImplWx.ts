/**
* name 
*/
module FatLayaHelper{
	export class InterstitialAdImplWx implements InterstitialAdImpl{
		private _adId:string = ""; // 广告id
		private _interstitialAd: any = null; //实际处理的实例

		private _successHandler: Laya.Handler = null; //处理成功的回调

		constructor (adId:string)
		{
			this._adId = adId;
			this._interstitialAd = Laya.Browser.window.wx.createInterstitialAd({
				adUnitId: adId
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