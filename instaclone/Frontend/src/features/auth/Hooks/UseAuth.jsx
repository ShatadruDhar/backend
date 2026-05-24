import { useContext } from "react";
import { AuthContext } from "../auth.context";

import React from 'react'

export function UseAuth(){
    const context=useContext(AuthContext)
    return context
}

