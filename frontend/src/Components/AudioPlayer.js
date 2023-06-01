import React from 'react'
import {FaPlay} from 'react-icons/fa';

const AudioPlayer = (props) => {
    let captcha = props.captcha;
    let audio = new Audio(`http://localhost:5000/uploads/audio/${captcha}.mp3`)

    const start = () => {
      audio.play()
    }
  return (
    <div>
        <div className='m-2'>
        <div onClick={start}><FaPlay size={25}/></div>
        </div>
  </div>
  )
}

export default AudioPlayer