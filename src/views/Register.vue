<template>
  <div class="Land dv_dv_dv1">
    <el-card class="Land1">
      <p>请注册账号</p>
      <div class="middle1">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="130px"
          class="demo-ruleForm"
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
        >
          <el-form-item label="请输入密码" prop="password">
            <el-input
              v-model="ruleForm.password"
              type="password"
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
        >
          <el-form-item label="请再次输入密码" prop="password2">
            <el-input
              v-model="ruleForm.password2"
              type="password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="foot1">
          <el-row>
            <el-button class="btn" type="primary" @click="Land">登陆</el-button>
            <el-button class="btn" type="primary" @click="Add">注册</el-button>
          </el-row>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Register",
  components: {},
  props: {},
  data() {
    return {
      input: "",
      input1: "",
      input2: "",
      input3: "",
      flag: true,
      Captcha: "",
      ruleForm: {
        name: "tom",
        password: "123456",
        password2: "123456",
        msg: ""
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
        password2: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    Land() {
      this.$router.push("/");
    },
    Add() {
      let reg = new RegExp(/[\u4e00-\u9fa5]/);
      if (this.ruleForm.name.match(reg)) {
        this.$message({
          type: "warning",
          message: "用户名不能为中文"
        });
        this.ruleForm.name = "";
      }
      if (
        this.ruleForm.password.length > 5 &&
        this.ruleForm.password2.length > 5 &&
        this.ruleForm.name.length > 2
      ) {
        if (this.ruleForm.password !== this.ruleForm.password2) {
          this.$message({
            message: "密码不一致",
            type: "warning"
          });
          return;
        }
        this.$axios
          .req("/api/user/register", {
            username: this.ruleForm.name,
            password: this.ruleForm.password
          })
          .then(res => {
            this.msg = res.data;
            console.log(this.msg);
            if (this.msg.code === 1) {
              this.$message({
                message: this.msg.message,
                type: "error"
              });
            } else {
              this.$router.push("/Land");
              this.$message({
                message: this.msg.message,
                type: "success"
              });
            }
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  },
  mounted() {},
  created() {},
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
  background-color: skyblue;
  background-image: url("../assets/背景图片.jpg");
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
