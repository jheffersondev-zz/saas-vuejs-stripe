<template>
  <a-layout-header class="header">
    <a-menu
      theme="light"
      mode="horizontal"
    >
      <router-link :to="{ name: 'Home'}">
        <a-menu-item key="Home">
          <LogoutOutlined /> Logout
        </a-menu-item>
      </router-link>
    </a-menu>
  </a-layout-header>
</template>

<script >
import { LogoutOutlined } from '@ant-design/icons-vue'
export default {
  components: {
    LogoutOutlined,
  },
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,600;1,200;1,700&display=swap');

.header {
  background-color: #fff !important;
  font-family: 'Nunito', sans-serif;
}
.router-link-active {
  border-bottom: 1px solid;
}
</style>