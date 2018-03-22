<template>
  <div class="mixin-components-container">

    <el-row v-loading.body="listLoading" element-loading-text="努力加载中">

      <el-card class="box-card" v-show="false">
        <div class="components-container">
          <code style="color: black">申请信息验证（）</code>

          <el-col :span="6">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>手机三要素</span>
              </div>
              <el-table
                :data="info"
                border stripe
                style="width: 100%" >

                <el-table-column
                  prop="document"
                  label="结果">
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>银行卡四要素</span>
              </div>
              <el-table
                :data="info"
                border stripe
                style="width: 100%" >

                <el-table-column
                  prop="document"
                  label="结果">
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>手机在网时长</span>
              </div>
              <el-table
                :data="info"
                border stripe
                style="width: 100%" >

                <el-table-column
                  prop="document"
                  label="结果">
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>手机手机在网状态</span>
              </div>
              <el-table
                :data="info"
                border stripe
                style="width: 100%" >

                <el-table-column
                  prop="document"
                  label="结果">
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>

        </div>
      </el-card>
      <el-card class="box-card" v-show="false">

        <div class="components-container">
          <code style="color: black">反诈骗策略引擎</code>
          <el-col>
            <el-card>
              <div slot="header" class="clearfix">
                <span>贷前风险汇总</span>
              </div>
              <el-table
                :data="total"
                border stripe
                style="width: 100%" >
                <el-table-column
                  prop="data"
                  label="风险类别" >
                </el-table-column>
                <el-table-column
                  prop="document"
                  label="命中规则">
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
          <el-col>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>客户基础信息</span>
              </div>
              <el-table
                :data="customer"
                border stripe
                style="width: 100%" >
                <el-table-column
                  prop="name"
                  label="姓名" >
                </el-table-column>
                <el-table-column
                  prop="cell"
                  label="电话号码">
                </el-table-column>
                <el-table-column
                  prop="idNum"
                  label="身份证">
                </el-table-column>
                <el-table-column
                  prop="bankId"
                  label="银行卡">
                </el-table-column>
              </el-table>
            </el-card>

          </el-col>
          <el-col >
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>信息关联性</span>
              </div>
              <el-table
                :data="info"
                border stripe
                style="width: 100%" >
                <el-table-column
                  prop="data"
                  label="验证项目">
                </el-table-column>
                <el-table-column
                  prop="document"
                  label="结果">
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
          <el-col>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>最高法执行</span>
              </div>
              <el-table
                :data="court"
                border stripe
                style="width: 100%" >
                <el-table-column
                  prop="num"
                  label="序号">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名">
                </el-table-column>
                <el-table-column
                  prop="casenum"
                  label="执行案号">
                </el-table-column>
                <el-table-column
                  prop="date"
                  label="立案日期">
                </el-table-column>
                <el-table-column
                  prop="money"
                  label="执行标的（元）">
                </el-table-column>
                <el-table-column
                  prop="court"
                  label="执行法院">
                </el-table-column>
                <el-table-column
                  prop="status"
                  label="执行状态">
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
          <el-col>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>失信被执行人信息</span>
              </div>
              <el-table
                :data="bad"
                border stripe
                style="width: 100%" >
                <el-table-column
                  prop="num"
                  label="序号">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名">
                </el-table-column>
                <el-table-column
                  prop="casenum"
                  label="执行案号">
                </el-table-column>
                <el-table-column
                  prop="date"
                  label="立案日期">
                </el-table-column>
                <el-table-column
                  prop="money"
                  label="执行标的（元）">
                </el-table-column>
                <el-table-column
                  prop="court"
                  label="执行法院">
                </el-table-column>
                <el-table-column
                  prop="status"
                  label="被执行人的履行情况">
                </el-table-column>
                <el-table-column
                  prop="action"
                  label="具体情形">
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
          <el-col>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>特殊名单</span>
              </div>
              <el-table
                :data="special"
                border stripe
                style="width: 100%" >
                <el-table-column
                  prop="num"
                  label="序号">
                </el-table-column>
                <el-table-column
                  prop="document"
                  label="项目名称">
                </el-table-column>
                <el-table-column
                  prop="data"
                  label="状态">
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
          <el-col>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>多次信贷申请情况（按身份证查询）</span>
              </div>
              <el-table
                :data="timesById"
                border stripe
                style="width: 100%" >
                <el-table-column
                  prop="num"
                  label="类型">
                </el-table-column>
                <el-table-column
                  prop="1m"
                  label="近1个月">
                </el-table-column>
                <el-table-column
                  prop="3m"
                  label="近3个月">
                </el-table-column>
                <el-table-column
                  prop="6m"
                  label="近6个月">
                </el-table-column>
                <el-table-column
                  prop="12m"
                  label="近12个月">
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
          <el-col >
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>多次信贷申请情况（按手机号查询）</span>
              </div>
              <el-table
                :data="timesByTel"
                border stripe
                style="width: 100%" >
                <el-table-column
                  prop="num"
                  label="类型">
                </el-table-column>
                <el-table-column
                  prop="1m"
                  label="近1个月">
                </el-table-column>
                <el-table-column
                  prop="3m"
                  label="近3个月">
                </el-table-column>
                <el-table-column
                  prop="6m"
                  label="近6个月">
                </el-table-column>
                <el-table-column
                  prop="12m"
                  label="近12个月">
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
        </div>

      </el-card>

      <el-card class="box-card" v-show="show.aliJd">
        <div class="components-container">
          <div class="title-block">综合查询</div>
          <el-col>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>验证结果</span>
              </div>

              <el-row>

                <el-col :span="4">
                  <el-card>
                    <img :src="check.photo" class="image"/>
                  </el-card>
                </el-col>
                <el-col :span="20">
                </el-col>
              </el-row>

            </el-card>
          </el-col>

          <el-col>
            <el-card class="box-card">
              <el-row >
                <el-col :span="8">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span>身份证验证</span>
                    </div>
                    <el-table

                      :show-header="false"
                      :data="check.idCard"
                      border stripe
                      style="width: 100%">

                      <el-table-column
                        prop="msg"
                        label="结果">
                        <template slot-scope="scope">

                          <div style="color: black" v-if="scope.row.color === 1">
                            {{scope.row.msg}}
                          </div>
                          <div style="color: #FF0000" v-else>
                            {{scope.row.msg}}
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-card>
                </el-col>
                <el-col :span="8">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span>手机号验证</span>
                    </div>
                    <el-table
                      :show-header="false"
                      :data="check.cell"
                      border stripe
                      style="width: 100%">

                      <el-table-column
                        prop="msg"
                        label="结果">
                        <template slot-scope="scope">

                          <div style="color: black" v-if="scope.row.color === 1">
                            {{scope.row.msg}}
                          </div>
                          <div style="color: #FF0000" v-else>
                            {{scope.row.msg}}
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-card>
                </el-col>
                <el-col :span="8">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span>银行卡验证</span>
                    </div>
                    <el-table
                      :show-header="false"
                      :data="check.bankCard"
                      border stripe
                      style="width: 100%">

                      <el-table-column
                        prop="msg"
                        label="结果">
                        <template slot-scope="scope">

                          <div style="color: black" v-if="scope.row.color === 1">
                            {{scope.row.msg}}
                          </div>
                          <div style="color: #FF0000" v-else>
                            {{scope.row.msg}}
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-card>
                </el-col>
              </el-row>

            </el-card>
          </el-col>
          <el-col>
            <el-card class="box-card">

              <el-row>
                <el-table

                  :show-header="false"
                  :data="customerTable"
                  style="width: 100%">
                  <el-table-column
                    prop="key"
                    label="信息">
                  </el-table-column>
                  <el-table-column
                    prop="value"
                    label="数据">
                  </el-table-column>
                </el-table>
              </el-row>

            </el-card>
          </el-col>
          <el-col>
            <el-card class="box-card">

              <el-row>
                <el-table

                  :show-header="false"
                  :data="aliJdTable"
                  style="width: 100%">
                  <el-table-column
                    prop="key"
                    label="项目">
                  </el-table-column>
                  <el-table-column
                    prop="value"
                    label="数据">
                    <template slot-scope="scope">

                      <div style="color: #0066FF" v-if="scope.row.color === 1">
                        {{scope.row.value}}
                      </div>
                      <div style="color: #FF0000" v-else-if="scope.row.color === -1">
                        {{scope.row.value}}
                      </div>
                      <div style="color: #0066FF" v-else>
                        {{scope.row.value}}
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>


            </el-card>
          </el-col>


          <el-col>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>详情</span>
              </div>
              <el-table
                :data="blackNameLists"
                border stripe
                style="width: 100%" >

                <el-table-column
                  prop="blackRiskType"
                  label="所属风险类型">
                </el-table-column>
                <el-table-column
                  prop="blackFactsType"
                  label="所属事件类型">
                </el-table-column>
                <el-table-column
                  prop="blackFacts"
                  label="命中事件">
                </el-table-column>
                <el-table-column
                  prop="blackPublishSource"
                  label="备注">
                </el-table-column>
                <el-table-column
                  prop="blackAmt"
                  label="涉案金额">
                </el-table-column>
                <el-table-column
                  prop="blackHappenDate"
                  label="发生时间">
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>

        </div>
      </el-card>


    </el-row>

  </div>
