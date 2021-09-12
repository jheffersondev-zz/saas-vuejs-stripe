<template>
  <a-layout-header class="header">
    <a-menu
      theme="light"
      mode="horizontal"
      :selectedKeys="selectedKeys"
    >

      <a-menu-item @click="AccountPage">
        <a-avatar
          shape="square"
          size="medium"
          :style="{ backgroundColor: '#f0f2f5', color: '#1890ff', verticalAlign: 'middle' }"
        >
          {{letter}}
        </a-avatar>

        <b>
          &nbsp;{{firstName}}
        </b>

      </a-menu-item>

      <div
        class="nav-right"
        @click="Logout"
      >
        <a-menu-item key="Home">
          <LogoutOutlined /> Logout
        </a-menu-item>
      </div>

    </a-menu>

  </a-layout-header>
</template>

<script >
import { LogoutOutlined } from '@ant-design/icons-vue'
export default {
  mounted() {
    this.letter = this.$store.getters.$GetUser.name.charAt(0)
    this.firstName = this.$store.getters.$GetUser.name.split(' ')[0]
  },
  data() {
    return {
      selectedKeys: ['name'],
      letter: '',
      firstName: '',
    }
  },
  methods: {
    AccountPage() {
      this.$router.push({ path: '/account' })
    },
    Logout() {
      this.$store.dispatch('Logout')
      this.$router.push({ path: '/login' })
    },
  },
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
.header .nav-right {
  color: #1890ff;
  position: absolute;
  right: 0;
}
.router-link-active {
  border-bottom: 1px solid;
}
</style>