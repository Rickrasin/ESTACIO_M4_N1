import * as React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

// Importar as telas
import Pratica from "./app/Screens/Pratica";

import Atividade2 from "./app/Screens/Atividade2";
import Atividade3 from "./app/Screens/Atividade3";
import Atividade4 from "./app/Screens/Atividade4";
import Atividade5 from "./app/Screens/Atividade5";

function HomeScreen({ navigation }) {
  return (
    <View style={{ marginTop: 48 }}>
      <Pratica />
    </View>
  );
}

// Configuração do Bottom Tab Navigator
const Tab = createBottomTabNavigator();
function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Prática">
      <Tab.Screen
        name="Prática"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => <Ionicons name="book" />
        }}
      />
      <Tab.Screen
        name="Atividade 2"
        component={Atividade2}
        options={{
          headerShown: false,
          tabBarIcon: () => <Ionicons name="book-outline" />
        }}
      />
      <Tab.Screen
        name="Atividade 3"
        component={Atividade3}
        options={{
          headerShown: false,
          tabBarIcon: () => <Ionicons name="book-outline" />
        }}
      />
      <Tab.Screen
        name="Atividade 4"
        component={Atividade4}
        options={{
          headerShown: false,
          tabBarIcon: () => <Ionicons name="book-outline" />
        }}
      />
      <Tab.Screen
        name="Atividade 5"
        component={Atividade5}
        options={{
          headerShown: false,
          tabBarIcon: () => <Ionicons name="book-outline" />
        }}
      />
    </Tab.Navigator>
  );
}

// Configuração do Stack Navigator
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
