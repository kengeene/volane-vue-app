import { defineStore } from "pinia";
import { ref } from "vue";

 export const useTodosStore = defineStore("todos", () => {
    const todos = ref(JSON.parse(localStorage.getItem("todos")) || []);
    const addTodo = (input) => {
      try {
        todos.value.push(input);
        localStorage.setItem("todos", JSON.stringify(todos.value));
      } catch (error) {
        console.log(error);
      }
    };

    return {
      todos,
      addTodo,
    };
});
