<template lang="pug">
  .group-form 
    h1 Adding a new group
    h3(v-if="error") Already exist
    p Enter new group name:
      br 
      input(type="text" v-model.trim="name")
    .group-form__buttons 
      button(@click="$emit('close')") Cancel
      button(@click="addGroup") Submit
</template>

<script>
export default {
  data() {
    return {
      name: '',
      error: false,
    }
  },
  methods: {
    addGroup() {
      if (this.groupsList.some(name => name.toLowerCase() == this.name.toLowerCase())) {
        this.error = true;
      } else {
        this.error = false;
        this.$store.commit('contacts/addGroup', this.name)
        this.name = '';
        this.$emit('close')
      }
    }
  },
  computed: {
    groupsList() {
      return this.$store.getters["contacts/groupList"]
    }
  }
}
</script>

<style lang="scss" scoped>
.group-form{
  &__buttons {
    flex-flow: row nowrap !important;
    justify-content: space-evenly;
  }
}
</style>