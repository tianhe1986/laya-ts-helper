# laya-ts-helper
一些帮助库 for Layabox，typescript版

# 激励视频播放管理
目前接入的各小游戏平台(微信,QQ,百度,头条,vivo), 激励视频都是全局单例, 因此也只需要管理一个实例即可。使用步骤如下：
1. 将`GlobalConfig.ts`和`RewardedVideo`文件夹拷贝至项目源码目录中，建议新建一个`Helper`文件夹用于放置。
2. 更改配置，有如下两项：
    * `GlobalConfig.ts`。修改`platform`变量，用于指定使用的平台。
    * `RewardedVideo/RewardedVideoConfig.ts`， 填写激励视频ID`videoId`。如果是百度平台，还需要填`spId`。`reloadInterval`是加载失败时，尝试重新加载的间隔时间，可根据需要进行调整。激励视频ID也可以动态设置，但是要在初始化之前才行。
3. 初始化激励视频
```
let loadSuccessHandler = XXXX;
let loadFailedHandler = XXXX;
FatLayaHelper.RewardedVideoManager.instance.start(loadSuccessHandler, loadFailedHandler);
```

start函数的定义如下:
```
public start(loadSuccessHandler: Laya.Handler = null, loadFailedHandler: Laya.Handler = null):void
```

`loadSuccessHandler`是激励视频拉取成功时的回调函数，`loadFailedHandler`是激励视频拉取失败时的回调函数。

4. 在需要播放激励视频时调用
```
let successHandler:Laya.Handler = XXX;
let failHandler:Laya.Handler = XXX;
let errorHandler = XXX;

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
let successHandler:Laya.Handler = XXX;
let failHandler:Laya.Handler = XXX;

let adId:string = XXXX;
FatLayaHelper.InterstitialAdManager.instance.showInterstitial(adId, successHandler, failHandler);
```

showInterstitial函数定义如下：
```
public showInterstitial(adId:string, successHandler: Laya.Handler, failedHandler: Laya.Handler = null):void
```

`adId`是相应的广告ID，`successHandler`是展示成功后的回调， `failedHandler`是展示失败时的回调。