import { useCurrentUser } from "../../contexts/UserContext"


const HomeHeader = () => {
    const {user} = useCurrentUser()

  return (
    <header>
        <h1>Welcome  {user?user.username : "Guest"}</h1>

    </header>
  )
}

export default HomeHeader