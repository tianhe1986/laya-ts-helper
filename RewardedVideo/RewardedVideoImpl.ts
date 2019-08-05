/**
* name 
*/
module tianhe1986{
	export interface RewardedVideoImpl{
		create(videoId:string);
		load();
		show(needLoad: boolean);
	}
}