import React from 'react';
import {
  Dimensions, StyleSheet, TextInput, View,
} from 'react-native';

const { width } = Dimensions.get('window');

type NewUserProps = {
  setUser: (name: string) => void;
  username: string;
  completeAddingUser: () => void;
};

const styles = StyleSheet.create({
  textInput: {
    marginBottom: '5%',
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: '3%',
    borderRadius: 10,
    width: width * 0.7,
  },
});

const NewUser: React.FC<NewUserProps> = ({ completeAddingUser, setUser, username }) => {
  return (
    <View>
      <TextInput
        style={styles.textInput}
        placeholder="New player's name"
        autoFocus
        onChangeText={(text: string) => setUser(text)}
        value={username}
        onSubmitEditing={completeAddingUser}
        blurOnSubmit={false}
      />
    </View>
  );
};

export default NewUser;
