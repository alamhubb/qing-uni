<template>
        <view class="bg-white w100vw bg-top-radius pt-sm">
            <view class="row-between px">
                <view>
                </view>
                <view class="text-lg text-bold">
                    城市
                </view>
                <view @click.stop="showBottomPopup=false">
                    <q-icon size="44" color="text-gray">input</q-icon>
                </view>
            </view>
            <slot>

            </slot>
        </view>
</template>
<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator'
  import QIcon from "components/q-icon/q-icon.vue"

  /*
  显示出来已经选了的城市，给她画上钩
  * */
  @Component({
    components: {QIcon}
  })
  export default class QSheet extends Vue {

  }
</script>
