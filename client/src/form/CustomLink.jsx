import React from 'react'
import { Link } from 'react-router-dom'

const CustomLink = ({to,children}) => {
  return (
    <Link className="text-dark-subtle hover:text-white transition" to={to}>{children}</Link>
  )
}

export default CustomLink