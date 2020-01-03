<template>
  <svg :class="iconName ? 'svg-icon ' + iconName : 'svg-icon'" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="'#icon-' + iconClass"/>
  </svg>
</template>
<script>
export default {
  name: 'svg-icon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    iconName: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  margin: 0 6px 0 0;
}
</style>