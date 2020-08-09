<template lang="pug">
.contact-form
  h1 Create contact
  h3(v-if="error") Нужно заполнить все поля
  p Name:
    br
    input(type="text", v-model="name")
  p Number:
    br
    input(type="tel", v-model="number")
  p Select group:
    br
    select(v-model="group")
      option(v-for="(group, index) in groups", :value="group") {{ group }}
  p Enter description:
    br
    textarea(v-model="descr") 
  .contact-form__buttons
    button(@click="cancelAdding") Cancel
    button(@click="createContact") Submit
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      name: "",
      group: "",
      number: "",
      descr: "",
      error: false,
    };
  },
  methods: {
    inputsToNothing() {
      this.name = "";
      this.group = "";
      this.number = "";
      this.descr = "";
    },
    createContact() {
      if (!this.name || !this.number || !this.descr) {
        this.error = true;
      } else {
        this.$store.commit("contacts/addContact", {
          name: this.name,
          group: this.group == "" ? 'Uncategorized' : this.group,
          number: this.number,
          descr: this.descr,
        });
        this.inputsToNothing();
        this.$emit("close");
      }
    },
    cancelAdding() {
      this.inputsToNothing();
      this.$emit("close");
    },
  },
  computed: {
    ...mapGetters({
      groups: "contacts/groupList",
    }),
  },
};
</script>

<style lang="scss" scoped>
.contact-form {
  &__buttons {
    flex-flow: row nowrap !important;
    justify-content: space-evenly;
  }
}
</style>