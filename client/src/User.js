export class User {
    constructor(first_name, sure_name, profile_picture) {
      this.first_name = first_name
      this.sure_name = sure_name
      this.profile_picture = profile_picture
      this.todos = []
      this.experience = 0
      this.level = 1
    }

    addTodo(todo) {
      this.todos.push(todo);
    }
  }