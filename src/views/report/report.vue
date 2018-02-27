<template>
  <div class="mixin-components-container">

    <el-row v-loading.body="listLoading" element-loading-text="努力加载中">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>客户分析报告</span>
        </div>



        <div class="components-container">
          <code style="color: black">贷前风险汇总</code>
          <el-col>
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
          </el-col>
        </div>

      </el-card>
      <el-card class="box-card">
        <div class="components-container">
          <code style="color: black">申请信息验证</code>

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
                  <el-table-column
                    prop="linkManCell"
                    label="联系人号码">
                  </el-table-column>
                  <el-table-column
                    prop="homeAddress"
                    label="家庭地址">
                  </el-table-column>
                </el-table>
              </el-card>

            </el-col>


          <el-col :span="12">
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

          <el-col :span="12">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>手机状态检验</span>
              </div>
              <el-table
                :data="tel"
                border stripe
                style="width: 100%" >
                <el-table-column
                  prop="data"
                  label="检验项">
                </el-table-column>
                <el-table-column
                  prop="document"
                  label="结果">
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
        </div>
      </el-card>

      <el-card class="box-card">

        <div class="components-container">
          <code style="color: black">公检法信息</code>
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
                  label="序号" width="50">
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
                  label="序号" width="50">
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
        </div>

      </el-card>

      <el-card class="box-card">

        <div class="components-container">
          <code style="color: black">金融信息</code>
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
                  label="序号" width="50">
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

          <el-col style="color: #3a835d; height: 50px">
            <span>说明：</span>
          </el-col>


          <el-col :span="12">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>多次信贷申请情况（身份证)</span>
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
          <el-col :span="12">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>多次信贷申请情况（手机号)</span>
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
    </el-row>

  </div>
</template>

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
      total: [],
      info: [],
      tel: [],
      court: [],
      bad: [],
      timesById: [],
      timesByTel: [],
      special: [],
      customer: [],
      demo: {
        title: ''
      },
      demoRules: {
        title: [{ required: true, trigger: 'change', validator: validate }]
      }
    }
  },
  created() {
    var id = this.$route.params.id
    this.listLoading = true
    this.$http.get('/api/report/' + id).then(response => {
      const result = response.data
      if (result.status === 1) {
        this.total = result.data.total
        this.info = result.data.info
        this.tel = result.data.tel
        this.court = result.data.court
        this.bad = result.data.bad
        this.special = result.data.special
        this.timesById = result.data.timesById
        this.timesByTel = result.data.timesByTel
        this.customer = result.data.customer
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
</style>
