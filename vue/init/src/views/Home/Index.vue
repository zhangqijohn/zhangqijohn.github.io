<template>
    <div>
      Index
      <div class="" @click="queryMsg">点这里</div>
      <ul>
        <li v-for="i in msgResult">{{i}}</li>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'Index',
  data(){
    return{
      msgResult : [],
      msg:[{//对此数组遍历。                                                                                                                      js
        text:1,  //第一层数据
        sonList:[{
          text:'1-1',//第二层数据
          sonList:[{
            text:'1-1-1', //第三层数据
            text:'1-1-2',
            sonList:[{    //第四层数据
              text:'1-1-1-1',
            },{
              text:'1-1-1-2',
            }]
          }]
        }]
      },{
        text:2,  //第一层数据
      },{
        text:3,   //第一层数据
      }]
    }
  },
  created(){
    let arrResult = []
    function queryList(json, arr) {
      for (var i = 0; i < json.length; i++) {
        var sonList = json[i].sonList;
        if (sonList.length == 0) {
          arr.push(json[i]);
        } else {
          queryList(sonList, arr);
        }
      }
      return arr;
    }
  },
  methods: {
    queryMsg (){
      this.msgResult = queryList(this.msg,arrResult)
    },
  }

}
</script>

<style scoped>

</style>
