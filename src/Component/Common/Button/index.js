import React from 'react'
import {Button} from 'react-bootstrap'

const ButtonRegister =({onClick,title,loading})=> {
  if (loading){
    return(
      <Button variant="dark" className="btn-block" onClick={onClick} disabled>Loading...</Button>
    )
  }
  return(
    <Button variant="dark" className="btn-block" onClick={onClick}>{title}</Button>
  )
}

export default ButtonRegister;