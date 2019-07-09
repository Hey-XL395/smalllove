<template>
  <div class="home">
    <header>
      <el-card class="box-card">
        <div class="text item">
          <img src="../assets/用户.svg" alt="" />
          <div>
            <div>New Visits</div>
            <div>
              <countTo
                :startVal="startVal"
                :endVal="Obj.visits"
                :duration="3000"
              ></countTo>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="text item">
          <img src="../assets/信息.svg" alt="" />
          <div>
            <div>Messages</div>
            <div>
              <countTo
                :startVal="startVal"
                :endVal="Obj.messages"
                :duration="3000"
              ></countTo>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="text item">
          <img src="../assets/钱.svg" alt="" />
          <div>
            <div>Purchases</div>
            <div>
              <countTo
                :startVal="startVal"
                :endVal="Obj.purchases"
                :duration="3000"
              ></countTo>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="text item">
          <img src="../assets/购物车.svg" alt="" />
          <div>
            <div>Shoppings</div>
            <div>
              <countTo
                :startVal="startVal"
                :endVal="Obj.shopping"
                :duration="3000"
              ></countTo>
            </div>
          </div>
        </div>
      </el-card>
    </header>
    <el-card class="box-card card1">
      <div><ve-line :data="objChat" :settings="chartSettings"></ve-line></div>
    </el-card>
    <div class="middle">
      <el-card class="box-card card1">
        <div class="card2"><ve-radar :data="RadarChat"></ve-radar></div>
      </el-card>
      <el-card class="box-card card1">
        <div class="card2">
          <ve-ring :data="RingChat" :settings="chartSettings1"></ve-ring>
        </div>
      </el-card>
      <el-card class="box-card card1">
        <div class="card2"><ve-histogram :data="objChat"></ve-histogram></div>
      </el-card>
    </div>
    <div class="foot3">
      <el-card class="box-card card3">
        <div class="card3 middle_middle_middle">
          <el-table ref="filterTable" :data="tableData" style="width: 100%">
            <el-table-column prop="num" label="Order_No" width="380">
            </el-table-column>
            <el-table-column prop="price" label="Price" width="380">
<!--              注-->
              <template slot-scope="scope">
                ￥{{ scope.row.price }}
              </template>
            </el-table-column>
            <el-table-column
              prop="tag"
              label="Status"
              width="300"
              :filters="[
                { text: 'pending', value: '0' },
                { text: 'success', value: '1' }
              ]"
              :filter-method="filterTag"
              filter-placement="bottom-end"
            >
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.status === 0 ? 'primary' : 'success'"
                  disable-transitions
                  ><span v-if="scope.row.status === 0">pending</span
                  ><span v-else>success</span></el-tag
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <el-card class="box-card card4">
        <div>
          <img
            src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png"
            alt=""
          />
        </div>
        <div>
          <!--          //直接01234怕是不太好哦-->
          <!--          {{ProgramData[0].name}}-->
          <!--          <el-progress :percentage="ProgramData[0].progress*100"></el-progress>-->
          <!--&lt;!&ndash;          {{ProgramData[1].name}}&ndash;&gt;-->
          <!--          <el-progress :percentage="ProgramData[1].progress*100" :format="format"></el-progress>-->
          <!--&lt;!&ndash;          {{ProgramData[2].name}}&ndash;&gt;-->
          <!--          <el-progress :percentage="ProgramData[2].progress*100" status="success"></el-progress>-->
          <!--&lt;!&ndash;          {{ProgramData[3].name}}&ndash;&gt;-->
          <!--          <el-progress :percentage="ProgramData[3].progress*100" status="warning"></el-progress>-->
          <div v-for="item in ProgramData" :key="item.name">
            {{ item.name }}
            <!--            动态属性？？-->
            <el-progress
              :percentage="item.progress * 100"
              status="success"
              v-if="item.progress === 1"
            ></el-progress>
            <el-progress :percentage="item.progress * 100" v-else></el-progress>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import countTo from "vue-count-to";
// @ is an alias to /src

export default {
  name: "home",
  components: {
    countTo
  },
  data() {
    this.chartSettings = {
      metrics: ["expected", "actual"],
      dimension: ["date"]
    };
    this.chartSettings1 = {
      roseType: "radius"
    };
    return {
      prgs: "",
      tableData: [],
      Obj: {},
      startVal: 0,
      objChat: {
        columns: ["date", "actual", "expected"],
        rows: []
      },
      RingChat: {
        columns: ["name", "data"],
        rows: []
      },
      RadarChat: {
        columns: [
          "name",
          "sales",
          "ministration",
          "techology",
          "marketing",
          "delelopmer"
        ],
        rows: []
      },
      ProgramData: []
    };
  },
  methods: {
    format(percentage) {
      return percentage === 100 ? "满" : `${percentage}%`;
    },
    filterTag(value, row) {
      return row.status == value;
    },
    getOrderData() {
      this.$axios
        .req("api/orderData")
        .then(res => {
          this.tableData = res.data.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    getData() {
      this.$axios
        .req("api/homeData")
        .then(res => {
          this.Obj = res.data.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    getChat() {
      this.$axios
        .req("api/homeChat")
        .then(req => {
          this.objChat.rows = req.data.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    getRadarChat() {
      this.$axios
        .req("api/radarChat")
        .then(req => {
          this.RadarChat.rows = req.data.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    getRingChat() {
      this.$axios
        .req("api/ringChat")
        .then(req => {
          this.RingChat.rows = req.data.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    getProgress() {
      this.$axios
        .req("api/progress")
        .then(res => {
          this.ProgramData = res.data.data;
          // this.ProgramData.map((item)=>{
          //   if (item.progress*100===100){
          //     this.prgs='success'
          //   } else if(item.progress*100<100 || item.progress*100>60){
          //     this.prgs='warning'
          //   }else {
          //     this.prgs='format'
          //   }
          // })
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.getData();
    this.getChat();
    this.getRadarChat();
    this.getRingChat();
    this.getOrderData();
    this.getProgress();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>
<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-around;
}
.text {
  width: 350px;
  height: 60px;
  display: flex;
  justify-content: space-between;
}
header img {
  width: 60px;
  height: 50px;
}
.card1 {
  margin: 20px;
}
.card2 {
  width: 500px;
  height: 100%;
}
.middle {
  display: flex;
  justify-content: space-around;
}
.foot3 {
  display: flex;
  justify-content: space-around;
}
.card3 {
  width: 150%;
  height: 600px;
  margin: 20px;
  text-align: center;
}
.card4 {
  width: 1250px;
  height: 600px;
  margin: 20px;
}
.card4 img {
  width: 500px;
  margin: 0 auto;
}
</style>
