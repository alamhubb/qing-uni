<template>
    <view class="w100r">
        <view class="q-nav-bar">
            <!--            此处为状态栏-->
            <view class="w100r" :style="{ height: statusBarHeight + 'px' }"></view>
            <!--            此处为导航栏-->
            <view class="row-col-center" :style="[navbarInnerStyle]">
                <slot></slot>
            </view>
        </view>

        <!-- 解决fixed定位后导航栏塌陷的问题 -->
        <view :style="{width: '100%',height: Number(height) + statusBarHeight + 'px'}">
        </view>
    </view>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from 'vue-property-decorator'
  import SystemInfo from "../../utils/SystemInfo"

  // 如果是小程序，获取右上角胶囊的尺寸信息，避免导航栏右侧内容与胶囊重叠(支付宝小程序非本API，尚未兼容)
  let menuButtonInfo: GetMenuButtonBoundingClientRectRes
  // #ifdef MP
  menuButtonInfo = uni.getMenuButtonBoundingClientRect() || null
  // #endif
  /*
  显示出来已经选了的城市，给她画上钩
  * */
  @Component
  export default class QNavBar extends Vue {
    statusBarHeight: number = SystemInfo.statusBarHeight
    @Prop({default: SystemInfo.navBarHeight}) readonly height: number

    mounted() {
      this.statusBarHeight = SystemInfo.statusBarHeight
    }

    get navbarInnerStyle() {
      let style: any = {}
      // 导航栏宽度，如果在小程序下，导航栏宽度为胶囊的左边到屏幕左边的距离
      style.height = this.height + 'px'
      // // 如果是各家小程序，导航栏内部的宽度需要减少右边胶囊的宽度
      // #ifdef MP
      //右侧margin为胶囊宽度+15
      let rightButtonWidth = menuButtonInfo.width + 15
      // #ifdef MP-QQ
      //qq时额外15，因为qq开发者工具调试时数值有问题
      rightButtonWidth = rightButtonWidth + 15
      // #endif
      style.marginRight = rightButtonWidth + 'px'
      // #endif
      return style
    }
  }
</script>
