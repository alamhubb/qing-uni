import UniUtils from "./src/utils/UniUtils"
import SystemInfo from "./src/utils/SystemInfo"

const install = Vue => {
  UniUtils.getSystemInfoSync().then((res) => {
    const resultInfo: GetSystemInfoResult = res
    SystemInfo.systemInfo = resultInfo
    //获取是否苹果平台
    const model: string = resultInfo.model
    const platform: string = resultInfo.platform
    //#ifdef APP-PLUS
    SystemInfo.platform = platform
    // #endif
    // #ifndef APP-PLUS
    UniUtils.getProviderSync().then(res => {
      SystemInfo.platform = res.provider[0] || 'h5'
    })
    // #endif
    if (platform && (platform === 'ios') || model && ((model.indexOf('iPhone') > -1 || model.indexOf('iPad') > -1))) {
      SystemInfo.isIos = true
    }
    SystemInfo.screenHeight = resultInfo.screenHeight
    SystemInfo.windowHeight = resultInfo.windowHeight
    SystemInfo.statusBarHeight = resultInfo.statusBarHeight
    // #ifdef H5
    SystemInfo.titleHeight = SystemInfo.navBarHeight
    // #endif
    // #ifndef H5
    SystemInfo.titleHeight = SystemInfo.statusBarHeight + SystemInfo.navBarHeight
    // #endif
  })
}

export default {
  install
}
