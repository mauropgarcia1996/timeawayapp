import {NavigationContainer, NavigationContext} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import SignInScreen from '../pages/SignInScreen';
import Home from '../pages/Main/Home';
import {Button} from 'react-native-paper';
import {supabase} from '../api/supabaseConfig';
import {useAuthStore} from '../store/authStore';
import LoginScreen from '../pages/LoginScreen';

const Stack = createNativeStackNavigator();

const Router = () => {
  const {session, setSession} = useAuthStore();
  const logout = async () => {
    let {error} = await supabase.auth.signOut();
    if (!error) {
      setSession(null);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={session ? 'Home' : 'SignIn'}>
        {session ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerRight: () => <Button onPress={logout}>Logout</Button>,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                title: '',
              }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                title: '',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
