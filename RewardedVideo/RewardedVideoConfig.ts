/**
* RewaredVideoConfig 
*/
module FatLayaHelper{
	export class RewardedVideoConfig{
		
		public static videoId:string = ""; // 因为是全局单例，只需要一个id即可
		public static spId:string = ""; // 百度专用，其他平台都不需要这个
		public static reloadInterval: number = 60 * 1000; // 当拉取广告失败时， 自动尝试重新拉取的间隔时间，默认1分钟
	}
}