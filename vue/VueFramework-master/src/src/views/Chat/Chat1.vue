<template>
  <div>
    <div class="scrollWrap">
      <div class="scroll-content" :style="{ top }" @mouseenter="Stop()" @mouseleave="Up()">
        <p v-for="(item,i) in prizeList" :ref="prizeList" :key="i" :class="item.id" class="plist"><span :href="item.src">{{item.name}}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Chat1',
  data () {
    return {
      prizeList: [
        {'name': '这是第1条新增数据', src: 'http://www.railunique.com', id: 'a1'},
        {'name': '这是第2条新增数据', src: 'http://www.railunique.com', id: 'a2'},
        {'name': '这是第3条新增数据这是第3条新增数据这是第3条新增数据这是第3条新增数据这是第3条新增数据', src: 'http://www.railunique.com', id: 'a3'},
        {'name': '这是第4条新增数据这是第4条新增数据', src: 'http://www.railunique.com', id: 'a4'},
        {'name': '这是第6条新增数据,兰州地铁招标信息兰州地铁招标信息兰州地铁招标信息兰州地铁招标信息，兰州地铁招标信息兰州地铁招标信息兰州地铁招标信息', src: 'http://www.railunique.com', id: 'a5'},
        {'name': '这是第7条新增数据这是第7条新增数据这是第7条新增数据这是第7条新增数据', src: 'http://www.railunique.com', id: 'a6'}
      ],
      activeIndex: 0,
      intnum: undefined,
      top: 0,
      topVaule: 0,
      time: '.6s'
    }
  },
  created () {
    for (let x = 0, mx = 3000; x < mx; x++) {
      this.prizeList.push({'name': '这是第几条新增数据' + x, 'src': '11234564', 'id': 'a' + x})
    }
    window.addEventListener('scroll', this.handleScroll, true)
  },
  mounted () {
    this.ScrollUp()
    this.adddate()
  },
  methods: {
    handleScroll () {
      console.log('鼠标滚动了')
      clearInterval(window.intnum)
    },
    adddate () {
      // let num = 3000
      // setInterval(() => {
      //   num++
      //   this.prizeList.push({'name': '这是第几条新增数据' + num, 'src': '11234564', 'id': 'a' + num})
      // }, 6000)
    },
    ScrollUp () {
      window.intnum = setInterval(_ => {
        if (this.activeIndex < this.prizeList.length) {
          this.activeIndex += 1
        } else {
          this.activeIndex = 0
        }
        this.topVaule = parseInt(this.topVaule) + parseInt((window.getComputedStyle(document.querySelector('.a' + this.activeIndex)).height).replace(/px$/, '')) + 20

        this.top = -this.topVaule + 'px'

        console.log(this.activeIndex)
      }, 1000)
    },
    Stop () {
      clearInterval(window.intnum)
    },
    Up () {
      clearInterval(window.intnum)
    }
  }
}
</script>

<style scoped>
  p{padding: 0;margin: 0}
  .scrollWrap{ width:150px;height: 150px; overflow: auto; }
  .scroll-content { position: relative; transition: top .5s; }
  .scroll-content p{ line-height:25px; text-align: center;padding: 10px 0;}
</style>
