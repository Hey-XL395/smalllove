<template>
  <div class="Label">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="'未读消息' + '(' + num1 + ')'" name="first">
        <el-card class="box-card"
          ><div
            v-for="item in arr"
            :key="item.id"
            v-show="item.flag === 'no'"
            class="card_"
          >
            {{ item.text }}
            <div>
              {{ item.time }}
              <el-button @click="can(item)">标为已读</el-button>
            </div>
          </div>
          <!--            //事件开始不传参数这里就不要传-->
          <el-button @click="can1()" v-if="num1 !== 0">全部标为已读</el-button>
          <span v-else>暂无数据</span>
        </el-card></el-tab-pane
      >
      <el-tab-pane :label="'已读消息' + '(' + num3 + ')'" name="second">
        <el-card class="box-card "
          ><div
            v-for="item in arr"
            :key="item.id"
            v-show="item.flag === 'yes'"
            class="card_"
          >
            {{ item.text }}
            <div>
              {{ item.time }}
              <el-button @click="del(item)" type="warning">删除</el-button>
            </div>
          </div>
          <el-button @click="del1()" type="warning" v-if="num3 !== 0"
            >全部删除</el-button
          >
          <span v-else>暂无数据</span>
        </el-card></el-tab-pane
      >
      <el-tab-pane :label="'回收站' + '(' + num2 + ')'" name="third">
        <el-card class="box-card"
          ><div
            v-for="item in arr"
            :key="item.id"
            v-show="item.flag === 'del'"
            class="card_"
          >
            {{ item.text }}
            <div>
              {{ item.time }}
              <el-button @click="res(item)" type="warning">还原</el-button>
            </div>
          </div>
          <el-button @click="res1()" v-if="num2 !== 0">全部还原</el-button>
          <el-button @click="delvip()" v-if="num2 !== 0" type="danger"
            >彻底删除</el-button
          >
          <span v-else>暂无数据</span>
        </el-card></el-tab-pane
      >
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "Label",
  components: {},
  props: {},
  data() {
    return {
      activeName: "first",
      arr: [
        {
          flag: "yes",
          id: 1,
          text: "【系统通知】该系统于今晚凌晨2点到5点进行升级维护",
          time: "2018-4-19 20:00:00"
        },
        {
          flag: "no",
          id: 2,
          text: "【系统通知】您的优惠券已过期",
          time: "2018-4-19 20:00:00"
        },
        {
          flag: "yes",
          id: 3,
          text: "【系统通知】该系统于今晚凌晨2点到5点进行升级维护",
          time: "2018-4-19 20:00:00"
        },
        {
          flag: "del",
          id: 4,
          text: "今晚12点整发红吧，先到先得",
          time: "2018-4-19 20:00:00"
        }
      ]
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    del(item) {
      item.flag = "del";
    },
    res(item) {
      item.flag = "no";
    },
    can(item) {
      item.flag = "yes";
    },
    del1() {
      this.arr.map(item => {
        if (item.flag === "yes") {
          item.flag = "del";
        }
      });
    },
    res1() {
      this.arr.map(item => {
        if (item.flag === "del") {
          item.flag = "no";
        }
      });
    },
    can1() {
      this.arr.map(item => {
        if (item.flag === "no") {
          item.flag = "yes";
        }
      });
    },
    delvip() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.arr.map(item => {
            if (item.flag === "del") {
              item.flag = false;
              // 套路按套路
            }
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {},
  created() {},
  filters: {},
  computed: {
    num1() {
      let i = 0;
      this.arr.map(item => {
        if (item.flag === "no") {
          i++;
        }
      });
      return i;
    },
    num2() {
      let i = 0;
      this.arr.map(item => {
        if (item.flag === "del") {
          i++;
        }
      });
      return i;
    },
    num3() {
      let i = 0;
      this.arr.map(item => {
        if (item.flag === "yes") {
          i++;
        }
      });
      return i;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.card_ {
  display: flex;
  justify-content: space-between;
  line-height: 50px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px #a3bbd2 solid;
}
.Label span {
  display: block;
  font-size: 30px;
  width: 200px;
  margin: 0 auto;
}
</style>
