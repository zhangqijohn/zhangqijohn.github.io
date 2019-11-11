<template>
  <a-layout-sider class="sider" width="180">
    <setting-item title="导航设置">
      <img-checkbox-group @change="setLayout">
        <img-checkbox :img="require('../../assets/img/side.svg')" :checked="true" value="side"/>
        <img-checkbox :img="require('../../assets/img/head.svg')" value="head"/>
      </img-checkbox-group>
    </setting-item>
  </a-layout-sider>
</template>

<script>
import SettingItem from './SettingItem'
import ImgCheckbox from '../checkbox/ImgCheckbox'

const ImgCheckboxGroup = ImgCheckbox.Group

export default {
  name: 'Setting',
  components: {ImgCheckboxGroup, ImgCheckbox, SettingItem},
  computed: {
    multipage () {
      return this.$store.state.setting.multipage
    }
  },
  methods: {
    setTheme (values) {
      this.$store.commit('setting/setTheme', values[0])
    },
    setLayout (values) {
      this.$store.commit('setting/setLayout', values[0])
    },
    setMultipage (checked) {
      this.$store.commit('setting/setMultipage', checked)
    }
  }
}
</script>

<style lang="less" scoped>
  .sider{
    background-color: #fff;
    height: 100%;
    padding: 24px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;
    position: relative;
    .flex{
      display: flex;
    }
  }
</style>
