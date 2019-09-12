/**
* name 
*/
module FatLayaHelper{
	export class BannerAdConfig{
		public static destroyCount: number = 3; // 同一ID的广告，展示多少次后，销毁并创建新的
		public static spId:string = ""; // 百度专用，其他平台都不需要这个
	}
}