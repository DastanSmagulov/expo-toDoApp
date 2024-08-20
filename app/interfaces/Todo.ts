export interface Todo {
  title: string;
  done: boolean;
  id: string;
}

export interface TodoListProps {
  todos: Todo[];
  addToDo: () => void;
  setTodo: (text: string) => void;
  todo: string;
  toggleDone: (item: Todo) => void;
  openEditModal: (item: Todo) => void;
  confirmDelete: (item: Todo) => void;
}

export interface TodoItemProps {
  item: Todo;
  toggleDone: () => void;
  openEditModal: () => void;
  confirmDelete: () => void;
}
