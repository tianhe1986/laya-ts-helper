module FatLayaHelper{
	export enum Platform {
		WEIXIN = 1,  //微信
		QQ, // QQ
		BAIDU, // 百度
		TOUTIAO, // 头条
		VIVO, // vivo
		WEB, // WEB 为了兼容处理
	}

	export class GlobalConfig{
		public static platform:number = Platform.WEIXIN;
	}
}