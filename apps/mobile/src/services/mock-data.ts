export type Cafe = { id: string; name: string; distance: string; rating: string };
export type Order = { id: string; cafe: string; createdAt: string; state: "Completed" | "In progress" | "Issue" };

const cafes: Cafe[] = [
  { id: "c1", name: "Roast + Ritual", distance: "0.4 mi", rating: "4.8" },
  { id: "c2", name: "Velvet Cup", distance: "0.7 mi", rating: "4.7" },
  { id: "c3", name: "Northline Coffee", distance: "1.2 mi", rating: "4.9" }
];

const orders: Order[] = [
  { id: "o1", cafe: "Roast + Ritual", createdAt: "Today 09:24", state: "Completed" },
  { id: "o2", cafe: "Northline Coffee", createdAt: "Yesterday 14:10", state: "Completed" },
  { id: "o3", cafe: "Velvet Cup", createdAt: "Mon 08:43", state: "Issue" }
];

export async function fetchFeaturedCafes() {
  await new Promise((resolve) => setTimeout(resolve, 260));
  return cafes;
}

export async function fetchOrderHistory() {
  await new Promise((resolve) => setTimeout(resolve, 260));
  return orders;
}
