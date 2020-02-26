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
      } else if (/^1[3-9][0-9]{9}$/.test(value) == false) { // 判断是否是手机号码的正则
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
      // 是否成功获取过验证码
      hasSendCaptcha: false,
      // 表单数据
      form: {
        username: '13178966666', // 用户名
        nickname: '123', // 昵称
        captcha: '000000', // 验证码
        password: '123456', // 密码
        checkPassword: '123456' // 确认密码
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
          })
          // 成功获取验证码标识改变
          return this.hasSendCaptcha = !this.hasSendCaptcha
        })
    },

    // 注册
    handleRegSubmit () {
      this.$refs['form'].validate((valid) => {
        // 用户没有获取验证码 所以不应当以表单校验通过 应让其先获取验证码 减轻后台API服务器的压力
        if (!this.hasSendCaptcha) return this.$message.error('请先获取验证码yo~')
        // 用户填写的信息 未通过 form 表单规则校验
        if (!valid) return this.$message.error('填写有误yo~')
        // 通过校验 提交用户填写的表单数据
        // 但是后台所需要的 数据格式中没有 checkPassword 一项
        // 我们可以通过结构赋值来改造数据
        let { checkPassword, ...data } = this.form
        console.log(data)
        this.$store.dispatch('user/register', data).then(() => {
          // 若是 then 方法只有一种可能性了
          // => 注册成功了
          // 此时我们可以跳转页面至首页或者从哪里来的回哪里去
          // 当我们登录成功的时候最好就自动登录了
          // 省了用户的时间 用户才能更快的下单 购物啦
          // => 提示用户，注册成功啦，跳转页面
          this.$message.success("恭喜~ 注册成功yo~")
          // 为了让上面的提示能被用户看到
          setTimeout(() => {
            this.$router.go(-1) // 跳转回去
          }, 1000)
        })

      })
    }
  }, // methods END
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
