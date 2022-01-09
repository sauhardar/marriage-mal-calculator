import React, { useState } from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text, TouchableOpacity, View,
} from 'react-native';
import { AddUserButton, User } from '../components';
import NewUser from '../components/NewUser';
import StartgameButton from '../components/StartgameButton';
import { User as UserType } from '../types';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  limitAlertText: {
    fontSize: 14,
    marginBottom: '5%',
    color: 'red',
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: width * 0.7,
    alignItems: 'center',
    marginTop: '5%',
  },
});

export type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [addingUser, setAddingUser] = useState(false);
  const [newUsername, setNewUsername] = useState<string>('');

  const completeAddingUser = (name: string) => {
    if (name !== '') {
      setUsers([...users, {
        name, won: false, showed: false, net: 0, points: 0,
      }]);
      setNewUsername('');
    }
  };

  const dismissKeyboard = () => {
    setAddingUser(false);
    Keyboard.dismiss();
  };

  // remove user from users array
  const deletePlayer = (index: number) => {
    const newUsers = [...users];
    newUsers.splice(index, 1);
    setUsers(newUsers);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height' }>
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps='always'
      >
        <TouchableOpacity
          onPress={dismissKeyboard}
          accessible={false}
          activeOpacity={1}
          style={[styles.container, { alignItems: 'baseline' }]}
        >
          <View style={{
            width: width * 0.7,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '20%',
          }}>
            {
              (users.length > 0 || addingUser)
                ? users.map((user, i) => (
                  <User
                    key={`${user.name}-${i}`}
                    deletePlayer={() => deletePlayer(i)}
                    user={user} />
                ))
                : (
                  <View style={{ marginVertical: '10%' }}>
                    <Text
                      style={{ fontSize: 25, textAlign: 'center' }}>
                    Welcome to Marriage Mal Calculator!
                    </Text>
                    <Text style={{ fontSize: 16, textAlign: 'center', marginVertical: '5%' }}>
                  Add players to get started! 🥳
                    </Text>
                  </View>
                )
            }
          </View>
          {
            addingUser && users.length < 6 && (
              <NewUser
                completeAddingUser={() => completeAddingUser(newUsername)}
                username={newUsername}
                setUser={(name) => setNewUsername(name)}
              />
            )
          }
          {users.length === 6 && (
            <Text
              style={styles.limitAlertText}>
                👍🏽 Player limit reached!
            </Text>
          )}
          <View style={styles.buttonsContainer}>
            {users.length < 6 && (
              <AddUserButton
                usersLength={users.length}
                addingUser={addingUser}
                addNewUser={() => setAddingUser(!addingUser)}
                completeAddingUser={() => completeAddingUser(newUsername)}
              />
            )}
            {users.length >= 2 && <StartgameButton users={users} />}
          </View>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Home;
