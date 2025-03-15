import { Link } from "react-router-dom";

const artisans = [
  {
    name: "Lakshmi Devi",
    craft: "Silk Weaving",
    location: "Sualkuchi, Assam",
    description:
      "A third-generation weaver specializing in traditional Assamese Muga silk, Lakshmi has been weaving for over 25 years and is known for her intricate motifs.",
    image: "https://th.bing.com/th/id/OIG2.GrjIPbyofQ._zXjXwUIB?pid=ImgGn", // Add actual image URL
  },
  {
    name: "Mohan Singh",
    craft: "Bamboo Craft",
    location: "Imphal, Manipur",
    description:
      "Mohan learned bamboo crafting from his father and has innovated traditional techniques to create contemporary home decor items while preserving culture.",
    image: "https://th.bing.com/th/id/OIG1.AOfq8gUD9FwrKze5RlWz?pid=ImgGn", // Add actual image URL
  },
  {
    name: "Temjen Ao",
    craft: "Wood Carving",
    location: "Mokokchung, Nagaland",
    description:
      "A master wood carver from the Ao tribe, Temjen creates ceremonial masks and figurines that tell the stories of his ancestors and tribal traditions.",
    image: "https://th.bing.com/th/id/OIG1.03TLboXY0zrWeBJfbYG.?pid=ImgGn", // Add actual image URL
  },
];

const Artisan = () => {
  return (
    <div className="min-h-screen bg-stone-100 py-12 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Meet Our Artisans
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artisans.map((artisan, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                {artisan.image ? (
                  <img
                    src={artisan.image}
                    alt={artisan.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400">Image Not Available</span>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold">{artisan.name}</h3>
                <p className="text-amber-600 font-medium">{artisan.craft}</p>
                <p className="text-sm text-gray-500">{artisan.location}</p>
                <p className="text-gray-700 mt-2">{artisan.description}</p>

                <Link
                  to={`/artisans/${index}`}
                  className="text-amber-600 mt-4 inline-block font-medium hover:underline"
                >
                  Read full story →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg">
            Discover More Artisans
          </button>
        </div>
      </div>
    </div>
  );
};

export default Artisan;
