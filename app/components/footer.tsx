// components/Footer.tsx
import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  FaMapMarkerAlt,
  FaMobileAlt,
  FaPhoneAlt,
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

const Footer: React.FC = () => {
  return (
    <footer style={{ backgroundColor: "#1c3c6b" }} className="text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        <div>
          <h3 className="font-bold text-lg">Guide to Pakistan</h3>

          <a
            href="https://www.google.com/maps/place/CyberX+Studio+%7C+Digital+Marketing+Agency+In+Islamabad+%7C+SEO,PPC,+Website+Development/@33.5211438,73.0988052,15z/data=!4m6!3m5!1s0x38dfed91094bac81:0x564a23310a6abe3e!8m2!3d33.521228!4d73.0989687!16s%2Fg%2F11rgdr2dqf?entry=ttu"
            className="text-white hover:text-blue-400 no-underline flex items-center"
          >
            <FaMapMarkerAlt className="mr-2 text-2xl" />
            Plaza 54, 2nd Floor, Mini Commercial Ext II, Bahria Phase 7,
            Islamabad
          </a>

          <div className="mt-4">
            <p className="flex items-center">
              <FaMobileAlt className="mr-2" /> +92-340-3487487
            </p>
            <p className="flex items-center">
              <FaMobileAlt className="mr-2" /> +92-302-0487487
            </p>
            <p className="flex items-center">
              <FaPhoneAlt className="mr-2" /> +92-51-5733641
            </p>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-lg">Travel Pakistan</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <a
                href="https://guidetopakistan.pk/"
                className="text-white hover:text-blue-400 no-underline"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="https://guidetopakistan.pk/about-us/"
                className="text-white hover:text-blue-400 no-underline"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="https://guidetopakistan.pk/destinations/"
                className="text-white hover:text-blue-400 no-underline"
              >
                Destinations
              </a>
            </li>
            <li>
              <a
                href="https://guidetopakistan.pk/gallery/"
                className="text-white hover:text-blue-400 no-underline"
              >
                Gallery
              </a>
            </li>
            <li>
              <a
                href="https://guidetopakistan.pk/contact-us/"
                className="text-white hover:text-blue-400 no-underline"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg">Read Info</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <a
                href="https://guidetopakistan.pk/history/"
                className="text-white hover:text-blue-400 no-underline"
              >
                History
              </a>
            </li>
            <li>
              <a
                href="https://guidetopakistan.pk/the-rich-and-diverse-landscapes-of-pakistan/"
                className="text-white hover:text-blue-400 no-underline"
              >
                Rich & Diverse Landscapes
              </a>
            </li>
            <li>
              <a
                href="https://guidetopakistan.pk/the-fascinating-cultural-diversity-of-pakistan/"
                className="text-white hover:text-blue-400 no-underline"
              >
                Fascinating Cultural Diversity
              </a>
            </li>
            <li>
              <a
                href="https://guidetopakistan.pk/archeology-and-heritage-sites/"
                className="text-white hover:text-blue-400 no-underline"
              >
                Archeology & Heritage Sites
              </a>
            </li>
            <li>
              <a
                href="https://guidetopakistan.pk/the-climate/"
                className="text-white hover:text-blue-400 no-underline"
              >
                The Climate
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg">Join our Team</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <a
                href="https://guidetopakistan.pk/work-at-gtp/"
                className="text-white hover:text-blue-400 no-underline"
              >
                Work at GTP
              </a>
            </li>
            <li>
              <a
                href="https://guidetopakistan.pk/list-your-business-products/"
                className="text-white hover:text-blue-400 no-underline"
              >
                List your Business & Products
              </a>
            </li>
            <li>
              <a
                href="https://guidetopakistan.pk/become-a-local-contact/"
                className="text-white hover:text-blue-400 no-underline"
              >
                Become a local contact
              </a>
            </li>
            <li>
              <a
                href="https://guidetopakistan.pk/terms-conditions/"
                className="text-white hover:text-blue-400 no-underline"
              >
                Terms & conditions
              </a>
            </li>
            <li>
              <a
                href="https://guidetopakistan.pk/copyright-privacy/"
                className="text-white hover:text-blue-400 no-underline"
              >
                Copyright & Privacy
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto flex flex-wrap md:flex-nowrap justify-between items-center border-t border-white mt-8 pt-4 px-4">
        <p>
          ©Copyright 2024 Guide to Pakistan | Powered by{" "}
          <a
            href="https://cyberxstudio.com/"
            className="no-underline text-blue-400 hover:underline"
          >
            CyberX Studio
          </a>
        </p>
        <div className="flex space-x-4 flex-wrap">
          <span className="elementor-grid-item">
            <a
              className="elementor-icon elementor-social-icon elementor-social-icon-facebook flex items-center justify-center p-2 w-10 h-10 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition duration-300 ease-in-out"
              href="https://www.facebook.com/GuidetoPakistan.official/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="elementor-screen-only"></span>
              <FaFacebook className="text-xl" />
            </a>
          </span>
          <span className="elementor-grid-item">
            <a
              className="flex items-center justify-center p-2 w-10 h-10 rounded-lg bg-black hover:!bg-gray-800 text-white transition duration-300 ease-in-out"
              href="https://twitter.com/Guidetopak_GTP"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="elementor-screen-only"></span>
              <FaXTwitter className="text-xl" />
            </a>
          </span>
          <span className="elementor-grid-item">
            <a
              className="elementor-icon elementor-social-icon elementor-social-icon-youtube flex items-center justify-center p-2 w-10 h-10 rounded-lg bg-red-600 hover:bg-red-700 text-white transition duration-300 ease-in-out"
              href="https://www.youtube.com/channel/UC3RYYE1lXTq0Bktw4hJfg8g"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="elementor-screen-only"></span>
              <FaYoutube className="text-xl" />
            </a>
          </span>

          <span className="elementor-grid-item">
            <a
              className="elementor-icon elementor-social-icon elementor-social-icon-linkedin flex items-center justify-center p-2 w-10 h-10 rounded-lg bg-blue-700 hover:bg-blue-800 text-white transition duration-300 ease-in-out"
              href="https://www.linkedin.com/company/guidetopakistan-gtp/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="elementor-screen-only"></span>
              <FaLinkedin className="text-xl" />
            </a>
          </span>

          <span className="elementor-grid-item">
            <a
              className="elementor-icon elementor-social-icon elementor-social-icon-instagram flex items-center justify-center p-2 w-10 h-10 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white transition duration-300 ease-in-out"
              href="https://www.instagram.com/GuidetoPakistan.official/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="elementor-screen-only"></span>
              <FaInstagram className="text-xl" />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
