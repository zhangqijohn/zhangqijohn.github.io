<template>
  <div class="app-container">
    <el-card>
      <el-table
      :data="tableData"
      highlight-current-row
      style="width: 100%">
      <el-table-column
        type="index"
        width="100">
      </el-table-column>
      <el-table-column
        property="registe_time"
        label="注册日期"
        width="220">
      </el-table-column>
      <el-table-column
        property="username"
        label="用户姓名"
        width="220">
      </el-table-column>
      <el-table-column
        property="city"
        label="注册地址">
      </el-table-column>
    </el-table>
    </el-card>
    <el-card>
      <el-row>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10,20, 50, 100, 200]"
          :page-size="20"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count">
        </el-pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import {getUserList, getUserCount} from '@/api/getData'
export default {
  name: 'UserList',
  data () {
    return {
      tableData: [{
        registe_time: '2016-05-02',
        username: '王小虎',
        city: '上海市普陀区金沙江路 1518 弄'
      }],
      currentRow: null,
      offset: 0,
      pageSize: 20,
      count: 0,
      currentPage: 1
    }
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      try {
        const countData = await getUserCount()
        if (countData.status == 1) {
          this.count = countData.count
        } else {
          throw new Error('获取数据失败')
        }
        this.getUsers()
      } catch (err) {
        console.log('获取数据失败', err)
      }
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getUsers()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.offset = (val - 1) * this.pageSize
      this.getUsers()
    },
    async getUsers () {
      const Users = await getUserList({offset: this.offset, limit: this.pageSize})
      this.tableData = []
      Users.forEach(item => {
        const tableData = {}
        tableData.username = item.username
        tableData.registe_time = item.registe_time
        tableData.city = item.city
        this.tableData.push(tableData)
      })
    }
  }
}
</script>

<style scoped>

</style>
