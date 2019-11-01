/**
* name 
*/
module FatLayaHelper{
	export class GameRecorderImplBase implements GameRecorderImpl{
		// 实际录屏管理类，不同平台分别实现
		protected recorderInstance: any = null;

		// 录制状态
		protected state: number = 0;

		//视频地址
		protected videoPath:string = "";

		//视频时长
		protected videoDuration:number = 30;

		//录屏开始时间
		protected videoBeginTime:number = 0;

		//是否有剪辑
    	protected hasClip:boolean = false;

		constructor(){
			this.init();
		}

		protected init():void
		{

		}

		public start(duration: number): void
		{

		}

		public stop(): void
		{

		}

		public clear(): void
		{
			
		}

		public pause(): void
		{

		}

		public resume(): void
		{

		}

		public clip(before: number, after: number): void
		{

		}

		public share(successHandler: Laya.Handler, failedHandler: Laya.Handler):void
		{
			failedHandler && failedHandler.runWith(null);
		}
	}
}