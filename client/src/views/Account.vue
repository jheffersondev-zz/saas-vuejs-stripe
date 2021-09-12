<template>
  <Navbar />
  <router-view :key="$route.fullPath"></router-view>
</template>

<script>
import Navbar from '../components/Account/Navbar.vue'
export default {
  components: {
    Navbar,
  },
}
</script>

<style>
</style>