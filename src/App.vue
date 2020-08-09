<template lang="pug">
#app
  #nav
    router-link(to="/") Home
    | |
    router-link(to="/about") About
    | |
    router-link(to="/login") Login  
  router-view(@add:contact="contactAdd" @add:group="addGroup")
  #pop-up(v-if="popUpStatus") 
    contactForm(v-if="contactForm" @close="disablePopUp")
    createGroup(v-if="addingGroup" @close="disablePopUp")
</template>

<script>
import contactForm from "@/components/ContactForm";
import createGroup from "@/components/CreateGroup";

export default {
  components: { contactForm, createGroup },
  data() {
    return {
      popUpStatus: false,
      contactForm: false,
      addingGroup: false,
    }
  },
  beforeDestroy() {
    localStorage.removeItem('token')
  },
  methods: {
    disablePopUp() {
      this.popUpStatus = false;
      this.contactForm = false;
    },
    contactAdd() {
      this.popUpStatus = true;
      this.contactForm = true;
    },
    addGroup() {
      this.popUpStatus = true;
      this.addingGroup = true;
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    padding-left: 10px;
    padding-right: 10px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

#pop-up {
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.33);
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    width: 50%;
    background-color: white;
    border-radius: 10px;
    padding: 15px;
    h3 {
      color: red;
    }
  }
}
</style>
