import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Sample region data
const regions = [
  {
    id: "assam",
    name: "Assam",
    image: "/placeholder.svg",
    description:
      "Known for its exquisite silk weaving traditions, including Muga, Eri, and Pat silk.",
    specialties: ["Silk Weaving", "Bell Metal Craft", "Terracotta"],
  },
  {
    id: "arunachal-pradesh",
    name: "Arunachal Pradesh",
    image: "/placeholder.svg",
    description:
      "Home to diverse tribal crafts, including bamboo and cane work, wood carving, and handwoven textiles.",
    specialties: ["Bamboo & Cane Craft", "Wood Carving", "Handwoven Textiles"],
  },
  {
    id: "manipur",
    name: "Manipur",
    image: "/placeholder.svg",
    description:
      "Famous for its fine pottery, handloom textiles, and intricate bamboo crafts.",
    specialties: ["Pottery", "Handloom", "Bamboo Craft"],
  },
  {
    id: "meghalaya",
    name: "Meghalaya",
    image: "/placeholder.svg",
    description:
      "Renowned for cane and bamboo crafts, with distinctive styles from the Khasi, Jaintia, and Garo tribes.",
    specialties: ["Cane Craft", "Bamboo Products", "Traditional Jewelry"],
  },
  {
    id: "mizoram",
    name: "Mizoram",
    image: "/placeholder.svg",
    description:
      "Known for its intricate bamboo crafts, colorful handwoven shawls, and traditional Mizo handicrafts.",
    specialties: ["Handwoven Shawls", "Bamboo & Cane Craft", "Handicrafts"],
  },
  {
    id: "nagaland",
    name: "Nagaland",
    image: "/placeholder.svg",
    description:
      "Home to 16 major tribes, each with distinct craft traditions including wood carving and textile weaving.",
    specialties: ["Wood Carving", "Tribal Textiles", "Bamboo Work"],
  },
  {
    id: "sikkim",
    name: "Sikkim",
    image: "/placeholder.svg",
    description:
      "Famous for its Thangka paintings, handwoven carpets, and traditional Lepcha crafts.",
    specialties: ["Thangka Painting", "Handwoven Carpets", "Lepcha Weaving"],
  },
  {
    id: "tripura",
    name: "Tripura",
    image: "/placeholder.svg",
    description:
      "Renowned for its tribal handloom, cane furniture, and bamboo handicrafts.",
    specialties: ["Handloom Weaving", "Cane & Bamboo Craft", "Furniture Making"],
  },
];


function RegionalHighlights() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {regions.map((region) => (
        <div key={region.id} className="group relative overflow-hidden rounded-lg">
          <div className="relative h-64 w-full overflow-hidden">
            <img
              src={region.image || "/placeholder.svg"}
              alt={region.name}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">{region.name}</h3>
            <p className="mb-3 line-clamp-2">{region.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {region.specialties.map((specialty) => (
                <span key={specialty} className="text-xs bg-white/20 px-2 py-1 rounded-full">
                  {specialty}
                </span>
              ))}
            </div>
            <Link
              to={`/regions/${region.id}`}
              className="inline-flex items-center text-amber-300 hover:text-amber-200 font-medium"
            >
              Explore region <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RegionalHighlights;