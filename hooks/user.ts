import { useEffect, useState } from "react";
import { get, getDatabase, ref, set } from "firebase/database";
import { db } from "@/lib/firebase";
import { GoogleAuthProvider, User, getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithRedirect } from "firebase/auth/cordova";
import { UrlWithParsedQuery } from "url";
import { TrueLiteral } from "typescript";

const testData = {
  id: 1,
  firstName: "Rohan",
  lastName: "Vanjani",
  userName: "rohanvanj21",
  creationDate: "2023-07-27",
  shareData: [
    { symbol: "GOOG", quantity: 2.3 },
    { symbol: "AAPL", quantity: 1.6 },
    { symbol: "BABA", quantity: 2 },
    { symbol: "TSLA", quantity: 3 },
  ],
};
interface UserProfile {
  firstName: string;
  lastName: string;
  uid: string;
  email: string;
  shareData: { symbol: string; quantity: number }[];
}

const createUserProfile = (user: User) => {
  console.log("Creating User");
  const person: UserProfile = {
    firstName: user.displayName?.split(" ")[0] ?? "",
    lastName: user.displayName?.split(" ")[1] ?? "",
    uid: user.uid,
    email: user.email ?? "",
    shareData: [],
  };

  return person;
};

const buildExistingUserProfile = (data: any) => {
  const person: UserProfile = {
    firstName: data.firstName,
    lastName: data.firstName,
    uid: data.uid,
    email: data.email ?? "",
    shareData: data.shareData ? data : [],
  };

  return person;
};

export function useUserData() {
  const [userData, setUserData] = useState<any>();
  const db = getDatabase();
  const auth = getAuth();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) {
      setUserData(undefined);
    } else {
      const userRef = ref(db, `users/${user.uid}`);

      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          // user already exists
          setUserData(snapshot.val());
        } else {
          // creatre a new user
          console.log("adding user");
          const newUserData = createUserProfile(user);
          set(userRef, newUserData).then(() => {
            setUserData(newUserData);
          });
        }
      });
    }
  }, [auth, db, user]);

  return { userData };
}

export function useShareData() {
  const { userData } = useUserData();
  const [userShares, setUserShares] = useState<Map<string, number>>();
  useEffect(() => {
    const userMap: Map<string, number> = new Map();
    if (userData) {
      Object.keys(userData?.shareData).forEach((key) => {
        const sharePoint = userData?.shareData[key];
        userMap.set(sharePoint.symbol, sharePoint.quantity);
      });
      setUserShares(userMap);
    }
  }, [userData]);

  return { userShares };
}

export function useTickerList() {
  const { userData } = useUserData();
  const [tickerList, setTickerList] = useState<string[]>([]);
  useEffect(() => {
    const newArr: string[] = [];
    if (userData) {
      Object.keys(userData?.shareData).forEach((key) => {
        const sharePoint = userData?.shareData[key];
        newArr.push(sharePoint.symbol);
        setTickerList(newArr);
      });
    }
  }, [userData]);

  return { tickerList };
}
