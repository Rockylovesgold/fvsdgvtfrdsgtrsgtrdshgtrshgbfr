import { useState } from "react";
import { Text } from "react-native";
import { Card, Heading, LabelValue, PrimaryButton, Screen } from "../components/primitives";
import { registerForPushNotifications } from "../hooks/usePushNotifications";

export function AccountScreen() {
  const [pushState, setPushState] = useState("Not connected");

  async function handleEnablePush() {
    const result = await registerForPushNotifications();
    setPushState(result.granted ? "Push notifications enabled" : "Permission not granted");
  }

  return (
    <Screen>
      <Heading title="Account" subtitle="Profile, notifications, and membership settings." />
      <Card>
        <LabelValue label="Name" value="Amelia Price" />
        <LabelValue label="Email" value="amelia@bigcupclub.app" />
        <LabelValue label="Member since" value="Feb 2025" />
      </Card>
      <Card>
        <Text style={{ fontSize: 16, fontWeight: "700", color: "#1E1714", marginBottom: 8 }}>Notification settings</Text>
        <Text style={{ color: "#7A6F68", marginBottom: 10 }}>{pushState}</Text>
        <PrimaryButton label="Enable push notifications" onPress={handleEnablePush} />
      </Card>
    </Screen>
  );
}
