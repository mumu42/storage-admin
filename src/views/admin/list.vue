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
        label="昵称"
        prop="nickname">
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
import { add, getList } from '../../api/admin.js'
import md5 from 'js-md5'
export default {
  name: 'admin',
  components: {
    TopHandle,
    BottomHandle
  },
  setup(props, ctx) {
    const that = ctx.root
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
      add({
        nickname: state.nickname,
        password: md5('123456')
      }).then((res) => {
        let prompt = '新管理员添加成功，默认密码为123456，登录了之后请修改密码~'
        if (res.code !== 200) {
          prompt = '新管理员添加失败，请重试~'
        }
        state.dialogFormVisible = false
        that.$alert(prompt, '提示', {
          confirmButtonText: '确定'
        })
      })
    }
    const del = () => {

    }
    getList().then(res => {
      if (res.code === 200) {
        state.tableData = res.result
      }
    })
    return {
      sizeBtn: 'small',
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