<template>
  <div class="order-container" id="order-step">
    <div class="order-step-container fixed">
      <el-steps :active="active" finish-status="success">
        <el-step title="选择车辆"></el-step>
        <el-step title="选择优惠套餐"></el-step>
        <el-step title="填写其他信息"></el-step>
        <el-step title="填写身份信息"></el-step>
      </el-steps>
    </div>
    <div class="order-body" style="min-width: 600px">
      <transition name="el-zoom-in-top">
        <el-row :gutter="10" id="step-0" v-show="active === 0">
          <car-card
            v-for="car in cars"
            :key="car.carId"
            :car="car"
            v-on:set-car-id="setCarId">
          </car-card>
        </el-row>
      </transition>
      <transition name="el-zoom-in-top">
        <el-row id="step-1" v-show="active === 1">
          <div>
            <el-radio v-model="disCountPackageId" :label="0" border
                      style="width: 100%">
              不使用优惠套餐<span style="float: right">优惠金额 <span style="color: #f0ad4e">0</span>元</span>
            </el-radio>
          </div>
          <div v-for="p in disCountPackages" :key="p.disCountPackageId">
            <el-radio v-model="disCountPackageId" :label="p.disCountPackageId"
                      border style="width: 100%">
              每天优惠租金 {{ p.disCountFee }} 元, 持续 {{ p.day }} 天 (最低租用 {{p.day}} 天)
              <span style="float: right">优惠金额 <span style="color: #f0ad4e">{{p.disCountFee * p.day}}</span>元</span>
            </el-radio>
          </div>
        </el-row>
      </transition>
      <el-form :model="orderForm" ref="orderForm" :rules="rules" label-position="left" label-width="80px" id="myOrder">
        <transition name="el-zoom-in-top">
          <el-row id="step-2" v-show="active === 2">
            <el-row>
              <el-col :span="12">
                <el-form-item label="租车日期" required>
                  <el-date-picker
                    v-model="rentLong"
                    type="daterange"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    range-separator="-"
                    :picker-options="pickerOptions1"
                    start-placeholder="提车日期"
                    end-placeholder="还车日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="租车天数">
                  <el-input placeholder="输入租车天数" v-model="rentDay"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="优惠金额">
              <el-input placeholder="给该客户额外的优惠金额" v-model="orderForm.extraDerate" style="width: 00px"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="phone" required>
              <el-input name="phone" placeholder="请输入联系方式" v-model="orderForm.username"></el-input>
            </el-form-item>
          </el-row>
        </transition>
        <transition name="el-zoom-in-top">
          <el-row id="step-3" v-show="active === 3">' +
            <el-form-item label="基本信息">
              <el-col :span="6">
                <el-form-item prop="idCard.name">
                  <el-input v-model="orderForm.idCard.name" name="idCard.name" placeholder="姓名"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3" :offset="1">
                <el-form-item prop="idCard.sex">
                  <el-input v-model="orderForm.idCard.sex" name="idCard.sex" placeholder="性别"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3" :offset="1">
                <el-form-item prop="idCard.folk">
                  <el-input v-model="orderForm.idCard.folk" name="idCard.folk" placeholder="民族"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-form-item prop="idCard.birthday">
                  <el-date-picker placeholder="生日"
                                  format="yyyy 年 MM 月 dd 日"
                                  value-format="yyyy-MM-dd"
                                  v-model="orderForm.idCard.birthday"
                                  name="idCard.birthday">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="身份证号" prop="idCard.idNumber">
              <el-input placeholder="身份证号" v-model="orderForm.idCard.idNumber" name="idCard.idNumber"></el-input>
            </el-form-item>
            <el-form-item label="家庭住址" prop="idCard.address">
              <el-input placeholder="家庭住址" v-model="orderForm.idCard.address" name="idCard.address"></el-input>
            </el-form-item>
            <el-form-item label="签发机关" prop="idCard.agency">
              <el-input placeholder="签发机关" v-model="orderForm.idCard.agency" name="idCard.agency"></el-input>
            </el-form-item>
            <el-form-item label="有效期限" required>
              <el-col :span="7">
                <el-form-item prop="idCard.expireStart">
                  <el-date-picker placeholder="起始日期"
                                  format="yyyy 年 MM 月 dd 日"
                                  value-format="yyyy-MM-dd"
                                  v-model="orderForm.idCard.expireStart"
                                  name="idCard.expireStart">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="1">至</el-col>
              <el-col :span="7">
                <el-form-item prop="idCard.expireEnd">
                  <el-input placeholder="失效日期" v-model="orderForm.idCard.expireEnd" name="idCardexpireEnd"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-row>
        </transition>
      </el-form>
    </div>
    <div class="order-submit">
      <el-button @click="pre" v-if="active > 0">上一步</el-button>
      <el-button @click="next" v-if="active < 3">下一步</el-button>
      <el-button @click="readCard" v-if="active === 3">读取身份证</el-button>
      <el-button type="primary" @click="submit(orderForm)" v-if="active === 3">提交</el-button>
      <span v-if="active === 2" style="position:fixed;bottom: 20px;right: 20px">预计租金 <span
        class="car-price">{{ fee }}</span> (只含车辆租金)</span>
    </div>
  </div>
