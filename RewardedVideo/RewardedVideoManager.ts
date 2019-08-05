/**
* RewardedVideoManager
*/
module tianhe1986{
	export class RewardedVideoManager{
		//全局单例
		private static _instance: RewardedVideoManager = null;

		// 广告拉取成功时的回调处理
		private _loadSuccessHandler: Laya.Handler = null;
		// 广告拉取失败时的回调处理
		private _loadFailedHandler: Laya.Handler = null;

		// 正常播放结束时的回调
		private _playSuccessHandler: Laya.Handler = null;

		// 播放失败时的回调
		private _playFailedHandler: Laya.Handler = null;

		// 是否加载失败
		private _isLoadFailed: boolean = null;

		// 真正用于处理激励视频的实例，不同平台分别实现
		private _rewardedVideoImpl: RewardedVideoImpl = null;

		public static get instance() {
			if (! this._instance) {
				this._instance = new RewardedVideoManager();
			}
			return this._instance;
		}

		constructor(){

		}

		public start(loadSuccessHandler: Laya.Handler = null, _loadFailedHandler: Laya.Handler = null):void
		{
			this._loadSuccessHandler = loadSuccessHandler;
			this._loadFailedHandler = _loadFailedHandler;

			this._rewardedVideoImpl.create(RewardedVideoConfig.videoId);
			Laya.timer.loop(RewardedVideoConfig.reloadInterval, this, this.reload);
		}

		public set isLoadFailed(val: boolean)
		{
			this._isLoadFailed = val;
		}

		public get isLoadFailed():boolean
		{
			return this._isLoadFailed;
		}

		public set loadSuccessHandler(handler: Laya.Handler)
		{
			this._loadSuccessHandler = handler;
		}

		public get loadSuccessHandler(): Laya.Handler
		{
			return this._loadSuccessHandler;
		}

		public set loadFailedHandler(handler: Laya.Handler)
		{
			this._loadFailedHandler = handler;
		}

		public get loadFailedHandler(): Laya.Handler
		{
			return this._loadFailedHandler;
		}

		public get playSuccessHandler(): Laya.Handler
		{
			return this._playSuccessHandler;
		}

		public get playFailedsHandler(): Laya.Handler
		{
			return this._playFailedHandler;
		}

		//重新拉取广告
		private reload():void
		{
			if (this._isLoadFailed) {
				this._rewardedVideoImpl.load();
			}
		}

		//播放激励视频
		public showVideo(successHandler: Laya.Handler, failedHandler: Laya.Handler = null):void
		{
			if (this._isLoadFailed) {
				failedHandler && failedHandler.run();
				return;
			}

			this._playSuccessHandler = successHandler;
			this._playFailedHandler = failedHandler;

			this._rewardedVideoImpl.show(this._isLoadFailed === null);
		}
	}
}