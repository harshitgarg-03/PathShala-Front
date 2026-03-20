import type { smallCardProp } from "../../Types";
import program from '../../../public/program.jpeg'
import DataScience from '../../../public/DataScience.jpeg'
import Business from '../../../public/Business.jpeg'
import Marketing from '../../../public/Marketing.jpeg'
import PersonalDevelopment from '../../../public/PersonalDevelopment.jpeg'
import PaathShaala from '../../../public/PathShaala.jpeg'
import Design from '../../../public/Design.jpeg'


export function Smallcards({ title, icon }: smallCardProp) {
  return (
    <div>
      <div className={`flex  items-center justify-around
      gap-6
      px-4 sm:px-6 md:px-8
      py-3
      rounded-2xl
      bg-white
      shadow-sm hover:shadow-md
      transition
      w-full sm:w-56 md:w-60
      `} >
        <img src={icon} alt="" className={`h-8 sm:h-10 md:h-12 object-contain`} />
        <h2 className={`text-gray-700 text-sm sm:text-base font-medium`}>{title}</h2>
      </div>
    </div>
  );
}

function Testimonial() {
  return (
    <div className="mt-12 px-4 sm:px-6 lg:px-8">

      <div className="mb-8 text-center sm:text-left">

        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
          Top Categories
        </h2>

      </div>

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        gap-4 sm:gap-6
        justify-items-center
        "
      >
        <Smallcards title="Programming" icon={program} />
        <Smallcards title="Data Science" icon={DataScience} />
        <Smallcards title="Marketing" icon={Marketing} />
        <Smallcards title="Design" icon={Design} />
        <Smallcards title="Business" icon={Business} />
        <Smallcards title="Pathshala" icon={PaathShaala} />
        <Smallcards title="Personal Development" icon={PersonalDevelopment} />
      </div>

    </div>
  );
}


export default Testimonial;
