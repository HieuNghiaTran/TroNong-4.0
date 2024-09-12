import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from './src/Layout/Login';
import Home from './src/Layout/Home';
import RiceManager from './src/Layout/RiceManager';
import CameraAi from './src/Layout/Camera';
import Chat from './src/Layout/Chat';
import Forum from './src/Layout/Forum';
import Comment from './src/Layout/Comment';
import Wheather from './src/Layout/Wheather';
import PostForm from './src/Layout/PostForm';
import RicePrice from './src/Layout/Price';
import ContributePrice from './src/Layout/ContributePrice';
import Tintuc from './src/Layout/News';
import Profile from './src/Layout/Proflle';
import TaskScheduler from './src/Layout/TaskScheduler';
import FarmMaket from './src/Layout/FarmMarket';
import PostProduct from './src/Layout/PostProduct';
import { UserProvider } from './src/Context/authContext';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <>
      <UserProvider>

        <NavigationContainer>

          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="RiceManager" component={RiceManager} />
            <Stack.Screen name="Camera" component={CameraAi} />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="Forum" component={Forum} />
            <Stack.Screen name="Comment" component={Comment} />
            <Stack.Screen name="Wheather" component={Wheather} />
            <Stack.Screen name="PostForm" component={PostForm} />
            <Stack.Screen name="RicePrice" component={RicePrice} />
            <Stack.Screen name="ContributePrice" component={ContributePrice} />
            <Stack.Screen name="Tintuc" component={Tintuc} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="TaskScheduler" component={TaskScheduler} />
            <Stack.Screen name="FarmMaket" component={FarmMaket} />
            <Stack.Screen name="PostProduct" component={PostProduct} />

          </Stack.Navigator>
        </NavigationContainer>


      </UserProvider>
    </>
  );
}
