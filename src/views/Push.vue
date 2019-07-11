<template>
  <div class="Push">
    <el-card class="box-card">
      <div v-if="this.flag === true">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div class="head6">
            <el-button type="primary" @click="see">查看</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >发布</el-button
            >
          </div>
          <el-form-item label="文章标题" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="文章摘要" prop="abstract">
            <el-input v-model="ruleForm.abstract"></el-input>
          </el-form-item>
          <div class="form_">
            <el-form-item label="作者" prop="author">
              <el-input v-model="ruleForm.author"></el-input>
            </el-form-item>
            <el-form-item label="类目" prop="category">
              <el-select v-model="ruleForm.category" placeholder="类目">
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
              <el-select v-model="ruleForm.source" placeholder="来源">
                <el-option label="原创" value="原创"></el-option>
                <el-option label="转载" value="转载"></el-option>
                <el-option label="合作" value="合作"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="重要性" prop="star">
              <el-select v-model="ruleForm.star" placeholder="重要性">
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
        <br />
        <!--        <el-button type="primary" @click="submitForm('ruleForm')"-->
        <!--          >立即创建</el-button-->
        <!--        >-->
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <br /><br />
        <div id="Push">
          <mavon-editor v-model="value" />
        </div>
      </div>
      <div v-else>
        <el-button type="primary" @click="back">返回</el-button>
        <footer>
          <h2>{{ ruleForm.title }}</h2>
          <h1>
            <span v-show="ruleForm.abstract">摘要：</span
            >{{ ruleForm.abstract }}
          </h1>
          <p>{{ date }}</p>
        </footer>
        <el-card class="box-card">
          <!--          编辑页面-->
          <mavon-editor
            :value="value"
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
  name: "Push",
  components: {},
  props: {},
  data() {
    return {
      date: "",
      flag: true,
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
      ruleForm: {
        title: "",
        region: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        star:''
      },
      rules: {
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        author: [
          { required: true, message: "请输入作者", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        abstract: [
          { required: true, message: "请输入文章摘要", trigger: "blur" },
          { min: 3, max: 60, message: "长度在 3 到 60 个字符", trigger: "blur" }
        ],
        category: [
          { required: true, message: "请选择类目", trigger: "change" }
        ],
        source: [{ required: true, message: "请选择来源", trigger: "change" }],
        star: [{ required: true, message: "请选择重要性", trigger: "change" }]
      },
      value: ""
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          this.postArticle();
        } else {
          this.$message({
            message: "创建失败，请输入所有内容",
            type: "error"
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    see() {
      this.flag = false;
    },
    back() {
      this.flag = true;
    },
    postArticle() {
      if (this.date === "") {
        this.date = new Date();
      }
      this.$axios
        .req("/api/article/create", {
          title: this.ruleForm.title,
          abstract: this.ruleForm.abstract,
          author: this.ruleForm.author,
          category: this.ruleForm.category,
          source: this.ruleForm.source,
          star: this.ruleForm.star,
          text: this.value,
          date: this.$moment(this.date).format("YYYY年MM月DD日hh时mm分ss秒")
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 200) this.$router.push("/Published");
          this.$message({
            message: "创建成功",
            type: "success"
          });
          if (res.data.code === 500)
            this.$message({
              message: "创建失败，请输入所有内容",
              type: "error"
            });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    // this.pushArticle();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.head6 {
  height: 70px;
  background-color: pink;
}
.head6 .el-button {
  float: right;
  margin: 15px;
}
.form_ {
  display: flex;
}
.block_ {
  margin: 0 30px;
}
.Push footer {
  text-align: center;
}
</style>
