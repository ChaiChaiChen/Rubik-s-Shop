<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-danger">
          <h5 class="modal-title" id="exampleModalLabel">刪除{{ item.title }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除 <strong class="text-danger">{{ item.title }}</strong> (刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
          <button type="button" class="btn btn-danger" @click="$emit('del-product', tempProduct)">
            刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import modalMixins from '../minxins/modalMixins.vue';

export default {
  props: {
    item: {},
  },
  mixins: [modalMixins],
  data() {
    return {
      modal: '',
    };
  },
};
</script>
