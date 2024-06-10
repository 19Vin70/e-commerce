import { useCallback } from 'react';
import swal from 'sweetalert2';

const useAddToCart = (addToCart) => {
  return useCallback((product) => {
    addToCart(product);
    swal.fire({
      title: "Added to Cart",
      text: `${product.title} has been added to your cart.`,
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
  }, [addToCart]);
};

export default useAddToCart;