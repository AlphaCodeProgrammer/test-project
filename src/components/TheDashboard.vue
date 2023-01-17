<template>
  <div class="container text-center">
    <div class="row align-items-center">
      <div class=".col-md-6 .offset-md-3">
        Here is Dashboard and this is Your Email
      </div>
    </div>
    <div class="row">
      <div class=".col-md-6 .offset-md-3 email-font">
        {{ userEmail }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "TheDashboard",
  data() {
    return {};
  },
  methods: {},
  computed:{
    ...mapGetters(['userEmail'])
  }
};
</script>

<style scoped></style>
