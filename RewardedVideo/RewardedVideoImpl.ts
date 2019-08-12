/**
* name 
*/
module FatLayaHelper{
	export interface RewardedVideoImpl{
		create(videoId:string):void;
		load():void;
		show(needLoad: boolean, errorHandler: Laya.Handler):void;
	}
}