<!-- 登录 -->
<template>
  <div>
    <div class="login-header">
      <img
        alt="logo"
        src="@/assets/login/logo.png"
        width=45
        height=40
      >
      <div class="please"></div>
    </div>
    <div class="login">
      <div class="login-header">
        <el-form
          ref="loginForm"
          :rules="loginRules"
          :model="loginForm"
          label-width="50px"
          class="login-box"
        >
          <h3 class="login-title">登录</h3>
          <el-form-item
            label="账号"
            prop="username"
          >
            <el-input
              type="text"
              placeholder="请输入账号"
              v-model="loginForm.username"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
          >
            <el-input
              type="password"
              placeholder="请输入密码"
              v-model="loginForm.password"
            />
          </el-form-item>
          <div class="tips">{{loginError}}</div>
          <el-button
            :loading="loading"
            type="primary"
            @click="login()"
          >{{loginInfo}}</el-button>
        </el-form>
      </div>
    </div>
    <div class="footer">Copyright © 2004-2019 A+ 版权所有</div>
  </div>
</template>

<script>
export default {
  name: 'LOGIN',
  data() {
    let validateusername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    };
    let validatepassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    };
    return {
      loginForm: {
        username: 'admin',
        password: '111222'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateusername }],
        password: [{ required: true, trigger: 'blur', validator: validatepassword }]
      },
      loading: false,
      loginInfo: '登录',
      loginError: '',
      redirect: undefined,
      otherQuery: {}
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true     //其值是true或false；确认是否以当前的初始值执行handler的函数。
    }
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(value => {
        if (value) {
          this.loading = true;
          this.loginInfo = '登录中'
          this.$store.dispatch('Login', this.loginForm).then(response => {
            if (response.token) {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery });
              this.loading = false
            } else {
              this.loading = false;
              this.loginInfo = '登录'
              this.loginError = '密码错误'

            }
          }).catch(() => {
            this.loading = false;
            this.loginInfo = '登录'
          })
        } else {
          return false
        }
      })

    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang='scss' scoped>
.login-header {
  width: 1000px;
  padding: 15px 0;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  .please {
    // position: absolute;
    // bottom: 0;
    // left: 50px;
    float: left;
    margin-left: 10px;
    width: 110px;
    height: 40px;
    background: url("../../assets/login/please.png") no-repeat 100% 100%;
  }
  img {
    float: left;
  }
}
.login {
  background: url("../../assets/login/login.png") no-repeat 100% 100%;
  background-color: #e52020;
  overflow: hidden;
  height: 475px;
  width: 100%;
}

.login-box {
  float: right;
  border: 1px solid #dcdfe6;
  width: 350px;
  padding: 35px;
  text-align: center;
  background-color: #ffffff;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}

.tips {
  height: 20px;
  font-size: 12px;
  color: #e52020;
  text-align: left;
  padding-left: 50px;
}
.login .el-button {
  width: 100%;
}
.footer {
  text-align: center;
  padding: 30px;
}
</style>