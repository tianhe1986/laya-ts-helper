/**
* RewardedVideoManager
*/
module tianhe1986{
	export class RewardedVideoManager{
		//全局单例
		private static _instance: RewardedVideoManager = null;

		public static get instance() {
			if (! this._instance) {
				this._instance = new RewardedVideoManager();
			}
			return this._instance;
		}

		constructor(){

		}
	}
}