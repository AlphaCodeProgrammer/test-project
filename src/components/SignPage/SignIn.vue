<template>
  <div class="container text-center">
    <div class="row p-2">
      <div class="col-md-6 offset-md-3">
        <label class="form-label">Email address</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          placeholder="email@example.com"
        />
      </div>
      <span class="error-color" v-if="v$.email.$error">
        {{ v$.email.$errors[0].$message }}
      </span>
    </div>

    <div class="row p-2">
      <div class="col-md-6 offset-md-3">
        <label class="form-label">Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          placeholder="Enter Your Password"
        />
      </div>
      <span v-if="v$.password.$error" class="error-color">
        {{ v$.password.$errors[0].$message }}
      </span>
    </div>

    <div class="row" v-if="!loadingSpinner">
      <div class="col-md-6 offset-md-3">
        <button type="button" class="btn btn-primary" @click="signIn">
          Sign In
        </button>
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-md-6 offset-md-3">
        <button class="btn btn-primary" type="button" disabled>
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Signing In...
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import useValidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
export default {
  name: "SignIn",
  data() {
    return {
      v$: useValidate(),
      email: "",
      password: "",
      loadingSpinner: false,
    };
  },
  methods: {
    async signIn() {
      try {
        this.v$.$validate();
        if (!this.v$.$error) {
          this.loadingSpinner = true;
          await this.$store.dispatch("signIn", {
            email: this.email,
            password: this.password,
          });
        } else {
          return;
        }
      } catch (err) {
        console.log(err);
      }

      this.loadingSpinner = false;
    },
  },
  validations() {
    return {
      email: { required, email },
      password: { required, minLength: minLength(6) },
    };
  },
};
</script>

<style scoped></style>
