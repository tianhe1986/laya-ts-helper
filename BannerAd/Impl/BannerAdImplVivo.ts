/**
* name 
*/
module FatLayaHelper{
	export class BannerAdImplVivo implements BannerAdImpl{
		private _bannerAd:any = null;

		constructor(adId:string, style:Object) {
			// 默认底部居中，无法设置
			this._bannerAd = Laya.Browser.window.qg.createBannerAd({
				posId: adId,
				style: {}
			});

			this._bannerAd.onSize((res) => {
				//TODO 
			});
		}

		public show():void
		{
			this._bannerAd && this._bannerAd.show();
		}

		public hide():void
		{
			this._bannerAd && this._bannerAd.hide();
		}

		public destroy():void
		{
			this._bannerAd && this._bannerAd.destroy();
			this._bannerAd = null;
		}
	}
}