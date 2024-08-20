import React from "react";
import { View, Modal, Button, Text } from "react-native";
import { styles } from "../styles/styles";
import { DeleteModalProps } from "../interfaces/Todo";

const DeleteModal: React.FC<DeleteModalProps> = ({
  visible,
  onClose,
  onDelete,
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
          <Text style={styles.modalTitle}>Delete Todo</Text>
          <Text style={styles.modalText}>
            Are you sure you want to delete this todo?
          </Text>
          <View style={styles.modalButtonContainer}>
            <Button title="Delete" onPress={onDelete} color="red" />
            <Button title="Cancel" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModal;
