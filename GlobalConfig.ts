module tianhe1986{
	export enum Platform {
		WEIXIN = 1,  //微信
		QQ, // QQ
		BAIDU, // 百度
		TOUTIAO, // 头条
		VIVO, // vivo
	}

	export class GlobalConfig{
		public static readonly platform:number = Platform.WEIXIN;
	}
}