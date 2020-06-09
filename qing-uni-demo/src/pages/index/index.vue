<template>
    <view>
        {{showPopup}}
        <q-popup>

        </q-popup>
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
