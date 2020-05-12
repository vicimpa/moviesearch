import React, { useEffect, useState } from "react";

import "./Result.sass";

import { ShowTop } from "./Fade";
import { FilmsList } from "./FilmsList";
import { createShareStore } from "../lib/ShareStore";
import { TotalSore } from "../hooks/SearchFilm";
import { repeat } from "../lib/Utils";
import { SidebarStore } from "./Sidebar";

export const ResultStore = createShareStore(null)

export const Result = () => {
  const { useState: useSidebar } = SidebarStore
  const { useState: useResult } = ResultStore
  const { useState: useTotal } = TotalSore
  
  const [result] = useResult('')
  const [{ pages = 0 } = {}] = useTotal()
  const [delta, setScroll] = useState(200)
  const [nowTotal, setTotal] = useState(1)
  const [canAdd, setCan] = useState(false)
  const [, setSidebar] = useSidebar()

  const handleScroll = ({ target }) => {
    if (!(target instanceof HTMLDivElement))
      return null

    let { scrollHeight, scrollTop, offsetHeight } = target
    scrollHeight -= offsetHeight
    setScroll(scrollHeight - scrollTop)
  }

  const loadhandle = () => setCan(true)

  useEffect(() => {
    if (!result)
      setSidebar(null)

    setTotal(1)
  }, [result])

  useEffect(() => {
  }, [canAdd])

  useEffect(() => {
    if (delta >= 200)
      return


    if (pages > nowTotal && canAdd) {
      setTotal(nowTotal + 1)
      setCan(false)
    }
  }, [delta])

  return (
    <ShowTop className={"result full bg-gray-base text-white center h-cont"}>
      {result && (
        <div className={"cont full h-cont"}>
          <h3 className="title">Результаты поиска: "<small>{result}</small>"</h3>
          <div className="result-list full h-cont" onScroll={handleScroll}>
            {repeat(nowTotal, (i) => 
              <FilmsList 
                onLoad={loadhandle} 
                key={`page-${i}`} 
                result={result} 
                viewPage={i + 1} />)}
          </div>
        </div>
      )}
    </ShowTop>
  )
}