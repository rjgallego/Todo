import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createApolloClient from './apollo'
import {ApolloProvider} from '@apollo/client';
import TodoList from '../TodoList';
import { ApolloClient } from "apollo-boost";
//import { gql } from 'graphql-tag';
//import { gql, useMutation } from '@apollo/client';


export default function Main({username, userId, token, logout}) {
    const [client, setClient] = useState(null);
    // const [addUser] = useMutation(ADD_USER);

    useEffect(() => {
        const newClient = createApolloClient(token);
        if(newClient){
            setClient(newClient);
        }
    }, []);

    if(!client){
        return <View><Text>Loading...</Text></View>
        
    } else {
        return (
            <ApolloProvider client={client}>
                <TodoList
                    userId={userId}
                    username={username}
                    logout={logout}
                />
            </ApolloProvider>
        )
    }
}