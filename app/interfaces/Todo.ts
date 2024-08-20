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

export interface DeleteModalProps {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export interface EditModalProps {
  visible: boolean;
  onClose: () => void;
  todo: Todo | null;
  onSave: (updatedTodo: Todo) => void;
  onChangeTitle: (title: string) => void;
}
