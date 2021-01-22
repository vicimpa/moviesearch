import React from "preact/compat";

import "./FilmDetails.sass";

import { useGetDetails } from "../hooks/GetDetails";
import { Loader } from "./Loader";

export const FilmDetails = ({elem = 0}) => {
  const {data, load, error} = useGetDetails(elem)

  if(!load)
    return <Loader />

  if(error)
    return <p>Ошибка</p>

  if(!data)
    return null

  let { backdrop_path: bp } = data
  let { poster_path: pp } = data
  let back = 'http://image.tmdb.org/t/p/original' + (bp || pp)
  let image = 'http://image.tmdb.org/t/p/w500' + (pp || bp)
  let haveImage = bp || pp


  let { title, original_title, original_language } = data
  let { status, overview, genres, budget } = data
  let { homepage, release_date, revenue } = data
  let { vote_count, vote_average, popularity } = data

  let datas = {
    'Статус': status,
    'Оригинальный язык': original_language,
    'Дата релиза': release_date,
    'Жанр': genres.map(e => <i key={e.id}>{e.name}; </i>),
    'Популярность': popularity,
    'Бюджет': budget,
    'Доход': revenue,
    'Рэйтинг': vote_average,
    'Отзывов': vote_count,
    'Ссылка': homepage ?
      <a className="text-primary" href={homepage} target="_BLANK">{title}</a>
        : null
  }

  let outArray = Object.keys(datas).map(key => {
    let val = datas[key]
    
    if(!val)
      return null

    return <p><b>{key}:</b> <small style={{float:'right'}}>{val}</small></p>
  })

  return (
    <div className="film-details text-white" style={haveImage ? {backgroundImage: `url(${back})`} : null}>
      <div className="info">
        <h2>{title}</h2>

        {original_title != title && 
          <h3 style={{marginTop: -20, marginLeft: 10}}>({original_title})</h3>}
          
        {haveImage && <img src={image} width="60%" />}

        {overview && 
          <p style={{marginLeft: 20}}><small>{overview}</small></p>}

        
        {outArray}
      </div>
    </div>
  )
}