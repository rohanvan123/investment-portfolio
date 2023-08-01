import InvestmentTable from "@/components/InvestmentTable";
import Layout from "@/components/Layout";

const Investments = () => {
  // initFirebase();
  // const auth = getAuth();
  // const provider = new GoogleAuthProvider();
  // const [user, loading] = useAuthState(auth);
  // const router = useRouter();

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (user) {
  //   router.push("/investments");
  // }

  return (
    <Layout>
      <div className="flex flex-row items-center justify-center">
        <div className="w-[700px]">
          <InvestmentTable />
        </div>
      </div>
    </Layout>
  );
};

export default Investments;
