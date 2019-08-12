/**
* name 
*/
module FatLayaHelper{
	export class RewardedVideoImplWeb implements RewardedVideoImpl{
		constructor(){

		}

		public create(videoId:string, spId:string):void
		{
			// 根本创建不了一郎
		}

		public load():void
		{
			// 没有事情做
		}

		public show(needLoad: boolean, errorHandler: Laya.Handler):void
		{
			// 直接失败就好
			RewardedVideoManager.instance.playFailedsHandler && RewardedVideoManager.instance.playFailedsHandler.run();
		}
	}
}