import React, { useState, useEffect } from 'react'

interface start {
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
  ]
}

const App = () => {
const [data, setdata] = useState<start['data']>()
const [update,setupdate] = useState(false)
const [cart,setcart] = useState(false)
const [pay,setpay] =useState(false)

const totalPrice:number[] = []
const obj = { num: 0 }

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
    .then(res => res.json()).then(data =>{ 
      // setdata(data)
      setdata(data.map((i:{}) => Object.assign(i,obj)))
    })
  }, [])

return (
<>
<div className='p-1 bg-gradient-to-l from-cyan-500 to-blue-200'>
  <h1 className="text-3xl text-center mt-2 italic drop-shadow">welcome to my shope</h1>
  <button onClick={()=> setcart(true)} className='fixed top-4 py-1 px-1.5 rounded-lg right-4 bg-cyan-50 text-2xl'>🛒</button>
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
</div>
{/*  */}
<div onClick={()=> setcart(false)} className={cart ? "backdrop" : 'hidden'}></div>
<div dir='rtl' className={cart ? 'flex justify-between ' : 'hidden'}>
  <div className="bg-cyan-100 fixed top-[69px] z-30 left-20 right-20 bottom-14 rounded overflow-y-scroll">
    <div className="flex justify-between">
      <div className="w-14 m-1"></div>
      <h1 className="text-center mt-2 text-4xl italic drop-shadow-2xl ">cart </h1>
      <button onClick={()=>setcart(false)} className='btn1 '>X</button>
    </div>
    <div className="min-h-[320px]">
      <table className="text-right mx-10  ">
        <thead>
          <tr>
            <th className='cell pr-6'>image</th>
            <th className='cell w-[50vw]'>title</th>
            <th className='cell '>number</th>
            <th className='cell pl-6'>price</th>
          </tr>
        </thead>
        <tbody className='text-slate-50'>
          {
            data?.map(i => {
              const p = data.findIndex(item => i.id === item.id)
              totalPrice.push(i.num > 0 ? Number(i.price) * i.num : 0)
              return (
                <tr key={i.id}  className={i.num === 0 ? "hidden" : 'border-4 border-cyan-100 bg-cyan-900  '}>
                {/* "card p-2 px-3 m-4 flex justify-between items-center " */}
                <td className="pr-6 "><img src={i.image} alt="" className="rounded-lg h-10 " /></td>
                <td className="text-xs m-1 w-[50vw] ">{i.title}</td>
                <td className="flex justify-between ml-4 py-4 ">
                  <button onClick={()=>{data[p].num --; setdata(data); setupdate(!update)}} className="btn2">-</button>
                  <h6 className="mt-1 mx-4 drop-shadow-md ">{i.num}</h6>
                  <button onClick={()=>{data[p].num ++ ; setdata(data); setupdate(!update)}} className="btn2">+</button>
                </td>
                <td className="pl-6">{ Number(i.price) * i.num }$</td>
              </tr>
            )})
          }
        </tbody>
      </table>
    </div>
    <div className="m-4 flex justify-between">
      <h5 className="font-bold p-1.5 px-4 ">total price: {totalPrice.reduce((cur,acc)=>cur + acc,0)} </h5>
        <button 
        onClick={()=>{ data?.map((i)=> i.num = 0); setdata(data); setcart(false) }} 
        className="font-bold bg-blue-500 p-1.5 px-4 rounded-lg">pay</button>
    </div>
  </div>
</div>
</>
)}
export default App
