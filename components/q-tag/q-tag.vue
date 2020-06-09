<template>
    <view class="q-tag">
        <slot></slot>
    </view>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator'

  @Component
  export default class QTag extends Vue {

  }
</script>
