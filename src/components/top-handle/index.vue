<template>
  <div class="top-handle">
    <el-button icon="el-icon-plus" type="success" :size="size" v-if="isAdd" @click="add">添加</el-button>
    <el-button icon="el-icon-printer" type="success" :size="size" v-if="isPrint" @click="print">打印</el-button>
    <el-button icon="el-icon-upload2" type="primary" :size="size" v-if="isUpload" @click="upload">导入</el-button>
    <el-button icon="el-icon-download" type="primary" :size="size" v-if="isDownload" @click="download">导出</el-button>
    <el-button icon="el-icon-delete" type="danger" :size="size" v-if="isDel" @click="dels">批量删除</el-button>
    <div class="search" v-if="isSearch">
      <el-input v-model="searchValue" :size="size" placeholder="请输入搜索条件" style="width: 200px;margin-right: 10px;"></el-input>
      <el-button type="primary" icon="el-icon-search" :size="size" @click="search">搜索</el-button>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from '@vue/composition-api'
export default {
  props: {
    isAdd: {
      type: Boolean,
      default: true
    },
    isUpload: {
      type: Boolean,
      default: true
    },
    isDownload: {
      type: Boolean,
      default: true
    },
    isDel: {
      type: Boolean,
      default: true
    },
    isPrint: {
      type: Boolean,
      default: true
    },
    isSearch: {
      type: Boolean,
      default: true
    }
  },
  setup(props, ctx) {
    const state = reactive({
      searchValue: ''
    })
    const dels = () => {
      ctx.emit('delete')
    }
    const download = () => {
      ctx.emit('download')
    }
    const upload = () => {
      ctx.emit('upload')
    }
    const print = () => {
      ctx.emit('print')
    }
    const add = () => {
      ctx.emit('add')
    }
    const search = () => {
      ctx.emit('search', state.searchValue)
    }
    return {
      size: 'small',
      dels,
      download,
      upload,
      print,
      add,
      search,
      ...toRefs(state)
    }
  }
}
</script>
<style lang="scss">
.top-handle {
  margin-bottom: 10px;
  overflow: hidden;
  .search {
    float: right;
  }
}
</style>