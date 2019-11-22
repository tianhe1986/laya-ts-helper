/**
* name 
*/
module FatLayaHelper{
	export class AppBoxImplWeb implements AppBoxImpl{

		constructor(){

        }
		
		public create(appBoxId:string):void
		{
			
		}

		public load():void
		{
			
		}

		public show(needLoad: boolean = false, errorHandler: Laya.Handler = null):void
		{
            //直接失败处理
			AppBoxManager.instance.showFailedsHandler && AppBoxManager.instance.showFailedsHandler.run();
		}

        public destroy():void
        {
            
        }
	}
}