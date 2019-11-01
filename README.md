# laya-ts-helper
一些帮助库 for Layabox，typescript版

# Banner广告
只需要传入宽度，广告展示方式为底部居中对齐。

之后的版本会增加自定义位置及自定义resize回调处理。使用步骤如下：
1. 展示时用:
```
let adId:string = XXXX;
let width = XXXX;
FatLayaHelper.BannerAdManager.instance.showBanner(adId, width);
```

注意这里的width是是以逻辑像素为单位的宽度。

2. 隐藏时用：
```
let adId:string = XXXX;
FatLayaHelper.BannerAdManager.instance.hideBanner(adId);
```

# 激励视频播放管理
目前接入的各小游戏平台(微信,QQ,百度,头条,vivo), 激励视频都是全局单例, 因此也只需要管理一个实例即可。使用步骤如下：
1. 将`GlobalConfig.ts`和`RewardedVideo`文件夹拷贝至项目源码目录中，建议新建一个`Helper`文件夹用于放置。
2. 更改配置，有如下两项：
    * `GlobalConfig.ts`。修改`platform`变量，用于指定使用的平台。
    * `RewardedVideo/RewardedVideoConfig.ts`， 填写激励视频ID`videoId`。如果是百度平台，还需要填`spId`。`reloadInterval`是加载失败时，尝试重新加载的间隔时间，可根据需要进行调整。激励视频ID也可以动态设置，但是要在初始化之前才行。
3. 初始化激励视频
```
let loadSuccessHandler = Laya.Handler.create(this, () => {
    
}, [], false);

let loadFailedHandler = Laya.Handler.create(this, (err) => {
    console.log(err);
}, [], false);

FatLayaHelper.RewardedVideoManager.instance.start(loadSuccessHandler, loadFailedHandler);
```

start函数的定义如下:
```
public start(loadSuccessHandler: Laya.Handler = null, loadFailedHandler: Laya.Handler = null):void
```

`loadSuccessHandler`是激励视频拉取成功时的回调函数，`loadFailedHandler`是激励视频拉取失败时的回调函数,会带上错误信息进行回调。

4. 在需要播放激励视频时调用
```
let successHandler:Laya.Handler = Laya.Handler.create(this, () => {
    
});

let failHandler:Laya.Handler = Laya.Handler.create(this, (err) => {
    console.log(err);
});

let errorHandler = Laya.Handler.create(this, (err) => {
    console.log(err);
});

FatLayaHelper.RewardedVideoManager.instance.showVideo(successHandler, failHandler, errorHandler);
```

showVideo函数定义如下：
```
public showVideo(successHandler: Laya.Handler, failedHandler: Laya.Handler = null, errorHandler: Laya.Handler = null):void
```

`successHandler`是成功播放结束后的回调，`failedHandler`是未播放结束后的回调， `errorHandler`是播放出错时的回调。有以下三种情况：
* 用户完整观看了视频，会调用`successHandler`。
* 用户未完整观看，提前关闭，会调用`failedHandler`。
* 播放视频发生错误。会调用`errorHandler`和`failedHandler`。

# 插屏广告
目前暂时只看到微信和vivo支持插屏广告， 其他平台会在之后陆续增加。使用步骤如下：
1. 将`GlobalConfig.ts`和`InterstitialAd`文件夹拷贝至项目源码目录中，建议新建一个`Helper`文件夹用于放置。
2. 更改配置，有如下两项：
    * `GlobalConfig.ts`。修改`platform`变量，用于指定使用的平台。
    * `InterstitialAd/InterstitialAd.ts`。修改`globalInterval`变量，用于指定全局的展示间隔时间，即展示一条后，再过多久，下一条才可以展示。`singleInterval`指定单条广告的
    间隔时间，即同一ID的广告，展示一条后，再过多久才可以展示下一条。
3. 在需要展示插屏广告时调用
```
let successHandler:Laya.Handler = Laya.Handler.create(this, () => {
    
});

let failHandler:Laya.Handler = Laya.Handler.create(this, (err) => {
    console.log(err);
});

let adId:string = "XXXXXX";
FatLayaHelper.InterstitialAdManager.instance.showInterstitial(adId, successHandler, failHandler);
```

showInterstitial函数定义如下：
```
public showInterstitial(adId:string, successHandler: Laya.Handler, failedHandler: Laya.Handler = null):void
```

`adId`是相应的广告ID，`successHandler`是展示成功后的回调， `failedHandler`是展示失败时的回调。

# 录屏处理
目前暂时只有头条和百度支持录屏。使用步骤如下：
1. 将`GlobalConfig.ts`和`GameRecorder`文件夹拷贝至项目源码目录中，建议新建一个`Helper`文件夹用于放置。
2. 根据需要初始化监听事件，示例如下：
```
// 监听录屏开始事件
FatLayaHelper.GameRecorderManager.instance.onStart(Laya.Handler.create(this, () => {
    
}, [], false));

// 监听录屏停止（完成）事件
FatLayaHelper.GameRecorderManager.instance.onStop(Laya.Handler.create(this, () => {
    
}, [], false));

// 监听录屏清除事件，清除是指停止当前录制，同时也清空已经录制的视频地址
FatLayaHelper.GameRecorderManager.instance.onClear(Laya.Handler.create(this, () => {
    
}, [], false));

// 监听录屏暂停事件
FatLayaHelper.GameRecorderManager.instance.onPause(Laya.Handler.create(this, () => {
    
}, [], false));

// 监听录屏恢复事件
FatLayaHelper.GameRecorderManager.instance.onResume(Laya.Handler.create(this, () => {
    
}, [], false));

// 监听录屏错误事件
FatLayaHelper.GameRecorderManager.instance.onError(Laya.Handler.create(this, (err) => {
    console.log(err);
}, [], false));
```

3. 开始录屏
```
let duration = 30; // 录屏时间，单位为秒
FatLayaHelper.GameRecorderManager.instance.startRecord(duration);
```

4. 录屏期间的操作，如暂停，恢复，裁剪片段
```
// 暂停
FatLayaHelper.GameRecorderManager.instance.pauseRecord();

// 继续
FatLayaHelper.GameRecorderManager.instance.resumeRecord();

// 裁剪片段，以调用时的录屏时刻为基准，指定前x秒，后y秒为将要裁剪的片段
let x = 2;
let y = 3;
FatLayaHelper.GameRecorderManager.instance.clipRecord(x, y);
```

5. 停止录屏
```
FatLayaHelper.GameRecorderManager.instance.stopRecord();
```

6. 录屏分享，分享成功后会自动清除
```
// 分享成功回调
let successCallback: Laya.Handler = Laya.Handler.create(this, () => {
    
});

// 分享失败回调
let failCallback: Laya.Handler = Laya.Handler.create(this, (err) => {
    console.log(err);
});

FatLayaHelper.GameRecorderManager.instance.shareRecord(successCallback, failCallback);
```
