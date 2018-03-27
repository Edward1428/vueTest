<template>
  <div class="app-container calendar-list-container">
    <!-- Note that row-key is necessary to get a correct row order. -->
    <!--<div class="filter-container">-->
      <!--<el-row>-->
        <!--<el-col :span = 4>-->
          <!--<el-input  class="filter-item" placeholder="被查人姓名"  v-model="listQuery.name">-->
          <!--</el-input>-->
        <!--</el-col>-->
        <!--<el-col :span = 8>-->
          <!--<el-input  class="filter-item" placeholder="报告编号"  v-model="listQuery.num">-->
          <!--</el-input>-->
        <!--</el-col>-->
        <!--<el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>-->
      <!--</el-row>-->

    <!--</div>-->
    <el-table :data="list" row-key="id"  v-loading.body="listLoading" border highlight-current-row fit stripe style="width: 100%">

      <el-table-column align="center" label="操作人" >
        <template slot-scope="scope">
          <span>{{scope.row.adminName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="被操作人" >
        <template slot-scope="scope">
          <span>{{scope.row.userName}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="影响积分">
        <template slot-scope="scope">
          <span>{{scope.row.integral}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="信息">
        <template slot-scope="scope">
          <span>{{scope.row.msg}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="日期">
        <template slot-scope="scope">
          <span>{{scope.row.created_at | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>

    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                     :page-sizes="[5,10,20,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>


  </div>

</template>

<script>
  import { fetchList } from '@/api/article'
  import Sortable from 'sortablejs'

  export default {
    data() {
      return {
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10,
          name: '',
          num: ''
        },
        sortable: null,
        oldList: [],
        newList: [],
        dialogFormVisible: false,

        userId: '',
        nickName: '',
        password: '',
        integral: '',
        addIntegral: ''
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        this.$http({
          method: 'POST',
          url: '/api/admin/log/listQuery',
          data: this.listQuery
        }).then(response => {
          this.list = response.data.data.list
          this.total = response.data.data.total
          this.listLoading = false
        })
      },
      edit(index) {
        var user = this.list[index].user
        console.log(user)
        console.log(user.nickName)
        this.userId = user.id
        this.nickName = user.nickName
        this.integral = user.integral
        this.dialogFormVisible = true
      },
      update() {
        this.$http({
          method: 'PUT',
          url: '/api/admin/user',
          data: {
            'userId': this.userId,
            'password': this.password,
            'nickName': this.nickName,
            'addIntegral': this.addIntegral
          }
        }).then(response => {
          const result = response.data
          alert(result.msg)
        })
        this.dialogFormVisible = false
      },
      handleFilter() {
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      }
    }
  }
</script>

<style>
  .sortable-ghost{
    opacity: .8;
    color: #fff!important;
    background: #42b983!important;
  }
</style>

<style scoped>
  .icon-star{
    margin-right:2px;
  }
  .drag-handler{
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .show-d{
    margin-top: 15px;
  }
</style>
