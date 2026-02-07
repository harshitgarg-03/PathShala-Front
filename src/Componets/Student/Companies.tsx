import microsoft from '../../Data/microsoft_logo.svg'
import accenture from '../../Data/accenture_logo.svg'
import adobe from '../../Data/adobe_logo.svg'
import paypal from '../../Data/paypal_logo.svg'
import walmart from '../../Data/walmart_logo.svg'

function Companies() {
  return (
    <div className={`text-center mt-16 sm:mt-20 px-4`}>
      <div className={`text-gray-700 text-lg sm:text-xl font-medium mb-8`} >
        <p>Trusted by learners from</p>
      </div>
        <div className={`flex flex-wrap justify-center items-center animate-pulse
    gap-8 sm:gap-12 md:gap-20
    `} >
            <img src={microsoft} alt="microsoft" className={`h-6 sm:h-7 md:h-8 opacity-80`} />
            <img src={walmart} alt="walmart" className={`h-6 sm:h-7 md:h-8 opacity-80`} />
            <img src={accenture} alt="accenture" className={`h-6 sm:h-7 md:h-8 opacity-80`}/>
            <img src={adobe} alt="adobe" className={`h-6 sm:h-7 md:h-8 opacity-80`} />
            <img src={paypal} alt="paypal" className={`h-6 sm:h-7 md:h-8 opacity-80`} />

            
        </div>
    </div>
  )
}

export default Companies