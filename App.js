import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Auth from './src/auth/Auth';
import Main from './src/app/Main';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [jwt, setJwt] = useState("");
  const [loading, setLoading] = useState(false);

  const login = (userId, username, token) => {
    setIsLoggedIn(true);
    setUserId(userId);
    setUsername(username);
    setJwt(token);
    setLoading(false);
  }

  const logout = () => {
    setIsLoggedIn(false);
    setLoading(false);
  }

  

  const tryLogin = async () => {
    AsyncStorage.getItem('@todo-graphql:auth0').then((session) => {
      if(session){
        const obj = JSON.parse(session);
        if(obj.exp > Math.floor(new Date().getTime() / 1000)){
          login(obj.id, obj.name, obj.token);
        } else {
          logout();
        }
      }else {
        logout();
      }
    })
  }

  useEffect(() => {
    tryLogin();
  }, []);

  if(loading){
    return (<View><Text>Loading...</Text></View>)
  }
  if(isLoggedIn) {
      return (
        <Main
          userId={userId}
          username={username}
          token={jwt}
          logout={logout}
        />
      )
  } else {
      return (<Auth login={login} styles={styles} />)
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
