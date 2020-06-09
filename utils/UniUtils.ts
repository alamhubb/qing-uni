import {v4 as uuidv4} from 'uuid'

export default class UniUtils {
  public static delayTime(millisecond: number): Promise<any> {
    return new Promise<any>(resolve =>
      setTimeout(() => {
        resolve()
      }, millisecond))
  }

  public static textCopy(copyText: string) {
    uni.setClipboardData({
      data: copyText
    })
  }

  public static getUUID(): string {
    const randoms: number[] = []
    for (let i = 0; i < 16; i++) {
      randoms.push(Math.round(Math.random() * 255))
    }
    return uuidv4({
      random: randoms
    }).replace(/-/g, '')
  }

  public static upxToPx(rpx: number): number {
    return uni.upx2px(rpx)
  }
}
