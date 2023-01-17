import { createStore } from "vuex";
import axios from "axios";
import router from "../router";

const store = createStore({
  state() {
    return {
      didUserLoggedIn: false,
      email: "",
      token: null,
      userId: null,
      tokenExpiration: null,
      isThereError: "",
    };
  },
  getters: {
    isThereError(state) {
      return state.isThereError;
    },
    userEmail(state) {
      return state.email;
    },
    didUserLoggedIn(state) {
      if (state.token) {
        return true;
      } else {
        return false;
      }
    },
    token(state) {
      return state.token;
    },
  },
  mutations: {
    signUpUser(state, passingData) {
      state.token = passingData.token;
      state.userId = passingData.userId;
      state.tokenExpiration = passingData.tokenExpiration;
      state.email = passingData.email;
    },
    errorMsg(state, data) {
      state.isThereError = data.msg;
    },

    removeError(state) {
      state.isThereError = "";
    },
  },
  actions: {
    async signIn(context, passingData) {
      try {
        let res = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDGlrP4N6p-DVtlT4_2wYdLdOj9GJHAsv0",
          {
            email: passingData.email,
            password: passingData.password,
            returnSecureToken: true,
          }
        );
        if (!res.status == 200 || !res.status == 201) {
          const error = new Error(res.message || "SignUp failed");
          throw error;
        }

        const expiresIn = +res.data.expiresIn * 1000;
        const expirationDate = new Date().getTime() + expiresIn;
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("userId", res.data.localId);
        localStorage.setItem("tokenExpiration", expirationDate);
        localStorage.setItem("email", passingData.email);

        context.commit("signUpUser", {
          token: res.data.idToken,
          userId: res.data.localId,
          email: passingData.email,
        });
        setTimeout(async () => {
          context.commit("signUpUser", {
            token: null,
            userId: null,
            email: null,
            tokenExpiration: null,
          });
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          localStorage.removeItem("tokenExpiration");
          await router.push("/signin");
        }, expiresIn);

        await router.push("/");
      } catch (err) {
        let errorMsg = err.response.data.error.message;
        context.commit("errorMsg", { msg: errorMsg });
        setTimeout(function () {
          context.commit("removeError", { msg: errorMsg });
        }, 3000);
      }
    },
    async signUp(context, passingData) {
      try {
        let res = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDGlrP4N6p-DVtlT4_2wYdLdOj9GJHAsv0",
          {
            email: passingData.email,
            password: passingData.password,
            confirm_password: passingData.confirm_password,
            returnSecureToken: true,
          }
        );
        if (!res.status == 200 || !res.status == 201) {
          const error = new Error(res.message || "SignUp failed");
          throw error;
        }
        const expiresIn = +res.data.expiresIn * 1000;
        // const expiresIn = 15000;

        const expirationDate = new Date().getTime() + expiresIn;
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("userId", res.data.localId);
        localStorage.setItem("tokenExpiration", expirationDate);
        localStorage.setItem("email", passingData.email);

        context.commit("signUpUser", {
          token: res.data.idToken,
          userId: res.data.localId,
          email: passingData.email,
        });

        setTimeout(async () => {
          context.commit("signUpUser", {
            token: null,
            userId: null,
            email: null,
            tokenExpiration: null,
          });
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          localStorage.removeItem("tokenExpiration");
          await router.push("/signin");
        }, expiresIn);

        await router.push("/");
      } catch (err) {
        let errorMsg = err.response.data.error.message;
        context.commit("errorMsg", { msg: errorMsg });
        setTimeout(function () {
          context.commit("removeError", { msg: errorMsg });
        }, 3000);
      }
    },

    tryLogin(context) {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const tokenExpiration = localStorage.getItem("tokenExpiration");
      const userEmail = localStorage.getItem("email");

      const expiresIn = +tokenExpiration - new Date().getTime();
      // const expiresIn = 15000;

      setTimeout(async () => {
        context.commit("signUpUser", {
          token: null,
          userId: null,
          email: null,
          tokenExpiration: null,
        });
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("tokenExpiration");
        await router.push("/signin");
      }, expiresIn);

      if (expiresIn < 0) {
        return;
      }
      if (token && userId) {
        context.commit("signUpUser", {
          token: token,
          userId: userId,
          email: userEmail,
        });
      }
    },
    logout(context) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("tokenExpiration");

      context.commit("signUpUser", {
        token: null,
        userId: null,
        email: null,
        tokenExpiration: null,
      });
    },
  },
});

export default store;
