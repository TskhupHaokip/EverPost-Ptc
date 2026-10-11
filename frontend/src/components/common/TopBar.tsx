import { CloseSidebar } from "../../utils/util";


const TopBar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">

      <div className="flex-none">
        <label htmlFor="my-drawer-1" 
            className="btn btn-square btn-ghost rounded-[7px]"
            >
               <img src="/menu.svg" alt="Menu" className="h-5 w-5" />
            </label>
      </div>
        
      <div onClick={CloseSidebar} className="flex-1">
        <a className="btn btn-ghost text-xl">DRF Practice</a>
      </div>
   
  
<div onClick={CloseSidebar} className="flex items-center  justify-center h-10 text-2xl">
  <button className="flex h-10 w-20 items-center justify-center hover:bg-base-300">
    •••
  </button>
</div>

      
    </div>
  );
};

export default TopBar;
