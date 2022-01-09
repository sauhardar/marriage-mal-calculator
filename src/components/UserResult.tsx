import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles';
import { User } from '../types';

const styles = StyleSheet.create({
  container: {
    marginBottom: '5%',
    flexDirection: 'row',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark2,
    flex: 8,
  },
  points: {
    fontSize: 24,
    color: colors.dark1,
    flex: 4,
  },
});

type UserResultType = {
  user: User
}

const UserResult: React.FC<UserResultType> = ({ user }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>
        {user.name}{user.won && ' 🥳'}
      </Text>
      <Text style={styles.points}>
        {user.net}
      </Text>
    </View>
  );
};

export default UserResult;
