<template>
  <div class="article">
    <el-card class="box-card card4">
      <div id="article" v-if="this.flag === true">
        <div class="btn2">
          <!--            修改-->
          <el-button type="danger" @click="back">返回</el-button>
          <el-button type="primary" @click="push">修改</el-button>
        </div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="文章标题">
            <el-input v-model="form.title"></el-input> </el-form-item
          ><el-form-item label="文章摘要">
            <el-input v-model="form.abstract"></el-input>
          </el-form-item>
          <div class="form_">
            <el-form-item label="作者" prop="author">
              <el-input v-model="form.author"></el-input>
            </el-form-item>
            <el-form-item label="类目" prop="category">
              <el-select v-model="form.category" placeholder="类目">
                <el-option label="Vue" value="Vue"></el-option>
                <el-option label="React" value="React"></el-option>
                <el-option label="Node.js" value="Node.js"></el-option>
                <el-option label="性能优化" value="性能优化"></el-option>
                <el-option label="JavaScript" value="JavaScript"></el-option>
                <el-option label="小程序" value="小程序"></el-option>
                <el-option label="工具类" value="工具类"></el-option>
                <el-option label="其他" value="其他"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="来源" prop="source">
              <el-select v-model="form.source" placeholder="来源">
                <el-option label="原创" value="原创"></el-option>
                <el-option label="转载" value="转载"></el-option>
                <el-option label="合作" value="合作"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="重要性" prop="star">
              <el-select v-model="form.star" placeholder="重要性">
                <el-option label="一级" value="1"></el-option>
                <el-option label="二级" value="2"></el-option>
                <el-option label="三级" value="3"></el-option>
                <el-option label="四级" value="4"></el-option>
                <el-option label="五级" value="5"></el-option>
                <el-option label="六级" value="6"></el-option>
              </el-select>
            </el-form-item>
            <div class="block block_">
              <span class="demonstration">发布时间 </span>
              <el-date-picker
                v-model="date"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </div>
          </div>
        </el-form>
        <!--        编辑器-->
        <mavon-editor v-model="value" />
      </div>
      <el-table
        v-else-if="flag === false"
        :data="articleData.slice((val2 - 1) * val1, val1 * val2)"
        style="width: 100%"
      >
        <el-table-column
          v-if="this.flag === false"
          label="#"
          prop="tag"
          type="index"
          :index="indexMethod"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="author"
          label="作者"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="tag"
          label="类目"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.category === 'JavaScript'"
              >JavaScript</el-tag
            ><el-tag type="danger" v-if="scope.row.category === 'Vue'"
              >Vue</el-tag
            ><el-tag v-if="scope.row.category === 'React'">React</el-tag
            ><el-tag v-if="scope.row.category === 'Node.js'">Node.js</el-tag
            ><el-tag type="warning" v-if="scope.row.category === '性能优化'"
              >性能优化</el-tag
            ><el-tag type="danger" v-if="scope.row.category === '小程序'"
              >小程序</el-tag
            >
            <el-tag type="warning" v-if="scope.row.category === '工具类'"
              >工具类</el-tag
            ><el-tag type="danger" v-if="scope.row.category === '其他'"
              >其他</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="source"
          label="来源"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column label="重要性" header-align="center" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">
                <span v-if="scope.row.star == 1"
                  ><i class="el-icon-star-on"></i
                ></span>
                <span v-if="scope.row.star == 3"
                  ><i class="el-icon-star-on"></i><i class="el-icon-star-on"></i
                  ><i class="el-icon-star-on"></i
                ></span>
                <span v-if="scope.row.star == 2"
                  ><i class="el-icon-star-on"></i><i class="el-icon-star-on"></i
                ></span>
                <span v-if="scope.row.star == 4"
                  ><i class="el-icon-star-on"></i><i class="el-icon-star-on"></i
                  ><i class="el-icon-star-on"></i><i class="el-icon-star-on"></i
                ></span>
                <span v-if="scope.row.star == 5"
                  ><i class="el-icon-star-on"></i><i class="el-icon-star-on"></i
                  ><i class="el-icon-star-on"></i><i class="el-icon-star-on"></i
                  ><i class="el-icon-star-on"></i
                ></span>
                <span v-if="scope.row.star == 6"
                  ><i class="el-icon-star-on"></i><i class="el-icon-star-on"></i
                  ><i class="el-icon-star-on"></i><i class="el-icon-star-on"></i
                  ><i class="el-icon-star-on"></i><i class="el-icon-star-on"></i
                ></span>
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="发布时间"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column label="操作" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
            <el-button
              size="mini"
              type="success"
              @click="handleWatch(scope.$index, scope.row)"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="block" v-if="this.flag === false">
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
      <div v-if="this.flag === 'see'">
        <el-button type="primary" @click="back">返回</el-button>
        <footer>
          <h2>{{ form.title }}</h2>
          <h1><span>摘要：</span>{{ form.abstract }}</h1>
          <p>{{ date }}</p>
        </footer>
        <el-card class="box-card">
          <mavon-editor
            :value="text"
            defaultOpen="preview"
            :subfield="false"
            :toolbarsFlag="false"
            :boxShadow="false"
          ></mavon-editor>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Published",
  components: {},
  props: {},
  data() {
    return {
      text: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value: "",
      id: "",
      date: "",
      articleData: [],
      currentPage1: 1,
      input: "",
      val1: 10,
      val2: 1,
      length: 0,
      flag: false,
      form: {
        title: "",
        region: "",
        delivery: false,
        type: [],
        desc: "",
        star: "",
        source: "",
        category: "",
        author: "",
        abstract: ""
      }
    };
  },
  methods: {
    back() {
      this.flag = false;
    },
    push() {
      if (this.date === "") {
        this.date = new Date();
      }
      this.$axios
        .req("/api/article/update", {
          id: this.id,
          title: this.form.title,
          abstract: this.form.abstract,
          author: this.form.author,
          category: this.form.category,
          source: this.form.source,
          star: this.form.star,
          text: this.value,
          date: this.date
        })
        .then(res => {
          console.log(res.data);
          console.log(this.id);
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.$axios
            .req("api/article/allArticle")
            .then(res => {
              this.articleData = res.data.data;
            })
            .catch(e => {
              console.log(e);
            });
          this.flag = false;
        })
        .catch(e => {
          console.log(e);
        });
    },
    indexMethod(index) {
      return index + 1;
    },
    handleSizeChange(val) {
      this.val1 = val;
    },
    handleCurrentChange(val) {
      this.val2 = val;
    },
    handleEdit(index, row) {
      console.log(row);
      this.flag = true;
      this.value = row.text;
      this.form.title = row.title;
      this.form.abstract = row.abstract;
      this.form.star = row.star;
      this.form.author = row.author;
      this.form.category = row.category;
      this.form.source = row.source;
      this.id = row._id;
    },
    handleDelete(index, row) {
      // 不能用？？
      // this.articleData.splice(index, 1);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .req("/api/article/delete", { _id: row._id })
            .then(res => {
              console.log(res);
              this.$axios
                .req("api/article/allArticle")
                .then(res => {
                  this.articleData = res.data.data;
                })
                .catch(e => {
                  console.log(e);
                });
            })
            .catch(e => {
              console.log(e);
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
    },
    handleWatch(index, row) {
      console.log(index, row);
      (this.flag = "see"),
        (this.form.title = row.title),
        (this.form.abstract = row.abstract),
        (this.form.author = row.author),
        (this.form.category = row.category),
        (this.date = row.date);
      this.text = row.text;
      // this.$axios
      //   .req("/api/article/article", { id: row._id })
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch(e => {
      //     console.log(e);
      //   });
    },
    getArticle() {
      this.$axios
        .req("api/article/allArticle")
        .then(res => {
          this.articleData = res.data.data;
          // console.log(res.data.data);
          // this.articleData.map(item => {
          //   console.log(item.date);
          //   item.date = this.$moment(item.date).format(
          //     "YYYY年MM月DD日HH点mm分ss秒"
          //   );
          //   console.log(item.date);
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
  computed: {},
  watch: {
    articleData(val) {
      console.log(val);
      this.length = val.length;
    }
  },
  directives: {}
};
</script>

<style scoped lang="scss">
.textbtn1 {
  margin: 20px;
}
.textbtn {
  width: 300px;
  line-height: 30px;
  display: inline-block;
}
.foot6 {
  display: flex;
  justify-content: space-around;
}
.form_ {
  display: flex;
}
.block_ {
  margin: 0 30px;
}
.btn2 {
  margin-left: 1500px;
  margin-bottom: 20px;
}
.article footer {
  text-align: center;
}
</style>
