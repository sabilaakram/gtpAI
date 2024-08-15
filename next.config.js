/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "peoplemagazine.com.pk",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "cf.bstatic.com",
        pathname: "/xdata/images/hotel/**",
      },
      {
        protocol: "https",
        hostname: "www.nation.com.pk",
        pathname: "/print_images/**/*",
      },
      {
        protocol: "https",
        hostname: "www.visitswatvalley.com",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
        pathname: "/128/**/*", // Adjust if you need more specific path matching
      },
      {
        protocol: "https",
        hostname: "guidetopakistan.pk",
        pathname: "/wp-content/uploads/elementor/**/*", // Adjust if needed
      },

      {
        protocol: "https",
        hostname: "elands.pk",
        pathname: "/storage/2023/02/**/*",
      },
      {
        protocol: "https",
        hostname: "www.travelertrails.com",
        pathname: "/wp-content/uploads/2023/03/**/*",
      },
      {
        protocol: "https",
        hostname: "flypakistan.pk",
        pathname: "/assets/img/attractions/**/*",
      },
      {
        protocol: "https",
        hostname: "pyaraskardu.com",
        pathname: "/wp-content/uploads/2022/12/**/*",
      },
      {
        protocol: "https",
        hostname: "blogger.googleusercontent.com",
        pathname: "/img/b/R29vZ2xl/**/*",
      },
      {
        protocol: "https",
        hostname: "static.the.akdn",
        pathname: "/53832/1641715114-shigar_fort-56759_0.jpg",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/wikipedia/commons/**/*",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/www-travelpakistani-com/image/upload/**/*",
      },
      {
        protocol: "https",
        hostname: "miro.medium.com",
        pathname: "/v2/resize:fit/**/*",
      },
      {
        protocol: "https",
        hostname: "live.staticflickr.com",
        pathname: "/8503/8264259786_83f368c819_c.jpg",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        pathname: "/images?q=tbn:*",
      },
      {
        protocol: "https",
        hostname: "humenglish.com",
        pathname: "/wp-content/uploads/2024/06/**/*",
      },
      {
        protocol: "https",
        hostname: "kamranonbike.com",
        pathname: "/wp-content/uploads/2021/01/**/*",
      },
      {
        protocol: "https",
        hostname: "media-cdn.tripadvisor.com",
        pathname: "/media/photo-s/**/*",
      },
      {
        protocol: "https",
        hostname: "prestinetravels.com",
        pathname: "/wp-content/uploads/2023/05/**/*",
      },
      {
        protocol: "https",
        hostname: "pakrism.pk",
        pathname: "/wp-content/uploads/2023/04/**/*",
      },
      {
        protocol: "https",
        hostname: "ajktours.com",
        pathname: "/wp-content/uploads/2023/**/*",
      },
      {
        protocol: "https",
        hostname: "profit.pakistantoday.com.pk",
        pathname: "/wp-content/uploads/2021/03/**/*",
      },
      {
        protocol: "https",
        hostname: "gulmitcontinentalhotel.com",
        pathname: "/wp-content/uploads/2023/06/**/*",
      },
      {
        protocol: "https",
        hostname: "visitgilgitbaltistan.gov.pk",
        pathname: "/images/articles/places/**/*",
      },
    ],
  },
};

module.exports = nextConfig;
