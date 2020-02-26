<template>
  <el-form :model="form"
           ref="form"
           :rules="formRules"
           class="form">
    <!-- 用户名 -->
    <el-form-item prop="username"
                  class="form-item">
      <el-input v-model="form.username"
                placeholder="用户名手机">
      </el-input>
    </el-form-item>

    <!-- 验证码 -->
    <el-form-item prop="captcha"
                  class="form-item">
      <el-input v-model="form.captcha"
                placeholder="验证码">
        <template slot="append">
          <el-button @click="handleSendCaptcha"
                     :disabled="sendCaptcha">
            {{ form.username.length === 0 ? nowSend :nowSend}}
          </el-button>
        </template>
      </el-input>
    </el-form-item>

    <!-- 昵称 -->
    <el-form-item prop="nickname"
                  class="form-item">
      <el-input v-model="form.nickname"
                placeholder="你的名字">
      </el-input>
    </el-form-item>

    <!-- 密码 -->
    <el-form-item prop="password"
                  class="form-item">
      <el-input v-model="form.password"
                placeholder="密码"
                type="password"></el-input>
    </el-form-item>
    <!-- 确认密码 -->
    <el-form-item prop="checkPassword"
                  class="form-item">
      <el-input v-model="form.checkPassword"
                placeholder="确认密码"
                type="password">
      </el-input>
    </el-form-item>

    <!-- 注册 -->
    <el-button class="submit"
               type="primary"
               @click="handleRegSubmit">
      注册
    </el-button>

  </el-form>
</template>

<script>
export default {
  data () {

    // 验证手机号码
    const validateUsername = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请再次手机号码"));
      } else if (/^ 1[3 - 9][0 - 9]{ 9 } $ /.test(value) == false) { // 判断是否是手机号码的正则
        callback(new Error("手机号码格式错误"))
      } else {
        callback()
      }
    }

    // rule当前的规则（可忽略）
    // value是输入框的值
    // callback 比如要执行，如果传入一个错误的对象，当前的字段就会报错
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"))
      } else {
        if (this.form.checkPassword !== "") {
          // 验证和确认密码是否一致, 手动触发确认密码验证
          this.$refs.form.validateField("checkPassword")
        }
        callback()
      }
    }

    // 验证确认密码
    // rule当前的规则（可忽略）
    // value是输入框的值
    // callback 比如要执行，如果传入一个错误的对象，当前的字段就会报错
    const validateCheckPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"))
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"))
      } else {
        callback()
      }
    }

    return {
      // 控制发送验证按钮是否禁用
      sendCaptcha: false,
      // 表单数据
      form: {
        username: '', // 用户名
        nickname: '', // 昵称
        captcha: '', // 验证码
        password: '', // 密码
        checkPassword: '' // 确认密码
      },
      // 表单规则
      formRules: {
        username: [
          // required表示必填，message错误的提示信息. trigger输入框失去焦点时候触发验证
          // { required: true, message: "请输入用户名", trigger: "blur" }
          { validator: validateUsername, trigger: "blur" }
        ],
        captcha: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ],
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" }
        ],
        password: [
          // validator是验证的函数，输入框失去焦点时候触发函数执行
          { validator: validatePass, trigger: "blur" }
        ],
        checkPassword: [
          { validator: validateCheckPass, trigger: "blur" }
        ]
      } // formRules
    }

  }, // data END
  methods: {
    // 发送验证码
    handleSendCaptcha () {
      // 解构出所填写的 手机号，验证码
      let { username } = this.form
      if (username.length === 0) return this
        .$message.error('请输入用户名来获取验证码yo~')
      this.$store.dispatch('user/captcha', { tel: username })
        .then(res => {
          this.$message({
            message: `恭喜你，这是成功获取验证码:${res.code}`,
            type: 'success'
          });
        })
    },

    // 注册
    handleRegSubmit () {
      let { checkPassword, ...data } = this.form
      console.log(data)
    }
  },
  computed: {
    // 通过 username 长度计算是否可以发送验证码了
    nowSend () {
      if (this.form.username.length > 0) {
        // TODO 切换不了 input disabled 状态
        // this.sendCaptcha = false
        return '发送验证码'
      }
      return '请输入用户名'
    }
  }
}
</script>

<style lang="less" scoped>
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
