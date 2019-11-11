<template>
  <el-select v-model="value7" placeholder="请选择"      @change="selectCityType">
    <el-option-group
      v-for="group in options3"
      :key="group.label"
      :label="group.label"
    >
      <el-option
        v-for="item in group.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-option-group>
  </el-select>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      options3: [{
        label: '热门城市',
        options: [{
          value: 'Shanghai',
          label: '上海'
        }, {
          value: 'Beijing',
          label: '北京'
        }]
      }, {
        label: '城市名',
        options: [{
          value: 'Chengdu',
          label: '成都'
        }, {
          value: 'Shenzhen',
          label: '深圳'
        }, {
          value: 'Guangzhou',
          label: '广州'
        }, {
          value: 'Dalian1',
          label: '大连1'
        }, {
          value: 'Dalian2',
          label: '大连2'
        }, {
          value: 'Dalian3',
          label: '大连3'
        }]
      }],
      value7: ''
    }
  },
  methods:{
    selectCityType () {
      console.log(this.value7)
    },
  }

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
