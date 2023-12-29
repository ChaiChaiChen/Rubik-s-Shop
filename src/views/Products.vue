<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="text-end">
    <button class="btn btn-primary" type="button" @click="openModal">新增產品</button>
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
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              @click="openModal(false, item)"
            >
              編輯
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm" @click="openDelModal(item)">
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <ProductModal
    ref="productModal"
    :product="tempProduct"
    @update-product="updateProduct"
  ></ProductModal>
  <DelModal ref="delProductModal" :item="tempProduct" @del-product="delProduct"></DelModal>
  <ToastMessages></ToastMessages>
  <Pagination :pages="pagination" @emit-pages="getProducts"></Pagination>
</template>

<script>
import ProductModal from '@/components/ProductModal.vue';
import DelModal from '@/components/DelModal.vue';
import ToastMessages from '@/components/ToastMessages.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
    };
  },
  components: {
    ProductModal,
    DelModal,
    ToastMessages,
    Pagination,
  },
  inject: ['emitter'],
  methods: {
    getProducts(page) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`;
      this.$http.get(api, this.user).then((res) => {
        this.products = res.data.products;
        this.pagination = res.data.pagination;
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
      } else {
        this.tempProduct = { ...item };
      }
      this.isNew = isNew;
      const productComponent = this.$refs.productModal;
      productComponent.showModal();
    },
    updateProduct(item) {
      this.tempProduct = item;
      //   新增
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';
      //   編輯
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        httpMethod = 'put';
      }
      const productComponent = this.$refs.productModal;
      this.$http[httpMethod](api, { data: this.tempProduct }).then((res) => {
        productComponent.hideModal();
        if (res.data.success) {
          this.getProducts();
          this.emitter.emit('push-message', {
            style: 'success',
            title: '新增成功',
          });
        } else {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '新增失敗',
            content: res.data.message.join('、'),
          });
        }
      });
    },
    openDelModal(item) {
      this.tempProduct = { ...item };
      const delProductComponent = this.$refs.delProductModal;
      delProductComponent.showModal();
    },
    delProduct() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      this.$http.delete(url).then((res) => {
        console.log('success', res);
        const delProductComponent = this.$refs.delProductModal;
        delProductComponent.hideModal();
        if (res.data.success) {
          this.getProducts();
          this.emitter.emit('push-message', {
            style: 'success',
            title: '刪除成功',
          });
        } else {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '刪除失敗',
            content: res.data.message.join('、'),
          });
        }
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
