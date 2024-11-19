/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios, { Canceler } from "axios";

export default function useProductSearch(query: string, pageNumber: number) {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setProducts([])
  }, [query])

  useEffect(() => {

    setLoading(true);
    setError(false);
    let cancel: Canceler;

    axios({
        method: "GET",
        url: 'https://dummyjson.com/products/search',
        params: { query, limit: 30, skip: pageNumber * 30 },
        cancelToken: new axios.CancelToken((c) => {
          // An executor function receives a cancel function as a parameter
          cancel = c;
        }),
    }).then((res) => {

      setProducts((prevProducts) => {
        
        return [...new Set([...prevProducts, ...res.data.products])]; // Unique valuess
      });
      setHasMore(res.data.products.length > 0);
      setLoading(false);
        
    }).catch((error) => {
      if( axios.isCancel(error) ) return;
      setError(true);
    });

    return () => cancel();

  }, [query, pageNumber]);

  return {loading, error, products, hasMore};
}
