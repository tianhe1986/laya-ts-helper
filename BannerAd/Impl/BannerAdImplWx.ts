/**
* name 
*/
module FatLayaHelper{
	export class BannerAdImplWx implements BannerAdImpl{
		private _bannerAd:any = null;

		constructor(adId:string, style:Object) {
			// 宽高比默认4：1
			let width:number = style["width"];
			if (width < 300) {
				width = 300;
			} else if (width > BannerAdManager.instance.systemInfo.systemWidth) {
				width = BannerAdManager.instance.systemInfo.systemWidth;
			}
			let height:number = style["height"] ? style["height"] : width / 4;
			let left:number = style["left"] ? style["left"] : (BannerAdManager.instance.systemInfo.systemWidth - width)/2;
			let top:number = style["top"] ? style["top"] : (BannerAdManager.instance.systemInfo.systemHeight - height);

			this._bannerAd = Laya.Browser.window.wx.createBannerAd({
				adUnitId: adId,
				style: {
					left: left,
					top: top,
					width: width,
					height: height
				}
			});

			this._bannerAd.onResize((res) => {
				let left:number = style["left"] ? style["left"] : (BannerAdManager.instance.systemInfo.systemWidth - res.width)/2;
				let top:number = style["top"] ? style["top"] : (BannerAdManager.instance.systemInfo.systemHeight - res.height);
				this._bannerAd.style.left = left;
				this._bannerAd.style.top = top;
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