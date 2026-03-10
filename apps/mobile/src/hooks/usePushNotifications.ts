import * as Notifications from "expo-notifications";

export async function registerForPushNotifications() {
  const permission = await Notifications.requestPermissionsAsync();
  if (permission.status !== "granted") {
    return { granted: false };
  }
  const token = await Notifications.getExpoPushTokenAsync();
  return { granted: true, token: token.data };
}
