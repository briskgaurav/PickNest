import React, { useEffect, useRef, useState } from 'react'
import Contents from './components/Contents'
import Canvas from './components/Bag'
import {data} from '../src/Data/Index'
import gsap from 'gsap';
import Loader from './components/Loader'


function App() {

  const banner = useRef()
  const [ActiveData, setActiveData] = useState(data[0])
  const [Loading, setLoading] = useState(true)
  const HandleLoading=()=>{
    setLoading(false)
  }

useEffect(()=>{
  gsap.to(banner.current,{
    background:ActiveData.background,
    duration:1,
    ease:"power3.inOut",

  });
  gsap.to('.logo',{
    color: ActiveData.headingColor,
    duration:1,
    ease:"power3.inOut",
  })

},[ActiveData])

// Color Button

const handleColors =(itemData)=>{

 if( ActiveData.id !== itemData.id ){
  setActiveData(itemData);
 
 }
  
}
  
  return (
    <div ref={banner} className='h-screen  w-screen relative'>
     { Loading ? <Loader /> : null}
     
      <nav className=' logo absolute mt-5 my-2 ml-6 text-left text-2xl font-bold tracking-widest md:ml-28 lg:ml-[12vw] lg:my-8'>
        PackNest
      </nav>

      <div className='w-full h-full flex justify-between items-center flex-col-reverse lg:flex-row'>
        <Contents data={ActiveData} />
        <Canvas WrapperData={data} ActiveData={ActiveData} handleColors={handleColors} setLoading={HandleLoading}/>

      </div>
      
    </div>
  )
}

export default App