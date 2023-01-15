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
    iconIncome: 'el-icon-top',
    colorIncome: '#67C23A',
    iconOutcome: 'el-icon-bottom',
    colorOutcome: '#F56C6C',

    list: {
      1: {
        type: 'INCOME',
        icon: 'el-icon-top',
        color: '#67C23A',
        value: 100,
        comment: 'Some income comment',
        id: 1,
      },
      2: {
        type: 'OUTCOME',
        icon: 'el-icon-bottom',
        color: '#F56C6C',
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
      const deleteQuestion = confirm('Хочешь удалить?');
      if (!deleteQuestion) {
        return;
      }

      this.$delete(this.list, id);
      //этот метод принимает обьект из которого нужно удалить, вторым свойство которое нужно удалить, и вызовет перерендеринг
    },
    onFormSubmit(data) {
      let { type, comment, value } = data;
      let color, icon;
      if (type === 'OUTCOME') {
        value = -value;
      }

      const newObj = {
        type,
        comment,
        value,
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
