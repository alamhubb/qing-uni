<template>
    <view :class="[uuid]" class="q-sidebar-box">
        <scroll-view class="flex-none h100r" :scroll-top="leftBoxScrollTop" scroll-y
                     :style="{'width':leftBoxWidth+'rpx'}">
            <view v-for="(item,index) in dataList" :class="[uuid]" class="sidebar-left-item" :key="index"
                  @click="leftMenuClick(index)"
            >
                <slot name="leftRow" v-bind:item="item" v-bind:index="index" v-bind:current="chooseIndex"></slot>
            </view>
        </scroll-view>
        <scroll-view class="flex-auto h100r" :scroll-into-view="rightBoxScrollIntoId" scroll-y
                     @scroll="rightBoxScroll"
                     :style="rightBoxStyle">
            <view v-for="(item,index) in dataList" :class="[uuid]" class="sidebar-right-item"
                  :id="'sidebar-right-'+index"
                  :key="index"
                  :style="{'height': index === dataList.length - 1 ? rightLastHeightPx : ''}"
            >
                <slot name="rightRow" v-bind:item="item"></slot>
            </view>
        </scroll-view>
    </view>
</template>
<script lang="ts">
  import {Vue, Component, Prop, Watch} from 'vue-property-decorator'
  import UniUtils from "../../utils/UniUtils"

  /*
  显示出来已经选了的城市，给她画上钩
  * */

  @Component
  export default class AboutLinkage extends Vue {
    readonly uuid: string = 'u' + UniUtils.getUUID()

    @Prop() readonly dataList: any []
    @Prop({default: 'rgb(250, 250, 250)'}) readonly rightBgColor: string
    @Prop() readonly rightLastItemHeight: string
    @Prop({default: 200}) readonly leftBoxWidth: number
    /**
     * 提前量，提前多少显示到下一个
     */
    @Prop({default: 100}) readonly preShow: number

    /**
     * 控制左侧滚动
     */
    leftBoxScrollTop: number = 0
    /**
     * 当前选中的位置索引
     */
    chooseIndex: number = 0
    /**
     * 控制右侧滚动
     */
    rightBoxScrollIntoId: string = ''

    /**
     * 获取整个元素高度
     */
    componentHeight: number = 0
    /**
     * 记录右侧每个索引对应的滚动位置
     */
    leftItemTops: any[] = []
    /**
     * 记录左侧每个索引对应的滚动位置
     */
    rightItemTops: any[] = []


    mounted() {
      this.initBoxItemTops()
    }

    //传入左侧选中 样式类
    async leftMenuClick(index: number) {
      //如果选中的当前的，则直接返回
      if (index === this.chooseIndex) return
      this.leftScrollToIndex(index)
      //右侧滚动到对应位置
      this.rightBoxScrollIntoId = 'sidebar-right-' + index
    }

    leftScrollToIndex(index: number) {
      //设置当前
      this.chooseIndex = index
      this.leftBoxScrollTop = this.leftItemTops[index]
    }

    @Watch('dataList')
    dataListWatch(o, n) {
      this.initBoxItemTops()
    }

    async rightBoxScroll(e) {
      const scrollTop = e.detail.scrollTop
      const scrollIndex = this.rightItemTops.findIndex((item, index) => {
        const height1 = item
        const height2 = this.rightItemTops[index + 1]
        //这里使用大于等于 是要考虑到第一个为0的情况
        return index === this.rightItemTops.length - 1 || scrollTop >= height1 && scrollTop < height2
      })
      this.leftScrollToIndex(scrollIndex)
    }

    initLeftBoxItemTops() {
      const query: SelectorQuery = uni.createSelectorQuery().in(this)
      //存储左侧菜单需要滚动到的点
      const nodeLeft: NodesRef = query.selectAll('.' + this.uuid + '.sidebar-left-item')
      nodeLeft.boundingClientRect((res: any) => {
        if (!res.length) {
          UniUtils.delayTime(100).then(() => {
            this.initLeftBoxItemTops()
          })
          return
        } else {
          this.leftItemTops = []
          res.forEach(item => {
            //每次滚动到屏幕组件中间的位置
            //当前高度 + 自己本身一半的高度 - 屏幕一半的高度 - 首个元素距离屏幕顶部的高度
            let top = item.top + item.height / 2 - this.componentHeight / 2 - res[0].top
            this.leftItemTops.push(top)
          })
          return
        }
      }).exec()
    }

    //初始化左侧菜单元素滚动高度
    initRightBoxItemTops() {
      const query: SelectorQuery = uni.createSelectorQuery().in(this)
      //存储右侧菜单滚动时的临界点
      const node: NodesRef = query.selectAll('.' + this.uuid + '.sidebar-right-item')
      node.boundingClientRect((res: any) => {
        if (!res.length) {
          UniUtils.delayTime(100).then(() => {
            this.initRightBoxItemTops()
          })
          return
        } else {
          this.rightItemTops = []
          res.forEach((item, index) => {
            //需要减去头一个元素到顶部的距离，因为高度是从顶部0算的
            let top = item.top - res[0].top
            //如果不是第一个，可以设置提前量
            //因为需要和滚动条位置对比，所以不能出现负数
            if (index) {
              const lastItemHeight = res[index - 1].height
              if (this.preShow > lastItemHeight) {
                top = top - lastItemHeight / 2
              } else {
                top = top - this.preShow
              }
            }
            this.rightItemTops.push(top)
          })
          return
        }
      }).exec()
    }

    initBoxItemTops() {
      this.initComponentsHeight()
      this.initRightBoxItemTops()
      this.initLeftBoxItemTops()
    }

    initComponentsHeight() {
      //获取整个组件的高度
      const query: SelectorQuery = uni.createSelectorQuery().in(this)
      const nodeBox: NodesRef = query.select('.' + this.uuid + '.q-sidebar-box')
      nodeBox.boundingClientRect((res) => {
        if (res) {
          this.componentHeight = res.height
        } else {
          UniUtils.delayTime(100).then(() => {
            this.initComponentsHeight()
          })
        }
      }).exec()
    }

    get rightBoxStyle() {
      return {'background-color': this.rightBgColor}
    }


    get rightLastHeightPx() {
      if (this.rightLastItemHeight) {
        return this.rightLastItemHeight
      } else {
        return this.componentHeight
      }
    }
  }
</script>
