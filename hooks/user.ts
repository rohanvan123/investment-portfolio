import { useEffect } from "react";
import { ref, set } from "firebase/database";
import { db } from "@/lib/firebase";

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

export function postData() {
  set(ref(db, "users/" + testData.userName), testData);
}
export function useUser() {
  useEffect(() => {}, []);
}
