import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import { colors } from '../styles';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3%',
    borderRadius: 10,
    flexGrow: 1,
    height: 50,
  },
});

type AddUserButtonProps = {
  addNewUser: () => void;
  completeAddingUser: () => void;
  addingUser: boolean;
  usersLength: number;
};

const AddUserButton: React.FC<AddUserButtonProps> = ({
  addNewUser, addingUser, completeAddingUser, usersLength,
}) => {
  const buttonText = (): string => {
    if (usersLength >= 6) {
      return 'Player limit reached!';
    }
    return 'Add player 👋🏽';
  };

  return (
    <TouchableOpacity
      onPress={addingUser ? completeAddingUser : addNewUser}
      style={[styles.container, { backgroundColor: addingUser ? colors.light3 : colors.light1 }]}
      disabled={usersLength >= 6}
    >
      <Text>{buttonText()}</Text>
    </TouchableOpacity>
  );
};

export default AddUserButton;
