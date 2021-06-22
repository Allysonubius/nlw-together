import { useContext } from "react";
import { AuthContext } from "../contexts/Auth.context";

export function useAuthHooks(){
    const value = useContext(AuthContext)
    return value;
}