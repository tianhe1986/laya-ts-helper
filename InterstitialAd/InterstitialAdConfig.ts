/**
* name 
*/
module FatLayaHelper{
	export class InterstitialAdConfig{
		public static globalInterval: number = 0 * 1000; // 全局插屏广告展示间隔时间， 默认为0， 即没有限制。 否则，表示任意一条插屏广告展示后， 再过多久才能再展示任意一条插屏广告
		public static singleInterval: number = 7200 * 1000; // 单个插屏广告展示间隔时间， 默认为两小时。表示某个id的插屏广告展示后，再过多久才能展示同一id的插屏广告
	}
}