<template>
  <div class="bottom-handle">
    <el-pagination
      class="page-handle"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
import { reactive, toRefs } from '@vue/composition-api'
export default {
  props: {
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  setup(props, ctx) {
    const state = reactive({
      currentPage: 1
    })
    const handleCurrentChange = (current) => {
      ctx.emit('currentChange', current)
    }
    const handleSizeChange = (size) => {
      ctx.emit('sizeChange', size)
    }
    return {
      ...toRefs(state),
      handleCurrentChange,
      handleSizeChange
    }
  }
}
</script>
<style lang="scss">
.bottom-handle {
  margin-top: 10px;
  overflow: hidden;
  .page-handle {
    float: right;
  }
}
</style>