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
import { computed, ref, watch } from 'vue';
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
            if(filterCompleted.value === true){
          return store.todos.filter(todo=> todo.isCompleted)
        }
        if(filterPending.value === true){
          return store.todos.filter(todo=> !todo.isCompleted)
        }
      return store.todos.filter((todo) => todo
  );
    });

    watch(filterCompleted, (newValue) => {
      filterPending.value = !newValue
    })

      watch(filterPending, (newValue) => {
      filterCompleted.value = !newValue
    })



    return {
      input,
      filteredTodos,
      addTodo: store.addTodo,
      editTodo: store.editTodo,
      deleteTodo: store.deleteTodo,
      filterCompleted,
      filterPending,
      completedTodos,
      pendingTodos
    }
  }
}
</script>

<style lang="scss" scoped>

</style>