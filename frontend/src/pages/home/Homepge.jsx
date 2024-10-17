import { useAuthStore } from "../../store/authuser";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";


const Homepge = () => {
  const {user}=useAuthStore()
  return (
    <div >
      {user?<HomeScreen/>:<AuthScreen/>}
    </div>
  )
}

export default Homepge
