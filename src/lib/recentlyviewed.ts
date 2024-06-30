import { User } from "~/server/api/routers/github";

const RECENTLY_VIEWED_KEY = "recentlyViewedUsers";

export function getRecentlyViewedUsers(): User[] {
  if (typeof window === "undefined") return [];
  const storedUsers = localStorage.getItem(RECENTLY_VIEWED_KEY);
  return storedUsers ? (JSON.parse(storedUsers) as User[]) : [];
}

export async function addRecentlyViewedUser(user: User): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (typeof window !== "undefined") {
    const users = getRecentlyViewedUsers();
    const existingUser = users.find((u: User) => u.id === user.id);
    if (!existingUser) {
      const updatedUsers = [user, ...users].slice(0, 5); // Keep only the latest 5 users
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updatedUsers));
    }
  }
}
