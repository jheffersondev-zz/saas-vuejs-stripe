<template>
  <a-layout>
    <Navbar />

    <div class="signup-box-area">
      <a-row>
        <a-col
          :xs="{ span: 24}"
          :lg="{ span: 12 }"
        >
          <div class="left-content">
            <a-typography-title
              :level="2"
              class="mainTitle"
            >
              Get Started
            </a-typography-title>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.
            </p>
            <br>

            <a-form
              ref="formReference"
              :model="formState"
              :rules="rules"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
            >

              <a-alert
                class="alert"
                type="error"
                :message="error"
                banner
                closable
                v-if="error"
              />

              <a-form-item
                ref="name"
                name="name"
              >
                <a-input
                  v-model:value="formState.name"
                  size="large"
                  class="field"
                  placeholder="Type a valid name"
                />
              </a-form-item>

              <a-form-item
                ref="email"
                name="email"
              >
                <a-input
                  v-model:value="formState.email"
                  size="large"
                  class="field"
                  placeholder="Type your Email"
                />
              </a-form-item>

              <a-form-item
                has-feedback
                name="pass"
              >

                <a-input-password
                  v-model:value="formState.pass"
                  type="password"
                  autocomplete="off"
                  size="large"
                  class="field"
                  placeholder="Type your password"
                />
              </a-form-item>

              <a-form-item
                has-feedback
                name="checkPass"
              >
                <a-input-password
                  v-model:value="formState.checkPass"
                  type="password"
                  autocomplete="off"
                  size="large"
                  class="field"
                  placeholder="Confirm your password"
                />
              </a-form-item>

              <a-form-item name="termsAndConditions">
                <a-checkbox
                  class="field"
                  v-model:checked="formState.termsAndConditions"
                >
                  Agree with terms and conditions
                </a-checkbox>
              </a-form-item>

              <a-form-item>
                <a-button
                  type="primary"
                  @click="onSubmit"
                  :loading="loading"
                  size="large"
                  class="submit-btn"
                >Sign up</a-button>
              </a-form-item>

            </a-form>

          </div>
        </a-col>
        <a-col
          :xs="{ span: 24}"
          :lg="{ span: 12 }"
          class="right-card-layout"
        >
          <div class="right-content">
            <a-carousel
              class="carousel"
              effect="fade"
              autoplay
            >
              <div>
                <img
                  src="../assets/images/bread-slices.jpeg"
                  alt="Bread slices"
                >
              </div>
              <div>
                <img
                  src="../assets/images/bread-in-baskets.jpeg"
                  alt="Bread in baskets"
                >
              </div>
              <div>
                <img
                  src="../assets/images/cinnamon-rolls.jpeg"
                  alt="Cinnamon rolls"
                >
              </div>
            </a-carousel>
          </div>
        </a-col>
      </a-row>
    </div>

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
        name: '',
        email: '',
        pass: '',
        checkPass: '',
        termsAndConditions: false,
      },
      error: '',
      rules: {
        name: [
          {
            required: true,
            message: 'Enter a valid name',
            trigger: 'change',
          },
        ],
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
        checkPass: [
          {
            required: true,
            validator: this.validatePass2,
            trigger: 'change',
          },
        ],
        termsAndConditions: [
          {
            validator: this.termsValidation,
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
      this.error = ''
      this.loading = true

      this.formRef
        .validate()
        .then(() => {
          this.$store
            .dispatch('SignUp', {
              name: this.formState.name,
              email: this.formState.email,
              password: this.formState.pass,
            })
            .then((res) => {
              if (res.data.success === true) {
                let token = res.data.token
                this.$store.dispatch('SetUserToken', token.toString())
                this.$router.push('/profile')
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

    resetForm: function () {
      this.formRef.resetFields()
    },

    emailValidation: async function (rule, value) {
      if (value === '') {
        return Promise.reject('Enter a valid Email')
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
        return Promise.reject('Enter valid password')
      } else {
        if (this.formState.checkPass !== '') {
          this.formRef.validateFields('checkPass')
        }
        return Promise.resolve()
      }
    },

    validatePass2: async function (rule, value) {
      if (value === '') {
        return Promise.reject('Please input the password again')
      } else if (value !== this.formState.pass) {
        return Promise.reject("Two inputs don't match!")
      } else {
        return Promise.resolve()
      }
    },

    termsValidation: function (rule, value) {
      if (value === true) {
        return Promise.resolve()
      } else {
        return Promise.reject(
          'You must agree with terms and conditions to continue'
        )
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
  background: #fff;
  border-radius: 6px;
  margin: 50px auto;
  width: 80% !important;
  max-width: 1900px;
  font-family: 'Nunito', sans-serif;
  -webkit-box-shadow: 0px 0px 16px -5px #c3c3c3;
  box-shadow: 0px 0px 16px -5px #c3c3c3;
}

.right-card-layout {
  background: -webkit-linear-gradient(
    to left,
    #fff,
    #e9eef9
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    #fff,
    #e9eef9
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.signup-box-area .left-content {
  margin: 100px;
}

.signup-box-area .left-content form .field,
.signup-box-area .left-content form .submit-btn {
  width: 350px !important;
}

.signup-box-area .right-content {
  text-align: center;
  margin: 0 auto;
}

.signup-box-area .right-content .carousel {
  margin: 20px;
}

.signup-box-area .right-content img {
  margin-top: 100px;
  width: 100% !important;
  max-width: 500px;
}

.ant-card-body {
  width: 100% !important;
}
.alert {
  margin: 20px 0px;
}
.action-buttons {
  margin-top: 20px;
}

@media screen and (max-width: 1150px) {
  .signup-box-area .left-content {
    margin: 20px auto !important;
    padding: 40px;
  }
}

@media screen and (max-width: 992px) {
  .signup-box-area {
    margin: 20px auto !important;
    width: 80%;
  }
  .signup-box-area .right-content {
    display: none;
  }
  .signup-box-area .left-content {
    margin: 0 auto !important;
    text-align: center;
  }
  .signup-box-area .left-content p {
    width: 80%;
    margin: 0 auto !important;
  }
  .signup-box-area .left-content form {
    width: max-content;
    margin: 0 auto;
    text-align: center;
  }
}

@media screen and (max-width: 575px) {
  .signup-box-area .left-content form {
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }
  .signup-box-area .left-content p {
    width: 100%;
  }
  .signup-box-area .left-content form .field,
  .signup-box-area .left-content form .submit-btn {
    width: 100% !important;
  }
}
</style>