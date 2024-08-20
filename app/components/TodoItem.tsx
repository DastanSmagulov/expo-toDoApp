import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Entypo } from "@expo/vector-icons";
import { TodoItemProps } from "../interfaces/Todo";
import { styles } from "../styles/styles";

const TodoItem: React.FC<TodoItemProps> = ({
  item,
  toggleDone,
  openEditModal,
  confirmDelete,
}) => {
  return (
    <View style={styles.todoContainer}>
      <TouchableOpacity onPress={toggleDone} style={styles.todo}>
        {item.done ? (
          <Ionicons name="checkmark-circle" size={32} color="green" />
        ) : (
          <Entypo name="circle" size={32} color="black" />
        )}
        <Text style={[styles.todoText, item.done && styles.todoTextDone]}>
          {item.title}
        </Text>
      </TouchableOpacity>
      <Ionicons
        name="create-outline"
        size={24}
        color="blue"
        onPress={openEditModal}
        style={styles.icon}
      />
      <Ionicons
        name="trash-bin-outline"
        size={24}
        color="red"
        onPress={confirmDelete}
        style={styles.icon}
      />
    </View>
  );
};

export default TodoItem;
