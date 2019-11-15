/**
* AppBoxManager
*/
module FatLayaHelper{
	export class AppBoxManager{
		//全局单例
		private static _instance: AppBoxManager = null;

		// 广告拉取成功时的回调处理
		private _loadSuccessHandler: Laya.Handler = null;
		// 广告拉取失败时的回调处理
		private _loadFailedHandler: Laya.Handler = null;

		// 正常展示时的回调
		private _showSuccessHandler: Laya.Handler = null;

		// 展示失败时的回调
		private _showFailedHandler: Laya.Handler = null;

		//盒子广告关闭时的回调
		private _closeHandler: Laya.Handler = null;

		// 是否加载失败
		private _isLoadFailed: boolean = null;

		// 真正用于处理盒子广告的实例，不同平台分别实现
		private _appBoxImpl: AppBoxImpl = null;

		public static get instance() {
			if (! this._instance) {
				this._instance = new AppBoxManager();
			}
			return this._instance;
		}

		constructor(){
			switch (GlobalConfig.platform) {
				case Platform.QQ:
					this._appBoxImpl = new AppBoxImplQQ();
					break;
				default:
					this._appBoxImpl = new AppBoxImplWeb();
					break;
			}
		}

		public start(loadSuccessHandler: Laya.Handler = null, loadFailedHandler: Laya.Handler = null):void
		{
			this._loadSuccessHandler = loadSuccessHandler;
			this._loadFailedHandler = loadFailedHandler;

			this._appBoxImpl.create(AppBoxConfig.appBoxId);
			Laya.timer.loop(AppBoxConfig.reloadInterval, this, this.reload);
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

		public set closeHandler(handler: Laya.Handler)
		{
			this._closeHandler = handler;
		}

		public get closeHandler(): Laya.Handler
		{
			return this._closeHandler;
		}

		public get showSuccessHandler(): Laya.Handler
		{
			return this._showSuccessHandler;
		}

		public get showFailedsHandler(): Laya.Handler
		{
			return this._showFailedHandler;
		}

		//重新拉取广告
		private reload():void
		{
			if (this._isLoadFailed) {
				this._appBoxImpl.load();
			}
		}

		//展示盒子广告
		public showAppBox(successHandler: Laya.Handler, failedHandler: Laya.Handler = null, closeHandler: Laya.Handler = null):void
		{
			if (this._isLoadFailed) {
				failedHandler && failedHandler.run();
				return;
			}

			this._showSuccessHandler = successHandler;
			this._showFailedHandler = failedHandler;
			this._closeHandler = closeHandler;

			this._appBoxImpl.show(this._isLoadFailed === null);
		}
	}
}