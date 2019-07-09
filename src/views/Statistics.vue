<template>
  <div class="Statistics">
    <el-card class="box-card">
      <div class="head11">
        <div style="background-color: #19D4AE">
          今日发布 <br />
          <countTo
            :startVal="startVal"
            :endVal="Number(num2)"
            :duration="3000"
          ></countTo
          ><i class="el-icon-check"></i>
        </div>
        <div style="background-color: #FA6E86">
          原创文章<br />
          <countTo
            :startVal="startVal"
            :endVal="Number(num)"
            :duration="3000"
          ></countTo
          ><i class="el-icon-s-order"></i>
        </div>
        <div style="background-color: #C4B4E4">
          新留言<br />2<i class="el-icon-moon-night"></i>
        </div>
        <div style="background-color: #19D4AE">
          新消息<br />2<i class="el-icon-chat-line-round"></i>
        </div>
      </div>
      <div class="pie">
        <el-card class="box-card box-card_">
          <div class="box-card_1">
            <ve-pie :data="chartData" :settings="chartSettings"></ve-pie>
          </div>
        </el-card>
        <el-card class="box-card box-card_">
          <div class="box-card_1">
            <ve-pie :data="chartData1" :settings="chartSettings1"></ve-pie>
          </div>
        </el-card>
      </div>
      <ve-waterfall :data="chartData2"></ve-waterfall>
    </el-card>
  </div>
</template>

