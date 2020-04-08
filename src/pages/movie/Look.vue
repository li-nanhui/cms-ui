<template>
  <div>
    <!-- <div class="block">
      <span class="demonstration"></span>
      <el-image :src="require('@/assets/images/'+xjcy+'.png')"></el-image> 
    </div>-->

    <el-button type="primary" size="medium" @click="back" round>返回</el-button>

    <el-form :label-position="labelPosition" label-width="80px" :model="form">
    <el-form-item >
        <img :src="form.source" style="width: 480px;height: 360px" />
    </el-form-item>
    </el-form>

    <el-form :label-position="labelPosition" label-width="80px" :model="form">
      <el-form-item label="所属栏目">
        <el-input type="textarea" v-model="form.category.name"></el-input>
      </el-form-item>
      <el-form-item label="电影标题">
        <el-input type="textarea" v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 200}" v-model="form.content"></el-input>
      </el-form-item>
    </el-form>

    <el-table :data="tableData.comments" height="250" stripe style="width: 100%">
      <el-table-column prop="id" label="id" fit="true"></el-table-column>
      <el-table-column prop="content" label="评论" fit="true"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import request from "@/utils/request";
import qs from "querystring";

export default {
  /*  props: ['source'],
  computed: {
     imgUrl: function(){
       return require(form.source)
     }
  }, */
  data() {
    return {
      form: {},
      tableData: []
    };
  },
  created() {
    this.form = this.$route.query;
    this.tableData = this.$route.query;
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
</style>

