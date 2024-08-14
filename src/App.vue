<template>
  <div>
    <input type="text" v-model="input">
    <button @click="addTodo()" style="display: block;">Add Todo Item</button>
    <hr/>
    <div>
      <span v-for="(todo, index) in todos" :key="index" style="display: block;">{{ todo }}</span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup () {
    const input = ref('')
    const todos = ref([])
    const addTodo = () => {
      todos.value.push(input.value)
      input.value = ''
    }

    return {
      input,
      todos,
      addTodo
    }
  }
}
</script>

<style lang="scss" scoped>

</style>