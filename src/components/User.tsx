import React from 'react';
import {
  Dimensions,
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../styles';
import { User as UserType } from '../types';

const { width } = Dimensions.get('window');

export type UserProps = {
  user: UserType;
  deletePlayer: () => void;
};

const styles = StyleSheet.create({
  container: {
    marginBottom: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.7,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const User: React.FC<UserProps> = ({ user, deletePlayer }) => (
  <View style={styles.container}>
    <Text style={styles.name}>
      {user.name}
    </Text>
    <TouchableOpacity
      onPress={deletePlayer}
    >
      <Text>
        <Icon name="trash" size={25} color={colors.dark1}/>
      </Text>
    </TouchableOpacity>
  </View>
);

export default User;
