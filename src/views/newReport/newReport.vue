<template>
  <div class="mixin-components-container">

    <el-row :gutter="24"  type="flex" justify="center" v-loading.body="listLoading" element-loading-text="报告生成中，给我一点时间">
      <el-col :xs="24" :sm="24" :md="12" :lg="10" :xl="6" >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>选择需要的服务</span>
          </div>
          <div>
            <el-form :rules="rules" :model="userInfo" ref="ruleForm">
              <el-form-item prop="serviceList" >

                <el-checkbox-group v-model="userInfo.serviceList">
                  <el-checkbox v-for="option in service" :label="option.id" :key="option.id" border size="medium"
                               style="display:inline-block; margin:10px; " :disabled="option.disabled" v-show="option.show">{{option.name}}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>

              <el-form-item label="姓名" prop="name" label-width="70px">
                <el-input :disabled=disable.nameDisable size="large" placeholder="输入姓名" v-model.trim="userInfo.name">
                  <i slot="prefix"><svg-icon icon-class="people" /></i>
                </el-input>
              </el-form-item>
              <el-form-item label="电话" prop="cell" label-width="70px">
                <el-input :disabled=disable.cellDisable size="large" placeholder="输入手机号码" v-model.trim="userInfo.cell">
                  <i slot="prefix" class="el-input__icon el-icon-phone"></i>
                </el-input>
              </el-form-item>
              <el-form-item label="身份证" prop="idNum" label-width="70px">

                <el-input :disabled=disable.idNumDisable size="large" placeholder="输入身份证号码" v-model.trim="userInfo.idNum">
                  <i slot="prefix"><svg-icon icon-class="language" /></i>
                </el-input>
              </el-form-item>
              <el-form-item label="银行卡" prop="bankId" label-width="70px">
                <el-input :disabled=disable.bankIdDisable size="large" placeholder="输入银行卡号" v-model.trim="userInfo.bankId">
                  <i slot="prefix"><svg-icon icon-class="documentation" /></i>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即生成报告</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import PanThumb from '@/components/PanThumb'
import MdInput from '@/components/MDinput'
import Mallki from '@/components/TextHoverEffect/Mallki'
import DropdownMenu from '@/components/Share/dropdownMenu'
import waves from '@/directive/waves/index.js' // 水波纹指令

export default {
  name: 'componentMixin-demo',
  components: {
    PanThumb,
    MdInput,
    Mallki,
    DropdownMenu
  },
  directives: {
    waves
  },
  data() {
    return {
      listLoading: false,
      service: [
        { id: 1, name: '反诈骗策略引擎', disabled: true, show: false },
        { id: 2, name: '银行卡四要素', disabled: true, show: false },
        { id: 3, name: '手机三要素', disabled: true, show: false },
        { id: 4, name: '手机在网时长', disabled: true, show: false },
        { id: 5, name: '手机在网状态', disabled: true, show: false },
        { id: 6, name: '综合查询', disabled: false, show: true }],
      rules: {
        name: [],
        cell: [],
        idNum: [],
        bankId: []
      },
      userInfo: {
        name: '',
        cell: '',
        idNum: '',
        bankId: '',
        serviceList: []
      },
      able: {
        nameAbleList: [1, 2, 3, 4, 5, 6],
        cellAbleList: [1, 2, 3, 4, 5, 6],
        idNumAbleList: [1, 2, 3, 4, 5, 6],
        bankIdAbleList: [1, 2, 6]
      },
      disable: {
        nameDisable: true,
        cellDisable: true,
        idNumDisable: true,
        bankIdDisable: true
      }
    }
  },
  watch: {
    'userInfo.serviceList': function() {
      var self = this
      var nameList = self.userInfo.serviceList.concat(self.able.nameAbleList)
      var nameListSet = new Set(nameList)
      var cellList = self.userInfo.serviceList.concat(self.able.cellAbleList)
      var cellListSet = new Set(cellList)
      var idNumList = self.userInfo.serviceList.concat(self.able.idNumAbleList)
      var idNumListSet = new Set(idNumList)
      var bankIdList = self.userInfo.serviceList.concat(self.able.bankIdAbleList)
      var bankIdListSet = new Set(bankIdList)
      if (nameListSet.size === nameList.length) {
        this.disable.nameDisable = true
        this.rules.name = []
      } else {
        this.disable.nameDisable = false
        this.rules.name = [{ required: true, message: '请输入姓名', trigger: 'blur' }]
      }
      if (cellListSet.size === cellList.length) {
        this.disable.cellDisable = true
        this.rules.cell = []
      } else {
        this.disable.cellDisable = false
        this.rules.cell = [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { min: 11, max: 11, message: '长度在 11 位' }]
      }
      if (idNumListSet.size === idNumList.length) {
        this.disable.idNumDisable = true
        this.rules.idNum = []
      } else {
        this.disable.idNumDisable = false
        this.rules.idNum = [
          { required: true, message: '请输入身份证号码', trigger: 'blur' },
          { min: 18, max: 18, message: '长度在 18 位', trigger: 'blur' }]
      }
      if (bankIdListSet.size === bankIdList.length) {
        this.disable.bankIdDisable = true
        this.rules.bankId = []
      } else {
        this.disable.bankIdDisable = false
        this.rules.bankId = [
//          { required: true, message: '输入银行卡号', trigger: 'blur' },
//          { min: 16, max: 21, message: '长度在 16 到 21 位', trigger: 'blur' }
          ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      if (this.userInfo.serviceList.length === 0) {
        this.$message({
          message: '请选择至少一项服务',
          type: 'warning'
        })
      } else {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.listLoading = true
            this.$http({
              method: 'POST',
              url: '/api/report',
              data: {
                'customer': this.userInfo,
                'serviceList': this.userInfo.serviceList
              }
            }).then(response => {
              this.listLoading = false
              const result = response.data
              if (result.status === 1) {
                this.$router.push('/report/' + result.data)
              } else {
                alert(result.msg)
              }
            })
          } else {
            return false
          }
        })
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
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
