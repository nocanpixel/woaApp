import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeScreen } from "../screens/HomeScreen";
import { SettingScreen } from "../screens/SettingScreen";
import { StatusBar } from "expo-status-bar";
import { MyTabBar } from "../components/TabBar";

const Tab = createBottomTabNavigator();

export const MainController = () => {
    return (
        <NavigationContainer>
            <StatusBar
                animated={true}
                backgroundColor="#61dafb"
            />
            <Tab.Navigator
                initialRouteName="Home"
                tabBar={(props) => <MyTabBar {...props} />}
                backBehavior="order"
            >
                <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Tab.Screen name="Settings" component={SettingScreen} options={{ headerShown: false }} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}