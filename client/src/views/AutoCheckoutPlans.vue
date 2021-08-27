<template>
  <a-layout>
    <stripe-checkout
      ref="checkoutRef"
      mode="subscription"
      :pk="publishableKey"
      :line-items="lineItems"
      :success-url="successURL"
      :cancel-url="cancelURL"
      @loading="v => loading = v"
    />
    <a-layout-header>
      hhh
    </a-layout-header>
    <br>
    <a-layout-content style="margin: 50px;">

      <a-typography-title :level="2">Our subscription plans</a-typography-title>
      <a-typography-paragraph style="font-size: 15px;">
        Now you no longer need to go to one of our physical locations, start a subscription now and receive a daily or weekly special basket ❤️
      </a-typography-paragraph>
      <br>

      <a-row>
        <a-col
          v-for="plan in plans"
          :key="plan"
          :xs="{
            span: 22,
            offset: 1,   
          }"
          :md="{
            span: 5,
            offset: 2,   
          }"
        >
          <a-card
            hoverable
            style="width: 100%; margin: 10px;"
          >
            <template #cover>
              <img
                :alt="plan.name"
                :src="plan.image"
                style="height: 230px;"
              />
            </template>
            <a-card-meta :title="`${plan.name} - $${plan.price} Weekly`">
              <template #description>
                <p>
                  description here
                </p>
                <a-button
                  type="primary"
                  @click="submit(plan.stripePriceId)"
                >
                  Subscribe now
                </a-button>
              </template>
            </a-card-meta>
          </a-card>

        </a-col>
      </a-row>
    </a-layout-content>

    <br>
  </a-layout>
</template>

<script>
import { StripeCheckout } from '@vue-stripe/vue-stripe'
export default {
  components: {
    StripeCheckout,
  },
  data() {
    this.publishableKey =
      'pk_test_51IS6skGywnxGFLOb7c4ddZRBzuMWr3bxouJdumrRMWcgt0KUoyuZd1GNbnz7RuFZcUkia08dxJOpZgNS9FWtJeRu00Wl3bNZmr'
    return {
      loading: false,
      lineItems: [],
      successURL: 'http://localhost/checkout/success',
      cancelURL: 'http://localhost/auto-checkout-plans',
      plans: [
        {
          stripePriceId: 'price_1JPf1sGywnxGFLOb48TWkHJL',
          name: 'Starter',
          price: 25.0,
          recurrencyDate: 'Monthly',
          image:
            'https://images.squarespace-cdn.com/content/v1/55a057e8e4b0a8ce00fe78f6/1605826162900-RLNQVK2ZGLZUD93FG48S/DSC09261-2.jpg?format=1000w',
        },
        {
          stripePriceId: 'price_1JPf1sGywnxGFLObCsUy55tY',
          name: 'Medium',
          price: 35.0,
          recurrencyDate: 'Monthly',
          image:
            'https://cdn1.harryanddavid.com/wcsstore/HarryAndDavid/images/catalog/20_32086_30W_01ex.jpg',
        },
        {
          stripePriceId: 'price_1JPf1sGywnxGFLObvjVe3rja',
          name: 'Premium',
          price: 45.0,
          recurrencyDate: 'Monthly',
          image:
            'http://cdn1.harryanddavid.com/wcsstore/HarryAndDavid/images/feed/std/16_24448_30e_01e_400.jpg',
        },
      ],
    }
  },
  methods: {
    submit(priceId) {
      this.lineItems.push({
        price: priceId, // The id of the one-time price you created in your Stripe dashboard
        quantity: 1,
      })
      this.$refs.checkoutRef.redirectToCheckout()
    },
  },
}
</script>