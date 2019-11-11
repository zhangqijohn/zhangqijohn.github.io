<template>
  <div>
    <el-form-item label="开始时间" prop="startTime" >
      <el-date-picker v-model="form.startTime"  format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" clearable style="width: 100%"
                      :picker-options="startDatePicker" :disabled="dialogStatus=='view'" type="datetime"  :placeholder="dialogStatus=='view'?'':'请输入订阅开始时间'"></el-date-picker>
    </el-form-item>
    <el-form-item label="结束时间" prop="endTime">
      <el-date-picker v-model="form.endTime"  format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" clearable style="width: 100%"
                      :picker-options="endDatePicker"  :disabled="dialogStatus=='view'" type="datetime"  :placeholder="dialogStatus=='view'?'':'请输入订阅结束时间'"></el-date-picker>
    </el-form-item>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        form:{
          startTime:"",
          startDatePicker:"",// this.beginDate(),
          endDatePicker:"",// this.processDate()
        },
        dialogStatus:''
      }
    },
    // methods:{
    //     beginDate(){
    //         const self = this
    //         return {
    //             disabledDate(time){
    //                 if (self.form.endTime) {  //如果结束时间不为空，则小于结束时间
    //                     return new Date(self.form.endTime).getTime() < time.getTime()
    //                 } else {
    //                     // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
    //                 }
    //             }
    //         }
    //     },
    //     processDate() {
    //         const  self = this
    //         return {
    //             disabledDate(time) {
    //                 if (self.form.startTime) {  //如果开始时间不为空，则结束时间大于开始时间
    //                     return new Date(self.form.startTime).getTime() > time.getTime()
    //                 } else {
    //                     // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
    //                 }
    //             }
    //         }
    //     },
    //     // pickerOptions0: { //只可以选择今天以及今天以后的时间：
    //     //     disabledDate(time) {
    //     //         return time.getTime() < Date.now() - 8.64e7;//8.64e7=1000*60*60*24一天
    //     //     }
    //     // }
    // }
  }
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.el-select-dropdown{
  width: 100px;
}
</style>
