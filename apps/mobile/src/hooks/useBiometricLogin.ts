import * as LocalAuthentication from "expo-local-authentication";

export async function promptBiometricLogin() {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  if (!hasHardware) return { success: false, reason: "no-hardware" };
  return LocalAuthentication.authenticateAsync({
    promptMessage: "Unlock Big Cup Club"
  });
}
