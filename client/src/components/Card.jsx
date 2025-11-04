import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext';

const Card = (props) => {
  const navigate = useNavigate();
  const { updateActiveItem } = useAppContext();

  const handleClick = () => {
    navigate(props.buttonLink || '/');
    updateActiveItem("Interviews");
  };

  return (
    <div className='bg-[#18252C] py-6 pl-8 pr-40 rounded-2xl gap-3 flex flex-col'>
      <h1 className='text-gray-400'>{props.title}</h1>
      <p className='text-3xl font-bold'>{props.count}</p>
      <span onClick={handleClick} className=' cursor-pointer text-blue-400'>{props.buttonText}</span>
    </div>
  )
}

export default Card
