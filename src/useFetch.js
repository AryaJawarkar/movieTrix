import { useState, useEffect } from 'react'
 const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`


const useFetch = (urlParams) => {

    const [loading,setLoading]= useState(true)
    const [error,setError]= useState({show:false,msg:''})
    const [data,setData] = useState([])

    const fetchMovies= async(url)=>{
        setLoading(true)
        try {
          const resp = await fetch(url)
          const data = await resp.json()
          if(data.Response === 'True'){
            setData(data.Search || data)
            setError({show:false,msg:''})
          }
          else{
            setError({show:true,msg:data.Error})
          }
          setLoading(false)
        } catch (error) {
          console.log(error)
          setLoading(false)
        }
        }
        
        useEffect(()=>{
        fetchMovies(`${API_ENDPOINT}${urlParams}`)
        },[urlParams])

  return ({
    loading,error,data
  }
    
  )
}

export default useFetch
