<template>
    <view class="h100r">
        <q-navbar>
            <q-tabs :tabs="tabs" v-model="currentIndex" @input="tabsChange">
                <template #default="{tab}">
                    <q-tab>
                        {{ tab }}
                    </q-tab>
                </template>
            </q-tabs>
        </q-navbar>

        <view
                :style="{
              'height':'calc(100vh - '+talksListHeightSub+'px)'
            }"
        >
            <swiper class="flex-none h100r" :current="swiperCurrent"
                    @change="talkSwiperChange">
                <swiper-item v-for="(item, swiperIndex) in tabs" :key="swiperIndex">
                    {{item}}
                    <!--<scroll-view class="h100r" :scroll-y="scrollEnable" @scrolltolower="onreachBottom">
                        &lt;!&ndash; 下拉刷新组件 &ndash;&gt;
                        <block v-for="(talk,index) in homeTypeObjs[swiperIndex].talks" :key="talk.id">
                            <talk-item
                                    :talk="talk"
                                    :home-type="homeType"
                                    @deleteTalk="deleteTalk"
                            />
                            &lt;!&ndash;wx平台显示的广告&ndash;&gt;
                            &lt;!&ndash;  #ifdef MP-WEIXIN &ndash;&gt;
                            <ad class="bg-white mb-5px" v-if="showAd&&showAdIndexList.includes(index)"
                                unit-id="adunit-65c8911d279d228f" ad-type="video" ad-theme="white"></ad>
                            &lt;!&ndash;  #endif &ndash;&gt;

                            &lt;!&ndash;qq平台显示的广告&ndash;&gt;
                            &lt;!&ndash;  #ifdef MP-QQ &ndash;&gt;
                            <ad class="bg-white mb-5px" v-if="showAd&&showAdIndexList.includes(index)"
                                unit-id="bcc21923107071ac3f8aa076c7e00229" type="card"></ad>
                            &lt;!&ndash;  #endif &ndash;&gt;

                            &lt;!&ndash;头条平台显示的广告&ndash;&gt;
                            &lt;!&ndash;  #ifdef MP-TOUTIAO &ndash;&gt;
                            <ad class="bg-white mb-5px" type="banner video large"
                                v-if="showAd&&showAdIndexList.includes(index)"
                                unit-id="3snract0gqnc3fn16d"></ad>
                            &lt;!&ndash;  #endif &ndash;&gt;
                        </block>
                        <uni-load-more :status="homeTypeObjs[swiperIndex].loadMore" @click="queryEnd"></uni-load-more>
                    </scroll-view>-->
                </swiper-item>
            </swiper>
        </view>
    </view>
</template>

<script lang="ts">
  import {
    Vue,
    Component,
    Watch
  } from 'vue-property-decorator'
  import SystemInfo from "../../../../lib/utils/SystemInfo"

  @Component
  export default class IndexVue extends Vue {
    showPopup: boolean = true
    tabs: any [] = ['side', 'pick']
    currentIndex: number = 0
    swiperCurrent: number = 0
    talksListHeightSub: number = SystemInfo.titleHeight

    //talkSwipe
    talkSwiperChange(e) {
      let current = e.detail.current
      this.swiperCurrent = current
      this.current = current
      this.setHomeType()
      //存入store
      //切换时截取其他的只保留后20条
      this.homeTypeObjs.forEach((item, index) => {
        if (index !== current) {
          item.talks = item.talks.slice(-20)
          item.loadMore = LoadMoreType.more
        }
      })
    }
  }
</script>
