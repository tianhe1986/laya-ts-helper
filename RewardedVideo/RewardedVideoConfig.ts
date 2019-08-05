/**
* RewaredVideoConfig 
*/
module tianhe1986{
	export class RewardedVideoConfig{
		
		public static videoId:string = ""; // 因为是全局单例，只需要一个id即可
		public static reloadInterval: number = 300; // 当拉取广告失败时， 自动尝试重新拉取的间隔时间，默认5分钟
	}
}