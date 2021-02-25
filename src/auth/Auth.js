import * as AuthSession from 'expo-auth-session';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import jwtDecoder from 'jwt-decode';
import {useAuth0} from '@auth0/auth0-react';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const auth0ClientId = '4tke43ZrVQnrfRfMT74bTQ4pzWFpAEvN';
const auth0Domain = 'https://dev-jor6ny5m.us.auth0.com';
const auth0Audience = 'https://dev-jor6ny5m.us.auth0.com/api/v2/'

const toQueryString = (params) => {
    return '?' + Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
};

export default function Auth({login, styles}) {
    const [isLoggedIn, setIsLoggedIn] = useState("");
    const { loginWithRedirect } = useAuth0();

    const loginWithAuth0 = () => {
        const redirectUrl = AuthSession.makeRedirectUri({
            native: "exp://localhost:19006",
            useProxy: true
        });

        const authUrl = `${auth0Domain}/authorize` + toQueryString({
            client_id: auth0ClientId,
            response_type: 'token id_token',
            scope: 'openid profile',
            audience: auth0Audience,
            redirect_uri: redirectUrl,
            nonce: "randomstring"
        });

        const result = AuthSession.startAsync({
            authUrl: authUrl,
            returnUrl: redirectUrl
        }).then(result => {
            if(result.type === 'success'){
                handleParams(result.params);
            }
        });
    }

    const handleParams = async (responseObj) => {
        if(responseObj.error){
            Alert.alert('Error', responseObj.error_description || 'something went wrong while logging in');
            return;
        }
        const encodedToken = responseObj.id_token;
        const decodedToken = jwtDecoder(encodedToken);

        await AsyncStorage.setItem(
            '@todo-graphql:auth0',
            JSON.stringify({
                token: encodedToken,
                name: decodedToken.nickname,
                id: decodedToken.sub,
                exp: decodedToken.exp
            })
        ).then(() => {
            login(decodedToken.sub, decodedToken.nickname, encodedToken)
        })
    }

    return(
        <View style={styles.container}>
            <View>
            <TouchableOpacity
                style={styles.loginButton}
                onPress={loginWithAuth0}
            >
                <Text style={styles.buttonText}> Login </Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}