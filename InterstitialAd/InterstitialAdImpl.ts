/**
* name 
*/
module FatLayaHelper{
	export interface InterstitialAdImpl{
		show(successHandler: Laya.Handler, failedHandler: Laya.Handler):void;
		getAdId(): string;
	}
}