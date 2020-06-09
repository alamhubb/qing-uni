<template>
    <view>
        <q-popup v-model="showPopup" bottom>
        </q-popup>

        <view @click="showPopup=true">显示</view>
    </view>
</template>

<script lang="ts">
  import {
    Vue,
    Component,
    Watch
  } from 'vue-property-decorator'

  @Component
  export default class IndexVue extends Vue {
    showPopup: boolean = true
  }
</script>
