<template>
  <a-layout class="main">
    <Navbar />

    <div class="banner">
      <div class="banner-content">
        <h1 class="title">Local Bakery</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </p>
      </div>
    </div>

    <a-layout-content class="pricing-content">
      <div class="resume">
        <a-typography-title :level="2">Weekly Bread Basket</a-typography-title>
        <a-typography-paragraph class="description">
          Now you no longer need to go to one of our physical locations, start a subscription now and receive a special basket weekly❤️
        </a-typography-paragraph>
      </div>
      <br>

      <div class="card-box">
        <div
          class="single-card"
          v-for='plan in plans'
          :key="plan"
        >
          <a-card
            hoverable
            class="card"
          >
            <template #cover>
              <img
                :alt="plan.name"
                :src="plan.image"
              />
            </template>
            <a-card-meta>
              <template #description>
                <a-typography-title :level="4">{{plan.name}}</a-typography-title>
                <p>
                  What you'll get
                </p>
                <div class="benefits-box">
                  <span
                    class="benefit"
                    v-for="benefit in plan.benefits"
                    :key="benefit"
                  >
                    <CheckCircleOutlined :style="{color: 'green'}" /> {{benefit}}
                  </span>
                </div>
                <br>
                <a-typography-title :level="4">${{plan.price}}</a-typography-title>

                <br>
                <a-button
                  type="primary"
                  class="btn-choose"
                >
                  Choose
                </a-button>
              </template>
            </a-card-meta>
          </a-card>
        </div>
      </div>
    </a-layout-content>

    <br>
  </a-layout>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import { CheckCircleOutlined } from '@ant-design/icons-vue'

export default {
  data() {
    return {
      plans: [
        {
          image:
            'https://images.squarespace-cdn.com/content/v1/55a057e8e4b0a8ce00fe78f6/1605826162900-RLNQVK2ZGLZUD93FG48S/DSC09261-2.jpg?format=1000w',
          name: 'Starter',
          price: 14.35,
          recurrencyDate: 'Monthly',
          benefits: ['benefit #1', 'benefit #2'],
        },
        {
          image:
            'https://cdn1.harryanddavid.com/wcsstore/HarryAndDavid/images/catalog/20_32086_30W_01ex.jpg',
          name: 'Medium',
          price: 18.35,
          recurrencyDate: 'Monthly',
          benefits: ['benefit #1', 'benefit #2'],
        },
        {
          image:
            'http://cdn1.harryanddavid.com/wcsstore/HarryAndDavid/images/feed/std/16_24448_30e_01e_400.jpg',
          name: 'Premium',
          price: 25.35,
          recurrencyDate: 'Monthly',
          benefits: ['benefit #1', 'benefit #2'],
        },
      ],
    }
  },

  components: {
    Navbar,
    CheckCircleOutlined,
  },
}
</script>

<style scoped>
@import url('../assets/css/styles.css');

.main {
  background: -webkit-linear-gradient(
    to bottom,
    #fff,
    #e9eef9
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #fff,
    #e9eef9
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.banner {
  background: url('../assets/images/bg.jpg') no-repeat;
  background-size: cover;
  background-position: top;
  width: 100%;
  height: 500px;
}

.banner .banner-content {
  margin: 10%;
  color: #fff !important;
}

.banner .banner-content .title {
  font-size: 65px;
  color: #fff !important;
}

.banner .banner-content p {
  font-size: 16px;
  max-width: 50%;
  margin-top: -20px;
}

.pricing-content {
  font-family: 'Nunito', sans-serif;
  margin: 50px;
}

.pricing-content .resume {
  text-align: center;
  padding: 20px;
}

.pricing-content .resume .description {
  font-size: 15px;
  width: 50%;
  margin: auto;
}

.pricing-content .card-box {
  margin: 40px auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 90%;
}

.pricing-content .card-box .single-card {
  flex-grow: 1;
}

.pricing-content .card-box .card {
  margin: auto;
  max-width: 260px;
  border-radius: 15px;
  -webkit-box-shadow: 0px 0px 16px -5px #c3c3c3;
  box-shadow: 0px 0px 16px -5px #c3c3c3;
}

.pricing-content .card-box .card img {
  max-width: 260px;
  height: 230px;
  border-radius: 15px 15px 0 0;
}

.pricing-content .card .benefits-box .benefit {
  display: block;
  margin-top: 5px;
}

.pricing-content .btn-choose {
  width: 100%;
  border-radius: 6px;
}

@media screen and (max-width: 800px) {
  .banner .banner-content p {
    max-width: 80%;
  }

  .pricing-content .card-box {
    margin: 0 auto;
    width: 70%;
  }

  .pricing-content .card-box .card {
    margin-top: 20px;
  }
}

@media screen and (max-width: 430px) {
  .pricing-content {
    margin: 10px;
    width: 100%;
  }
}
</style>