import React, { useState, useEffect } from 'react'
import Cart from './component/cart'
import List from './component/list'

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
const [cart,setcart] = useState(false)

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
    <List data={data} setdata={setdata}  />
  </div>
  {/* card */}
  <Cart cart={cart} setcart={setcart} data={data} setdata={setdata}  />
</>
)}
export default App