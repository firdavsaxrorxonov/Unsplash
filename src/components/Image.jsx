import React from 'react'
import { FaRegHeart, FaHeart, FaDownload } from 'react-icons/fa';
import { useGlobalContext } from '../hooks/useGlobalContext'

function Image({ image, added }) {
  const { likedImages, dispatch } = useGlobalContext()
  const { urls, links, alt_description, user } = image;

  const addLikeImages = (image) => {
    const alreadyAdded = likedImages.some((img) => {
      return img.id == image.id
    });

    if (!alreadyAdded) {
      dispatch({ type: "LIKE", payload: image })
    } else {
      dispatch({ type: "UNLIKE", payload: image.id })
    }

  }

  return (
    <div className='relative group'>
      {!added && (<span onClick={() => addLikeImages(image)} className='absolute border-white h-7 w-7 border rounded-full flex items-center justify-center cursor-pointer right-2 invisible opacity-0 top-2 group-hover:opacity-100 group-hover:visible transition-all duration-300'>
        <FaRegHeart className='text-white' />
      </span>)}
      {added && (<span onClick={() => addLikeImages(image)} className='absolute border-white bg-white h-7 w-7 border rounded-full flex items-center justify-center invisible opacity-0 cursor-pointer right-2 top-2 group-hover:opacity-100 group-hover:visible transition-all duration-300'>
        <FaHeart className='text-red-600' />
      </span>)}
      <img src={urls.regular} alt={alt_description} className='w-full rounded-md' />
      <span className='absolute left-2 bottom-2 flex gap-2 items-center invisible opacity-0 cursor-pointer group-hover:opacity-100 group-hover:visible transition-all duration-300'>
        <img src={user.profile_image.large} alt={user.name + " avatar"} className='w-5 h-5 md:w-8 md:h-8 rounded-full' />
        <p className='text-white text-xs md:text-sm'>{user.name}</p>
      </span>
      <span className='absolute border-white h-7 w-7 cursor-pointer right-2 invisible opacity-0 bottom-2 group-hover:opacity-100 group-hover:visible transition-all duration-300'>
        <a download href={links.download + "&force=true"}>
          <FaDownload className='text-white' />
        </a>
      </span>
    </div>
  )
}

export default Image