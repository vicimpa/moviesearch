import { useState, useEffect } from "react";
import { apiKey, baseApi } from "../config";

interface IResult {
  id: number
  adult: boolean
  backdrop_path: string
  belongs_to_collection: boolean
  budget: number
  genres: {
    id: number
    name: string
  }[]
  homepage: string
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: {
    id: number
    logo_path: string
    name: string
    origin_country: string
  }[]
  production_countries: {
    iso_3166_1: string
    name: string
  }[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: {
    iso_639_1: string
    name: string
  }[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export const useGetDetails = (id: number) => {
  const [{data, load, error}, setData] = useState({
    load: false,
    data: <IResult>null,
    error: false
  })

  useEffect(() => {
    if(!id)
      return

    let xhr = new XMLHttpRequest()

    let api = apiKey, base = baseApi
    let mov = `/movie/${id}`
    let url = `${base+mov+api}`

    setData({load: false, data, error})
    xhr.open('GET', url, true)

    xhr.onreadystatechange = () => {
      if(xhr.readyState !== 4)
        return null

      if(xhr.status !== 200)
        return setData({load: true, error: true, data})

      try {
        let parsedData = JSON.parse(xhr.response)
        setData({load: true, error: false, data: parsedData})
      }catch(e) {
        return setData({load: true, error: true, data})
      }
    }

    let time = setTimeout(() => {
      xhr.send()
    }, 500)

    return () => {
      clearTimeout(time)
      xhr.abort()
    }
  }, [id])

  return {data, load, error}
}