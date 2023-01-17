<template>
  <header>
    <nav>
      <ul>
        <li>
          <router-link to="/" v-if="didUserLoggedIn">Dashboard</router-link>
        </li>
        <li>
          <router-link to="/signin" v-if="!didUserLoggedIn">Signin</router-link>
        </li>
        <li>
          <router-link to="/signup" v-if="!didUserLoggedIn">Signup</router-link>
        </li>
        <li>
          <button type="button" class="btn btn-danger" v-if="didUserLoggedIn" @click="logOut">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script>
import {  mapGetters } from "vuex";

export default {
  methods: {
    logOut(){
      this.$store.dispatch('logout');
      this.$router.replace('/signin');

    }
  },
  computed: {
    ...mapGetters(["didUserLoggedIn"]),
  },
};
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: black;
}

nav {
  height: 100%;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 2rem;
}

a {
  text-decoration: none;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  color: white;
  padding: 0.5rem 1.5rem;
  display: inline-block;
}

a:hover,
a:active,
a.active {
  color: red;
  border-color: red;
  background-color: black;
}
</style>
