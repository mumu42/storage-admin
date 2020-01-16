<template>
  <div>
    <top-handle @add="addAdmin" />
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="昵称">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="del(scope)" :size="sizeBtn" type="danger" icon="el-icon-delete">禁用</el-button>
          <el-button @click="del(scope)" :size="sizeBtn" type="primary" icon="el-icon-tickets">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <bottom-handle/>

    <el-dialog title="添加管理员" :visible.sync="dialogFormVisible">
      <el-input v-model="nickname" placeholder="请输入新管理员的昵称" autocomplete="off"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNewAdmin">添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import TopHandle from '../../components/top-handle'
import BottomHandle from '../../components/bottom-handle'
import { toRefs, reactive } from '@vue/composition-api'
export default {
  name: 'admin',
  components: {
    TopHandle,
    BottomHandle
  },
  setup() {
    const state = reactive({
      nickname: '',
      tableData: [],
      dialogFormVisible: false
    })
    const addAdmin = () => {
      state.dialogFormVisible = true
    }
    const handleSelectionChange = () => {

    }
    const addNewAdmin = () => {

    }
    const del = () => {

    }
    return {
      addAdmin,
      addNewAdmin,
      del,
      handleSelectionChange,
      ...toRefs(state)
    }
  }
}
</script>
<style lang="scss">
  
</style>