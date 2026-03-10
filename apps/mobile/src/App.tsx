import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "./screens/HomeScreen";
import { WalletScreen } from "./screens/WalletScreen";
import { BrowseScreen } from "./screens/BrowseScreen";
import { OrdersScreen } from "./screens/OrdersScreen";
import { AccountScreen } from "./screens/AccountScreen";
import { mobileTheme } from "./theme/tokens";

export type RootTabParamList = {
  Home: undefined;
  Wallet: undefined;
  Browse: undefined;
  Orders: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: mobileTheme.color.surface },
          headerShadowVisible: false,
          headerTitleStyle: { color: mobileTheme.color.text, fontWeight: "700" },
          tabBarStyle: {
            backgroundColor: mobileTheme.color.surface,
            borderTopColor: mobileTheme.color.border,
            height: 64,
            paddingTop: 6
          },
          tabBarActiveTintColor: mobileTheme.color.accent,
          tabBarInactiveTintColor: mobileTheme.color.mutedText
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Wallet" component={WalletScreen} />
        <Tab.Screen name="Browse" component={BrowseScreen} />
        <Tab.Screen name="Orders" component={OrdersScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
