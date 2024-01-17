import { useEffect, useRef, useState } from "react"
import classes from "./SearchForm.module.css"

import { token, LOCAL_URL_PREFIX } from "../../api"
import Movies from "../Movies"

function SearchForm() {
  const keywordInputRef = useRef()
  const yearInputRef = useRef()
  const [url, setUrl] = useState("")
  const [genres, setGenres] = useState([])
  const [language, setLanguage] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("")

  useEffect(() => {
    const getGenres = async () => {
      const resp = await fetch("http://localhost:5000/api/genres")
      if (!resp.ok) throw new Error("Failed to fetch genre")
      const data = await resp.json()
      setGenres(data)
    }
    getGenres()
  }, [])

  function submitHandler() {
    const keyword = keywordInputRef.current.value.trim()
    const year = yearInputRef.current.value
    if (keyword.length === 0) setUrl("")
    setUrl(
      `${LOCAL_URL_PREFIX}/search?keyword=${keyword}&genre=${selectedGenre}&language=${language}&year=${year}&token=${token}`
    )
  }

  function resetHandler() {
    keywordInputRef.current.value = ""
    yearInputRef.current.value = ""
    setSelectedGenre("")
    setLanguage("")
    setUrl("")
  }

  return (
    <>
      <div className={classes.container}>
        <label htmlFor="keyword">Keyword</label>
        <div className={classes.form}>
          <input
            id="keyword"
            type="text"
            placeholder="enter keyword"
            ref={keywordInputRef}
          />
          <svg
            className="svg-inline--fa fa-search fa-w-16"
            fill="#ccc"
            aria-hidden="true"
            data-prefix="fas"
            data-icon="search"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
          </svg>
        </div>
        <label htmlFor="genre">Genre</label>
        <div className={classes.form}>
          <select
            id="genre"
            value={selectedGenre}
            onChange={(e) => {
              setSelectedGenre(e.target.value)
            }}
          >
            <option value="">All</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <label htmlFor="language">Language</label>
        <div className={classes.form}>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="">All</option>
            <option value="en">English</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
          </select>
        </div>
        <label htmlFor="year">Year</label>
        <div className={classes.form}>
          <input type="number" id="year" ref={yearInputRef} />
        </div>
        <div className={classes.actions}>
          <button onClick={resetHandler}>Reset</button>
          <button onClick={submitHandler}>Search</button>
        </div>
      </div>
      {url ? (
        <div>
          <p className={classes.result_title}>Search Result</p>
          <Movies title={null} url={url} isUsingPoster={true} />
        </div>
      ) : null}
    </>
  )
}

export default SearchForm