</template>

<script>
import CarCard from '@/components/base/CarCard'
import {postRequest,getRequest} from '@/utils/api'

Date.prototype.format = function (format) {
  let o = {
    'M+': this.getMonth() + 1, // month
    'd+': this.getDate(), // day
    'h+': this.getHours(), // hour
    'm+': this.getMinutes(), // minute
    's+': this.getSeconds(), // second
    'q+': Math.floor((this.getMonth() + 3) / 3), // quarter
    'S': this.getMilliseconds() // millisecond
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1,
        RegExp.$1.length === 1 ? o[k]
          : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}

function changeDateFormat (str) {
  let year = str.substring(0, 4)
  let mon = str.substring(4, 6)
  let day = str.substring(6, 8)
  return year + '-' + mon + '-' + day
}

function isValidPhone (phone) {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
  return reg.test(phone)
}

let ws
if (window.WebSocket) {
  let host = 'ws://127.0.0.1:8888'
  ws = new WebSocket(host)
  ws.onopen = function sOpen () {
    console.log('connect success!')
  }
  ws.onerror = function sError (e) {
    console.log('error ' + e)
  }
  ws.onclose = function sClose () {
    ws.close()
  }
} else {
  alert('你的浏览器不支持WebSocket,请使用Chrome或FireFox!')
}
const oneDayTime = 1000 * 60 * 60 * 24

export default {
  name: 'new',
  layout: 'home',
  data () {
    let checkPhone = (rule, value, callback) => {
      if (value === '' || !value) {
        return callback(new Error('手机号不能为空!'))
      } else if (!isValidPhone(value)) {
        return callback(new Error('无效手机号'))
      } else {
        callback()
      }
    }
    return {
      cars: [],
      disCountPackages: [],
      carId: 0,
      disCountPackageId: 0,
      active: 0,
      orderForm: {
        extraDerate: 0,
        username: '',
        idCard: {
          name: '',
          sex: '',
          folk: '',
          birthday: '',
          idNumber: '',
          address: '',
          agency: '',
          expireStart: null,
          expireEnd: ''
        },
        car: null,
        discountPackage: {
          disCountPackageId: 0,
          disCountFee: 0.0,
          day: 0,
          belong: null
        },
        belong: null,
        rentDate: new Date().format('yyyy-MM-dd'),
        returnDate: new Date().format('yyyy-MM-dd')
      },
      IdCard: {
        name: '',
        sex: '',
        folk: '',
        birthday: '',
        idNumber: '',
        address: '',
        agency: '',
        expireStart: '',
        expireEnd: '',
        photo: Object
      },
      rules: {
        username: [
          {validator: checkPhone, trigger: 'change'},
          {required: true, message: '请输入手机号', trigger: 'blur'}
        ],
        'idCard.name': [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ],
        'idCard.sex': [
          {required: true, message: '请输入性别', trigger: 'blur'}
        ],
        'idCard.folk': [
          {required: true, message: '请输入民族', trigger: 'blur'}
        ],
        'idCard.birthday': [
          {required: true, message: '请输入生日', trigger: 'change'}
        ],
        'idCard.idNumber': [
          {required: true, message: '请输入身份证号码', trigger: 'blur'}
        ],
        'idCard.address': [
          {required: true, message: '请输入住址', trigger: 'blur'}
        ],
        'idCard.agency': [
          {required: true, message: '请输入签发机关', trigger: 'blur'}
        ],
        'idCard.expireStart': [
          {required: true, message: '请输入有效期限', trigger: 'change'}
        ],
        'idCard.expireEnd': [
          {required: true, message: '请输入有效期限', trigger: 'blur'}
        ]
      },
      pickerOptions1: {
        disabledDate (d) {
          return d.getTime() < (Date.now() - oneDayTime)
        }
      }
    }
  },
  watch: {
    disCountPackageId: function () {
      if (this.disCountPackageId === 0) {
        this.orderForm.discountPackage.day = 0
        this.orderForm.discountPackage.disCountFee = 0
      } else {
        this.orderForm.discountPackage = this.disCountPackages.find(p => p.disCountPackageId === this.disCountPackageId)
      }
      this.orderForm.returnDate = new Date(
        new Date(this.orderForm.rentDate).getTime() + oneDayTime * this.orderForm.discountPackage.day
      ).format('yyyy-MM-dd')
    }

  },
  computed: {
    fee: function () {
      if (this.orderForm.car !== null) {
        let sCar = this.orderForm.car
        let sDP = this.orderForm.discountPackage
        if (this.disCountPackageId === 0) {
          return sCar.rentFee * this.rentDay - this.orderForm.extraDerate
        }
        return sCar.rentFee * this.rentDay - (sDP.disCountFee * sDP.day) - this.orderForm.extraDerate
      }
      return 0
    },
    rentLong: {
      get: function () {
        return [this.orderForm.rentDate, this.orderForm.returnDate]
      },
      set: function (newDate) {
        this.orderForm.rentDate = newDate[0]
        this.orderForm.returnDate = newDate[1]
      }
    },
    rentDay: {
      get: function () {
        return (new Date(this.orderForm.returnDate).getTime() - new Date(this.orderForm.rentDate).getTime()) / oneDayTime
      },
      set: function (day) {
        this.orderForm.returnDate = new Date(
          new Date(this.orderForm.rentDate).getTime() + oneDayTime * day
        ).format('yyyy-MM-dd')
      }
    }
  },
  created () {
    this.getCars(this.user.userId)
    this.getDisCountPackages(this.user.userId)
  },
  methods: {
    next () {
      if (this.active === 0) {
        if (this.carId === 0) {
          this.$notify({
            'title': '还未选择车辆',
            'message': '必须选择车辆才能进入下一步',
            'type': 'error'
          })
        } else {
          this.active++
        }
      } else {
        this.active++
      }
      if (this.active > 3) this.active = 0
    },
    pre () {
      if (this.active-- < 1) this.active = 0
    },
    submit (formName) {
      this.orderForm.belong = this.user
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let vm = this
          postRequest('/api_v1/order/create_order',this.loginForm)
            .then(function (resp) {
              if (resp.data.code === 0) {
                vm.$notify({
                  title: '成功',
                  message: '订单创建成功!',
                  type: 'success'
                })
                vm.active = 0
              } else {
                vm.$notify({
                  title: '创建失败',
                  message: resp.data.msg,
                  type: 'error'
                })
              }
            })
        } else {
          this.$notify({
            title: '不能提交',
            message: '请完善信息!',
            type: 'error'
          })
          return false
        }
      })
    },
    setCarId (id) {
      this.carId = id
      this.orderForm.car = this.cars.find(c => this.carId === c.carId)
      this.$notify({
        title: '选择成功',
        message: '已选择车辆 ' + this.orderForm.car.type,
        type: 'success'
      })
    },
    getCars (userId) {
      let vm = this
      getRequest('/api_v1/car/all_car?userId=' + userId)
        .then(function (resp) {
          console.log(resp)
          vm.cars = resp.data
        }).catch(function (e) {
          console.log(e)
        })
    },
    getDisCountPackages (userId) {
      let vm = this
      getRequest('/api_v1/discount/get_allDiscount?userId=' + userId)
        .then(function (resp) {
          console.log(resp)
          vm.disCountPackages = resp.data
        }).catch(function (e) {
          console.log(e)
        })
    },
    readCard () {
      let vm = this
      ws.onmessage = sMessage

      function sMessage (msg) {
        let json = JSON.parse(msg.data)
        let act = json['act']
        let data = json['data']
        if (act === 'init') {
          if (data) {
            console.log('初始化成功!')
            ws.send('auth')
          } else {
            vm.$notify({
              'title': '设备未就绪',
              'message': '请检查驱动及设备是否安装好!并刷新页面',
              'type': 'error'
            })
          }
        } else if (act === 'auth') {
          if (data) {
            ws.send('read')
          } else {
            vm.$notify({
              'title': '未放置身份证',
              'message': '请放置身份证, 若已放置请拿起重放!',
              'type': 'warning'
            })
          }
        } else if (act === 'read') {
          if (data === false) {
            vm.$notify({
              'title': '读取失败',
              'message': '读取身份证失败!',
              'type': 'error'
            })
          } else {
            let str = decodeURIComponent(data)
            let info = str.split(',')
            vm.IdCard.name = info[0]
            vm.IdCard.sex = info[1]
            vm.IdCard.folk = info[2]
            vm.IdCard.birthday = changeDateFormat(info[3])
            vm.IdCard.idNumber = info[4]
            vm.IdCard.address = info[5]
            vm.IdCard.agency = info[6]
            vm.IdCard.expireStart = changeDateFormat(info[7])
            if (info[8].length === 8) info[8] = changeDateFormat(info[8])
            vm.IdCard.expireEnd = info[8]
            vm.orderForm.idCard = vm.IdCard
          }
        }
      }

      ws.send('init')
    }
  },
  components: {
    CarCard
  }
}
</script>

<style scoped>

</style>
