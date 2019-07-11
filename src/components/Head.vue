<template>
  <div class="head">
    <p>欢迎来{{user}}到小爱同学后台管理系统</p>
    <p>{{ Hello }}好，亲爱的{{ user }}，上次登陆时间{{time}}</p>
  </div>
</template>

<script>
export default {
  name: "Head",
  components: {},
  props: {},
  data() {
    return {
      user: "",
      Hello: "",
      // timedata:'',
      time:''
    };
  },
  methods: {
    getTime() {
      // this.timedata=this.$store.state.timedata
      let time = new Date();
      let time1 = time.getHours();
      if (time1 >= 0 && time1 < 6) {
        this.Hello = "半夜";
      }
      if (time1 >= 6 && time1 < 12) {
        this.Hello = "上午";
      }
      if (time1 >= 12 && time1 < 14) {
        this.Hello = "中午";
      }
      if (time1 >= 14 && time1 < 19) {
        this.Hello = "下午";
      }
      if (time1 >= 19 && time1 <= 24) {
        this.Hello = "晚上";
      }
    }
  },
  mounted() {
    this.user = localStorage.getItem("user");
    this.time = localStorage.getItem("date")
    this.getTime();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>
<style scoped lang="scss">
.head {
  display: flex;
  justify-content: space-between;
  /*注意*/
  /*position: fixed;*/
  /*z-index: 1;*/
  /*top: 10px;*/
  /*background-color: #2e5e85;*/
}
p {
  color: white;
  font-size: 17px;
  line-height: 60px;
}
</style>
