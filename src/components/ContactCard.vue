<template lang="pug">
tr 
  td 
    span(v-if="!editor") {{ contact.name }}
    input(v-model="backUp.name", v-if="editor")
  td 
    span(v-if="!editor") {{ contact.group }}
    select(v-model="backUp.group", v-if="editor")
      option(v-for="(group, index) in groups", :value="group") {{ group }}
  td 
    span(v-if="!editor") {{ contact.number }}
    input(v-model="backUp.number", v-if="editor")
  td 
    span(v-if="!editor") {{ contact.descr }}
    textarea(v-model="backUp.descr", v-if="editor")
  td 
    span.edit-btn(@click="editorOn", v-if="!editor") Edit
    span.save-btn(@click="saveContact", v-if="editor") Save
    | |
    span.delete-btn(@click="deleteContact") Delete
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["contact", "editorStatus"],
  data() {
    return {
      editor: false,
      backUp: null,
    };
  },
  methods: {
    saveContact() {
      this.$store.commit('contacts/editContact', this.backUp)
      this.editor = false;
      this.$emit('editor:off')
    },
    editorOn() {
      this.$emit('editor:on', this.contact.name)
      this.editor = true;
    },
    deleteContact() {
      this.$store.commit('contacts/deleteContact', this.contact.id)
    }
  },
  computed: {
    ...mapGetters({
      groups: "contacts/groupList",
    }),
  },
  mounted() {
    this.backUp = Object.assign({}, this.contact);
  },
  watch: {
    contact: function (obj) {
      this.backUp = Object.assign({}, this.contact);
    },
    editorStatus: function() {
      if (this.editorStatus == true) {
        this.editor = true;
      } else {
        this.editor = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
tr {
  td {
    span:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
}

.edit-btn,
.save-btn {
  color: rgb(80, 158, 132);
  padding-right: 10px;
}

.delete-btn {
  padding-left: 10px;
  color: red;
}
</style>