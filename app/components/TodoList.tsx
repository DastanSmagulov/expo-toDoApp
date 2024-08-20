import React from "react";
import { View, TextInput, Button, FlatList } from "react-native";
import TodoItem from "./TodoItem";
import { TodoListProps } from "../interfaces/Todo";

const TodoList: React.FC<TodoListProps> = ({
  todos,
  addToDo,
  setTodo,
  todo,
  toggleDone,
  openEditModal,
  confirmDelete,
}) => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderRadius: 4,
            padding: 10,
            backgroundColor: "#fff",
            marginRight: 10,
          }}
          placeholder="Add new todo"
          onChangeText={setTodo}
          value={todo}
        />
        <Button onPress={addToDo} title="Add ToDo" disabled={todo === ""} />
      </View>
      {todos.length > 0 && (
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <TodoItem
              item={item}
              toggleDone={() => toggleDone(item)}
              openEditModal={() => openEditModal(item)}
              confirmDelete={() => confirmDelete(item)}
            />
          )}
          keyExtractor={(todo) => todo.id}
        />
      )}
    </View>
  );
};

export default TodoList;
