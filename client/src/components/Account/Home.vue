<template>
  <a-layout>
    <div class="content">
      <a-row>
        <a-col
          :lg="{span: 8, offset: 2}"
          :md="{span: 9, offset: 1}"
        >
          <div class="left">
            <PlanReview class="card" />
            <Description class="card" />
          </div>
        </a-col>
        <a-col
          :lg="12"
          :md="{span: 9, offset: 1}"
        >
          <div class="right">
            <PaymentMethod class="card" />
            <History class="card" />
          </div>
        </a-col>
      </a-row>

    </div>
  </a-layout>
</template>

<script>
import Description from './Description.vue'
import PlanReview from './PlanReview.vue'
import History from './History.vue'
import PaymentMethod from './PaymentMethod.vue'

export default {
  components: {
    PlanReview,
    Description,
    History,
    PaymentMethod,
  },
}
</script>

<style scoped>
* {
  font-family: 'Nunito', sans-serif;
}
.content {
  margin: 10px;
}
.content .left {
  margin: 0 auto;
  text-align: center;
}
.content .right {
  margin: 0 auto;
}
.card {
  margin: 30px;
}
</style>