<script>
import countTo from "vue-count-to";
export default {
  name: "Statistics",
  components: {
    countTo
  },
  props: {},
  data() {
    (this.chartSettings = {
      limitShowNum: 5
    }),
      (this.chartSettings1 = {
        roseType: "radius"
      });
    return {
      num1: "",
      num2: "",
      startVal: 0,
      allArticle: [],
      chartData: {
        columns: ["类型", "数量"],
        rows: []
      },
      chartData1: {
        columns: ["来源", "数量"],
        rows: []
      },
      chartData2: {
        columns: ["时间", "数量"],
        rows: []
      }
    };
  },
  methods: {
    getArticle() {
      this.$axios
        .req("api/article/allArticle")
        .then(res => {
          this.allArticle = res.data.data;
          this.allArticle.map(item => {
            let index = item.date.indexOf("日");
            item.date = item.date.substr(0, index);
            item.date = item.date.replace("年", "-");
            item.date = item.date.replace("月", "-");
            item.date = this.$moment(this.$moment(item.date).toDate()).format(
              "YYYY年MM月DD日"
            );
          });
          this.date = new Date();
          // 注
          let date1 = this.$moment(this.date).format("YYYY年MM月DD日");
          let s = 0;
          this.allArticle.map(item => {
            if (item.date === date1) {
              s++;
            }
          });
          this.num2 = s;
          console.log(date1);
          let group = _.groupBy(this.allArticle, "category");
          // 注
          let arr = [];
          let keys = [];
          for (let key in group) {
            keys.push(key);
            arr.push(group[key]); //取得value
          }
          for (let i = 0; i < keys.length; i++) {
            this.chartData.rows.push({ 类型: keys[i], 数量: arr[i].length });
          }
          let group1 = _.groupBy(this.allArticle, "source");
          let arr1 = [];
          let keys1 = [];
          for (let key1 in group1) {
            keys1.push(key1);
            arr1.push(group1[key1]);
          }
          for (let j = 0; j < keys1.length; j++) {
            this.chartData1.rows.push({ 来源: keys1[j], 数量: arr1[j].length });
          }
          let group2 = _.groupBy(this.allArticle, n => {
            return n.date.toString().substring(0, 11);
          });
          console.log(group2);
          let arr2 = [];
          let keys2 = [];
          for (let key2 in group2) {
            keys2.push(key2);
            arr2.push(group2[key2]);
          }
          // console.log(keys2);
          // console.log(arr2);
          // let time = new Date();
          // let y = time.getFullYear();
          // let m = time.getMonth() + 1;
          // let d = time.getDate();
          // let date = y + "年" + m + "月" + d + "日";
          // let arr4 = [];
          // for (let k = 0; k < keys2.length; k++) {
          //   arr4.push(keys2[k].slice(0, keys2[k].indexOf("日") + 1));
          // }
          // let m1 = 0;
          // arr4.map(item => {
          //   if (item === date) {
          //     m1++;
          //   }
          // });
          // this.num1 = m1;
          for (let k = 0; k < keys2.length; k++) {
            this.chartData2.rows.push({
              时间: keys2[k].slice(0, keys2[k].indexOf("日") + 1),
              数量: arr2[k].length
            });
          }

          // let i = 0;
          // let j = 0;
          // let k = 0;
          // let ii = 0;
          // let iii = 0;
          // let iiii = 0;
          // let kk = 0;
          // let kkk = 0;
          // let p = 0;
          // let qq = 0;
          // let q = 0;
          // this.allArticle.map(item => {
          //   if (item.source === "原创") {
          //     i++;
          //   }
          //   if (item.source === "转载") {
          //     j++;
          //   }
          //   if (item.source === "合作") {
          //     k++;
          //   }
          //   if (item.category === "React") {
          //     ii++;
          //   }
          //   if (item.category === "JavaScript") {
          //     iii++;
          //   }
          //   if (item.category === "工具类") {
          //     iiii++;
          //   }
          //   if (item.category === "Vue") {
          //     kk++;
          //   }
          //   if (item.category === "Node.js") {
          //     p++;
          //   }
          //   if (item.category === "其他") {
          //     kkk++;
          //   }
          //   if (item.category === "小程序") {
          //     q++;
          //   }
          //   if (item.category === "性能优化") {
          //     qq++;
          //   }
          // });
          // this.num = i;
          // this.chartData1.rows.push({ 来源: "原创", 数量: i });
          // this.chartData1.rows.push({ 来源: "转载", 数量: j });
          // this.chartData1.rows.push({ 来源: "合作", 数量: k });
          // this.chartData.rows.push({ 类型: "React", 数量: ii });
          // this.chartData.rows.push({ 类型: "JavaScript", 数量: iii });
          // this.chartData.rows.push({ 类型: "工具类", 数量: iiii });
          // this.chartData.rows.push({ 类型: "Vue", 数量: kk });
          // this.chartData.rows.push({ 类型: "其他", 数量: kkk });
          // this.chartData.rows.push({ 类型: "Node.js", 数量: p });
          // this.chartData.rows.push({ 类型: "小程序", 数量: q });
          // this.chartData.rows.push({ 类型: "性能优化", 数量: qq });
          //
          // let iq = 0;
          // let fmax = [];
          // let f = [];
          // let kq = 0;
          // let m = 0;
          // this.allArticle.map(item => {
          //   // console.log(item.date);
          //   let jq = item.date.indexOf("日");
          //   jq = item.date.slice(0, jq + 1);
          //   // console.log(j);
          //   // 所有时间
          //   fmax.push(jq);
          //   let time = new Date();
          //   // let time1=this.$moment(time).format('YYYY年MM月DD日')
          //   let y = time.getFullYear();
          //   let m = time.getMonth() + 1;
          //   let d = time.getDate();
          //   let date = y + "年" + m + "月" + d + "日";
          //   console.log(date);
          //   // console.log(time1);
          //   if (jq === date) {
          //     iq++;
          //   }
          //   this.num1 = iq;
          // });
          // // console.log(fmax);
          // // 过滤所有时间   横轴
          // // console.log(fmax);
          // f = fmax.filter((item, index) => {
          //   return fmax.indexOf(item) === index;
          // });
          // // console.log(f+'我是所有时间');
          // f.map(item => {
          //   // 循环添加横轴
          //   // console.log(item);
          //   // for(let s=0;s<fmax.length;s++){
          //   //   if (fmax.indexOf(item)!==-1)  k++
          //   //   console.log(item);
          //   //   fmax.splice(0,1)
          //   // }
          //   // console.log(k);
          //   // 哟喂！
          //   kq = fmax.filter(item => {
          //     // console.log(f[m]);
          //     return item === f[m];
          //   }).length;
          //   // console.log(k);
          //   m++;
          //   // console.log(fmax);
          //   this.chartData2.rows.push({ 时间: item, 数量: kq });
          // });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.getArticle();
  },
  created() {},
  filters: {},
  computed: {
    num() {
      let i = 0;
      this.allArticle.map(item => {
        if (item.source === "原创") {
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
.head11 {
  display: flex;
  justify-content: space-around;
}
.head11 div {
  width: 100%;
  height: 60px;
  text-align: center;
  color: white;
  position: relative;
  padding-top: 20px;
}
.head11 i {
  position: absolute;
  top: 40%;
  right: 30px;
}
.pie {
  display: flex;
}
.box-card_ {
  width: 100%;
  margin: 10px;
}
.box-card_1 {
  width: 500px;
  margin: 0 auto;
}
.none {
  display: none;
}
</style>
