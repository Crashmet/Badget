<template>
  <div id="app">
    <FormList @submitForm="onFormSubmit" />
    <TotalBalance :total="totalBalance" />
    <BudgetList :list="list" @deleteItem="onDeleteItem" />
  </div>
</template>

<script>
import BudgetList from './components/BudgetList.vue';
import TotalBalance from './components/TotalBalance.vue';
import FormList from './components/Form.vue';

export default {
  name: 'App',
  components: {
    FormList,
    TotalBalance,
    BudgetList,
  },
  data: () => ({
    list: {
      1: {
        type: 'INCOME',
        value: 100,
        comment: 'Some income comment',
        id: 1,
      },
      2: {
        type: 'OUTCOME',
        value: -50,
        comment: 'Some outcome comment',
        id: 2,
      },
    },
  }),
  computed: {
    totalBalance() {
      return Object.values(this.list).reduce(
        (acc, item) => acc + item.value,
        0
      );
    },
  },
  methods: {
    onDeleteItem(id) {
      this.$delete(this.list, id);
      //этот метод принимает обьект из которого нужно удалить, вторым свойство которое нужно удалить, и вызовет перерендеринг
    },
    onFormSubmit(data) {
      const newObj = {
        ...data,
        id: Object.keys(this.list).length + 1,
      };

      this.$set(this.list, newObj.id, newObj);
      // Vue не может отследить следующие изменения в массиве, обьекте, для этого используем метод $set
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
