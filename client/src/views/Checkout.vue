<template>
  <Navbar />
  <a-layout>
    <div class="content">
      <a-card class="payment-information-card">
        <br>
        <a-steps
          :current="1"
          size="small"
        >
          <a-step title="Account" />
          <a-step title="Payment" />
          <a-step title="Review" />
        </a-steps>
        <br>

        <a-divider type="horizontal" />

        <a-spin
          tip="Processing payment"
          :spinning="loading"
        >
          <a-form
            :model="formState"
            :rules="rules"
            ref="formReference"
            spellcheck="false"
          >
            <!-- <h1>Payment Details</h1> -->

            <a-form-item
              name="name"
              ref="name"
              class="form-item"
            >
              <label>Full name</label>
              <a-input
                class="input"
                v-model:value="formState.name"
              />
            </a-form-item>

            <a-form-item
              name="address"
              ref="address"
              class="form-item"
            >
              <label>Shipping zipcode</label>
              <a-input
                class="input"
                v-model:value="formState.address"
              />
            </a-form-item>

            <label class="stripe-elements-label">Card details</label>
            <div
              ref="stripeCard"
              class="stripe-card"
            ></div>
            <br>
          </a-form>
        </a-spin>
      </a-card>

      <a-card class="order-summary-card">
        <br>
        <br>
        <!-- <h1>Order summary</h1> -->
        <a-card title="Plan Summary">
          <div>
            <span class="plan-name">{{plan.name}}</span>
            <span class="plan-price">$ {{plan.price}}</span>
          </div>
          <span class="recurrency-plan-period">Billed {{plan.recurrencyDate}}</span>

          <a-divider type="horizontal" />
          <div>
            <span class="plan-name">Delivery</span>
            <span class="plan-price">
              $ 0
            </span>
            &nbsp; <a-tag color="green">Free Shipping</a-tag>
          </div>

          <a-divider type="horizontal" />

          <div class="actions-box">
            <a-button
              type="primary"
              class="payment-btn"
              :loading="loading"
              @click="purchase()"
              :rules="rules"
            >
              Subscribe
            </a-button>

            <a-button
              type="text"
              :size="size"
            >
              <template #icon>
                <LockOutlined />
              </template>
              Secure and encrypted
            </a-button>
          </div>
        </a-card>
      </a-card>
    </div>
  </a-layout>

</template>

<script>
import axios from 'axios'
import { LockOutlined } from '@ant-design/icons-vue'
import Navbar from '../components/Navbar.vue'
import { API_URL, STRIPE_PUBLIC_KEY, DEFAULT_PLAN_OBJECT } from '../utils.json'

// eslint-disable-next-line no-undef
let stripe = Stripe(STRIPE_PUBLIC_KEY)
let elements = stripe.elements()
let card = undefined

export default {
  beforeCreate() {
    const user = this.$store.getters.$GetUser
    if (user.id == undefined || user.stripe == undefined) {
      this.$message.error('Please, do login to continue')
      this.$router.push('/login')
    }
  },
  created() {
    this.plan = this.$store.getters.$GetChosenPlan
  },
  mounted() {
    this.formRef = this.$refs.formReference
    card = elements.create('card', {
      hidePostalCode: true,
      style: {
        base: {
          iconColor: '#1890ff',
          border: '1px solid #c3c3c3 !important',
          color: '#888888',
          fontWeight: '400',
          fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
          fontSize: '14px',
          fontSmoothing: 'antialiased',
          ':-webkit-autofill': {
            color: '#fce883',
          },
          '::placeholder': {
            color: '#c3c3c3',
          },
        },
        invalid: {
          iconColor: '#FFC7EE',
          color: '#FFC7EE',
        },
      },
    })
    card.mount(this.$refs.stripeCard)
    if (this.plan == null || this.plan.name == undefined) {
      this.plan = DEFAULT_PLAN_OBJECT
    }
  },
  data() {
    return {
      formState: {
        name: '',
        address: '',
      },
      formRef: false,
      loading: false,
      cardHasError: false,
      error: '',
      plan: null,
      rules: {
        name: [
          {
            required: true,
            validator: this.nameValidator,
            trigger: 'change',
          },
        ],
      },
    }
  },
  methods: {
    nameValidator(rule, value) {
      if (!value || value.length < 5) {
        return Promise.reject('Please input the name')
      } else {
        return Promise.resolve()
      }
    },
    purchase() {
      this.loading = true

      this.formRef
        .validate()
        .then(() => {
          stripe
            .createPaymentMethod({
              type: 'card',
              card,
              billing_details: {
                name: this.name,
              },
            })
            .then((result) => {
              if (result.error) {
                this.error = result.error
                this.cardHasError = true
                this.$message.error(result.error.message)
                this.$forceUpdate()
                return (this.loading = false)
              } else {
                const paymentMethodId = result.paymentMethod.id

                let config = {
                  method: 'post',
                  url: `${API_URL}/subscription`,
                  headers: {
                    Authorization: `Bearer ${this.$store.getters.$GetToken}`,
                  },
                  data: {
                    paymentMethodId,
                    priceId: this.plan.id,
                  },
                }

                axios(config)
                  .then((res) => {
                    console.log(res)
                    if (res.data.success == true) {
                      this.$message.success(
                        'You has been successfully subscribed'
                      )
                    } else {
                      this.$message.error(res.data.error)
                    }
                    return (this.loading = false)
                  })
                  .catch((error) => {
                    console.log(error.response)
                    if (error.response.status == 403) {
                      // redirect
                      this.$message.error(
                        'Your session has been expired, please do login again'
                      )
                      setTimeout(() => {
                        this.$router.push('/login')
                      }, 1500)
                    }
                    return (this.loading = false)
                  })
              }
            })
        })
        .catch(() => {
          return (this.loading = false)
        })
    },
  },
  components: {
    Navbar,
    LockOutlined,
  },
}
</script>

<style scoped>
@import url('../assets/css/styles.css');

* {
  font-family: 'Nunito', sans-serif;
}
.content {
  display: flex;
  flex-direction: row;
}
.content .payment-information-card {
  margin: 50px;
  flex-grow: 2;
}

.content .order-summary-card {
  flex-grow: 1;
}

.content .order-summary-card .plan-name {
  font-weight: bold;
  font-size: 16px;
}
.content .order-summary-card .plan-price {
  font-weight: bold;
  font-size: 16px;
  float: right;
}

.content .order-summary-card .recurrency-plan-period {
  color: #c3c3c3;
}

.content .payment-information-card .form-item {
  margin: 10px;
  max-width: 75%;
}

.content .payment-information-card label {
  font-size: 15px;
  line-height: 30px;
}

.content .payment-information-card .stripe-elements-label {
  margin: 0px 10px;
}

.content .payment-information-card .form-item .input {
  color: #c3c3c3;
}

.content .payment-information-card .stripe-card {
  max-width: 75%;
  margin: 10px;
  margin-top: 4px;
  border: 1px solid #d9d9d9 !important;
  padding: 7px;
  border-radius: 4px;
}

.content .payment-information-card h1 {
  margin-bottom: 20px;
}

.actions-box {
  text-align: center;
}
.actions-box .payment-btn {
  margin: 15px;
  width: 85%;
}
</style>