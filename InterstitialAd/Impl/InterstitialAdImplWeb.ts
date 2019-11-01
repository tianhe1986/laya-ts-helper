/**
* name 
*/
module FatLayaHelper{
	export class InterstitialAdImplWeb implements InterstitialAdImpl{
		private _adId:string = "";

		constructor (adId:string)
		{
			this._adId = adId;
		}

		public show(successHandler: Laya.Handler, failedHandler: Laya.Handler):void
		{
			//web 直接失败
			failedHandler && failedHandler.runWith({errMsg: "web no interstitial ad"});
		}

		public getAdId():string
		{
			return this._adId;
		}
	}
}