import { Text, View } from "react-native";
import { Card, Heading, Screen } from "../components/primitives";
import { useAsyncState } from "../hooks/useAsyncState";
import { fetchFeaturedCafes } from "../services/mock-data";

export function BrowseScreen() {
  const { loading, error, data } = useAsyncState(fetchFeaturedCafes, []);

  return (
    <Screen>
      <Heading title="Discover Cafes" subtitle="Map/list browsing, quality filters, and neighborhood picks." />
      <Card>
        <Text style={{ fontSize: 17, fontWeight: "700", color: "#1E1714" }}>Suggested near you</Text>
        {loading ? <Text style={{ marginTop: 10, color: "#7A6F68" }}>Loading recommendations…</Text> : null}
        {error ? <Text style={{ marginTop: 10, color: "#B94F42" }}>{error}</Text> : null}
        {data?.map((cafe) => (
          <View key={cafe.id} style={{ marginTop: 12 }}>
            <Text style={{ fontWeight: "600", color: "#1E1714" }}>{cafe.name}</Text>
            <Text style={{ color: "#7A6F68", fontSize: 13 }}>{cafe.distance} · {cafe.rating} stars</Text>
          </View>
        ))}
      </Card>
    </Screen>
  );
}
