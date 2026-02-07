import React from "react";
import FooterImg from '../../Data/FooterLogo.png'
import Facebook from '../../Data/FaceBokkLogo.jpeg'
import Insta from '../../Data/InstaLogo.jpeg'
import Linkedin from '../../Data/LinkedinLogo.jpeg'
import Twitter from '../../Data/TwiiterLogo.jpeg'
import { Link } from "react-router-dom";
import Button from "../ReuseCompo/Button";

function Footer() {
  return (
    <div className="bg-sky-50 text-gray-800 my-10 w-full rounded-3xl px-4 sm:px-8 md:px-12 py-14">

      {/* Main Row */}
      <div
        className="
        flex flex-col lg:flex-row
        justify-between
        items-start lg:items-center
        gap-12 lg:gap-20
        "
      >

        {/* Left Section */}
        <div className="w-full lg:w-1/3 space-y-4">

          <img
            src={FooterImg}
            alt="Footer Image"
            className="h-36 sm:h-40 object-contain"
          />

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
            nisi. Obcaecati, suscipit asperiores? Officiis sunt reiciendis fugiat
            magni numquam est reprehenderit blanditiis, doloremque similique veniam
            ipsa at quae? Veniam eveniet hic nesciunt animi voluptates ab nihil
            accusamus totam.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 pt-2">

            <img src={Facebook} alt="" className="h-7 sm:h-8 rounded-xl cursor-pointer hover:scale-110 transition" />
            <img src={Insta} alt="" className="h-7 sm:h-8 rounded-xl cursor-pointer hover:scale-110 transition" />
            <img src={Linkedin} alt="" className="h-7 sm:h-8 rounded-xl cursor-pointer hover:scale-110 transition" />
            <img src={Twitter} alt="" className="h-7 sm:h-8 rounded-xl cursor-pointer hover:scale-110 transition" />

          </div>

        </div>

        {/* Company Section */}
        <div
          className="
          w-full lg:w-auto
          text-center sm:text-left
          space-y-4
          "
        >

          <h2 className="text-lg sm:text-xl font-semibold text-blue-800">
            Company
          </h2>

          <div
            className="
            flex flex-col
            items-center sm:items-start
            space-y-2
            text-sm sm:text-base
            text-gray-600
            "
          >
            <p className="cursor-pointer hover:text-blue-600 transition">Home</p>
            <p className="cursor-pointer hover:text-blue-600 transition">About us</p>
            <p className="cursor-pointer hover:text-blue-600 transition">Contact us</p>
            <p className="cursor-pointer hover:text-blue-600 transition">Privacy policy</p>
          </div>

        </div>

        {/* Newsletter */}
        <div className="w-full lg:w-1/3 space-y-4">

          <h2 className="text-lg sm:text-xl font-semibold text-blue-800">
            Subscribe to our newsletter
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            The latest news, articles, and resources, sent to your inbox weekly
          </p>

          <div className="flex flex-col sm:flex-row gap-3">

            <input
              type="text"
              placeholder="Enter your email"
              className="
              w-full
              px-4 py-2.5
              rounded-xl
              bg-white
              border border-blue-200
              text-sm text-gray-700
              focus:outline-none focus:ring-2 focus:ring-blue-500
              "
            />

            <Button
              title="Subscribe"
              classname="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2.5 rounded-xl transition"
            />

          </div>

        </div>

      </div>

      {/* Bottom Bar */}
      <div
        className="
        mt-12 pt-5
        border-t border-blue-200
        text-center
        text-sm 
        text-blue-700
        font-semibold
        "
      >
        © 2026 Pathshala. All rights reserved.
      </div>

    </div>
  );
}


export default Footer;
