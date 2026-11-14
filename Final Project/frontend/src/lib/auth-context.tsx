"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { getFirebaseAuth, googleProvider } from "@/lib/firebase";
import type { ActivityEntry } from "@/lib/types";

// ── Storage helpers ──────────────────────────────────────────────────────────

const storageKey = (uid: string) => `lrn_activity_${uid}`;

export function loadActivity(uid: string): ActivityEntry[] {
  try {
    const raw = localStorage.getItem(storageKey(uid));
    return raw ? (JSON.parse(raw) as ActivityEntry[]) : [];
  } catch {
    return [];
  }
}

export function saveActivity(uid: string, entries: ActivityEntry[]): void {
  try {
    localStorage.setItem(storageKey(uid), JSON.stringify(entries));
  } catch {
    // quota exceeded — silently skip
  }
}

export function appendActivity(uid: string, entry: ActivityEntry): void {
  const existing = loadActivity(uid);
  saveActivity(uid, [entry, ...existing].slice(0, 100)); // keep latest 100
}

// ── Context ──────────────────────────────────────────────────────────────────

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  activity: ActivityEntry[];
  addActivity: (entry: ActivityEntry) => void;
  refreshActivity: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
  activity: [],
  addActivity: () => {},
  refreshActivity: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activity, setActivity] = useState<ActivityEntry[]>([]);

  // Listen for Firebase auth state changes — only in the browser
  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) {
      // Server-side or Firebase not configured — treat as logged out
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      if (u) {
        setActivity(loadActivity(u.uid));
      } else {
        setActivity([]);
      }
    });
    return unsubscribe;
  }, []);

  const signIn = useCallback(async () => {
    const auth = getFirebaseAuth();
    if (!auth) return;
    await signInWithPopup(auth, googleProvider);
  }, []);

  const signOut = useCallback(async () => {
    const auth = getFirebaseAuth();
    if (!auth) return;
    await firebaseSignOut(auth);
    setActivity([]);
  }, []);

  const addActivity = useCallback(
    (entry: ActivityEntry) => {
      if (!user) return;
      appendActivity(user.uid, entry);
      setActivity(loadActivity(user.uid));
    },
    [user]
  );

  const refreshActivity = useCallback(() => {
    if (user) setActivity(loadActivity(user.uid));
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signOut, activity, addActivity, refreshActivity }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
