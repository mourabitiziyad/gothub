import { User } from "~/server/api/routers/github";

const RECENTLY_VIEWED_KEY = "recentlyViewedUsers";

export function getRecentlyViewedUsers() {
  if (typeof window === "undefined") return [];
  const storedUsers = localStorage.getItem(RECENTLY_VIEWED_KEY);
  console.log('walo');
  return storedUsers ? JSON.parse(storedUsers) : [];
}

export async function addRecentlyViewedUser(user: User) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(typeof window);
  if (typeof window !== "undefined") {
    console.log('shit');
    const users = getRecentlyViewedUsers();
    const existingUser = users.find((u: User) => u.id === user.id);
    if (!existingUser) {
      const updatedUsers = [user, ...users].slice(0, 5); // Keep only the latest 5 users
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updatedUsers));
    }
  }
}
