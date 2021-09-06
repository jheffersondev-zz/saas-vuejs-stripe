<template>
  <a-layout>
    <Navbar />
    <a-layout-content class="content">
      <a-card class="signup-box-area">
        <a-typography-title
          :level="3"
          class="mainTitle"
        >
          Sign In
        </a-typography-title>

        <a-alert
          class="alert"
          type="error"
          :message="error"
          banner
          closable
          v-if="error"
        />

        <a-form
          ref="formReference"
          :model="formState"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-item
            ref="email"
            label="Email"
            name="email"
          >
            <a-input v-model:value="formState.email" />
          </a-form-item>

          <a-form-item
            ref="pass"
            label="Password"
            name="pass"
          >
            <a-input-password v-model:value="formState.pass" />
          </a-form-item>
          <a-form-item
            :wrapper-col="{ span: 14, offset: 2 }"
            name="termsAndConditions"
          >
            <a-checkbox v-model:checked="formState.rememberDetails">
              Remember login details
            </a-checkbox>
          </a-form-item>

          <a-form-item :wrapper-col="{ span: 14, offset: 2 }">
            <a-button
              type="primary"
              :loading="loading"
              @click="onSubmit"
            >Sign in</a-button>
          </a-form-item>

        </a-form>
      </a-card>

    </a-layout-content>
  </a-layout>
</template>
<script>
import Navbar from '../components/Navbar.vue'

export default {
  mounted() {
    this.formRef = this.$refs.formReference
  },
  data() {
    return {
      loading: false,
      formRef: undefined,
      formState: {
        email: '',
        pass: '',
      },
      error: '',
      rules: {
        email: [
          {
            required: true,
            validator: this.emailValidation,
            trigger: 'change',
          },
        ],
        pass: [
          {
            required: true,
            validator: this.validatePass,
            trigger: 'change',
          },
        ],
      },
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
      other: '',
    }
  },

  components: {
    Navbar,
  },

  methods: {
    onSubmit: function (e) {
      e.preventDefault()
      this.loading = true
      this.error = ''

      this.formRef
        .validate()
        .then(() => {
          this.$store
            .dispatch('Login', {
              email: this.formState.email,
              password: this.formState.pass,
            })
            .then((res) => {
              if (res.data.success === true) {
                let token = res.data.token
                let user = res.data.user
                console.log(user)

                this.$store.dispatch('SetUserToken', token.toString())
                this.$store.dispatch('SetUserDetails', user)

                if (user.stripe.stripeSubscriptionId == null) {
                  this.$router.push('/checkout')
                } else {
                  this.$router.push('/profile')
                }
              } else {
                this.error = res.data.error
              }

              this.loading = false
            })
            .catch(() => {
              this.error = `A unexpected error happened, please, try again.`
              this.loading = false
            })
        })
        .catch(() => {
          this.loading = false
        })
    },

    emailValidation: async function (rule, value) {
      if (value === '') {
        return Promise.reject('Enter a valid email')
      }
      if (
        /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
          value
        )
      ) {
        return Promise.resolve()
      } else {
        return Promise.reject('Enter a valid Email')
      }
    },

    validatePass: async function (rule, value) {
      if (value === '') {
        return Promise.reject('Enter a valid password')
      } else {
        if (this.formState.checkPass !== '') {
          this.formRef.validateFields('checkPass')
        }
        return Promise.resolve()
      }
    },
  },
}
</script>
<style scoped>
@import url('../assets/css/styles.css');

.content {
  margin: 0 auto;
}
.signup-box-area {
  margin: 50px;
  width: 700px;
  border-radius: 6px;
  font-family: 'Nunito', sans-serif;
  -webkit-box-shadow: 0px 0px 16px -5px #c3c3c3;
  box-shadow: 0px 0px 16px -5px #c3c3c3;
}
.mainTitle {
  margin-left: 20px;
}
.alert {
  margin: 20px;
}
.action-buttons {
  margin-top: 20px;
}

@media screen and (max-width: 648px) {
  .signup-box-area {
    margin: 30px;
    width: 400px;
  }
}

@media screen and (max-width: 434px) {
  .signup-box-area {
    margin: 30px;
    width: 80%;
  }
}
</style>