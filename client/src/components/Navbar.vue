<template>
  <a-layout-header class="header">
    <a-menu
      theme="light"
      mode="horizontal"
    >
      <router-link :to="{ name: 'Home'}">
        <a-menu-item key="signin">Home</a-menu-item>
      </router-link>

      <router-link :to="{ name: 'Login'}">
        <a-menu-item key="signin">Sign in</a-menu-item>
      </router-link>

      <router-link :to="{ name: 'Signup'}">
        <a-menu-item key="signup">Sign up</a-menu-item>
      </router-link>
    </a-menu>
  </a-layout-header>
</template>

<style>
@import url('../assets/css/styles.css');

.header {
  background-color: #fff !important;
  font-family: 'Nunito', sans-serif;
}
.router-link-active {
  border-bottom: 1px solid;
}
</style>