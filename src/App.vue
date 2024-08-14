<template>
  <div>
    <input type="text" v-model="input">
    <button @click="addTodo(input)" style="display: block;" :disabled="!input">Add Todo Item</button>
    <hr/>
    <div>
      <input type="checkbox" v-model="filterCompleted"/><label>All Completed</label>
      <input type="checkbox" v-model="filterPending"/><label>All Pending</label>
    </div>
    <div v-for="(todo, index) in filteredTodos" :key="todo.id" style="display: block;">
      <div>
        <input type="checkbox" v-model="todo.isCompleted" @change="editTodo(index, 'isCompleted', true)"/>
        <span>{{ todo.todo }}</span>
        <span @click="deleteTodo(todo.id)" style="cursor: pointer;">Delete</span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useTodosStore } from './store/index.js';
import { storeToRefs } from 'pinia'

export default {
  setup () {
    const input = ref('')
    const store = useTodosStore();
    const { completedTodos, pendingTodos} = storeToRefs(store);
    const filterCompleted = ref(false)
    const filterPending = ref(false)

    const filteredTodos = computed(() => {
      return store.todos.filter((todo) => {
        if(filterCompleted.value){
          return completedTodos
        }
        if(filterPending.value){
          return pendingTodos
        }
        return todo
      });
    });



    return {
      input,
      filteredTodos,
      addTodo: store.addTodo,
      editTodo: store.editTodo,
      deleteTodo: store.deleteTodo,
      filterCompleted,
      filterPending
    }
  }
}
</script>

<style lang="scss" scoped>

</style>