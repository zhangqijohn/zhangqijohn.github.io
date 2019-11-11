<template>
  <a-dropdown class="dropdown-item" >
    <div>
      <a-avatar class="avatar" size="small" shape="circle" :src="avatar"/>
      <span>{{userInfo.name}}</span>
    </div>
    <a-menu style="width: 100px;" slot="overlay">
      <a-menu-item>
        <div @click="logout()">
          <a-icon type="poweroff" />
          <span>退出登录</span>
        </div>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import { mapGetters } from 'vuex'
import { logout } from '@/api/user'
export default {
  name: 'HeaderAvatar',
  computed: {
    ...mapGetters([
      'userInfo',
      'avatar'
    ])
  },
  methods: {
    logout () {
      logout().then(response => {
        window.location.href = response.message + window.location.href + window.location.hash
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .avatar{
    margin: 20px 4px 20px 0;
    color: #1890ff;
    background: hsla(0,0%,100%,.85);
    vertical-align: middle;
  }
  .dropdown-item {
    display: inline-block;
    height: 100%;
    vertical-align: initial
  }
</style>
