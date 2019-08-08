/**
* name 
*/
module FatLayaHelper{
	export interface RewardedVideoImpl{
		create(videoId:string);
		load();
		show(needLoad: boolean, errorHandler: Laya.Handler);
	}
}