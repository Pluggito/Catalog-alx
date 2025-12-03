import { faHeadphonesSimple, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { assets } from "../assets/asset";
import { Package } from "lucide-react";




export default function Policy() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center py-20 text-black max-w-5xl mx-auto text-sm md:text-base">

      <div>
        <FontAwesomeIcon icon={faRotate} className="text-5xl mb-4" />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-600">We offer hassle-free exchange policy</p>
      </div>

      <div>
        <Package className="w-12 h-12 mb-4 text-center ml-38 xl:ml-30" />
        <p className="font-semibold">7 Days Return Policy</p>
        <p className="text-gray-600">We provide 7 days free return policy</p>
      </div>

      <div>
        <FontAwesomeIcon icon={faHeadphonesSimple} className="text-5xl mb-4" />
        <p className="font-semibold">Best Customer Support</p>
        <p className="text-gray-600">We provide 24/7 customer support</p>
      </div>

    </div>
  );
}
