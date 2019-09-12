/**
* name 
*/
module FatLayaHelper{
	export class BannerAdImplWx implements BannerAdImpl{
		private _bannerAd:any = null;

		constructor(adId:string, style:Object) {
			// 宽高比默认4：1
			let height:number = style["height"] ? style["height"] : style["width"] / 4;
			let left:number = style["left"] ? style["left"] : (BannerAdManager.instance.systemInfo.systemWidth - style["width"])/2;
			let top:number = style["top"] ? style["top"] : (BannerAdManager.instance.systemInfo.systemHeight - height);

			this._bannerAd = Laya.Browser.window.wx.createBannerAd({
				adUnitId: adId,
				style: {
					left: left,
					top: top,
					width: style["width"],
					height: height
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