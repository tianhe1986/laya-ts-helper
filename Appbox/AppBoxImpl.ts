/**
* name 
*/
module FatLayaHelper{
	export interface AppBoxImpl{
		create(videoId:string);
		load();
		show(needLoad: boolean, errorHandler: Laya.Handler);
        destroy();
	}
}