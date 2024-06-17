import React from 'react'

function Navbar() {
  return (
    <nav className='bg-slate-800 text-white   '>
        <div className="mycontainer flex justify-between items-center px-4 h-14
    item-center py-5
        ">

        <div className="logo font-bold text-2xl">
           
            <span className='text-green-700'>/&lt;</span>
            PassOp
            <span className='text-green-700'> /&gt;</span>
             
            </div>
        {/*
            <ul>
            <li className='flex gap-4 text-whi'>
                <a className='hover:font-semibold' href="/">Home</a>
                <a className='hover:font-semibold' href="/about">About</a>
                <a className='hover:font-semibold' href="/contact">Contact</a>
            </li>
        </ul>
      */  } 
        <div>
            <img className=' w-12 h-12 bg-slate-800  cursor-pointer' src="icons/25231.png" alt="github" />
        </div>
      
        </div>
    </nav>
  )
}

export default Navbar
