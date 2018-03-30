<template>
  <div class="app-container calendar-list-container">
    <!-- Note that row-key is necessary to get a correct row order. -->
    <div class="filter-container">
      <el-row>
        <el-col :span = 4>
          <el-input  class="filter-item" placeholder="被查人姓名"  v-model="listQuery.name">
          </el-input>
        </el-col>
        <el-col :span = 8>
          <el-input  class="filter-item" placeholder="报告编号"  v-model="listQuery.num">
          </el-input>
        </el-col>
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
        <el-button class="filter-item" type="primary" @click="handleDownload">Export Excel</el-button>
      </el-row>

    </div>
    <el-table :data="list" row-key="id"  v-loading.body="listLoading" border highlight-current-row fit stripe style="width: 100%">

      <el-table-column align="center" label="报告编号" >
        <template slot-scope="scope">
          <span>{{scope.row.report.num}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="被查询人姓名" >
        <template slot-scope="scope">
          <span>{{scope.row.report.name}}</span>
        </template>
      </el-table-column>

      <el-table-column  align="center" label="报告日期">
        <template slot-scope="scope">
          <span>{{scope.row.report.created_at | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>

      <el-table-column  label="查询服务">
        <template slot-scope="scope">
          <span>{{scope.row.service}}</span>
        </template>
      </el-table-column>

      <el-table-column  align="center" label="Author">
        <template slot-scope="scope">
          <span>{{scope.row.nickName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button type="text" @click="$router.push('/report/' + scope.row.report.id)">详情</el-button>
          <el-button type="text" @click="open2(scope.$index)">删除</el-button>
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
  import { parseTime } from '@/utils'

  export default {
    data() {
      return {
        list: null,
        customerList: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10,
          name: '',
          num: '',
          userId: ''
        },
        sortable: null,
        oldList: [],
        newList: [],
        visible2: false,
      }
    },
    created() {
      this.getList()
      this.getCustomer()
    },
    methods: {
      open2(index) {
        const report = this.list[index].report
        this.$confirm('永久删除 ' + report.name + ' 的报告是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            method: 'DELETE',
            url: '/api/admin/report/' + report.id,
          }).then(response => {
            const status = response.data.status
            if (status === 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            } else {
              this.$message({
                type: 'danger',
                message: '删除失败，找不到报告'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      getList() {
        this.listQuery.userId = this.$route.params.userId
        this.listLoading = true
        this.$http({
          method: 'POST',
          url: '/api/report/listQuery',
          data: this.listQuery
        }).then(response => {
          this.list = response.data.data.list
          this.total = response.data.data.total
          this.listLoading = false
        })
      },
      getCustomer() {
        this.$http({
          method: 'GET',
          url: '/api/admin/customer/' + this.$route.params.userId
        }).then(response => {
          this.customerList = response.data.data
        })
      },
      edit(id) {
        this.$router.push('/report/' + id)
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
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'created_at') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      },
      handleDownload() {
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['name', 'idNum', 'cell', 'bankId', 'created_at']
          const filterVal = ['name', 'idNum', 'cell', 'bankId', 'created_at']
          const list = this.customerList
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel(tHeader, data, '汇总')
        })
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
