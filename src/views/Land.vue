<template>
  <div class="Land dv_dv_dv1">
    <el-card class="box-card ">
      <!--      <div v-for="o in 4" :key="o" class="text item">-->
      <!--      </div>-->
    </el-card>
    <el-card class="Land1">
      <p>请登录</p>
      <div class="middle1">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="130px"
          class="demo-ruleForm"
          label-position="left"
        >
          <el-form-item label="请输入用户名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </el-form>
        <br />
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="130px"
          class="demo-ruleForm"
          label-position="left"
        >
          <el-form-item label="请输入密码" prop="password">
            <!--            隐藏密码-->
            <el-input
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <br />

        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="130px"
          class="demo-ruleForm-Verification"
          label-position="left"
        >
          <el-form-item label="请输入验证码" prop="Verification">
            <el-input v-model="ruleForm.Verification"></el-input
            ><span v-html="Captcha" @click="PIG"></span>
          </el-form-item>
        </el-form>
        <div class="foot1">
          <el-row>
            <el-button
              class="btn"
              type="primary"
              @click="postLogin"
              :plain="true"
              >登陆</el-button
            >
            <el-button class="btn" type="primary" @click="Add" :plain="true"
              >注册</el-button
            >
          </el-row>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Land",
  components: {},
  props: {},
  data() {
    return {
      date: "",
      flag: true,
      Captcha: "",
      msg: "",
      msg1: "",
      ruleForm: {
        name: "",
        password: "",
        Verification: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ],
        Verification: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度在 4 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    Land() {
      if (this.ruleForm.name === "" || this.ruleForm.password === "") {
        this.$message({
          message: "请输入账号密码",
          type: "warning"
        });
        return
      }
      if (this.ruleForm.Verification === "") {
        this.$message({
          message: "请输入验证码",
          type: "warning"
        });
        this.getCaptcha();
      }
      if (
        this.ruleForm.name !== "" &&
        this.ruleForm.password !== "" &&
        this.ruleForm.Verification !== ""
      ) {
        // this.postLogin()
        this.$axios
          .req("/api/user/login", {
            username: this.ruleForm.name,
            password: this.ruleForm.password,
            code: this.ruleForm.Verification
          })
          .then(res => {
            if (res) {
              console.log(res);
              this.msg = res.data;
              if (this.msg.code === 500) {
                this.$message({
                  message: "用户名或密码错误",
                  type: "error"
                });
                this.getCaptcha();
              }
              if (this.msg.code === 1) {
                this.$message({
                  message: this.msg.message,
                  type: "error"
                });
                this.getCaptcha();
              }
              if (this.msg.code === 200) {
                // 保存到本地
                localStorage.setItem("user", this.ruleForm.name);
                this.$store.state.user = this.ruleForm.name;
                // 在跳转，不然第一次进不去
                this.$router.push("/");
                this.$message({
                  message: "登陆成功",
                  type: "success"
                });
                this.date = new Date();
                let date1 = this.$moment(this.date).format(
                  "YYYY年MM月DD日HH点mm分ss秒"
                );
                localStorage.setItem("date", date1);
                // let date=this.$mount()
                // let time1=time.getTime()
                // this.$store.state.timedata=time1
                // localStorage.setItem("date",time1)
              }
            }
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    Add() {
      this.$router.push("./Register");
    },
    PIG() {
      this.getCaptcha();
    },
    getCaptcha() {
      this.$axios
        .req("api/captcha")
        .then(req => {
          this.Captcha = req.data;
        })
        .catch(e => {
          console.log(e);
        });
    }
    // postLogin1() {
    //   this.$axios
    //     .req("/api/user/login", {
    //       username: this.ruleForm.name,
    //       password: this.ruleForm.password,
    //       code: this.ruleForm.Verification
    //     })
    //     .then(req => {
    //       if (req) {
    //         this.msg = req.data;
    //       }
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });
    // }
  },
  mounted() {
    this.getCaptcha();
  },
  created() {
    this.postLogin = this.$lodash.debounce(this.Land, 350);
  },
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.Land {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  /*background-image: url("../assets/背景图片.jpg");*/
  background-image: url("../assets/猪.jpg");
}
.Land1 {
  width: 700px;
  height: 500px;
  background-color: white;
  margin: 200px auto;
}
.Land1 p {
  font-size: 20px;
  display: inline-block;
  width: 100%;
  margin: 0 auto;
  border-bottom: skyblue solid 2px;
  text-align: center;
  padding: 10px;
}
.middle1 {
  width: 500px;
  height: 400px;
  margin: 30px auto;
}
.demo-ruleForm-Verification {
  width: 300px;
  position: relative;
}
.demo-ruleForm-Verification span {
  position: absolute;
  right: -170px;
}
.foot1 {
  width: 300px;
  height: 100px;
  margin: 10px auto;
  display: flex;
  justify-content: space-around;
}
.btn {
  margin-top: 20px;
  width: 110px;
  height: 50px;
}
</style>
