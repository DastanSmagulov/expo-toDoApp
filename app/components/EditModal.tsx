import React from "react";
import { View, Modal, Button, TextInput, Text } from "react-native";
import { EditModalProps } from "../interfaces/Todo";
import { styles } from "../styles/styles";

const EditModal: React.FC<EditModalProps> = ({
  visible,
  onClose,
  todo,
  onSave,
  onChangeTitle,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Edit Todo</Text>
          <TextInput
            style={styles.modalInput}
            onChangeText={onChangeTitle}
            value={todo?.title || ""}
          />
          <View style={styles.modalButtonContainer}>
            <Button title="Save" onPress={() => todo && onSave(todo)} />
            <Button title="Cancel" onPress={onClose} color="red" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditModal;
