import React from 'react';
import { FlatList, View, StyleSheet, ScrollView} from 'react-native';
//import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

const FETCH_TODOS = gql`
    query getMyTodos{
        todos {
            id
            text
            is_completed
        }
    }`;

export default function TodoList({userId, username, logout}) {
    const { loading, error, data } = useQuery(FETCH_TODOS);

    if(loading) {
        return <div>Loading ...</div>
    }
    if(error) {
        console.log(error)
        return <div>Error!</div> 
    }
    return(
        <ScrollView style={styles.container} contentContainerStyle={styles.container}>
            <FlatList
                data={data.todos}
                renderItem={({item}) => <Text>item.text</Text>}
                keyExtractor={(item) => item.id.toString()}
            />
        </ScrollView>
    )
}
