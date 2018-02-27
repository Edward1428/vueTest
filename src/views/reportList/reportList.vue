<template>
  <div class="app-container calendar-list-container">
    <!-- Note that row-key is necessary to get a correct row order. -->
    <el-table :data="list" row-key="id"  v-loading.body="listLoading" border highlight-current-row fit stripe style="width: 100%">

      <el-table-column align="center" label="被查询人姓名" width="150">
        <template slot-scope="scope">
          <span>{{scope.row.customer.name}}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="报告日期">
        <template slot-scope="scope">
          <span>{{scope.row.report.created_at | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="查询服务">
        <template slot-scope="scope">
          <span>{{scope.row.service}}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="Author">
        <template slot-scope="scope">
          <span>{{scope.row.nickName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row.report.id)">详情</el-button>
        </template>
      </el-table-column>

    </el-table>

  </div>
</template>

<script>
  import { fetchList } from '@/api/article'
  import Sortable from 'sortablejs'

  export default {
    name: 'dragTable',
    data() {
      return {
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10
        },
        sortable: null,
        oldList: [],
        newList: []
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        this.$http({
          method: 'GET',
          url: '/api/report'
        }).then(response => {
          this.list = response.data.data
          console.log(this.list)
          this.listLoading = false
        })
      },
      edit(id) {
        this.$router.push('/report/' + id)
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
