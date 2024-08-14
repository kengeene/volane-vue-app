<template>
  <div class="container">
    <input type="text" v-model="input" placeholder="Type here to add a new todo" class="todo__input">
    <button @click="addTodo(input)" style="display: block;" :disabled="!input">Add Todo Item</button>
    <hr/>
    <div>
      <input type="checkbox" v-model="filterCompleted"/><label>All Completed</label>
      <input type="checkbox" v-model="filterPending"/><label>All Pending</label>
    </div>
    <p>Click on a todo to edit it</p>
    <div v-for="(todo, index) in filteredTodos" :key="todo.id" class="todo__item">
      <div>
        <input type="checkbox" v-model="todo.isCompleted" @change="editTodo(index, 'isCompleted', true)"/>
        <span v-if="!todo.isEditing" @click="editTodo(index, 'isEditing', true)">{{ todo.todo }}</span>
        <div v-else>
        <input v-model="todo.todo" @keyup.enter="editTodo(index, 'todo', true)" class="todo__input">
        <button @click="editTodo(index, 'todo', todo.todo)">Edit</button>
        </div>
        <span @click="deleteTodo(todo.id)" style="cursor: pointer;">Delete</span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue';
import { useTodosStore } from '../store/index.js';
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
      if(newValue === true){
      filterPending.value = !newValue
      }
    })

      watch(filterPending, (newValue) => {
      if(newValue === true){
        filterCompleted.value = !newValue
      }
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
.container{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.todo{
  &__item{
  display: flex;
  border: 1px solid white;
  padding: 10px;
  border-radius: 5px;
  margin: 10px;
  justify-content: space-around;
  }

  &__input{
    border-radius: 5px;
    padding: 10px;
    margin:10px;
    border-radius: 5px;
    width: 300px;
  }
}
</style>