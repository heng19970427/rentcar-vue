<template>
  <div class="login-container">
    <div class="bg1"></div>
    <div class="bg2"></div>
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      label-position="left"
      label-width="0px">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="phone">
        <el-input
          type="text"
          v-model="loginForm.username"
          auto-complete="off"
          placeholder="用户名"/>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          auto-complete="off"
          placeholder="密码"/>
      </el-form-item>
      <el-checkbox
        v-model="checked"
        checked
        class="remember">记住密码</el-checkbox>
      <p
        v-if="error"
        class="error">账号或密码错误</p>
      <el-form-item style="width:100%;">
        <el-button
          type="primary"
          style="width:100%;"
          @click.native.prevent="login"
          :loading="logining">登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
import {postRequest} from '@/utils/api'

export default {
  name: 'login',
  layout: 'default',
  data () {
    return {
      logining: false,
      error: false,
      loginForm: {
        username: 'xiaoliu',
        password: '123'
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      checked: true
    }
  },
  methods: {
    login () {
      const _this = this
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          _this.loginReq()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    loginReq () {
      const _this = this
      this.logining = true
      postRequest('/seller/login', this.loginForm)
        .then(res => {
          console.log(res.status)
          if (res.status === 200) {
            postRequest('/login/getCurrentUser')
              .then(res => {
                _this.$store.dispatch('SET_USER', res.data)
                _this.$router.push({name: '首页'})
              })
              .catch(error => { console.error(error) })
          } else {
            _this.$message.error('登录失败,请检查用户名和密码!')
          }
        })
        .catch(error => {
          _this.$message.error('网络错误: ' + error.message)
        })
        .finally(() => { _this.logining = false })
    }
  }
}
</script>

<style scoped>
  .bg1 {
    position: fixed;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    -webkit-clip-path: polygon(88% 82%, 100% 34%, 100% 100%, 0 100%);
    clip-path: polygon(88% 82%, 100% 34%, 100% 100%, 0 100%);
    background-color: #41b883;
  }
  .bg2 {
    position: fixed;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    -webkit-clip-path: polygon(83% 71%, 100% 34%, 100% 100%, 0 100%);
    clip-path: polygon(83% 71%, 100% 34%, 100% 100%, 0 100%);
    background-color: #35495e;
  }
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
  .error {
    color: red;
  }
</style>
