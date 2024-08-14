<template>
  <div>
    <input type="text" v-model="input">
    <button @click="addTodo(input)" style="display: block;">Add Todo Item</button>
    <hr/>
    <div>
      <span v-for="(todo, index) in todoList" :key="index" style="display: block;">{{ todo }}</span>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useTodosStore } from './store/index.js';
export default {
  setup () {
    const input = ref('')
    const store = useTodosStore();
    const { addTodo } = useTodosStore();


    return {
      input,
      todoList: computed(() => store.todos),
      addTodo,
    }
  }
}
</script>

<style lang="scss" scoped>

</style>