<template>
  <a-card>
    <template #title>
      <h1>
        <CreditCardOutlined />&nbsp; Payment method
      </h1>
    </template>
    <a-spin
      tip="Loading details"
      :spinning="loading"
    >
      <div v-if="loading == false">
        <div v-if="hasActiveSubscription">
          <a-tag>{{pm.card.brand.toUpperCase()}}</a-tag>
          **** **** **** {{pm.card.last4}}
        </div>
        <a-empty
          v-else
          description="You don't have payment methods added"
        />
      </div>

    </a-spin>
  </a-card>
</template>

<script>
import axios from 'axios'
import { API_URL } from '@/config.json'
import { CreditCardOutlined } from '@ant-design/icons-vue'

export default {
  created() {
    let userSubscriptionId =
      this.$store.getters.$GetUser.stripe.stripeSubscriptionId

    if (userSubscriptionId != null || userSubscriptionId != undefined) {
      this.hasActiveSubscription = true

      axios({
        method: 'GET',
        url: `${API_URL}/payment-methods`,
        headers: {
          Authorization: `Bearer ${this.$store.getters.$GetToken}`,
        },
      })
        .then((res) => {
          let defaultPMethod = res.data.paymentMethods.data[0]
          this.pm = defaultPMethod
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
        .finally(() => {
          this.loading = false
        })
    } else {
      this.loading = false
    }
  },

  data() {
    return {
      loading: true,
      hasActiveSubscription: false,
      pm: null,
    }
  },

  components: {
    CreditCardOutlined,
  },
}
</script>

<style scoped>
h1 {
  color: #189effe0;
  font-size: 19px;
}
</style>