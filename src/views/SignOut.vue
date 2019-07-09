<template>
  <div class="SignOut">
    <el-row>
      <el-button type="danger" @click="SignOut">退出系统</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "SignOut",
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {
    SignOut() {
      if (confirm("确定要退出吗")) {
        this.$router.push("/Land");
        // 删除用户名
        localStorage.removeItem("user");
        //   let time = new Date();
        //   let y = time.getFullYear();
        //   let m = time.getMonth() + 1;
        //   let d = time.getDate();
        //   let h = time.getHours();
        //   let mi = time.getMinutes();
        //   let s = time.getSeconds();
        //   localStorage.setItem("date",
        //     y + "年" + m + "月" + d + "日" + h + "时" + mi + "分" + s + "秒"
        //   );
        //   this.$store.state.timedata=y + "年" + m + "月" + d + "日" + h + "时" + mi + "分" + s + "秒"
        //   console.log(
        //     y + "年" + m + "月" + d + "日" + h + "时" + mi + "分" + s + "秒"
        //   );
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
.SignOut {
  width: 100px;
  height: 30px;
  margin: 30px auto;
}
</style>
