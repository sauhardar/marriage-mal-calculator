import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import { colors } from '../styles';
import { User } from '../types';
import { styles as newUserButtonStyles } from './AddUserButton';

type StartgameButtonProps = {
  users: User[];
}

const styles = StyleSheet.create({
  container: {
    ...newUserButtonStyles.container,
    backgroundColor: colors.dark1,
  },
});

const StartgameButton: React.FC<StartgameButtonProps> = ({ users }) => {
  const nav = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.container, { marginLeft: users.length > 1 && users.length < 6 ? '5%' : '0%' }]}
      onPress={() => nav.navigate('Calculator', { users })}
    >
      <Text>Start game 👉🏼</Text>
    </TouchableOpacity>
  );
};

export default StartgameButton;
