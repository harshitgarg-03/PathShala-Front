import microsoft from '../../assets/microsoft_logo.svg'
import accenture from '../../assets/accenture_logo.svg'
import adobe from '../../assets/adobe_logo.svg'
import paypal from '../../assets/paypal_logo.svg'
import walmart from '../../assets/walmart_logo.svg'

function Companies() {
  return (
    <div>
        <p>Trusted y learners from</p>
        <div>
            <img src={microsoft} alt="microsoft" />
            <img src={walmart} alt="walmart" />
            <img src={accenture} alt="accenture" />
            <img src={adobe} alt="adobe" />
            <img src={paypal} alt="paypal" />
        </div>
    </div>
  )
}

export default Companies