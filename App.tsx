import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './Frontend/Splash';
import Login from './Frontend/Login';
import Home from "./Frontend/Home";
import Member from "./Frontend/Member";
import Register from "./Frontend/Register";
import AdminLogin from "./Frontend/AdminLogin";
import AdminHome from "./Frontend/AdminHome";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}} />
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />   
      <Stack.Screen name="Register" component={Register} options={{headerShown: false}} /> 
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />   
        <Stack.Screen name="Member" component={Member} options={{headerShown: false}} />   
        <Stack.Screen name="AdminLogin" component={AdminLogin} options={{headerShown: false}} />
        <Stack.Screen name="AdminHome" component={AdminHome} options={{headerShown: false}} />
                
     </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;