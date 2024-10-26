import { useGSAP } from '@gsap/react';
import gsap from 'gsap'
import React from 'react'

function Contents({data}) {
  

useGSAP(() => {
  gsap.to('button', {
    color: data.buttonColor.text,
    background: data.buttonColor.background,
    duration: 1,
    ease: 'power3.inOut',
  });
  gsap.to('p', {
    color: data.headingColor,
    duration: 1,
    ease: 'power3.inOut',
  })
  gsap.from('.text',{
    x: 1000,
    ease: 'power3.out',
    duration: 1,
    stagger: {
      amount: 0.3,
      
    },
  })

  
}, [data])


  return (
    <div className='lg:w-1/2 lg:h-full w-full  h-2/5 flex items-center justify-center'>
      <div className='flex items-start flex-col justify-start w-full px-8  lg:px-0 lg:w-2/3 gap-2 lg:gap-4'>
        <h1 className='lg:text-right text-center w-full font-bold overflow-hidden text-4xl lg:text-9xl'>
          <p className='text uppercase'>{data.heading}</p>
        </h1>
        
        <h6 className='lg:text-3xl font-normal text-2xl lg:text-right text-center  overflow-hidden w-full'>
          <p className='text leading-relaxed' >{data.subHeading}</p>
        </h6>

        <p className='lg:text-md text-xs  lg:text-right text-center overflow-hidden w-full'>
          <p className='text'>{data.text}</p>
        </p>

        <div className='lg:text-xl text-md  lg:font-medium lg:text-right text-center overflow-hidden w-full'>
          <button className='button text py-2 px-5  lg:px-10 lg:py-4 rounded-xl mt-4 lg:mt-10'>
            Shop Now!
          </button >
        </div>
      </div>
      
    </div>
  )
}

export default Contents