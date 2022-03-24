import React from 'react'

function NewsFeed() {
const price = 1000;


  return (
    <div class="static top-64 justify-center flex flex-wrap ">
        <div class="rounded-lg shadow p-5 ">
        <p class="text-gray-700 text-xl font-semibold">
            YordleCoin
         </p>
         <p class="text-gray-700 text-xl font-semibold">
          현재가격 :  {price}
         </p>
      </div>
    </div>
    
    )
}

export default NewsFeed