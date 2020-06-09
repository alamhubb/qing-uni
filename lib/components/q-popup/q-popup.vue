<template>
    <view class="u-drawer">
        <q-mask v-if="value" @click="input(false)">
            <!--        ios端不支持prevent需要用stop代替-->

        </q-mask>
        <view class="q-popup" :class="popupClass"
              @touchmove.stop.prevent
              @click.stop
        >
            <slot></slot>
        </view>
    </view>

</template>
<script lang="ts">
  import {Vue, Component, Prop, Emit, Model} from 'vue-property-decorator'

  /*
  显示出来已经选了的城市，给她画上钩
  * */
  @Component
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
<style scoped lang="scss">
    .u-drawer {
        /* #ifndef APP-NVUE */
        display: block;
        /* #endif */
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        z-index: 999;
    }

    .u-drawer-content {
        /* #ifndef APP-NVUE */
        display: block;
        /* #endif */
        position: absolute;
        z-index: 1003;
        transition: all 0.3s linear;
    }

    .u-animation-zoom {
        transform: scale(1.15);
    }
</style>
