import SideBar from "../components/common/SideBar"
import TopBar from "../components/common/TopBar"


const Base = () => {
  return (
    <div className=" bg-base-300">
        <TopBar />
        <SideBar />
    </div>
  )
}

export default Base