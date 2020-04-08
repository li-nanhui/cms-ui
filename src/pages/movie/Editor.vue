<template>
  <div>
     <el-button type="primary" size="small" @click="back" round>返回</el-button>
    <el-form :model="form" :rules="rules "ref="form"  label-width="80px" class="demo-ruleForm">
      <el-form-item label="所属栏目">
        <el-select v-model="form.categoryId" placeholder="请选择栏目">
          <el-option label="科幻" value="3"></el-option>
          <el-option label="喜剧" value="4"></el-option>
          <el-option label="战争" value="5"></el-option>
          <el-option label="剧情" value="6"></el-option>
          <el-option label="动作" value="7"></el-option>
        </el-select>
      </el-form-item> 
      <el-form-item label="标题" prop="name">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      
      <el-form-item label="简介" prop="desc">
        <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 200}" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" round>发布</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import request from '@/utils/request'
import qs from 'querystring'
export default {
  data(){
    return {
      form:{

      },
      rules: {
          name: [
            { required: true, message: '请输入电影名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          categoryId: [
            { required: true, message: '请选择栏目', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写简介', trigger: 'blur' }
          ]
        }
      }
    },
  created(){
    this.form = this.$route.query;
  },
  methods:{
    back(){
      this.$router.go(-1);
    },
    onSubmit(){
      // 交互
      request.request({
        url:"/movie/saveOrUpdate",
        method:"post",
        headers:{
          "Content-Type":"application/x-www-form-urlencoded"
        },
        data:qs.stringify(this.form)
      })
      .then(response =>{
        // 提示成功
        this.$message({
          message: response.message,
          type: 'success'
        });
        // 返回列表页
        this.back();
      })
    }
  }
}
</script>

<style scoped>

</style>