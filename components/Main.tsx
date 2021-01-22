import React from "preact/compat";

import "./Main.sass";

import { Filter } from "./Filter";
import { Result } from "./Result";
import { Sidebar } from "./Sidebar";

export const Main = () => {
  return (
    <div className={"main-component v-cont"}>
      <div className={"h-cont"}>
        <Filter />
        <Result />
      </div>
      <Sidebar />
    </div>
  )
}