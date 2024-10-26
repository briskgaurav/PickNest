import React from "react";
import Circle from "./Circle";

function CircleWrapper({ WrapperData , ActiveData , handleColors}) {



  return (
    <div className="h-fit absolute z-20 w-full bottom-0 flex justify-center gap-8 mb-2  lg:w-fit lg:inset-y-[40%] lg:right-20 lg:flex-col">
      {WrapperData.map((item) => (
        <Circle 
        handleColors={handleColors}
        key={item.id}
        id={ActiveData.id}
        itemData={item}

        />
      ))}
    </div>
  );
}

export default CircleWrapper;
