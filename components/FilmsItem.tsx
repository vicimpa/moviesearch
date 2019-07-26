import React, { useEffect } from "react";

import "./FilmsItem.sass";

import { IDataResultItem } from "../hooks/SearchFilm";
import { SidebarStore } from "./Sidebar";

export const FilmsItem = ({ item }: { item: IDataResultItem }) => {
  const { useState: useSidebar } = SidebarStore

  let [select, setState] = useSidebar()
  let { backdrop_path: bp } = item
  let { poster_path: pp } = item
  let back = 'http://image.tmdb.org/t/p/w500' + (bp || pp)
  let image = 'http://image.tmdb.org/t/p/w500' + (pp || bp)
  let haveImage = bp || pp
  let { title, vote_average, release_date, original_language, original_title, id } = item

  return (
    <div className={"films-item c-3 text-white"}>
      <div className="card">
        <div className="image" style={haveImage ? { backgroundImage: `url(${back})` } : null} />
        <div className="info h-cont" onClick={() => setState(select == id ? null : id)} >
          <div>
            {haveImage && <img src={image} />}
          </div>
          <div>
            <h4>{title}</h4>
            {title !== original_title &&
              <h5 style={{ marginTop: -20, marginBottom: 10 }}>({original_title})</h5>}
            {release_date &&
              <p><b>Релиз:</b> {release_date}</p>}

            {original_language &&
              <p><b>Оригинальный язык:</b> {original_language}</p>}

            <p><b>Рэйтинг:</b> {vote_average}</p>
          </div>
          {select == id && <div className="select" />}
        </div>
      </div>
    </div>
  )
}