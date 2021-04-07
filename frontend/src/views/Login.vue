<template>
  <div class="container mx-auto max-w-2xl">
    <div class="mt-28 box flex flex-col">
      <h4 class="text-center text-3xl font-medium mb-1.5">Login</h4>
      <router-link class="text-center mb-1.5" to="/register"
        >Don't have an account?</router-link
      >
      <div class="input-box">
        <label class="font-medium mb-1">Username</label>
        <input
          class="input"
          type="text"
          placeholder="Username"
          v-model="creds.username"
        />
      </div>
      <div class="input-box">
        <label class="font-medium mb-1">Password</label>
        <input
          class="input"
          type="password"
          placeholder="Password"
          v-model="creds.password"
        />
      </div>
      <div class="flex sm:flex-row flex-col mt-3">
        <button
          class="r-button bg-red-500 text-white"
          :disabled="!(creds.username && creds.password)"
          @click="onSubmit"
        >
          Login
        </button>
        <button
          class="r-button bg-gray-100"
          @click="creds = {}"
          :disabled="!(creds.username || creds.password)"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    creds: {},
  }),
  methods: {
    onSubmit() {
      this.$http
        .post("/auth/login", this.creds)
        .then(({ data }) => {
          this.$http.defaults.headers.common.Authorization = data.token;
          localStorage.setItem("token", data.token);
          this.$router.push("/");
        })
        .catch((err) => alert(`An error occurred: ${err}`));
    },
  },
};
</script>
