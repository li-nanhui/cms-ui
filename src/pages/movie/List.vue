<template>
   <div>
     <el-button type="primary" size="small" 
     @click="toPublishMovie"  round>
     发布资讯</el-button>

     <el-table
    :data="tableData"
    style="width: 100%"
    height="400">
    <el-table-column
      fixed
      prop="id"
      label="编号"
      width="100">
    </el-table-column>
    <el-table-column
      prop="title"
      label="电影标题"
      width="180">
    </el-table-column>
    <el-table-column
      prop="authorId"
      label="发布者id"
      width="100">
    </el-table-column>
    <el-table-column
      prop="category.name"
      label="所属栏目"
      width="100">
    </el-table-column>
    <el-table-column
      prop="publishTime"
      label="发布时间"
      width="150">
    </el-table-column>
    <el-table-column
      prop="status"
      label="审核状态"
      >
    </el-table-column>
    <el-table-column
      prop="readTimes"
      label="浏览次数"
      >
    </el-table-column>

    <el-table-column
      fixed="right"
      label="操作"
      width="150">
      <template slot-scope="scope">
        <el-button @click="toDeleteMovie(scope.row.id)" type="text" size="small">删除</el-button>
        <el-button @click="toLook(scope.row)" type="text" size="small">查看</el-button>
        <el-button @click="toEditMovie(scope.row)" type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>

  </el-table>
   </div>
</template>

<script>
import request from '@/utils/request'
export default {
    //模板中要用到的变量
   data(){
       return{
           tableData:[]
       }
   },
//声明周期钩子函数
created(){
    //查询所有资讯信息
    // request.get("http://localhost:8989/movie/cascadeFindAll")
    // .then(response =>{
    //     this.tableData = response.data;
    // })
    this.reloadData();
},
//方法，模板中要用到的方法
methods:{
   toPublishMovie(){
       //跳转页面
       this.$router.push({
         path:'/movie/editor'})
   },
    toEditMovie(row){
      this.$router.push({
        path:'/movie/editor',
        query:row
      })
    },
    toLook(row){
      this.$router.push({
        path:'/movie/look',
        query:row
      })
    },
    reloadData(){
      let url = "/movie/cascadeFindAll"
      request.get(url).then(response => {
        this.tableData = response.data;
      })
    },
    toDeleteMovie(id){
      this.$confirm('此操作将永久删除该资讯, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let url = "/movie/deleteById"
        request.get(url,{params:{id}})
        .then(response=>{
          this.$message({
            type: 'success',
            message: response.message
          });
          // 重载数据
          this.reloadData();
        })
      })
    }
  }
}
</script>

<style scoped>

</style>