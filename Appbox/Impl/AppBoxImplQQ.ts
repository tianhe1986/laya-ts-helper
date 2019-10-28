/**
* name 
*/
module FatLayaHelper{
	export class AppBoxImplQQ implements AppBoxImpl{

		private _appBox:any = null;
		
		public create(appBoxId:string):void
		{
			//QQ开发者工具，可以测试盒子广告，不跳过
			let systemInfo = Laya.Browser.window.qq.getSystemInfoSync();
			if (systemInfo.platform === 'devtools') {
				// AppBoxManager.instance.isLoadFailed = true;
				// AppBoxManager.instance.loadFailedHandler && AppBoxManager.instance.loadFailedHandler.run();
				// return;
			}

			this._appBox = Laya.Browser.window.qq.createAppBox({
				adUnitId: appBoxId
			});

			// this._appBox.onLoad(() => {
			// 	//加载成功
			// 	console.log("广告加载成功onLoad")
			// 	AppBoxManager.instance.isLoadFailed = false;
			// 	AppBoxManager.instance.loadSuccessHandler && AppBoxManager.instance.loadSuccessHandler.run();
			// });

			this._appBox.onClose(() =>{
				console.log("广告关闭成成功onClose")
				AppBoxManager.instance.isLoadFailed = null;
				AppBoxManager.instance.closeHandler && AppBoxManager.instance.closeHandler.run();
			});

			this._appBox.offClose((err) =>{
				console.log("广告出错onError")
				AppBoxManager.instance.isLoadFailed = true;
				AppBoxManager.instance.loadFailedHandler && AppBoxManager.instance.loadFailedHandler.run();
			});
		}

		public load():void
		{
			if (this._appBox) {
				this._appBox.load();
			}
		}

		public show(needLoad: boolean = false, errorHandler: Laya.Handler = null):void
		{
			//开发工具，直接失败处理
			//let systemInfo = Laya.Browser.window.qq.getSystemInfoSync();
			// if (systemInfo.platform === 'devtools') {
			// 	AppBoxManager.instance.showFailedsHandler && AppBoxManager.instance.showFailedsHandler.run();
			// 	return;
			// }

			if (this._appBox) {
				if (needLoad) {
					let loadPromise = this._appBox.load();
					if (loadPromise) {
						loadPromise.then(() => {
							return this._appBox.show().then(()=>{
								AppBoxManager.instance.showSuccessHandler && AppBoxManager.instance.showSuccessHandler.run();
							});
						})
						.catch((err) => {
							errorHandler && errorHandler.run();
							AppBoxManager.instance.showFailedsHandler && AppBoxManager.instance.showFailedsHandler.run();
						});
					} else {
						AppBoxManager.instance.isLoadFailed = true;
						AppBoxManager.instance.loadFailedHandler && AppBoxManager.instance.loadFailedHandler.run();

						errorHandler && errorHandler.run();
						AppBoxManager.instance.showFailedsHandler && AppBoxManager.instance.showFailedsHandler.run();
					}
				} else {
					this._appBox.show().then(()=>{
						AppBoxManager.instance.showSuccessHandler && AppBoxManager.instance.showSuccessHandler.run();
					})
					.catch((err) => {
						errorHandler && errorHandler.run();
						AppBoxManager.instance.showFailedsHandler && AppBoxManager.instance.showFailedsHandler.run();
					});
				}
			}
		}

        //销毁盒子广告，销毁后需要重新调用createAppBox()创建实例。
        public destroy():void
        {
            if (this._appBox) {
				this._appBox.destroy();
			}
        }
	}
}