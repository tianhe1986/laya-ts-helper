/**
* name 
*/
module FatLayaHelper{
	export class GameRecorderState{
		//录制状态定义
		public static NONE = 0; //未录制
		public static RECORDING = 1; //录制中
		public static PAUSE = 2; //录制暂停
		public static DONE = 3; //录制完成
	}
}