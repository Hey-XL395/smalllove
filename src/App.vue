<template>
  <div id="app">
    <router-view v-if="$route.path === '/Land'"></router-view>
    <router-view v-else-if="$route.path === '/Register'"></router-view>
    <el-container v-else>
      <el-header><Head></Head></el-header>
      <el-container>
        <el-aside width="200px"><Left></Left></el-aside>
        <el-container>
          <el-main><router-view /></el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Head from "./components/Head";
import Left from "./components/Left";
export default {
  name: "app",
  components: {
    Left,
    Head
  },
  props: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>
<style lang="scss">
@import "./style/common";
* {
  padding: 0;
  margin: 0;
}
.el-header {
  background-color: #2e5e85;
  position: fixed;
  z-index: 9999;
  width: 100%;
  top: 0px;
}
.el-aside {
  background-color: #344055;
  margin-top: 60px;
}
.el-main {
  background-color: #f0f2f5;
  margin-top: 60px;
  height: 100%;
}
</style>
