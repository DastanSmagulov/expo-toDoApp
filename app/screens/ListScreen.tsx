import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";
import TodoList from "../components/TodoList";
import { Todo } from "../interfaces/Todo";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";

const ListScreen: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<string>("");
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const todoRef = collection(FIRESTORE_DB, "todos");

    const subscriber = onSnapshot(todoRef, {
      next: (snapshot) => {
        const todos: Todo[] = [];
        snapshot.docs.forEach((doc) => {
          todos.push({ id: doc.id, ...doc.data() } as Todo);
        });
        setTodos(todos);
      },
    });

    return () => subscriber();
  }, []);

  const addToDo = async () => {
    await addDoc(collection(FIRESTORE_DB, "todos"), {
      title: todo,
      done: false,
    });
    setTodo("");
  };

  const toggleDone = async (item: Todo) => {
    const ref = doc(FIRESTORE_DB, `todos/${item.id}`);
    await updateDoc(ref, { done: !item.done });
  };

  const openEditModal = (item: Todo) => {
    setEditTodo(item);
    setEditModalVisible(true);
  };

  const saveEditTodo = async () => {
    if (editTodo) {
      const ref = doc(FIRESTORE_DB, `todos/${editTodo.id}`);
      await updateDoc(ref, { title: editTodo.title });
      setEditTodo(null);
      setEditModalVisible(false);
    }
  };

  const confirmDelete = (item: Todo) => {
    setEditTodo(item);
    setDeleteModalVisible(true);
  };

  const deleteItem = async () => {
    if (editTodo) {
      const ref = doc(FIRESTORE_DB, `todos/${editTodo.id}`);
      await deleteDoc(ref);
      setEditTodo(null);
      setDeleteModalVisible(false);
    }
  };

  return (
    <View style={{ marginHorizontal: 20 }}>
      <TodoList
        todos={todos}
        addToDo={addToDo}
        setTodo={setTodo}
        todo={todo}
        toggleDone={toggleDone}
        openEditModal={openEditModal}
        confirmDelete={confirmDelete}
      />

      <EditModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        todo={editTodo}
        onSave={saveEditTodo}
        onChangeTitle={(title) =>
          setEditTodo((prev) => prev && { ...prev, title })
        }
      />

      {/* Delete Modal */}
      <DeleteModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onDelete={deleteItem}
      />
    </View>
  );
};

export default ListScreen;
