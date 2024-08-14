import { defineStore } from "pinia";
import { ref, watch } from "vue";

 export const useTodosStore = defineStore("todos", () => {
    const todos = ref(JSON.parse(localStorage.getItem("todos")) || []);

    const editTodo = (index, field, value) => {
        try{
            todos.value[index][field] = value;
            localStorage.setItem("todos", JSON.stringify(todos.value));
        } catch(error){
            console.log('error', error)
        }
    }

    const deleteTodo = (id) => {
        try{
            todos.value = todos.value.filter((todo) => todo.id !== id);
            localStorage.setItem("todos", JSON.stringify(todos.value));
        } catch(error){
            console.log('error', error)
        }
    };

    const completedTodos = todos.value.filter((todo) => todo.isCompleted === true);
    const pendingTodos = todos.value.filter((todo) => todo.isCompleted !== true);


    const addTodo = (input) => {
      try {
        todos.value.push({
          todo: input,
          id: todos.value.length + 1,
          isEditing: false,
          isCompleted: false,
        });
        localStorage.setItem("todos", JSON.stringify(todos.value));
      } catch (error) {
        console.log(error);
      }
    };

    return {
      todos,
      addTodo,
      editTodo,
      deleteTodo,
      completedTodos,
      pendingTodos,
    };
});
