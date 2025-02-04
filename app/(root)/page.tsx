import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.action";

const Homepage = async () => {
  const latestProdcut = await getLatestProducts();

  return <ProductList data={latestProdcut} title="San pham moi" limit={4} />;
};

export default Homepage;
