import { Text, View } from "react-native";
import { Card, Heading, LabelValue, Pill, Screen } from "../components/primitives";
import { useAsyncState } from "../hooks/useAsyncState";
import { fetchFeaturedCafes } from "../services/mock-data";

export function HomeScreen() {
  const { data, loading, error } = useAsyncState(fetchFeaturedCafes, []);

  return (
    <Screen>
      <Heading title="Good morning" subtitle="Here is your member briefing and nearby coffee picks." />
      <Card>
        <Pill>Gold Member</Pill>
        <View style={{ marginTop: 8 }}>
          <LabelValue label="Cups available" value="14 remaining" />
          <LabelValue label="Next renewal" value="01 Apr 2026" />
        </View>
      </Card>
      <Card>
        <Text style={{ fontSize: 17, fontWeight: "700", color: "#1E1714" }}>Featured Cafes</Text>
        {loading ? <Text style={{ marginTop: 8, color: "#7A6F68" }}>Loading cafes…</Text> : null}
        {error ? <Text style={{ marginTop: 8, color: "#B94F42" }}>{error}</Text> : null}
        {data?.map((cafe) => (
          <View key={cafe.id} style={{ marginTop: 10 }}>
            <Text style={{ fontWeight: "600", color: "#1E1714" }}>{cafe.name}</Text>
            <Text style={{ color: "#7A6F68", fontSize: 13 }}>
              {cafe.distance} away · {cafe.rating} rating
            </Text>
          </View>
        ))}
      </Card>
    </Screen>
  );
}
