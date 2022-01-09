import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Keyboard, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { PlayingUser, UserResult } from '../components';
import { colors } from '../styles';
import { User } from '../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '20%',
    paddingHorizontal: '5%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10%',

  },
  innerContainer: {
    width: '100%',
  },
  headerText: {
    flex: 3,
    color: colors.dark2,
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: colors.light2,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: '20%',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
  },
  resultsContainer: {
    width: '100%',
    height: '30%',
    marginVertical: '10%',
  },
  resultsHeaderText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '10%',
  },
  totalContainer: {
    flexDirection: 'row',
    paddingVertical: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Calculation: React.FC = ({ route }) => {
  const [calculated, setCalculated] = useState(false);
  const [users, setUsers] = useState<User[]>(route.params.users);
  const nav = useNavigation();

  // inefficient, i know
  const calculate = () => {
    const totalPoints = users.reduce((prev, curr) => prev + curr.points, 0);
    let totalWinnerWinnings = 0;

    let allPlayers = users.map((user) => {
      let net = 0;
      if (!user.showed) {
        net = (totalPoints + 10);
        totalWinnerWinnings += net;
        return { ...user, net: net * -1 };
      } if (user.showed && !user.won) {
        net = (user.points * users.length) - (totalPoints + 3);
        totalWinnerWinnings -= net;
        return { ...user, net };
      }
      return user;
    });

    allPlayers = allPlayers.map((user) => {
      if (user.won) {
        return { ...user, net: totalWinnerWinnings };
      }
      return user;
    });

    setUsers(allPlayers);
    setCalculated(true);
  };

  const routeHome = () => {
    nav.navigate('Home', { newGame: true });
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={Keyboard.dismiss} style={styles.container}>
      {!calculated && (
        <View style={styles.innerContainer}>
          <View style={styles.headerContainer}>
            <Text style={[styles.headerText, { flex: 5, textAlign: 'left' }]}>Name</Text>
            <Text style={[styles.headerText, { textAlign: 'left' }]}>Points</Text>
            <Text style={styles.headerText}>Showed</Text>
            <Text style={styles.headerText}>Won</Text>
          </View>
          {
            users.map((user, index) => (
              <PlayingUser
                key={`${user.name}-${index}`}
                setPoints={(points: number) => setUsers(users.map((u) => (u === user
                  ? { ...u, points } : u)))}
                setShowed={(showed: boolean) => setUsers(users.map((u) => (u === user
                  ? { ...u, showed } : u)))}
                setWinner={(winningUser: User) => setUsers(users.map((u) => (u === winningUser
                  ? { ...u, won: true } : { ...u, won: false })))}
                user={user}/>
            ))}
          <View style={styles.totalContainer}>
            <Text style={{
              fontWeight: 'bold', color: colors.dark3, fontSize: 28, flex: 5,
            }}>Total
            </Text>
            <Text
              style={{ flex: 9, fontSize: 22, color: colors.dark3 }}
            >
              {users.reduce((prev, curr) => prev + curr.points, 0) || 'Enter all points!'}
            </Text>
          </View>
        </View>
      )}
      {calculated && (
        <View style={styles.resultsContainer}>
          <View style={styles.resultsHeaderText}>
            <Text style={[styles.headerText, { flex: 8 }]}>Name</Text>
            <Text style={[styles.headerText, { flex: 4 }]}>Winnings</Text>
          </View>
          <View>
            {
              users.map((user, index) => (
                <UserResult
                  key={`${user.name}-${index}-result`}
                  user={user}
                />
              ))
            }
          </View>
        </View>
      )}
      {!calculated && (
        <TouchableOpacity
          onPress={calculate}
          activeOpacity={0.8}
          style={[styles.button, {
            backgroundColor: !users.some((user) => user.won)
              ? 'gray'
              : colors.light2,
          }]}
          disabled={!users.some((user) => user.won)}
        >
          <Text style={styles.buttonText}>Calculate 👉🏼</Text>
        </TouchableOpacity>
      )}
      {calculated && (
        <TouchableOpacity
          onPress={routeHome}
          activeOpacity={0.8}
          style={[styles.button, { backgroundColor: colors.light3 }]}
        >
          <Text style={styles.buttonText}>Play again! 🥸</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default Calculation;
