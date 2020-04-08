<template>
  <div>
    <el-table :data="tableData" style="width: 100%" height="400">
      <el-table-column fixed prop="id" label="编号" width="180"></el-table-column>
      <el-table-column prop="tittle" label="日志标题" width="180"></el-table-column>
      <el-table-column prop="userId" label="发布者id" width="150"></el-table-column>
      <el-table-column prop="actionTime" label="发布时间" width="250"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="toDeleteLog(scope.row.id)" type="text" size="small">删除</el-button>
          <el-button @click="toEditLog(scope.row)" type="text" size="small">查看日志内容</el-button>
        </template>
      </el-table-column>
    </el-table>

     <!-- 模态框 -->
    <el-dialog title="详情" :visible.sync="visible">
      
      <el-form :model="form">
        <el-form-item label="日志标题" label-width="80px">
          <el-input v-model="form.tittle" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="日志内容" label-width="80px">
          <el-input type="textarea" v-model="form.content" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- /模态框 -->
  </div>
</template>

<script>
import request from "@/utils/request"
export default {
  data() {
    return {
      visible:false,
      form:{},
      tableData: []
    };
  },
  created() {
    this.reloadData();
  },
  methods:{
    toEditLog(record){
       // 将要编辑的数据绑定表单中
      this.form = record;
      this.visible = true;
    },
    reloadData(){
      let url = "http://localhost:8989/logs/cascadeFindAll"
      request.get(url).then(response => {
        this.tableData = response.data;
      })
    },
    toDeleteLog(id){
      this.$confirm('此操作将永久删除该日志, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let url = "http://localhost:8989/logs/deleteById"
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