import HomeSidebar from "@/components/home-sidebar";
import MainDashboard from "@/components/main-dashboard";

const Page = () => {
  return (
    <div className="bg-background flex h-screen">
      <HomeSidebar />
      <MainDashboard />
    </div>
  );
};

export default Page;
