<template>
  <el-select v-model="value" placeholder="请选择"      @change="selectCityType">
    <el-option-group
      v-for="group in options3"
      :key="group.label"
      :label="group.label"
    >
      <el-option
        v-for="item in group.options"
        :key="item.value"
        :label="item.label"
        :value="item.label+ ',' + group.label"
      >
      </el-option>
    </el-option-group>
  </el-select>
</template>

<script>
export default {
  name: 'selectApp',
  data () {
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
          value: 'Dalian',
          label: '大连'
        }]
      }],
      value: '',
      text1: '',
      text2: ''
    }
  },
  methods: {
    selectCityType (val) {
      this.text1 = val.split(',')[0]
      this.text2 = val.split(',')[1]
      console.log(this.text1,this.text2)
    }
  }

}
</script>

<style scoped>

</style>
