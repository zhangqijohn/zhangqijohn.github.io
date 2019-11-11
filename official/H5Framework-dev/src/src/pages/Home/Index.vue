<template>
    <div class="app-container">
        <h1 class="title">hello {{title}}</h1>
        <div class="news">
            <h2 class="title">新闻列表</h2>
            <ul>
                <li
                        v-for="(item, index) in list"
                        :key="index"
                >
                    {{(index+1) +'、'+item}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { getNews } from "@/api/news";

    export default {
        data () {
            return {
                title: 'vue.js',
                list: []
            }
        },
        mounted () {
            this.handleNews()
        },
        methods: {
          handleNews () {
              getNews()
                  .then(response => {
                      const body = response.body
                      this.title = body.title
                      this.list = body.list
                      console.log(body)
                  })
          }
        }
    }
</script>

<style scoped>
.title {
    padding: 12px 0;
}
.news li{
    line-height: 24px;
    background: #eee;
    margin-bottom: 12px;
}
</style>