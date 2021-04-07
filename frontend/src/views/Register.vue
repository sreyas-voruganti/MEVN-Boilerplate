<template>
  <div class="container mx-auto max-w-2xl">
    <div class="mt-28 box flex flex-col">
      <h4 class="text-center text-3xl font-medium mb-1.5">Register</h4>
      <router-link class="text-center mb-1.5" to="/login"
        >Already have an account?</router-link
      >
      <div class="input-box">
        <label class="font-medium mb-1">Username</label>
        <input
          class="input"
          type="text"
          placeholder="Choose a Username"
          v-model="creds.username"
        />
      </div>
      <div class="input-box">
        <label class="font-medium mb-1">Email</label>
        <input
          class="input"
          type="text"
          placeholder="Email"
          v-model="creds.email"
        />
      </div>
      <div class="input-box">
        <label class="font-medium mb-1">Password</label>
        <input
          class="input"
          type="password"
          placeholder="Choose a Password"
          v-model="creds.password"
        />
      </div>
      <div class="flex sm:flex-row flex-col mt-3">
        <button
          class="r-button bg-red-500 text-white"
          :disabled="!(creds.username && creds.email && creds.password)"
          @click="onSubmit"
        >
          Register
        </button>
        <button
          class="r-button bg-gray-100"
          @click="creds = {}"
          :disabled="!(creds.username || creds.email || creds.password)"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data: () => ({
    creds: {},
  }),
  methods: {
    onSubmit() {
      this.$http
        .post("/auth/register", this.creds)
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
