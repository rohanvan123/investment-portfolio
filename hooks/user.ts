import { useEffect, useState } from "react";
import { get, getDatabase, ref, set } from "firebase/database";
import { User, UserProfile, getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { createUserProfile } from "@/utils/utils";

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
    if (userData && userData.shareData) {
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
    if (userData && userData.shareData) {
      Object.keys(userData?.shareData).forEach((key) => {
        const sharePoint = userData?.shareData[key];
        newArr.push(sharePoint.symbol);
        setTickerList(newArr);
      });
    }
  }, [userData]);

  return { tickerList };
}
