import { useContext } from "react";
import { PostContext } from "../postContext";

import React from 'react'

const UseFeed = () => {
  const context= useContext(PostContext)
  return context

}


export default UseFeed
