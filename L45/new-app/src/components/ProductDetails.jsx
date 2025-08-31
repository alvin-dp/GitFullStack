import { useParams, useLocation } from "react-router";
 
function ProductDetails (props) {
    const { productId } = useParams(); 
    let location= useLocation();
    console.log(location);
  return ( 
    <div>
      <h2>Деталі продукту</h2> 
      <p>ID продукту: {productId}</p>       
    </div>
  ); 
  }

export default ProductDetails;