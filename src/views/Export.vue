<template>
  <!--  (val2 - 1) * val1, val1 * val2-->
  <div>
    <div class="inp1">
      <el-input
        v-model="input"
        @input="inp"
        placeholder="请输入想要搜索的商品"
      ></el-input>
    </div>
    <el-card class="box-card card4">
      <el-table
        :data="tableData.slice((val2 - 1) * val1, val1 * val2)"
        style="width: 100%"
      >
        <el-table-column
          label="商品名称"
          width="380"
          prop="tag"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.NAME }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商品编号" header-align="center" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.GOODS_SERIAL_NUMBER }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="原价" header-align="center" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.ORI_PRICE }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="现价" header-align="center" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.PRESENT_PRICE }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
              >buttonCont</el-button
            >
            <el-button size="mini" @click="edit(scope)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage1"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="length"
        >
        </el-pagination>
      </div>
    </el-card>
    <div class="foot6">
      <el-row>
        <el-button class="textbtn1" type="primary">
          <download-excel
            class="btn btn-default"
            :data="tableData.slice((val2 - 1) * val1, val1 * val2)"
            :fields="json_fields"
            worksheet="My Worksheet"
            name="SuperMarket.xls"
          >
            <span class="textbtn">
              Download Excel (you can customize this with html code!) xls
            </span>
          </download-excel></el-button
        >
      </el-row>
      <el-row>
        <el-button class="textbtn1" type="warning">
          <download-excel
            class="btn btn-default"
            :data="tableData.slice((val2 - 1) * val1, val1 * val2)"
            :fields="json_fields"
            worksheet="My Worksheet"
            name="SuperMarket.xls"
            type="csv"
          >
            <span class="textbtn">
              Download Excel (you can customize this with html code!) csv
            </span>
          </download-excel></el-button
        >
      </el-row>
    </div>
    <el-dialog title="修改" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="商品名称" label-width="120px">
          <el-input v-model="editObj.NAME" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="原价" label-width="120px">
          <el-input v-model="editObj.ORI_PRICE" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="现价" label-width="120px">
          <el-input
            v-model="editObj.PRESENT_PRICE"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Export",
  components: {},
  props: {},
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      tableData: [],
      tableDataVIP: [],
      currentPage1: 1,
      input: "",
      val1: 10,
      val2: 1,
      length: 0,
      json_fields: {
        商品名称: "NAME",
        商品编号: "CREATE_TIME",
        原价: "ORI_PRICE",
        现价: "PRESENT_PRICE"
      },
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8"
          }
        ]
      ],
      editObj: {}
    };
  },
  methods: {
    edit(scope) {
      this.dialogFormVisible = true;
      this.editObj = scope.row;
      console.log(this.editObj);
    },
    handleSizeChange(val) {
      this.val1 = val;
    },
    handleCurrentChange(val) {
      this.val2 = val;
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.$prompt("请修改商品名称", "修改信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: row.NAME
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: "邮箱格式不正确"
      })
        .then(({ value }) => {
          this.tableData[index].NAME = value;
          console.log(value);
          this.$prompt("请修改商品原价", "修改信息", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            inputValue: row.ORI_PRICE
            // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
            // inputErrorMessage: "邮箱格式不正确"
          }).then(({ value }) => {
            this.tableData[index].ORI_PRICE = value;
            console.log(value);
          });

        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    handleDelete(index) {
      this.tableData.splice(index, 1);
    },
    getTableData() {
      this.$axios
        .req("/api/tableData")
        .then(res => {
          this.tableData = res.data.data;
          console.log(this.tableData);
          this.tableDataVIP = this.tableData;
        })
        .catch(e => {
          console.log(e);
        });
    },
    inp(val) {
      // 第一种 这个return没用到没用到也可以？？ return 返回item吗？这个的效果不是应该和第三种一样吗，为什么这个能实现过滤
      this.tableData = this.tableDataVIP;
      this.tableData = this.tableData.filter(item => {
        let str = "";
        for (let i in item) {
          str = str+item.NAME+item.GOODS_SERIAL_NUMBER+item.ORI_PRICE+item.PRESENT_PRICE;
        }
        return str.indexOf(val) !== -1;
      });
      // 第二种 判断条件 用到了item
      // this.tableData = this.tableData.filter(item => {
      //   return JSON.stringify(item).indexOf(val) !== -1;
      // });
      // 第三种 this.str.indexof能返回相应下标 效果：只要输入的值源字符串中有就全显示，只要没有就全不显示为什么一和二效果不同
    //   this.tableData = this.tableData.filter(item => {
    //     // console.log(item);
    //     // return this.str.indexOf(val) !== -1;
    //     if (this.str.indexOf(val) !== -1) {
    //       // console.log(item);
    //       return item;
    //     }
    //   });
    //   console.log(this.str);
    }
  },
  mounted() {
    this.getTableData();
    // let arr = '13467323414'
    // console.log(arr.indexOf('41'));
  },
  created() {},
  filters: {},
  computed: {},
  watch: {
    tableData(val) {
      this.length = val.length;
    }
  },
  directives: {}
};
</script>

<style scoped lang="scss">
.inp1 {
  margin: 20px 0;
}
.textbtn1 {
  margin: 20px;
}
.textbtn {
  width: 400px;
  line-height: 30px;
  display: inline-block;
}
.foot6 {
  display: flex;
  justify-content: space-around;
}
</style>
