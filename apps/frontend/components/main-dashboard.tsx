
import CreateNewRoom from "./create-new-room";
import HeaderDashboard from "./header-dashboard";
import TableCompoenet from "./table/page";

const MainDashboard = () => {
  return (
    <div className="h-full w-screen sm:w-[85%] sm:px-10 sm:py-4 p-2 flex flex-col gap-y-6">
      <HeaderDashboard />
      <CreateNewRoom/>
      <TableCompoenet />
    </div>
  );
};

export default MainDashboard;
