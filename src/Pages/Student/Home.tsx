import Hero from '../../Componets/Student/Hero'
import SearchBar from '../../Componets/Student/SearchBar'
import Companies from '../../Componets/Student/Companies'
import CouseSection from '../../Componets/Student/CouseSection'

function Home() {
  return (
    <div className='mx-auto'>
    
      <Hero/>
      <SearchBar/> 
      <Companies/>
      <CouseSection/>

    </div>
  )
}

export default Home