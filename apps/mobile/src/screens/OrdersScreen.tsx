import { Text, View } from "react-native";
import { Card, Heading, Pill, Screen } from "../components/primitives";
import { useAsyncState } from "../hooks/useAsyncState";
import { fetchOrderHistory } from "../services/mock-data";

export function OrdersScreen() {
  const { loading, error, data } = useAsyncState(fetchOrderHistory, []);

  return (
    <Screen>
      <Heading title="Order Timeline" subtitle="Redemption history and transaction states." />
      <Card>
        {loading ? <Text style={{ color: "#7A6F68" }}>Loading your timeline…</Text> : null}
        {error ? <Text style={{ color: "#B94F42" }}>{error}</Text> : null}
        {data?.map((order) => (
          <View key={order.id} style={{ marginBottom: 14 }}>
            <Text style={{ fontWeight: "600", color: "#1E1714" }}>{order.cafe}</Text>
            <Text style={{ color: "#7A6F68", fontSize: 13 }}>{order.createdAt}</Text>
            <View style={{ marginTop: 4 }}>
              <Pill>{order.state}</Pill>
            </View>
          </View>
        ))}
      </Card>
    </Screen>
  );
}
