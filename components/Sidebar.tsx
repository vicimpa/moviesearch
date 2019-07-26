import React, { useState, useEffect } from "react";

import "./Sidebar.sass";

import { createShareStore } from "../lib/ShareStore";
import { ShowLeft } from "./Fade";
import { FilmDetails } from "./FilmDetails";

export const SidebarStore = createShareStore<number>(null)

export const Sidebar = () => {
  const { useState: useSidebar } = SidebarStore
  const [elem, setState] = useSidebar()
  const close = () => setState(null)

  return (
    <ShowLeft className={"sidebar c-3 b bg-black h-cont center"}>
      {elem && (
        <div className="h-cont center" style={{width: '100%'}}>
          <div className="close-btn" onClick={close} />
          <FilmDetails elem={elem} />
        </div>
      )}
    </ShowLeft>
  )
} 