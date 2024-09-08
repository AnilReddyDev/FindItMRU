import React from 'react'

export default function ItemPostComp({data}) {
    // const data = {
    //     "_id": "66d748bc468beb2b9fdf6330",
    //     "title": "Found Water Bottle",
    //     "description": "A blue stainless steel water bottle found in the auditorium.",
    //     "category": "Accessories",
    //     "location": "MRU Auditorium",
    //     "image": "https://i.etsystatic.com/12692299/r/il/4e0827/5260854200/il_300x300.5260854200_lfcz.jpg",
    //     "status": "Found",
    //     "contactInfo": "auditoriumstaff@gmail.com",
    //     "postedBy": "uploaded by emma"
    //   }
  return (
    <div className='sm:w-60 min-h-96 px-2 py-2 rounded-md bg-white/[0.85] '>
        <img src={data.image} className='w-full rounded-md' alt="image" />
        <div className='pt-2 box-border'>
        <h1 className='text-lg tracking-wide font-medium ' >Title: <span className='font-normal'>{data.title}</span> </h1>
        <h1 className='text-lg tracking-wide font-medium ' >Location: <span className='font-normal'>{data.location}</span> </h1>
        <h1 className='text-lg tracking-wide font-medium ' >Date: <span className='font-normal'>{Date.now()}</span></h1>
 
        </div>
           </div>
  )
}
