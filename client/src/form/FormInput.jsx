import React from 'react'

const FormInput = ({name,placeholder,label,...rest}) => {
  return (
    <div className="flex flex-col-reverse">
    <input
      id="email"
      name={name}
      className="bg-transparent rounded border-2 border-dark-subtle focus:border-white w-full text-lg outline-none p-1 text-white peer transition"
      placeholder={placeholder}
      {...rest}
    />
    <label
      className="font-semibold text-dark-subtle peer-focus:text-white transition self-start"
      htmlFor="email"
    >
      {label}
    </label>
  </div>  )
}

export default FormInput