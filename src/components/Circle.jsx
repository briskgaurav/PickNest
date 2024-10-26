import React from 'react'
import Background from 'three/src/renderers/common/Background.js'

function Circle({itemData, id, handleColors}) {
  return (
    <div onClick={()=>handleColors(itemData)}
     className={`w-10 h-10 rounded-full flex items-center justify-center bg-white hover:scale-110 ${
      itemData.id===id ? 'scale-125' : null }`}>
        
      <div style={{
        background:itemData.swatchColor
      }} className='w-8 h-8  rounded-full'></div>
      
    </div>
  )
}

export default Circle