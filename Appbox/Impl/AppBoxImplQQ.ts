/**
* name 
*/
module FatLayaHelper{
	export class AppBoxImplQQ implements AppBoxImpl{

		private _appBox:any = null;
		
		public create(appBoxId:string):void
		{
			this._appBox = Laya.Browser.window.qq.createAppBox({
				adUnitId: appBoxId
			});

			this._appBox.onClose(() =>{
				AppBoxManager.instance.closeHandler && AppBoxManager.instance.closeHandler.run();
			});
		}

		public load():void
		{
			if (this._appBox) {
				this._appBox.load().then(()=>{
					AppBoxManager.instance.loadSuccessHandler && AppBoxManager.instance.loadSuccessHandler.run();
				})
				.catch(()=>{
					AppBoxManager.instance.loadFailedHandler && AppBoxManager.instance.loadFailedHandler.run();
				})
			}
		}

		public show(needLoad: boolean = false):void
		{
			if (this._appBox) {
				if (needLoad) {
					let loadPromise = this._appBox.load();
					if (loadPromise) {
						AppBoxManager.instance.loadSuccessHandler && AppBoxManager.instance.loadSuccessHandler.run();
						loadPromise.then(() => {
							this._appBox.show().then(()=>{
								AppBoxManager.instance.showSuccessHandler && AppBoxManager.instance.showSuccessHandler.run();
							});
						})
						.catch((err) => {
							AppBoxManager.instance.showFailedsHandler && AppBoxManager.instance.showFailedsHandler.run();
						});
					} else {
						AppBoxManager.instance.isLoadFailed = true;
						AppBoxManager.instance.loadFailedHandler && AppBoxManager.instance.loadFailedHandler.run();

						AppBoxManager.instance.showFailedsHandler && AppBoxManager.instance.showFailedsHandler.run();
					}
				} else {
					this._appBox.show().then(()=>{
						AppBoxManager.instance.showSuccessHandler && AppBoxManager.instance.showSuccessHandler.run();
					})
					.catch((err) => {
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