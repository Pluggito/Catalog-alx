import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";


export default function Footer(){

    const text = ` UrbanTrend Store is your premier destination for premium headwear. We're dedicated to bringing 
                you the finest selections that combine style, comfort, and quality craftsmanship.`
    return(
        <div>
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">

            <div>
                <h1 className="font-bold">UrbanTrend</h1>
                <p className="w-full md:w-2/3 text-gray-500 leading-relaxed">
                    {text}
                </p>
            </div>

            <div className="mt-8">
                <p className="text-xl font-medium ">COMPANY</p>
                <ul className="flex flex-col gap-1 text-gray-600">
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            <div className="mt-8">
                <p className="text-xl font-medium ">GET IN TOUCH</p>
                <ul className="flex flex-col gap-1 text-gray-600" >
                    <li>+234-907-827-9999</li>
                    <li>urbantrendstore@gmail.com</li>
                    <a href='https://www.instagram.com/_official_urbantrend/' className="cursor-pointer text-gray-700 no-underline">
                        <FontAwesomeIcon icon={faInstagram}/>
                        _official_urbantrend
                    </a>

                </ul>
            </div>
            </div>

            <div>
                <hr/>
                <p className="py-5 text-sm text-center">Copyright 2025@ urbantrendstore.com 
                    All Rights Reserved.
                </p>
            </div>
                    </div>
                    
    )
}