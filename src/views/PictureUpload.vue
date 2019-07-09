<template>
  <div>
    <el-card class="box-card card4">
      <p>支持裁剪</p>
      <span>Element UI</span>
      <el-upload
        class="upload-demo"
        drag
        action="/api/upload"
        multiple
        ref="upload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
      <p>支持裁剪</p>
      <span>vue-img-crop-upload</span>
      <el-button style="margin: 10px;"  @click="submitUpload" type="primary">上传到服务器</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "PictureUpload",
  components: {},
  props: {},
  data() {
    return {
      fileList: []
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
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
.card4 p {
  font-size: 30px;
  margin: 20px 20px;
}
.card4 span {
  display: block;
  background-color: pink;
  line-height: 40px;
  width: 80%;
  margin-bottom: 20px;
  padding: 10px;
  text-indent: 2em;
}
</style>
