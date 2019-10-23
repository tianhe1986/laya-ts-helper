/**
* name 
*/
module FatLayaHelper{
	export class BannerAdImplTT implements BannerAdImpl{
		private _bannerAd:any = null;

		constructor(adId:string, style:Object) {
			let width:number = style["width"];
			if (width < 128) {
				width = 128;
			} else if (width > 208) {
				width = 208;
			}
			// 宽高比默认是 16 : 9
			let height:number = width * 9 / 16;
			let left:number = style["left"] ? style["left"] : (BannerAdManager.instance.systemInfo.systemWidth - width)/2;
			let top:number = style["top"] ? style["top"] : (BannerAdManager.instance.systemInfo.systemHeight - height);

			this._bannerAd = Laya.Browser.window.tt.createBannerAd({
				adUnitId: adId,
				style: {
					left: left,
					top: top,
					width: width
				}
			});

			this._bannerAd.onResize((res) => {
				if (res.height <= res.width / 4 || res.width < 128) { //头条极速版会出现height为0，西瓜视频会出现height突然变小这样莫名其妙的问题
					return;
				}
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