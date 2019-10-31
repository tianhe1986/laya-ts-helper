/**
* name 
*/
module FatLayaHelper{
	export class GameRecorderImplTT extends GameRecorderImplBase{

        protected needClear: boolean = false;

		constructor(){
            super();
		}
        
        protected init(): void
        {
            this.recorderInstance = Laya.Browser.window.tt.getGameRecorderManager();

            // 录制开始事件监听
            this.recorderInstance.onStart((res) => {
                // 记录开始时间
                this.videoBeginTime = (new Date()).valueOf();
                // 转换状态
                this.state = GameRecorderState.RECORDING;
                GameRecorderManager.instance.startHandler && GameRecorderManager.instance.startHandler.run();
            });

            // 录制停止事件监听
            this.recorderInstance.onStop((res) => {
                if (this.needClear) { // 需要清理
                    this.doClear();
                } else { // 正常完成
                    this.state = GameRecorderState.DONE;
                    // 记录文件地址
                    this.videoPath = res.videoPath;

                    if (this.hasClip){ //有剪辑，处理
                        this.clipVideo();
                    }

                    GameRecorderManager.instance.stopHandler && GameRecorderManager.instance.stopHandler.run();
                }
            });

            // 录制暂停事件监听
            this.recorderInstance.onPause((res) => {
                this.state = GameRecorderState.PAUSE;
                GameRecorderManager.instance.pauseHandler && GameRecorderManager.instance.pauseHandler.run();
            });

            // 录制恢复事件监听
            this.recorderInstance.onResume((res) => {
                this.state = GameRecorderState.RECORDING;
                GameRecorderManager.instance.resumeHandler && GameRecorderManager.instance.resumeHandler.run();
            });

            // 错误事件监听
            this.recorderInstance.onError((res) => {
                this.clear();
                GameRecorderManager.instance.errorHandler && GameRecorderManager.instance.errorHandler.runWith(res)
            });
        }



        // 剪辑，生成新的视频
        protected clipVideo():void
        {
            this.recorderInstance.clipVideo({
                path: this.videoPath,
                success: (res) => {
                    this.videoPath = res.videoPath;
                },
                fail: (e) => {

                }
            });
        }

		public start(duration: number): void
		{
            // 当前未在录制状态， 则处理
            switch (this.state) {
                case GameRecorderState.NONE:
                case GameRecorderState.DONE:
                    // 清除剪辑状态
                    this.hasClip = false;

                    this.recorderInstance.start({
                        duration: duration
                    });
                    break;
                default:
                    break;
            }
		}

		public stop(): void
		{
            // 当前在录制状态， 则处理
            switch (this.state) {
                case GameRecorderState.RECORDING:
                case GameRecorderState.PAUSE:
                    let nowTime:number = (new Date()).valueOf();
                    if ((nowTime - this.videoBeginTime > 3000) || this.needClear) { // 头条录屏需要超过三秒
                        this.recorderInstance.stop();
                    } else {
                        this.showTip("录屏需大于3秒");
                    }
                    break;
                default:
                    break;
            }
		}

        public clear(): void
        {
            this.needClear = true;
            // 不在录制或暂停状态，直接清理，否则，调用stop，当停止录制时进行清理
            switch (this.state) {
                case GameRecorderState.RECORDING:
                case GameRecorderState.PAUSE:
                    this.stop();
                    break;
                default:
                    this.doClear();
                    break;
            }
        }

        protected doClear(): void
        {
            this.state = GameRecorderState.NONE;

            this.videoPath = "";

            this.needClear = false;

            GameRecorderManager.instance.clearHandler && GameRecorderManager.instance.clearHandler.run();
        }

		public pause(): void
		{
            this.recorderInstance.pause();
		}

		public resume(): void
		{
            this.recorderInstance.resume();
		}

		public clip(before: number, after: number): void
		{
            this.recorderInstance.recordClip({
                timeRange: [before, after],
                success: (res) => { //剪辑成功
                    this.hasClip = true;
                }
            })
		}

		public share(successHandler: Laya.Handler, failedHandler: Laya.Handler):void
		{
			//检查录制状态和视频地址
            if (this.state != GameRecorderState.DONE || this.videoPath == "") {
                this.showTip("视频未录制完成");
                failedHandler && failedHandler.run();
                return;
            }

            Laya.Browser.window.tt.shareAppMessage({
                channel: 'video',
                title: '分享视频',
                imageUrl: '',
                query: '',
                extra: {
                    videoPath: this.videoPath
                },
                success: () => {
                    this.clear();
                    successHandler && successHandler.run();
                },
                fail: (e) => {
                    if (e.errMsg == "fail video duration is too short") {
                        this.showTip("视频未录制完成");
                    }
                    failedHandler && failedHandler.run();
                }
            })
		}

        protected showTip(tips:string):void
        {
            Laya.Browser.window.tt.showToast({
                title: tips,
                duration: 1500
            });
        }
	}
}