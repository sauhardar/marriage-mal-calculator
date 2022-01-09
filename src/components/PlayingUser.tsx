import React, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import { User } from '../types';
import { colors } from '../styles';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '5%',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 5,
    color: colors.dark2,
  },
  boxContainer: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: 'white',
    borderColor: colors.dark2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    fontSize: 22,
    flexGrow: 1,
    marginRight: '40%',
    textAlign: 'center',
    color: colors.dark2,
  },
});

export type PlayingUserProps = {
  user: User;
  setPoints: (points: number) => void;
  setShowed: (showed: boolean) => void;
  setWinner: (user: User) => void;
};

const PlayingUser: React.FC<PlayingUserProps> = ({
  user,
  setPoints,
  setShowed,
  setWinner,
}) => {
  useEffect(() => {
    if (user.won) {
      setShowed(true);
    }
  }, [user.won]);

  useEffect(() => {
    if (!user.showed) {
      setPoints(0);
    }
  }, [user.showed]);
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user.name}</Text>
      <View style={styles.boxContainer}>
        <TextInput
          style={[styles.textInput, { color: user.showed ? colors.dark2 : colors.dark1 }]}
          placeholder='0'
          keyboardType='numeric'
          editable={user.showed}
          value={user.points ? user.points.toString() : '0'}
          clearTextOnFocus
          onKeyPress={() => setShowed(true)}
          onChangeText={(text) => setPoints(parseInt(text, 10))}
          onTouchStart={() => setShowed(true)}
        />
      </View>
      <View style={styles.boxContainer}>
        <TouchableOpacity
          onPress={() => setShowed(!user.showed)}
          style={[styles.box, { alignSelf: 'center', backgroundColor: user.showed ? colors.dark2 : 'white' }]}
          disabled={user.won}
        >
          {user.showed && <Text><Icon name="check" size={12} color="white"/></Text>}
        </TouchableOpacity>
      </View>
      <View style={styles.boxContainer}>
        <TouchableOpacity
          onPress={() => setWinner(user)}
          style={[styles.box, {
            borderRadius: 50,
            backgroundColor: user.won ? colors.dark2 : 'white',
          }]}
        />
      </View>
    </View>
  );
};

export default PlayingUser;
