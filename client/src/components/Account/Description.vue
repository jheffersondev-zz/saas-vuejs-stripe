<template>
  <a-card>
    <h1>{{this.$store.getters.$GetUser.name}}</h1>
    <br>
    <div class="decriptionBox">
      <span>
        <MailOutlined /> {{this.$store.getters.$GetUser.email}}
      </span><br>
    </div>
  </a-card>
</template>

<script>
import { MailOutlined } from '@ant-design/icons-vue'
export default {
  components: {
    MailOutlined,
  },
}
</script>

<style scoped>
h1 {
  color: #7d7d7d;
  font-size: 17px;
}
.decriptionBox {
  text-align: left;
}
</style>