import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import MenuIcon from "./Icons/MenuIcon";
import SideNavBar from "./SideNavBar";
import { initFirebase } from "@/lib/firebase";
import { GoogleAuthProvider, getAuth, signInWithRedirect } from "firebase/auth";
import { useRouter } from "next/router";
import { useUserData } from "@/hooks/user";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const [showNav, setShowNav] = useState(false);
  initFirebase();
  const router = useRouter();

  const auth = getAuth();

  useEffect(() => {
    // Check if the user is signed in
    auth.onAuthStateChanged((user) => {
      if (!user) {
        // If the user is not signed in, redirect to the Google sign-in page
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
      }
    });
  }, [auth]);

  const { userData } = useUserData();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push("/");
      // Additional logout logic or navigation after sign out
    } catch (error) {
      // Handle error if necessary
    }
  };

  return (
    <div className="font-[jaldi] h-screen">
      <main
        className={`flex-grow h-full ${
          showNav ? "opacity-40 bg-gray-600" : ""
        }`}
      >
        <div className="flex flex-row justify-between">
          <button
            className="ml-[25px] mt-[25px]"
            onClick={() => setShowNav(!showNav)}
          >
            <MenuIcon color="black" />
          </button>
          <button onClick={handleSignOut} className="mt-[25px]">
            <span className="bg-blue-600 text-white rounded-md p-2 w-[75px] mr-[25px]">
              Sign Out
            </span>
          </button>
        </div>
        <div className="text-[30px] mb-[20px] ml-[70px] font-bold">
          {userData ? `Welcome, ${userData.firstName}` : "Loading..."}
        </div>
        {children}
      </main>
      <SideNavBar
        showNav={showNav}
        setShowNav={setShowNav}
        className={`h-screen bg-white z-50 absolute top-0 left-0 w-0 transition-all ${
          showNav ? "w-[300px] duration-500" : "hidden"
        }`}
      />
    </div>
  );
};

export default Layout;
