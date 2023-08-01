// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { initFirebase } from "@/lib/firebase";
// import { useAuthState } from "react-firebase-hooks/auth";

// import { NextPage } from "next";
// import { useRouter } from "next/router";

// const Home: NextPage = () => {
//   initFirebase();
//   const auth = getAuth();
//   const provider = new GoogleAuthProvider();
//   const [user, loading] = useAuthState(auth);
//   const router = useRouter();

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (user) {
//     router.push("/dashboard");
//   }

//   const signIn = async () => {
//     const result = await signInWithPopup(auth, provider);
//     console.log(result.user);
//   };

//   return (
//     <div>
//       <div className="w-[300px] h-[150px]  flex flex-col justify-center items-center m-auto mt-[300px] border-black border-[1px] rounded-[20px]">
//         <div className="text-center flex flex-col gap-4 items-center">
//           <div>Please sign in to continue</div>
//           <button onClick={signIn}>
//             <div className="bg-blue-600 text-white rounded-md p-2 w-48">
//               Sign In
//             </div>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import { GetServerSideProps } from "next";

const Index = () => {
  return null;
};

export default Index;

export const getServerSideProps: GetServerSideProps = async () => {
  const destination = "/dashboard";
  return {
    redirect: {
      permanent: false,
      destination,
    },
  };
};
