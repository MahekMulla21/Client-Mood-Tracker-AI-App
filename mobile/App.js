import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "expo-async-storage";

import { AuthProvider, AuthContext } from "./src/context/AuthContext";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import MoodEntryScreen from "./src/screens/MoodEntryScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import colors from "./src/styles/colors";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthNavigator = ({ onLoginSuccess }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
      }}
    >
      <Stack.Screen name="Login" options={{ headerShown: false }}>
        {(props) => <LoginScreen {...props} onLoginSuccess={onLoginSuccess} />}
      </Stack.Screen>
      <Stack.Screen name="Register" options={{ headerShown: false }}>
        {(props) => (
          <RegisterScreen {...props} onLoginSuccess={onLoginSuccess} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const AppNavigator = ({ user, onLogout }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: colors.border,
          paddingBottom: 5,
          backgroundColor: "white",
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        options={{
          title: "Dashboard",
          tabBarLabel: "📊 Home",
        }}
      >
        {(props) => (
          <DashboardScreen {...props} user={user} onLogout={onLogout} />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="MoodEntry"
        options={{
          title: "Log Mood",
          tabBarLabel: "➕ Log",
        }}
        component={MoodEntryScreen}
      />

      <Tab.Screen
        name="History"
        options={{
          title: "History",
          tabBarLabel: "📋 History",
        }}
        component={HistoryScreen}
      />

      <Tab.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarLabel: "👤 Profile",
        }}
      >
        {(props) => (
          <ProfileScreen {...props} user={user} onLogout={onLogout} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const RootNavigator = ({ authContext }) => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            user: action.user,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            user: action.user,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            user: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      user: null,
    },
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        console.error("Failed to restore session:", e);
      }
      dispatch({ type: "RESTORE_TOKEN", token: userToken, user: null });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (token, user) => {
        await AsyncStorage.setItem("userToken", token);
        dispatch({ type: "SIGN_IN", token, user });
      },
      signOut: async () => {
        await AsyncStorage.removeItem("userToken");
        dispatch({ type: "SIGN_OUT" });
      },
    }),
    [],
  );

  if (state.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {state.userToken == null ? (
        <AuthNavigator onLoginSuccess={authContext.signIn} />
      ) : (
        <AppNavigator user={state.user} onLogout={authContext.signOut} />
      )}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
