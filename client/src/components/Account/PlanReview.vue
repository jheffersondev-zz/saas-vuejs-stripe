<template>
  <a-card>
    <div v-if="hasActiveSubscription == true && error == null">
      <a-spin
        tip="Loading subscription details"
        :spinning="loading"
      >
        <div v-if="loading == false">
          <a-image
            :width="100"
            :src="planImage"
            :fallback="defaultImage"
            :style="{borderRadius: '100%'}"
            preview="true"
          /><br>

          <h1 class="title">{{subscription.plan.nickname}} - {{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format((subscription.plan.amount / 100))}}</h1>
          <span class="description">

            <a-badge
              status="success"
              v-if="subscription.status =='active'"
            />

            <a-badge
              status="error"
              v-else
            />

            Weekly billed
          </span>

        </div>
      </a-spin>
    </div>

    <div v-else-if="error !== null">
      <a-alert
        :message="error"
        type="error"
      />
    </div>

    <div v-else>
      <a-empty description="You don't have active subscriptions" />
      <a-button
        type="primary"
        @click="startSubscription"
      >Subscribe now</a-button>
    </div>

  </a-card>
</template>

<script>
import axios from 'axios'
import { API_URL } from '@/config.json'
import PremiumImage from '@/assets/images/Premium.jpg'
import MediumImage from '@/assets/images/Medium.jpg'
import StarterImage from '@/assets/images/Starter.jpg'

export default {
  created() {
    let userSubscriptionId =
      this.$store.getters.$GetUser.stripe.stripeSubscriptionId

    if (userSubscriptionId != null || userSubscriptionId != undefined) {
      this.hasActiveSubscription = true

      axios({
        method: 'GET',
        url: `${API_URL}/subscription`,
        headers: {
          Authorization: `Bearer ${this.$store.getters.$GetToken}`,
        },
      })
        .then((res) => {
          this.subscription = res.data.subscription
          let planId = res.data.subscription.plan.id
          switch (planId) {
            case 'price_1JPf1sGywnxGFLObvjVe3rja': //premium
              this.planImage = PremiumImage
              break

            case 'price_1JPf1sGywnxGFLObCsUy55tY': //medium
              this.planImage = MediumImage
              break

            case 'price_1JPf1sGywnxGFLOb48TWkHJL': //starter
              this.planImage = StarterImage
              break
          }
        })
        .catch((err) => {
          this.error = err
          console.log(err)
          this.$message.error(err.message)
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  data() {
    return {
      loading: true,
      hasActiveSubscription: false,
      subscription: [],
      error: null,
      planImage: '',
      defaultImage: '',
    }
  },
  methods: {
    startSubscription() {
      this.$router.push({ path: '/checkout' })
    },
  },
}
</script>

<style scoped>
h1 {
  margin-top: 30px;
  line-height: 9px;
  color: #189effe0;
  font-size: 19px;
}
</style>