import React, { useEffect, useState } from "react";
import { View, Modal, Button, TextInput, Text } from "react-native";
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
import { styles } from "../styles/styles";

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

      {/* Edit Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Edit Todo</Text>
            <TextInput
              style={styles.modalInput}
              onChangeText={(text) =>
                setEditTodo((prev) => prev && { ...prev, title: text })
              }
              value={editTodo?.title}
            />
            <View style={styles.modalButtonContainer}>
              <Button title="Save" onPress={saveEditTodo} />
              <Button
                title="Cancel"
                onPress={() => setEditModalVisible(false)}
                color="red"
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Delete Todo</Text>
            <Text style={styles.modalText}>
              Are you sure you want to delete this todo?
            </Text>
            <View style={styles.modalButtonContainer}>
              <Button title="Delete" onPress={deleteItem} color="red" />
              <Button
                title="Cancel"
                onPress={() => setDeleteModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ListScreen;
