import { useAuth } from "../context/AuthContext";


const Dashboard = () => {
    const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth()

    return (
        <div>
            <button></button>
            <button></button>
        </div>
    )
}