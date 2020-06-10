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
              'height':'calc(100vh - '+pageTitleHeight+'px)'
            }"
        >
            <swiper class="h100r" :current="swiperCurrent"
                    @change="talkSwiperChange">
                <swiper-item v-for="(item, swiperIndex) in tabs" :key="swiperIndex" class="col-center">
                    <view v-if="swiperIndex === 0" class="h500px">
                        <q-sidebar :dataList="tagTypes" class="h100r flex-row">
                            <template #leftRow="{item,index,current}">
                                <view class="q-sidebar-item" :class="{'q-sidebar-item-active':index === current}">
                                    <view class="row-all-center flex-auto">
                                        <text class="uni-ellipsis">{{item.name}}</text>
                                    </view>
                                </view>
                            </template>
                            <template #rightRow="{item}">
                                <view class="bg-white">
                                    <view class="q-row">
                                        <q-icon size="32" icon="mdi-circle-medium"
                                                class="text-green margin-right-xs"></q-icon>
                                        <text class="text-bold">{{item.name}}</text>
                                    </view>
                                    <view if="item.childs">
                                        <q-row-item v-for="tag in item.tags" :key="tag.id" @click="change(tag)">
                                            <view class="row-col-center">
                                                <image class="q-avatar radius lg flex-none"
                                                       :src="tag.avatar"
                                                />
                                                <view class="ml-sm overflow-hidden">
                                                    <view>
                                                        {{tag.name}}
                                                    </view>
                                                    <view class="text-gray text-xs text-ellipsis">
                                                        帖子：{{tag.talkCount}}
                                                    </view>
                                                </view>
                                            </view>
                                            <q-icon icon="mdi-chevron-right" size="48" class="text-lg margin-right-sm"
                                                    @click=""
                                            ></q-icon>
                                        </q-row-item>
                                    </view>
                                </view>
                            </template>
                        </q-sidebar>
                    </view>
                    <view v-else class="bg-white h500px flex-col">
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
                            <q-picker class="bg-white" v-model="bottomDistrict"
                                      :dataList="districts"></q-picker>
                        </view>
                    </view>
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
  import SystemInfo from "qing-uni/lib/utils/SystemInfo"
  import District from "@/model/District"
  import DistrictAPI from "@/api/DistrictAPI"
  import TagAPI from "@/api/TagAPI"
  import TagType from "@/model/tag/TagType"
  import Tag from "@/model/tag/Tag"
  import UniUtils from "qing-uni/lib/utils/UniUtils"
  import QRowItem from 'qing-uni/lib/components/q-row-item/q-row-item.vue'
  import QIcon from 'qing-uni/lib/components/q-icon/q-icon.vue'

  @Component({
    components: {
      QRowItem, QIcon
    }
  })
  export default class IndexVue extends Vue {
    tabs: any [] = ['导航', '城市']
    currentIndex: number = 0
    swiperCurrent: number = 0
    pageTitleHeight: number = SystemInfo.titleHeight
    districts: District[] = []
    bottomDistrict: District = null
    tagTypes: TagType[] = []

    onLoad() {
      //查询所有城市
      DistrictAPI.queryDistrictsAPI().then((res: any) => {
        this.districts = res.data
      })
      TagAPI.queryTagTypesAPI().then((res: any) => {
        this.tagTypes = res.data
      })
    }

    tabsChange(index: number) {
      this.swiperCurrent = index
    }

    //talkSwipe
    talkSwiperChange(e) {
      let current = e.detail.current
      this.swiperCurrent = current
      this.currentIndex = current
    }

    change(tag: Tag) {
      UniUtils.toast('选择了：' + tag.name)
    }
  }
</script>
<style lang="scss">
    .h500px {
        height: 500px;
    }
</style>
