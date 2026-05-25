import { useContext } from "react";
import { PostContext } from "../postContext";

import React from 'react'

const UseFeed = async() => {
  const context=await useContext(PostContext)
  return context

}

export default UseFeed
