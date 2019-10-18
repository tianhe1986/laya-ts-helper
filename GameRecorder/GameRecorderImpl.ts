/**
* name 
*/
module FatLayaHelper{
	export interface GameRecorderImpl{
		start(duration: number): void;
		stop(): void;
		clear(): void;
		pause(): void;
		resume(): void;
		clip(before: number, after: number): void;
		share(successHandler: Laya.Handler, failedHandler: Laya.Handler):void
	}
}