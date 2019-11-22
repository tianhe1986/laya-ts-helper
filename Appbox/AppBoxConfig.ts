/**
* name 
*/
module FatLayaHelper{
	export class AppBoxConfig{
		public static appBoxId:string = ""; // 因为是全局单例，只需要一个id即可。
		public static reloadInterval: number = 60 * 1000; // 当拉取广告失败时， 自动尝试重新拉取的间隔时间，默认1分钟
	}
}