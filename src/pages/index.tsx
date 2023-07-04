import HomeNavBar from "@/components/NavBar/Home";
import ProblemsTable from "@/components/ProblemsTable";
import useHasMounted from "@/hooks/useHasMounted";

export default function Home() {
  const mounted = useHasMounted();
  if (!mounted) return null;
  
  return (
    <>
      <HomeNavBar />
      <h1 className="text-2xl text-center text-gray-700 dark:text-gray-400 font-medium uppercase mt-10 mb-5">
        &ldquo; QUALITY OVER QUANTITY &rdquo; 👇
      </h1>

      <div className="relative">
        <ProblemsTable />
      </div>
    </>
  );
}
