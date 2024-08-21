// components/NavBar.tsx
import React from "react";
import Link from "next/link";
import "../NavBarStyling.css"; // Import the CSS file
import Image from "next/image";

const NavBar: React.FC = () => {
  return (
    <nav className="navbar position-fixed justify-content-center d-none d-lg-flex">
      <div className="navbar-content gap-3">
        <div className="logo">
          <Image
            src="https://guidetopakistan.pk/wp-content/uploads/elementor/thumbs/cropped-logo-removebg-preview-qnklwohkxard0egosusv82qgic99scv8wsdnbdvddw.png"
            alt="Logo"
            height={100}
            width={100}
          />
        </div>
        <div className="nav-links">
          <Link href="https://guidetopakistan.pk/">Home</Link>
          <Link href="https://guidetopakistan.pk/about-us/">About Us</Link>
          <div className="dropdown">
            <Link href="https://guidetopakistan.pk/tours/">
              Tours <span className="arrow-down"></span>
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
          <Link href="https://itinerary.guidetopakistan.pk/">
            Plan Your Next Trip
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
