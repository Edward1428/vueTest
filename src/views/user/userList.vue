<template>
  <div class="app-container calendar-list-container">
    <!-- Note that row-key is necessary to get a correct row order. -->
    <div class="filter-container">
      <el-row>
        <el-col :span = 4>
          <el-input  class="filter-item" placeholder="用户昵称"  v-model="listQuery.name">
          </el-input>
        </el-col>
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
        <el-button class="filter-item" type="success" icon="el-icon-plus" @click="insertVisible = true">新增用户</el-button>
      </el-row>

    </div>
    <el-table :data="list" row-key="id"  v-loading.body="listLoading" border highlight-current-row fit stripe style="width: 100%">

      <el-table-column align="center" label="账号" >
        <template slot-scope="scope">
          <span>{{scope.row.user.email}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="昵称" >
        <template slot-scope="scope">
          <span>{{scope.row.user.nickName}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="剩余积分">
        <template slot-scope="scope">
          <span>{{scope.row.user.integral}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="总消耗积分">
        <template slot-scope="scope">
          <span>{{scope.row.sumAll}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="总报告">
        <template slot-scope="scope">
          <span>{{scope.row.countAll}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="30天消耗积分">
        <template slot-scope="scope">
          <span>{{scope.row.sumThirty}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="30天报告">
        <template slot-scope="scope">
          <span>{{scope.row.countThirty}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="7天消耗积分">
        <template slot-scope="scope">
          <span>{{scope.row.sumSeven}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="7天报告">
        <template slot-scope="scope">
          <span>{{scope.row.countSeven}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="1天消耗积分">
        <template slot-scope="scope">
          <span>{{scope.row.sumOne}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="1天报告">
        <template slot-scope="scope">
          <span>{{scope.row.countOne}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" >
        <template slot-scope="scope">
          <el-button type="text" @click="$router.push('/admin/report/' + scope.row.user.id)">报告列表</el-button>
          <el-button type="text" @click="edit(scope.$index)">编辑</el-button>
        </template>
      </el-table-column>


    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                     :page-sizes="[5,10,20,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog title="修改用户资料" :visible.sync="dialogFormVisible">
      <el-form label-width="120px">
        <el-form-item label="昵称" >
          <el-input v-model="nickName"  size="medium"></el-input>
        </el-form-item>
        <el-form-item label="修改密码" >
          <el-input v-model="password" size="medium">
          </el-input>
        </el-form-item>
        <el-form-item label="已有积分数" >
          <el-input v-model="integral" :disabled="true" size="medium">
          </el-input>
        </el-form-item>
        <el-form-item label="增加积分" >
          <el-input v-model="addIntegral" size="medium" >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="danger" @click="update()">确认修改</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新增用户" :visible.sync="insertVisible">
      <el-form label-width="120px">
        <el-form-item label="账号" >
          <el-input v-model="insertFrom.email"  size="medium"></el-input>
        </el-form-item>
        <el-form-item label="密码" >
          <el-input v-model="insertFrom.password" size="medium">
          </el-input>
        </el-form-item>
        <el-form-item label="昵称" >
          <el-input v-model="insertFrom.nickName" size="medium">
          </el-input>
        </el-form-item>
        <el-form-item label="初始积分" >
          <el-input v-model="insertFrom.integral" size="medium" >
          </el-input>
        </el-form-item>
        <el-form-item label="头像url" >
          <el-input v-model="insertFrom.headUrl" size="medium" >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="insertVisible = false">取 消</el-button>
        <el-button type="success" @click="insert()">确认新增</el-button>
      </div>
    </el-dialog>


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
        insertVisible: false,
        insertFrom: {
          nickName: '',
          password: '',
          integral: 0,
          headUrl: ''
        },
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
          url: '/api/admin/user/listQuery',
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
      insert() {
        this.$http({
          method: 'POST',
          url: '/api/admin/user',
          data: {
            'email': this.insertFrom.email,
            'password': this.insertFrom.password,
            'nickName': this.insertFrom.nickName,
            'integral': this.insertFrom.integral
          }
        }).then(response => {
          const result = response.data
          alert(result.msg)
        })
        this.insertVisible = false
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
