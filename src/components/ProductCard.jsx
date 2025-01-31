const ProductCard = ({ product }) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      <img
        alt={product.title}
        src={product.thumbnail}
        className="aspect-3/4 bg-gray-200 object-cover group-hover:opacity-75 sm:h-96"
      />
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-sm font-medium text-gray-900">{product.title}</h3>
        <p className="text-sm text-gray-500">{product.description}</p>
        <div className="flex flex-1 flex-col justify-end">
          <p className="text-sm text-gray-500 italic">{product.options}</p>
          <p className="text-base font-medium text-gray-900">{product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
