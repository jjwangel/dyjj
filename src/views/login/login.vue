<style lang="less">
  @import './login.less';

</style>

<template>
  <div class="login" @keydown.enter="handleSubmit">
    <div class="login-bg">
      <div class="login-con">
        <Card :bordered="false">
          <p slot="title">
            <Icon type="log-in"></Icon>
            欢迎登录
          </p>
          <div class="form-con">
            <Form ref="loginForm" :model="form" :rules="rules">
              <FormItem prop="user_acct">
                <Input v-model="form.user_acct" placeholder="请输入登录账号">
                <span slot="prepend">
                  <Icon :size="16" type="person"></Icon>
                </span>
                </Input>
              </FormItem>
              <FormItem prop="user_pwd">
                <Input type="password" v-model="form.user_pwd" placeholder="请输入密码">
                <span slot="prepend">
                  <Icon :size="14" type="locked"></Icon>
                </span>
                </Input>
              </FormItem>
              <FormItem prop="uf_acct_no">
                <Select v-model="form.uf_acct_no" :disabled="form.disable_select" placeholder="请选择连接账套">
                  <Option v-for="item in form.uf_acct_list.list" :value="item.acct_no" :key="item.acct_no" :disabled="item.disable">{{item.acct_no}} - {{item.acct_name}}</Option>
                </Select>
              </FormItem>
              <FormItem prop="logging">
                <Button :loading="form.logging" @click="handleSubmit" type="primary" long>登录</Button>
              </FormItem>
            </Form>
            <p class="login-tip">v 1.0</p>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
  import util from '@/libs/util';

  export default {
    data() {
      return {
        form: {
          user_acct: '',
          user_pwd: '',
          uf_acct_no: '',
          disable_select: true,
          uf_acct_list: {},
          logging: false,
        },
        rules: {
          user_acct: [{
            required: true,
            message: '账号不能为空',
            trigger: 'blur'
          }],
          user_pwd: [{
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }],
          uf_acct_no: [{
            required: true,
            message: '必需选择一个账套',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      init() {
        util.GetUfAccountInfo().then(response => {
          const data = response.data;
          if (data.retrun_code === "000000") {
            this.form.uf_acct_list = data.uf_acct_list;
            this.form.disable_select = false;
            this.form.uf_acct_no = data.uf_acct_list.default_acct_no;
          } else {
            console.log(data.retrun_code);
          }
        }).catch(err => {
          console.log(err);
        })
      },
      handleSubmit() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.form.logging = true;
            this.$store.dispatch("VerifyUser", this.form).then(code => {
              if (code === "000000") { //登录成功
                this.$router.replace({
                  name: 'home'
                })
              } else if (code === "SYS0003") { // 登录账号或密码不匹配。
                this.$Message.warning({
                  content: '登录账号或密码不匹配',
                  duration: 3
                });
              } else if (code === "BUS0001") { // 登录账号没有访问账套权限。
                this.$Message.warning({
                  content: '登录账号没有访问账套权限',
                  duration: 3
                });
              }
              this.form.logging = false;
            }).catch(err => {
              console.log(err);
              this.form.logging = false;
            })
          }
        })
      }
    },
    computed: {

    },
    mounted() {
      this.init();
    },
    created() {

    }
  }

</script>
