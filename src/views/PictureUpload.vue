<template>
  <div>
    <el-card class="box-card card4">
      <p>支持拖拽</p>
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
      <br /><br />
      <el-button style="margin: 10px;" @click="submitUpload" type="primary"
        >上传到服务器</el-button
      >

      <p>支持裁剪</p>
      <span>vue-img-crop-upload</span>
      <div id="app">
        <el-button type="success" class="btn" @click="toggleShow">设置头像</el-button>
        <my-upload
          field="file"
          @crop-success="cropSuccess"
          @crop-upload-success="cropUploadSuccess"
          @crop-upload-fail="cropUploadFail"
          v-model="show"
          :width="300"
          :height="300"
          url="api/upload"
          :params="params"
          :headers="headers"
          img-format="png"
        ></my-upload>
        <img :src="imgDataUrl" />
      </div>
    </el-card>
  </div>
</template>

<script>
import myUpload from "vue-image-crop-upload";
export default {
  name: "PictureUpload",
  components: { myUpload },
  props: {},
  data() {
    return {
      show: false,
      params: {
        token: '123456798',
        name: 'avatar'
      },
      headers: {
        smail: '*_~'
      },
      imgDataUrl: '' ,// the datebase64 url of created image
      avatar: "",
      // show: false,
      size: 2.1,
      fileList: []
    };
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    /**
     * crop success
     *
     * [param] imgDataUrl
     * [param] field
     */
    cropSuccess(imgDataUrl, field){
      console.log('-------- crop success --------');
      this.imgDataUrl = imgDataUrl;
    },
    /**
     * upload success
     *
     * [param] jsonData   服务器返回数据，已进行json转码
     * [param] field
     */
    cropUploadSuccess(jsonData, field){
      console.log('-------- upload success --------');
      console.log(jsonData);
      console.log('field: ' + field);
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field){
      console.log('-------- upload fail --------');
      console.log(status);
      console.log('field: ' + field);
    },
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
