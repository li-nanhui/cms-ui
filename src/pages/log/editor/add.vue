<template>
  <div>
    <el-button type="primary" size="small" @click="back" round>返回</el-button>
    <el-form :model="form" :rules="rules " ref="form" label-width="80px" class="demo-ruleForm">
      <el-form-item label="日志标题" prop="tittle">
        <el-input v-model="form.tittle"></el-input>
      </el-form-item>

      <el-form-item label="日志内容" prop="desc">
        <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 200}" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" round>保存日志</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from "@/utils/request";
import qs from "querystring";
export default {
  data() {
    return {
      form: {},
      rules: {
        tittle: [
          { required: true, message: "请输入日志标题", trigger: "blur" },
        ],
        desc: [{ required: true, message: "请填写日志", trigger: "blur" }]
      }
    };
  },
  created() {
    this.form = this.$route.query;
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    onSubmit() {
      // 交互
      request
        .request({
          url: "/logs/saveOrUpdate",
          method: "post",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: qs.stringify(this.form)
        })
        .then(response => {
          // 提示成功
          this.$message({
            message: response.message,
            type: "success"
          });
          // 返回列表页
          this.back();
        });
    }
  }
};
</script>

<style scoped>
</style>