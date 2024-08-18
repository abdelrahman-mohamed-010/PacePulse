import { Link } from "react-router-dom";
import { Product } from "../Fields/fields";

const FeaturesProduct: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} key={product.id} className="group">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={
            import.meta.env.VITE_API_UP_URL +
            product.attributes.img.data.attributes.url
          }
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{product.attributes.title}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">
        {product.attributes.price}
      </p>
    </Link>
  );
};

export default FeaturesProduct;
