import React from "react";

import "./Filter.sass";

import { ResultStore } from "./Result";

export const Filter = () => {
  const { useState: useResult } = ResultStore
  const [result, setResult] = useResult()

  const handleChange = (e: { target: HTMLInputElement }) =>
    setResult(e.target.value)

  return (
    <div className={"h-cont center header-border" + (result ? ' bg-gray-dark' : ' bg-white')}>
      <div className={"cont not-grow v-cont bg-gray-darker filter"}>
        <div className="v-cont c-12 text-white"> 
          <input placeholder="Начните писать..." className="search" autoFocus={true} value={result} onChange={handleChange} />
        </div>
      </div>
    </div>
  )
}