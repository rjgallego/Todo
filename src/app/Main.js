import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, AsyncStorage} from 'react-native';
import createApolloClient from './apollo'
import {ApolloProvider} from 'react-apollo';
import TodoList from '../TodoList';
import { ApolloClient } from "apollo-boost";

export default function Main({token, username, userId, logout}) {
    const [client, setClient] = useState(null);

    useEffect(() => {
        const client = createApolloClient(token);
        client.mutate({
            mutation: gql`mutation($username: String, $userid: String){
                insert_users(
                    objects: [{name: $username, id: $userid}]
                ) {
                    affected_rows
                }
            }`,
            variables: {
                username: username,
                userid: userId
            }
        }).then(() => {
            setClient(client);
        }).then(() => {
            logout();
        })
    }, []);

    if(!client){
        return (
            <View><Text>Loading...</Text></View>
        )   
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