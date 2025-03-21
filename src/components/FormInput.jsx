import React from 'react'

import { FaSearch } from 'react-icons/fa'

function FormInput({ type, placeholder, name }) {
  return (
    <label className="input flex w-full items-center gap-2 input-sm md:input-md">
      <input type={type} placeholder={placeholder} name={name} />
      <FaSearch className='h4
       w-4 opacity-70'/>
    </label>
  )
}

export default FormInput