import React, { use, useEffect, useRef, useState } from 'react'
import ImageContainer from '../components/ImageContainer';
import Search from '../components/Search'
import { useActionData } from 'react-router-dom';

export const action = async ({ request }) => {
  let formData = await request.formData();
  let search = formData.get("search")
  return search
}

import { useFetch } from '../hooks/useFetch';
import { MdErrorOutline } from 'react-icons/md';

function Home() {
  const searchParamFromAction = useActionData()
  const [allImages, setAllImages] = useState([])
  const [pageParam, setPageParam] = useState(1)

  const prevSearchParam = useRef(searchParamFromAction)

  const { data, isPending, error } = useFetch(`https://api.unsplash.com/search/photos?client_id=${import.meta.env.VITE_ACCESS_KEY}&query=${searchParamFromAction ?? "all"}&page=${pageParam}`)


  useEffect(() => {
    if (data && data.results) {
      setAllImages((prevImages) => {
        return pageParam === 1 ? data.results : [...prevImages, ...data.results]
      })
    }
  }, [data])

  useEffect(() => {
    if (searchParamFromAction != prevSearchParam.current) {
      setAllImages([])
      setPageParam(1)
      prevSearchParam.current = searchParamFromAction;
    }
  }, [searchParamFromAction])

  if (error) {
    return <div role="alert" className="alert alert-error">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>Error! {error}</span>
    </div>
  }

  return (
    <div className=' px-2'>
      <div className='my-10'>
        <Search />
      </div>
      {
        isPending && <span className="loading loading-dots loading-xl"></span>
      }
      {
        allImages.length > 0 && <ImageContainer images={allImages} />
      }
      <div className='my-10'>
        <button onClick={() => setPageParam(pageParam + 1)} className='btn btn-secondary btn-block'>Show More</button>
      </div>
    </div>
  )
}

export default Home