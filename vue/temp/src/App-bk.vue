<template>
  <div id="app">
    <firstChild></firstChild>
    <secondChild></secondChild>
  </div>
</template>

<script>
  import firstChild from './page/firstChild';
  import firstChild from './page/secondChild';
export default {
  name: 'App',
  components:{firstChild,secondChild}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
