/**
* name 
*/
module FatLayaHelper{
	export class AppBoxImplQQ implements AppBoxImpl{

		private _appBox:any = null;
		private _needReload:boolean = false;
		
		public create(appBoxId:string):void
		{
			this._appBox = Laya.Browser.window.qq.createAppBox({
				adUnitId: appBoxId
			});

			this._appBox.onClose(() =>{
				if(this._needReload){
					AppBoxManager.instance.isLoadFailed = null;
					this._needReload = false;
				}
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

		public show(needLoad: boolean = false, reload: boolean):void
		{
			this._needReload = reload;
			if (this._appBox) {
				if (needLoad) {
					let loadPromise = this._appBox.load();
					if (loadPromise) {	//预防出现返回值为空的情况
						loadPromise.then(() => {
							AppBoxManager.instance.loadSuccessHandler && AppBoxManager.instance.loadSuccessHandler.run();
							this._appBox.show().then(()=>{
								AppBoxManager.instance.showSuccessHandler && AppBoxManager.instance.showSuccessHandler.run();
							})
							.catch((err)=>{
								AppBoxManager.instance.showFailedsHandler && AppBoxManager.instance.showFailedsHandler.run();
							})
						})
						.catch((err) => {
							AppBoxManager.instance.isLoadFailed = true;
							AppBoxManager.instance.loadFailedHandler && AppBoxManager.instance.loadFailedHandler.run();
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