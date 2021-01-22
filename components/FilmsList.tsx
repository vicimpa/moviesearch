import React, {useEffect} from "preact/compat";

import "./FilmsList.sass";

import { useSearchFilms } from "../hooks/SearchFilm";
import { FilmsItem } from "./FilmsItem";
import { Loader } from "./Loader";

export const FilmsList = ({ result = '', viewPage = 1, onLoad = () => { } }) => {
  const { data, error } = useSearchFilms(result, viewPage)

  useEffect(() => {
    if (data)
      onLoad()
  }, [data])

  if (!result)
    return null

  if (!data)
    return <Loader />

  let { results, total_results } = data

  if (error)
    return <h4 className="full">Ошибка поиска. Повторите попытку</h4>

  if (!results.length)
    return <h4 className="full">Фильмов по данному запросу не найдено</h4>

  return (
    <div className={"films-list"}>
      {viewPage == 1 && <h4 className="title">Найдено {total_results} фильмов</h4>}
      <div className="result start">
        {results.map((item) => <FilmsItem key={`${item.id}`} item={item} />)}
      </div>
    </div>
  )
}