import React, { useState } from 'react'

interface Props {
  'data':[
    {
      category:string,
      description:string,
      id:string | number,
      image:string,
      price:string,
      title:string,
      rating:{
        count:number | string,
        rate:number | string,
      },
      num: number
    }
  ] | undefined,
  'setdata': Function,
}

const List:React.FC<Props> = ({data, setdata}) => {

  const [update,setupdate] = useState(false)

return (
<div className="m-5 columns-3 lg:columns-6 xl:columns-7">
    {
      data?.map(i => {
        const p = data.findIndex(item => i.id === item.id)

      return <div key={i.id} className="card">
        <img src={i.image} alt="" className="rounded-lg" />
        <h2 className="text-xs m-1 text-center text-slate-800">{i.title}</h2>
        {
          i.num === 0 ? 
          <button 
          onClick={()=>{data[p].num = 1; setdata(data); setupdate(!update)}} 
          className='w-[95%] p-0.5 rounded-2xl hover:font-bold  bg-blue-600 mx-auto '>
            add to cart</button>
          :
          <div className="flex justify-between">
            <button onClick={()=>{data[p].num --; setdata(data); setupdate(!update)}} className="btn">-</button>
            <h6 className="mt-1 drop-shadow-md">{i.num}</h6>
            <button onClick={()=>{data[p].num ++ ; setdata(data); setupdate(!update)}} className="btn">+</button>
          </div>
        }
        <div className="flex justify-between">
          <h3 className="">{i.price}$</h3>
          <h3 className="">{i.rating.rate}⭐</h3>
        </div>
      </div>
      })
    }
  </div>
)}
export default List