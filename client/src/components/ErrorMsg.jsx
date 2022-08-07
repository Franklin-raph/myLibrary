import React from 'react'
import css from "classnames";

const ErrorMsg = ({msg}) => {
  return (
    <>
        <p className="errorAlert">{msg}</p>
    </>
  )
}

export default ErrorMsg