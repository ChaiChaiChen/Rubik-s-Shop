<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="text-end">
    <button class="btn btn-primary" type="button" @click="$refs.productModal.showModal()">
      新增產品
    </button>
  </div>
  <table class="table table-hover mt-4">
    <thead class="table-light">
      <tr>
        <th>分類</th>
        <th>產品名稱</th>
        <th>原價</th>
        <th>售價</th>
        <th>是否啟用</th>
        <th>編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item">
        <th>{{ item.category }}</th>
        <td>{{ item.title }}</td>
        <td>{{ item.origin_price }}</td>
        <td>{{ item.price }}</td>
        <td>
          <span class="text-success" v-if="item.is_enabled"> 啟用 </span>
          <span class="text-danger" v-else> 未啟用 </span>
        </td>
        <td>
          <div class="btn-group">
            <button type="button" class="btn btn-outline-primary">編輯</button>
            <button type="button" class="btn btn-outline-danger">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <ProductModal ref="productModal"></ProductModal>
</template>

<script>
import ProductModal from '@/components/ProductModal.vue';

export default {
  data() {
    return {
      products: [],
      pagination: {},
    };
  },
  components: {
    ProductModal,
  },
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products`;
      this.$http.get(api, this.user).then((res) => {
        this.products = res.data.products;
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
