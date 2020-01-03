<template>
  <div>
    <TopHandle @delete="dels" />
    <el-table
      ref="multipleTable"
      border
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="日期"
        width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="del(scope)" :size="sizeBtn" type="danger" icon="el-icon-delete">删除</el-button>
          <el-button @click="del(scope)" :size="sizeBtn" type="primary" icon="el-icon-tickets">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <bottom-handle></bottom-handle>
  </div>
</template>
<script>
import { reactive, toRefs } from '@vue/composition-api'
import TopHandle from '../../components/top-handle'
import BottomHandle from '../../components/bottom-handle'
export default {
  components: {
    TopHandle,
    BottomHandle
  },
  setup() {
    const state = reactive({
      tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
    })
    const del = (row) => {
      window.console.log(row)
    }
    const handleSelectionChange = (selects) => {
      window.console.log(selects)
    }
    const dels = () => {
      window.console.log('sss')
    }
    return {
      ...toRefs(state),
      dels,
      del,
      handleSelectionChange,
      sizeBtn: 'small'
    }
  }
}
</script>
<style lang="scss">
  
</style>