<template>
  <main>
    <nav>
      <a v-for="route in routes" :key="route.name" :item="route" :base-path="route.path"></a>
    </nav>
    <section>

    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Layout',
  computed: {
    ...mapGetters([
      'routes'
    ])
  }
}
</script>

<style scoped>

</style>
