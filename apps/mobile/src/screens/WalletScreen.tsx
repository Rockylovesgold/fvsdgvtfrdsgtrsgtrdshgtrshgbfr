import { useEffect, useRef, useState } from "react";
import { Animated, Text, View } from "react-native";
import { Card, Heading, LabelValue, PrimaryButton, Screen } from "../components/primitives";
import { promptBiometricLogin } from "../hooks/useBiometricLogin";

export function WalletScreen() {
  const [message, setMessage] = useState("Tap to refresh secure QR");
  const pulse = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.9, duration: 800, useNativeDriver: true })
      ])
    ).start();
  }, [pulse]);

  async function handleGenerateQr() {
    const auth = await promptBiometricLogin();
    if ("success" in auth && auth.success) {
      setMessage("QR refreshed. Ready for redemption.");
      return;
    }
    setMessage("Biometric check skipped. Showing last valid QR.");
  }

  return (
    <Screen>
      <Heading title="Wallet" subtitle="Premium pass, cups balance, and secure redemption QR." />
      <Card>
        <LabelValue label="Tier" value="Gold Membership" />
        <LabelValue label="Cups balance" value="14 remaining" />
        <LabelValue label="Next billing" value="01 Apr 2026" />
      </Card>
      <Card>
        <Text style={{ fontSize: 17, fontWeight: "700", color: "#1E1714" }}>Redemption QR</Text>
        <Animated.View
          style={{
            marginTop: 12,
            height: 180,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "#E8E1D8",
            backgroundColor: "#FFFDF9",
            alignItems: "center",
            justifyContent: "center",
            transform: [{ scale: pulse }]
          }}
        >
          <Text style={{ color: "#7A6F68" }}>Dynamic token area</Text>
        </Animated.View>
        <Text style={{ marginTop: 10, color: "#7A6F68" }}>{message}</Text>
        <View style={{ marginTop: 14 }}>
          <PrimaryButton label="Generate Dynamic QR" onPress={handleGenerateQr} />
        </View>
      </Card>
    </Screen>
  );
}
