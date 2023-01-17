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
          v-model="password.password"
          type="password"
          class="form-control"
          placeholder="Enter Your Password"
        />
      </div>
      <span v-if="v$.password.password.$error" class="error-color">
        {{ v$.password.password.$errors[0].$message }}
      </span>
    </div>
    <div class="row p-2">
      <div class="col-md-6 offset-md-3">
        <label class="form-label">Confirm Password</label>
        <input
          v-model="password.confirm"
          type="password"
          class="form-control"
          placeholder="Enter Your Password Again"
        />
      </div>
      <span v-if="v$.password.confirm.$error" class="error-color">
        {{ v$.password.confirm.$errors[0].$message }}
      </span>
    </div>
    <div class="row" v-if="!this.loadingSpinner">
      <div class="col-md-6 offset-md-3">
        <button type="button" class="btn btn-success" @click="signUpUser">
          Sign Up
        </button>
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-md-6 offset-md-3">
        <button class="btn btn-success" type="button" disabled>
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Signing Up...
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";

export default {
  name: "SignUp",

  data() {
    return {
      v$: useValidate(),
      email: "",
      password: {
        password: "",
        confirm: "",
      },
      loadingSpinner: false,
    };
  },

  methods: {
    async signUpUser() {
      try {
        this.v$.$validate();
        if (!this.v$.$error) {
          this.loadingSpinner = true;
          await this.$store.dispatch("signUp", {
            email: this.email,
            password: this.password.password,
          });
        } else {
          return;
        }
      } catch (err) {
        console.log(err);
        this.loadingSpinner = false;
      }

      this.loadingSpinner = false;
    },
  },
  validations() {
    return {
      email: { required, email },
      password: {
        password: { required, minLength: minLength(6) },
        confirm: { required, sameAs: sameAs(this.password.password) },
      },
    };
  },
};
</script>

<style scoped></style>
