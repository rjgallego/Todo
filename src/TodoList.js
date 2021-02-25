import React from 'react';
import { FlatList, View, StyleSheet, ScrollView} from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const FETCH_TODOS = gql`
    query{
        todos{
            id
            text
            is_completed
        }
    }
    `;

export default function TodoList() {
    return(
        <Query query={FETCH_TODOS}>
            {
                ({data, error, loading}) => {
                    if(error || loading){
                        return <View><Text>Loading ...</Text></View>
                    }
                    return (
                        <ScrollView style={styles.container} contentContainerStyle={styles.container}>
                            <FlatList
                                data={data.todos}
                                renderItem={({item}) => <Text>item.text</Text>}
                                keyExtractor={(item) => item.id.toString()}
                            />
                        </ScrollView>

                    )
                }
            }
        </Query>

    )
}
