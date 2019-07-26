import { useState, useEffect } from "react";
import { createShareStore } from "../lib/ShareStore";
import { apiKey, baseApi } from "../config";

export interface IDataResult {
  page: number,
  results: IDataResultItem[]
  total_pages: number
  total_results: number
}

export interface IDataResultItem {
  id: number
  adult: boolean,
  backdrop_path: string
  genre_ids: number[]
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export const TotalSore = createShareStore({
  pages: 0,
  total: 0
})

export const useSearchFilms = (result: string, page: number = 1) => {
  const {useState: useTotal} = TotalSore
  const [{ total = 0, pages = 0 } = {}, setTotal] =  useTotal()
  const [{ load, data, error }, setState] = useState({
    load: false,
    data: <IDataResult>null,
    error: false
  })

  useEffect(() => {
    if(page !== 1)
      return
  }, [data])

  useEffect(() => {
    if (!result)
      return

    let xhr = new XMLHttpRequest()
    let api = apiKey, base = baseApi
    let mov = '/search/movie'
    let qu = `&query=${result}&page=${page}`
    let url = `${base}${mov}${api}${qu}`

    setState({ load: true, data: null, error: false })

    xhr.open('GET', url, true)

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4)
        return null

      if (xhr.status !== 200)
        return setState({ load: false, data: null, error: true })

      let data = xhr.response

      try {
        let parsedData = JSON.parse(data)
        let {total_pages: pages, total_results: total} = parsedData
        setTotal({pages, total})
        setState({ load: false, data: parsedData, error: false })
      } catch (e) {
        return setState({ load: false, data: null, error: true })
      }
    }

    let time = setTimeout(() => {
      xhr.send()
    }, 50)

    return () => {
      xhr.abort()
      clearTimeout(time)
    }

  }, [result])

  return { data, load, error }
}
