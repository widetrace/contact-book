<template lang="pug">
.login-form
  h2 Login
  p(v-if="error" class="login-form__error") Неверный логин или пароль
  p Username:
    input(
      type="text",
      name="username",
      placeholder="Enter login",
      v-model="name"
    )
  p Password:
    input(
      type="password",
      name="pass",
      placeholder="Enter password",
      v-model="pass"
    )
  button(type="submit", @click="login") Submit
</template>

<script>
export default {
  data() {
    return {
      name: null,
      pass: null,
      error: false,
    };
  },
  methods: {
    login() {
      if (this.name === "test" && this.pass === "12345") {
        this.error = false;
        localStorage.setItem("token", "true");
        this.$router.push('/about')
      } else {
        this.error = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login-form {
  border: 1px solid black;
  border-radius: 5px;
  width: 30%;
  padding: 15px;
  margin-right: auto;
  margin-left: auto;
  p {
    justify-content: center;
  }
  &__error {
    color: red;
  }
}
input {
  margin-left: 10px;
}
</style>