<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  methods: {
    showModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
  },
  mounted() {
    // 將modal實體化，將實體指向外層的 ref="modal"
    this.modal = new Modal(this.$refs.modal);
  },
};
</script>
