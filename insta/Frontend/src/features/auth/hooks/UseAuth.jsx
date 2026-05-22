import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";

export function UseAuth(){
    const context=useContext(AuthContext)
    return context
}