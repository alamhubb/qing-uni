<template>
    <view class="h100vh">
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
            <swiper class="h100r" :current="swiperCurrent"
                    @change="talkSwiperChange">
                <swiper-item v-for="(item, swiperIndex) in tabs" :key="swiperIndex">
                    <!--<view v-if="swiperIndex === 0">

                    </view>
                    <view v-else>-->
                    <view class="bg-white h100r flex-col">
                        <q-row-line class="mt-sm">
                            <view class="text-bold">
                                当前选择：
                            </view>
                            <view v-if="bottomDistrict" class="row-col-center">
                                <q-icon v-if="bottomDistrict.isPosition" size="30" class="mr-mn" icon="map-fill"/>
                                <view class="text-bold" v-if="bottomDistrict.provinceName">
                                    {{bottomDistrict.provinceName}}
                                </view>
                                <view class="text-bold" v-else>
                                    {{bottomDistrict.adName}}
                                </view>
                                <view v-if="bottomDistrict.cityName" class="text-bold">
                                    - {{bottomDistrict.cityName}}
                                </view>
                                <view v-if="bottomDistrict.districtName" class="text-bold">
                                    - {{bottomDistrict.districtName}}
                                </view>
                            </view>
                        </q-row-line>
                        <view class="mt-sm flex-1 overflow-hidden" v-if="districts && districts.length">
                            <q-picker ref="citySelect" class="bg-white" v-model="bottomDistrict"
                                      :dataList="districts"></q-picker>
                        </view>
                    </view>

                    <!--                    </view>-->
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
  import District from "@/model/District"
  import DistrictAPI from "@/api/DistrictAPI"

  @Component
  export default class IndexVue extends Vue {
    showPopup: boolean = true
    tabs: any [] = ['side', 'pick']
    currentIndex: number = 0
    swiperCurrent: number = 0
    talksListHeightSub: number = SystemInfo.titleHeight
    districts: District[] = []
    bottomDistrict: District = null

    onLoad(){
      //查询所有城市
      DistrictAPI.queryDistrictsAPI().then((res: any) => {
        this.districts = res.data
      })
    }

    //talkSwipe
    talkSwiperChange(e) {
      let current = e.detail.current
      this.swiperCurrent = current
      this.currentIndex = current
    }

    tabsChange(index: number) {
      this.swiperCurrent = index
    }
  }
</script>
