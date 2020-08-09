export default {
  namespaced: true,
  state: {
    list: [
      {
        name: "Andrey",
        group: "Family",
        number: "8-999-999-99-99",
        descr: "Uncle",
        id: "0",
      },
      {
        name: "Olga",
        group: "Family",
        number: "8-999-999-99-99",
        descr: "Aunt",
        id: "1",
      },
      {
        name: "Kolya",
        group: "Family",
        number: "8-999-999-99-99",
        descr: "Uncle",
        id: "2",
      },
      {
        name: "TinderGirl",
        group: "Uncategorized",
        number: "8-999-999-99-99",
        descr: "another girl from tinder...",
        id: "3",
      },
      {
        name: "Doctor Who",
        group: "Uncategorized",
        number: "?-???-???-??-??",
        descr: "Doctor who?",
        id: "4",
      },
      {
        name: "Pavel",
        group: "Friends",
        number: "8-999-999-99-99",
        descr: "9Pasha from university",
        id: "5",
      },
      {
        name: "Sergey Minaev",
        group: "Friends",
        number: "8-999-999-99-99",
        descr: "",
        id: "6",
      },
      {
        name: "Jean-Paul Sartre",
        group: "Friends",
        number: "8-999-999-99-99",
        descr: "don't call this number",
        id: "7",
      },
      {
        name: "Nikita",
        group: "Work",
        number: "8-999-999-99-99",
        descr: "frontend dev",
        id: "8",
      },
      {
        name: "Ilya",
        group: "Work",
        number: "8-999-999-99-99",
        descr: "backend dev",
        id: "9",
      },
      {
        name: "Sergey",
        group: "Friends",
        number: "8-999-999-99-99",
        descr: "Serega from school",
        id: "10",
      },
    ],
    groups: ["Uncategorized", "Family", "Friends", "Work"],
  },
  mutations: {
    addContact(state, payload) {
      payload.id = state.list.length;
      state.list = [...state.list, payload];
    },
    addGroup(state, payload) {
      state.groups = [...state.groups, payload];
    },
    editContact(state, info) {
      state.list[info.id] = info;
    },
    deleteContact(state, id) {
      state.list = state.list.filter(contact => {
        if (contact.id != id){
          return true
        }
      })
    },
  },
  actions: {},
  getters: {
    groupList(state) {
      return state.groups;
    },
    all(state) {
      return state.list;
    },
    oneGroup: (state) => (group) => {
      return state.list.filter((contact) => {
        if (contact.group == group) {
          return true;
        }
      });
    },
  },
};
