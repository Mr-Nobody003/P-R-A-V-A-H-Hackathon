import { Link } from "react-router-dom";


const categories = [
  { id: "weaving", name: "Weaving", image: "https://th.bing.com/th/id/OIG1.jh_REJ33rDAE4NqAAHi2?pid=ImgGn", count: 124 },
  { id: "bamboo-cane", name: "Bamboo & Cane", image: "https://th.bing.com/th/id/OIG4.MScJqzcGjkAGja2YX7Va?pid=ImgGn", count: 98 },
  { id: "pottery", name: "Pottery", image: "https://th.bing.com/th/id/OIG2.DxOUORaxJ_HOX0JBfXln?pid=ImgGn", count: 76 },
  { id: "wood-carving", name: "Wood Carving", image: "https://th.bing.com/th/id/OIG3.5vdtKC8gMCwSuTO8MHwW?pid=ImgGn", count: 85 },
  { id: "jewelry", name: "Traditional Jewelry", image: "https://th.bing.com/th/id/OIG3.VuHeDK4e5v2gOmMTgDWs?pid=ImgGn", count: 67 },
]
function CategoryShowcase() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
      {categories.map((category) => (
        <Link
        key={category.id}
        to={`/categories/${category.id}`} // Fixed: Changed `href` to `to`
        className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
      >
        <div className="relative w-full aspect-square">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 rounded-xl"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-semibold text-lg">{category.name}</h3>
          <p className="text-sm text-white/80">{category.count} products</p>
        </div>
      </Link>
      ))}
    </div>
  )
}

export default CategoryShowcase;
