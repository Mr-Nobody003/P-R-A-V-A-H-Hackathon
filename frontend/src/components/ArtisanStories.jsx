import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const artisans = [
  { id: 1, name: "Lakshmi Devi", craft: "Silk Weaving", region: "Sualkuchi, Assam", image: "https://th.bing.com/th/id/OIG2.yVWEAhdd9joj75JM3Ex8?pid=ImgGn", story: "A third-generation weaver specializing in Assamese Muga silk for 25+ years." },
  { id: 2, name: "Mohan Singh", craft: "Bamboo Craft", region: "Imphal, Manipur", image: "https://th.bing.com/th/id/OIG1.03TLboXY0zrWeBJfbYG.?pid=ImgGn", story: "Mohan innovates bamboo crafting techniques to create contemporary decor items." },
  { id: 3, name: "Temjen Ao", craft: "Wood Carving", region: "Mokokchung, Nagaland", image: "https://th.bing.com/th/id/OIG1.AOfq8gUD9FwrKze5RlWz?pid=ImgGn", story: "A master wood carver from the Ao tribe, creating ceremonial masks and tribal figurines." },
];

function ArtisanStories() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {artisans.map((artisan) => (
        <div key={artisan.id} className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
          <div className="relative h-64 overflow-hidden">
          <img
    src={artisan.image}
    alt={artisan.name}
    className="object-cover transition-transform group-hover:scale-105 w-full h-full"
  />
          </div>
          <div className="p-5">
            <h3 className="font-semibold text-xl mb-1">{artisan.name}</h3>
            <p className="text-blue-600 font-medium mb-2">{artisan.craft}</p>
            <p className="text-gray-600 text-sm mb-3">{artisan.region}</p>
            <p className="text-sm text-gray-700 mb-4">{artisan.story}</p>
            <Link href={`/artisans/${artisan.id}`} className="text-blue-600 hover:text-blue-700 flex items-center">
              Read full story <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ArtisanStories;