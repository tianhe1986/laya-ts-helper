/**
* name 
*/
module FatLayaHelper{
	export interface AppBoxImpl{
		create(appBoxId:string);
		load();
		show(needLoad: boolean, reload: boolean);
		destroy();
	}
}