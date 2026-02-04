import React from 'react'
import Hero from '../../Componets/Student/Hero'
import SearchBar from '../../Componets/Student/SearchBar'
import Companies from '../../Componets/Student/Companies'

function Home() {
  return (
    <>
    <div className={`overflow-x-hidden`} >
    <Hero/>
    <SearchBar/>
    <Companies/>

    </div>
    </>
  )
}

export default Home