import type { PropsWithChildren, ReactNode } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { mobileTheme } from "../theme/tokens";

export function Screen({ children }: PropsWithChildren) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>{children}</View>
    </SafeAreaView>
  );
}

export function Heading({
  title,
  subtitle
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <View style={{ marginBottom: mobileTheme.spacing.md }}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

export function Card({ children }: PropsWithChildren) {
  return <View style={styles.card}>{children}</View>;
}

export function LabelValue({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ marginBottom: mobileTheme.spacing.sm }}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return <Text style={styles.pill}>{children}</Text>;
}

export function PrimaryButton({
  label,
  onPress,
  disabled
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.button,
        disabled ? styles.buttonDisabled : undefined,
        pressed ? { transform: [{ scale: 0.98 }] } : undefined
      ]}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: mobileTheme.color.background },
  screen: { flex: 1, paddingHorizontal: mobileTheme.spacing.md, paddingTop: mobileTheme.spacing.md },
  title: { fontSize: 28, fontWeight: "700", color: mobileTheme.color.text },
  subtitle: { marginTop: 6, color: mobileTheme.color.mutedText, fontSize: 14 },
  card: {
    backgroundColor: mobileTheme.color.surface,
    borderRadius: mobileTheme.radius.card,
    padding: mobileTheme.spacing.md,
    borderWidth: 1,
    borderColor: mobileTheme.color.border,
    marginBottom: mobileTheme.spacing.md
  },
  label: {
    fontSize: 12,
    textTransform: "uppercase",
    color: mobileTheme.color.mutedText,
    letterSpacing: 0.7
  },
  value: { marginTop: 2, fontSize: 16, fontWeight: "600", color: mobileTheme.color.text },
  pill: {
    alignSelf: "flex-start",
    borderRadius: 999,
    backgroundColor: "#E8F4EF",
    color: "#2E654A",
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 12,
    fontWeight: "600"
  },
  button: {
    backgroundColor: mobileTheme.color.accent,
    borderRadius: mobileTheme.radius.input,
    paddingVertical: 14,
    alignItems: "center"
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: "#FFFFFF", fontWeight: "700", fontSize: 15 }
});
