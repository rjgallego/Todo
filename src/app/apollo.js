import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';


const GRAPHQL_ENDPOINT = 'https://touched-pigeon-66.hasura.app/v1/graphql';
const createApolloClient = (token) => {
    return new ApolloClient({
        link: new createHttpLink({
            uri: GRAPHQL_ENDPOINT,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }),
        cache: new InMemoryCache()
    });
}
export default createApolloClient;