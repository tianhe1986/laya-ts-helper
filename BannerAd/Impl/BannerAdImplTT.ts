/**
* name 
*/
module FatLayaHelper{
	export class BannerAdImplTT implements BannerAdImpl{
		private _bannerAd:any = null;

		constructor(adId:string, style:Object) {
			// 宽高比默认是 16 : 9
			let height:number = style["width"] * 9 / 16;
			let left:number = style["left"] ? style["left"] : (BannerAdManager.instance.systemInfo.systemWidth - style["width"])/2;
			let top:number = style["top"] ? style["top"] : (BannerAdManager.instance.systemInfo.systemHeight - height);

			this._bannerAd = Laya.Browser.window.tt.createBannerAd({
				adUnitId: adId,
				style: {
					left: left,
					top: top,
					width: style["width"]
				}
			});

			this._bannerAd.onResize((res) => {
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