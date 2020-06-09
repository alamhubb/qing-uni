<template>
    <q-mask v-if="value" @click="input(false)">
<!--        ios端不支持prevent需要用stop代替-->
        <view class="q-popup" :class="popupClass"
              @touchmove.stop.prevent
              @click.stop
        >
            <slot></slot>
        </view>
    </q-mask>
</template>
<script lang="ts">
  import {Vue, Component, Prop, Emit, Model} from 'vue-property-decorator'
  import QMask from "components/q-mask/q-mask.vue"

  /*
  显示出来已经选了的城市，给她画上钩
  * */
  @Component({
    components: {QMask}
  })
  export default class QPopup extends Vue {
    //如果是头顶或者底部则不为width100
    @Prop({default: ''}) readonly position: string
    @Prop({default: false}) readonly bottom: boolean
    @Prop({default: false}) readonly top: boolean
    @Model('input') readonly value: boolean

    @Emit()
    input(value: boolean) {
      return value
    }

    created() {
    }

    get popupClass() {
      return this.top ? 'top' : this.bottom ? 'bottom' : this.position
    }
  }
</script>
