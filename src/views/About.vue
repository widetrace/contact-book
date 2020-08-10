<template lang="pug">
.contacts
  .contacts-menu-left
    .contacts-menu-left__groups 
      p Фильтр по группе:
        select(v-model="selectedGroup", :disabled="editor")
          option(value="all") All
          option(v-for="(name, index) in groups", :key="index", :value="name") {{ name }}
    .contacts-menu-left__filter
      p Фильтр по имени:
        input.filter-name(v-model="nameFilter", :disabled="editor")
  .contacts-menu-right
    .contacts-menu-right__buttons
      button(@click="$emit('add:group')", :disabled="editor") Добавить группу
      button(@click="$emit('add:contact')", :disabled="editor") Добавить контакт
  .contacts-main
    table.contacts-main__table
      thead
        tr
          th Имя
          th Группа
          th Номер телефона
          th Комментарий
          th 
      tbody 
        ContactCard(
          v-for="(contact, index) in filteredContacts",
          :contact="contact",
          :key="index",
          :position="index",
          :editorStatus="editor",
          @editor:on="editorOn",
          @editor:off="editorOff"
        )
</template>

<script>
import { mapGetters } from "vuex";
import ContactCard from "@/components/ContactCard";

export default {
  components: { ContactCard },
  data() {
    return {
      selectedGroup: "all",
      nameFilter: "",
      editor: false,
    };
  },
  methods: {
    editorOn(name) {
      this.editor = true;
      this.nameFilter = name;
    },
    editorOff() {
      this.editor = false;
      this.nameFilter = "";
    },
  },
  computed: {
    ...mapGetters({
      groups: "contacts/groupList",
      contacts: "contacts/all",
    }),
    filteredContacts() {
      let result;
      if (this.selectedGroup === "all") {
        result = this.contacts;
      } else {
        result = this.$store.getters["contacts/oneGroup"](this.selectedGroup);
      }
      if (this.nameFilter.length > 2) {
        result = result.filter((contact) => {
          if (
            contact.name.toLowerCase().includes(this.nameFilter.toLowerCase())
          ) {
            return true;
          }
        });
      }
      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
.contacts {
  display: grid;
  grid-template-areas: "menu-left main menu-right";
  grid-template-columns:
    0.33fr
    1fr
    0.33fr;
  &-menu-left {
    border-right: 1px solid black;
    grid-area: menu-left;
    select,
    input {
      margin-left: 15px;
      width: 50%;
    }
  }
  &-menu-right {
    grid-area: menu-right;
    border-left: 1px solid black;
    &__buttons {
      display: flex;
      height: 100%;
      flex-flow: column nowrap;
      justify-content: space-evenly;
      align-items: center;
      button {
        width: 50%;
      }
    }
  }
  &-main {
    grid-area: main;
    &__table {
      display: grid;
      width: 100%;
      // margin: 0 auto;
      grid-template-columns:
        1fr
        0.66fr
        1fr
        1.67fr
        0.33fr;
      thead,
      tbody,
      tr {
        display: contents;
      }
      th {
        text-align: center;
        padding-left: 5px;
        font-size: 12px;
        line-height: 15px;
        color: #8b8a95;
        margin-bottom: 10px;
      }
    }
  }
}
</style>