</template>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #d6f9d6;
  }

  .el-table .danger-row {
    background: #ffc2da;
  }
</style>

<script>
import PanThumb from '@/components/PanThumb'
import MdInput from '@/components/MDinput'
import Mallki from '@/components/TextHoverEffect/Mallki'
import DropdownMenu from '@/components/Share/dropdownMenu'
import waves from '@/directive/waves/index.js'
import ElCol from "element-ui/packages/col/src/col"; // 水波纹指令

export default {
  name: 'componentMixin-demo',
  components: {
    ElCol,
    PanThumb,
    MdInput,
    Mallki,
    DropdownMenu
  },
  directives: {
    waves
  },
  data() {
    const validate = (rule, value, callback) => {
      if (value.length !== 6) {
        callback(new Error('请输入六个字符'))
      } else {
        callback()
      }
    }
    return {
      listLoading: true,
      show: {},
      total: [],
      info: [],
      court: [],
      bad: [],
      timesById: [],
      timesByTel: [],
      special: [],
      customer: [],
      customerTable: [],
      blackNameLists: [],
      check: {},
      demo: {
        title: ''
      },
      demoRules: {
        title: [{ required: true, trigger: 'change', validator: validate }]
      },
      aliJdTable: []
    }
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      if (row.color === 0) {
        return 'warning-row';
      } else if (row.color === 1) {
        return '';
      } else if (row.color === -1) {
        return 'danger-row';
      }
      return '';
    }
  },
  toColor(int) {
    if (int === 1) {
      return 'primary'
    } else if (int === -1) {
      return 'danger'
    } else if (int === 0) {
      return 'success'
    } else {
      return ''
    }
  },
  created() {
    var id = this.$route.params.id
    this.listLoading = true
    this.$http.get('/api/report/' + id).then(response => {
      const result = response.data
      if (result.status === 1) {
        this.show = result.data.show
        this.total = result.data.total
        this.info = result.data.info

        this.court = result.data.court
        this.bad = result.data.bad
        this.special = result.data.special
        this.timesById = result.data.timesById
        this.timesByTel = result.data.timesByTel
        this.customer = result.data.customer

        this.customerTable = result.data.customerTable
        this.aliJdTable = result.data.aliJdTable
        this.check = result.data.check
        this.blackNameLists = result.data.blackNameLists
      }
    })
    this.listLoading = false
  }
}
</script>

<style scoped>
.mixin-components-container {
  background-color: #f0f2f5;
  padding: 30px;
  min-height: calc(100vh - 84px);
}
.component-item{
  min-height: 100px;
}
.title-block {
  background: lightskyblue;
  padding: 15px 16px;
  margin-bottom: 20px;
  display: block;
  line-height: 36px;
  font-size: 15px;
  font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
}

.image {
  width: 100%;
  display: block;

}
</style>
