<template>
  <div>
    <navigation-bar></navigation-bar>
  </div>
  <main>
    <router-view></router-view>
  </main>
  <div></div>
  <div
    class="alert alert-danger margin position-absolute top-50 start-50 translate-middle"
    role="alert"
    v-show="isThereError.length > 1"
  >
   {{ isThereError }}
  </div>
</template>
<script>
import NavigationBar from "./components/ReusableComponents/NavigationBar.vue";
import { mapGetters } from "vuex";
export default {
  name: "App",
  components: {
    NavigationBar,
  },

  created() {
    this.$store.dispatch("tryLogin");
  },
  computed: {
    ...mapGetters(["isThereError"]),
  },
};
</script>

<style></style>
