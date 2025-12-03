import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "../components/Title";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import NewsLetter from "./Newsletter";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full md:max-w-[480px]"
          src="/logo_icon1.png"
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl  text-gray-600">Our Store</p>
          <p className="text-gray-500">
            <FontAwesomeIcon icon={faLocationDot} className="text-[20px]" />{" "}
            <span className="ml-3">
                123 Fashion Ave, Lagos, Nigeria
            </span>
          </p>
          <p className="text-gray-500">
            <FontAwesomeIcon icon={faPhone} />
            <span className="ml-3">+234-907-827-9999</span>
          </p>
          <p className="text-gray-500">
            <FontAwesomeIcon icon={faInstagram} />
            <span className="ml-3">urbantrendstore</span>
          </p>
          <p className="text-gray-500">
            <FontAwesomeIcon icon={faEnvelope} />
            <span className="ml-3">urbantrendstore@gmail.com</span>
          </p>
        </div>
      </div>

      <NewsLetter />
    </div>
  );
};

export default Contact;
