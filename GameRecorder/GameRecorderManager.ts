/**
* name 
*/
module FatLayaHelper{
	export class GameRecorderManager{
		// 全局单例
		private static _instance: GameRecorderManager = null;

		// 真正用于处理录屏的实例，不同平台分别实现
		private _gameRecorderImpl: GameRecorderImpl = null;

		// 录屏开始处理回调
		private _startHandler: Laya.Handler = null;

		// 录屏暂停处理回调
		private _pauseHandler: Laya.Handler = null;

		// 录屏继续处理回调
		private _resumeHandler: Laya.Handler = null;

		// 录屏停止处理回调
		private _stopHandler: Laya.Handler = null;

		// 录屏重置处理回调
		private _clearHandler: Laya.Handler = null;

		// 录屏错误处理回调
		private _errorHandler: Laya.Handler = null;

		public static get instance() {
			if (! this._instance) {
				this._instance = new GameRecorderManager();
			}
			return this._instance;
		}

		constructor(){
			switch (GlobalConfig.platform) {
				case Platform.BAIDU:
					this._gameRecorderImpl = new GameRecorderImplBaidu();
					break;
				case Platform.TOUTIAO:
					this._gameRecorderImpl = new GameRecorderImplTT();
					break;
				default:
					this._gameRecorderImpl = new GameRecorderImplWeb();
					break;
			}
		}

		public get startHandler():Laya.Handler
		{
			return this._startHandler;
		}

		public onStart(handler: Laya.Handler):void
		{
			this._startHandler = handler;
		}

		public get stopHandler():Laya.Handler
		{
			return this._stopHandler;
		}

		public onStop(handler: Laya.Handler):void
		{
			this._stopHandler = handler;
		}

		public get clearHandler():Laya.Handler
		{
			return this._clearHandler;
		}

		public onClear(handler: Laya.Handler):void
		{
			this._clearHandler = handler;
		}

		public get pauseHandler():Laya.Handler
		{
			return this._pauseHandler;
		}

		public onPause(handler: Laya.Handler):void
		{
			this._pauseHandler = handler;
		}

		public get resumeHandler():Laya.Handler
		{
			return this._resumeHandler;
		}

		public onResume(handler: Laya.Handler):void
		{
			this._resumeHandler = handler;
		}

		public get errorHandler():Laya.Handler
		{
			return this._errorHandler;
		}

		public onError(handler: Laya.Handler):void
		{
			this._errorHandler = handler;
		}

		// 开始录制
		public startRecord(duration: number = 30):void
		{
			this._gameRecorderImpl.start(duration);
		}

		// 停止录制
		public stopRecord(): void
		{
			this._gameRecorderImpl.stop();
		}

		public clearRecord():void
		{
			this._gameRecorderImpl.clear();
		}

		// 暂停
		public pauseRecord():void
		{
			this._gameRecorderImpl.pause();
		}

		// 继续
		public resumeRecord():void
		{
			this._gameRecorderImpl.resume();
		}

		// 裁剪片段
		public clipRecord(before: number, after: number):void
		{
			this._gameRecorderImpl.clip(before, after);
		}

		// 分享
		public shareRecord(successHandler: Laya.Handler, failedHandler: Laya.Handler = null):void
		{
			this._gameRecorderImpl.share(successHandler, failedHandler);
		}
	}
}