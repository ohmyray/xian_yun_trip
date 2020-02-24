<template>
  <el-form :model="form"
           ref="formRef"
           :rules="formRules"
           class="form">

    <el-form-item prop="username"
                  class="form-item">
      <el-input v-model="form.username"
                placeholder="用户名/手机">
      </el-input>
    </el-form-item>

    <el-form-item prop="password"
                  class="form-item">
      <el-input v-model="form.password"
                placeholder="密码"
                type="password">
      </el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button @click="handleLoginSubmit"
               type="primary"
               class="submit">
      登录
    </el-button>
  </el-form>

</template>

<script>
export default {
  data () {
    return {
      // 表单数据
      form: {
        username: "",   // 登录用户名/手机
        password: ""    // 登录密码
      },
      // 表单规则
      formRules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      },
    }
  },
  methods: {
    // 通过 element-ui 表单 validate 验证表单，是否输入。
    // 登录成功后将用户信息存储至vuex及本地
    handleLoginSubmit () {
      this.$refs['formRef'].validate(async (valid) => {
        if (!valid) return this.$message({
          showClose: true,
          message: '请输入用户名或密码yo~',
          type: 'error'
        })
        const { token: res } = await this.$store.dispatch('user/login', this.form)
        if (!res) return false
        this.$router.go(-1) // 回到来登录的页面
      })
    }
  }
}
</script>

<style lang="less" scoped >
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
