<template>
    <q-popup v-model="showCityPopup" bottom>

    </q-popup>
</template>

<script lang="ts">
  import {Vue, Component, Emit, Model, Watch, Prop} from 'vue-property-decorator'
  import {namespace} from "vuex-class"
  import District from "@/model/District"
  import DistrictUtil from "@/utils/DistrictUtil"
  import BalaBala from "@/utils/BalaBala"

  @Component
  export default class CityPicker extends Vue {
    //页面初始化模块
    @Prop() readonly district: District
    bottomDistrict: District = DistrictUtil.initDistrict
    showCityPopup: boolean = false

    @Model('input') readonly value!: any

    @Watch('value')
    valueWatch() {
      if (this.value) {
        this.open()
      }
    }

    open() {
      this.bottomDistrict = this.district
      this.showCityPopup = true
    }

    close() {
      this.input()
      this.bottomDistrict = this.district
    }

    @Emit()
    input() {
      this.showCityPopup = false
      return false
    }

    @Emit()
    confirm() {
      this.input()
      return this.bottomDistrict
    }

    //如果当前定位是附近则发表后跳转到talk页要查询附近的，发表动态时修改store
    getPosition() {
      DistrictUtil.getCurPositionReq().then((district: District) => {
        this.bottomDistrict = district
        //@ts-ignore
        this.$refs.citySelect.initSelectData()
      }).catch(() => {
        BalaBala.hint('定位功能已关闭，请手动开启')
      })
    }
  }
</script>
