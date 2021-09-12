<template>
  <a-card class="history-information-card">
    <template #title>
      <h1>
        <HistoryOutlined />&nbsp; Order history
      </h1>
    </template>

    <a-spin
      tip="Loading history"
      :spinning="loading"
    >
      <a-list
        item-layout="horizontal"
        :data-source="charges"
      >
        <template #renderItem="{ item }">

          <a-list-item>
            <a-list-item-meta>
              <template #avatar>
                <a-avatar
                  style="background-color: rgb(244 245 253 / 72%)"
                  size="large"
                >
                  <DownloadOutlined style="color: #64adf9a3;" />
                </a-avatar>
              </template>

              <template #title>
                <a><b>{{item.amount / 100}} USD</b> - {{ item.description }}</a>
              </template>
              <template #description>
                <span v-if="item.paid == true">
                  <a-badge status="success" />Paid
                </span>
                <span v-else>
                  <a-badge status="error" />Failed
                </span>
                -
                <span>
                  <FieldTimeOutlined /> {{FormatDate(item.created)}}
                </span>
              </template>

            </a-list-item-meta>
          </a-list-item>

        </template>
      </a-list>
    </a-spin>
  </a-card>

</template>

<script>
import axios from 'axios'
import moment from 'moment'
import {
  DownloadOutlined,
  FieldTimeOutlined,
  HistoryOutlined,
} from '@ant-design/icons-vue'
import { API_URL } from '@/config.json'

export default {
  created() {
    axios({
      method: 'GET',
      url: `${API_URL}/charges`,
      headers: {
        Authorization: `Bearer ${this.$store.getters.$GetToken}`,
      },
    })
      .then((res) => {
        let charges = res.data.charges
        this.charges = charges
      })
      .catch((err) => {
        this.$message.error(err.message)
      })
      .finally(() => {
        this.loading = false
      })
  },
  data() {
    return {
      loading: true,
      charges: [],
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          slots: { customRender: 'name' },
        },
        {
          title: 'Cash Assets',
          className: 'column-money',
          dataIndex: 'money',
        },
      ],
    }
  },
  components: {
    DownloadOutlined,
    FieldTimeOutlined,
    HistoryOutlined,
  },
  methods: {
    FormatDate(timestamp) {
      return moment(timestamp * 1000).format('DD, MMMM YYYY')
    },
  },
}
</script>

<style scoped>
h1 {
  color: #189effe0;
  font-size: 19px;
}
</style>
