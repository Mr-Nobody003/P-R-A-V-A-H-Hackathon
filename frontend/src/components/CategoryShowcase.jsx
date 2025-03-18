import { useNavigate } from "react-router-dom";

const categories = [
  { id: "Textiles", name: "Textile", image: "https://tse4.mm.bing.net/th?id=OIG3.vFasXGIw05i0.Ngxf4eH&pid=ImgGn" },
  { id: "Pottery", name: "Pottery", image: "https://tse4.mm.bing.net/th?id=OIG4.BbwLBH6O15hrLdGmW6hQ&pid=ImgGn" },
  { id: "Jewelry", name: "Jewellery", image: "https://tse3.mm.bing.net/th?id=OIG4.yaL055DYww_fyYCYAgbA&pid=ImgGn" },
  { id: "Woodwork", name: "Woodwork", image: "https://tse2.mm.bing.net/th?id=OIG3.aFmJHLC0wCIC9IeFarzN&pid=ImgGn" },
  { id: "Accessories", name: "Accessories", image: "https://tse3.mm.bing.net/th?id=OIG1..YmOsdZwId8OUx3Q5CdJ&pid=ImgGn" },
];

function CategoryShowcase() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
      {categories.map((category) => (
        <div
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className="group relative cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
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
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoryShowcase;


