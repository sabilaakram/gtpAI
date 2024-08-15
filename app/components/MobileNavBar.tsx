"use client";

import React, { useState } from "react";
import Link from "next/link";
import "../MobileNavBarStyling.css"; // Import the CSS file
import Image from "next/image";

const MobileNavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
    setOpenDropdown(null); // Close any open dropdowns when toggling the navbar
  };

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  return (
    <nav className="mobile-navbar">
      <div className="mobile-navbar-header">
        <div className="mobile-logo">
          <Image
            src="https://guidetopakistan.pk/wp-content/uploads/elementor/thumbs/cropped-logo-removebg-preview-qnklwohkxard0egosusv82qgic99scv8wsdnbdvddw.png"
            alt="Logo"
            height={40}
            width={40}
          />
        </div>
        <div className="hamburger-icon" onClick={toggleNavbar}>
          {isOpen ? (
            <span className="close-icon">&times;</span>
          ) : (
            <span className="hamburger">&#9776;</span>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="mobile-nav-links">
          <Link href="https://guidetopakistan.pk/">Home</Link>
          <Link href="https://guidetopakistan.pk/about-us/">About Us</Link>
          <div className="dropdown">
            <Link href="https://guidetopakistan.pk/tours/">
              Tours <span className="arrow-down pb-8"></span>
            </Link>
            <div className="dropdown-content">
              <Link href="https://guidetopakistan.pk/customized-tour-package/">
                Customized Tour Package
              </Link>
              <Link href="https://guidetopakistan.pk/tour/hunza-and-azad-kashmir-tour-package/">
                Hunza and Azad Kashmir Tour
              </Link>
              <Link href="https://guidetopakistan.pk/tour/sharan-forest-tour/">
                Sharan Forest Tour
              </Link>
              <Link href="https://guidetopakistan.pk/tour/unwind-and-rejuvenate-with-our-hunza-swat-tour-package/">
                Hunza Swat Tour
              </Link>
              <Link href="https://guidetopakistan.pk/tour/fairy-meadows-5-days-4-nights-tour-package/">
                Fairy Meadows Tour
              </Link>
              {/* Add more links as needed */}
            </div>
          </div>
          <div className="dropdown">
            <Link href="https://guidetopakistan.pk/destinations/">
              Destinations <span className="arrow-down"></span>
            </Link>
            <div className="dropdown-content">
              <Link href="https://guidetopakistan.pk/destinations/gilgit-baltistan/">
                Gilgit Baltistan
              </Link>
              <Link href="https://guidetopakistan.pk/destinations/kpk/">
                Khyber Pakhtunkhwa
              </Link>
              <Link href="https://guidetopakistan.pk/destinations/islamabad-the-serene-and-green-capital-of-pakistan/">
                Islamabad
              </Link>
              <Link href="https://guidetopakistan.pk/destinations/punjab-the-land-of-vivid-culture/">
                Punjab
              </Link>
              <Link href="https://guidetopakistan.pk/destinations/sindh-the-land-of-sufis/">
                Sindh
              </Link>
              <Link href="https://guidetopakistan.pk/destinations/balochistan/">
                Balochistan
              </Link>
              <Link href="https://guidetopakistan.pk/destinations/kashmir-the-land-of-fairytales/">
                Kashmir
              </Link>
              {/* Add more links as needed */}
            </div>
          </div>

          <Link href="https://guidetopakistan.pk/gallery/">Gallery</Link>
          <Link href="https://guidetopakistan.pk/blog/">Blog</Link>
          <Link href="https://guidetopakistan.pk/contact-us/">Contact Us</Link>
          <Link href="https://guidetopakistan.pk/shop/">Shop</Link>
        </div>
      )}
    </nav>
  );
};

export default MobileNavBar;
