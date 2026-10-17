import { Link } from "react-router-dom";
import { CloseSidebar } from "../../utils/util";

const TopBar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-none">
        <label
          htmlFor="my-drawer-1"
          className="btn btn-square btn-ghost rounded-[7px]"
        >
          <img src="/menu.svg" alt="Menu" className="h-5 w-5" />
        </label>
      </div>

      <div onClick={CloseSidebar} className="flex-1 p-1">
        <Link to="/about" className=" btn btn-ghost p-2  rounded-lg   text-xl font-bold tracking-tight sm:text-2xl">

        Ever<span className="text-sky-400">post</span>
     
        </Link>
      </div>

      <div
        onClick={CloseSidebar}
        className="flex items-center  justify-center h-10 text-2xl"
      >
        <button className="flex h-10 w-20 items-center justify-center hover:bg-base-300">
          •••
        </button>
      </div>
    </div>
  );
};

export default TopBar;
