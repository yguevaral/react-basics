import "./InputSearch.css";
import useProductSearch from "../../hooks/useProductSearch";
import { SetStateAction, useRef, useState, useCallback} from "react";

function InputSearch() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  
  function handleSearch(e: { target: { value: SetStateAction<string> } }) {
    setQuery(e.target.value);
    setPageNumber(0);
  }

  const { loading, error, products, hasMore } = useProductSearch(
    query,
    pageNumber
  );

  const observer = useRef<IntersectionObserver | null>(null);
  const lasProductRef = useCallback((node: HTMLDivElement | null) => {

    if( loading ) return;
    if( observer.current ) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if( entries[0].isIntersecting && hasMore ) {
        setPageNumber(prevPageNumber => prevPageNumber + 1);
      }
    });

    if( node ) observer.current.observe(node);

  }, [loading, hasMore]);


  return (
    <>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Buscar..."
      />
      <h1>{products.length}</h1>
      {products.map((product, index) => {
        if( products.length === index + 1 ) {
          return <div ref={lasProductRef} key={index}>{product.title}</div>;
        }
        else{
          return <div key={index}>{product.title}</div>;
        }
        
      })}
      {loading && <div>...Loading</div>}
      {error && <div>...Error</div>}
    </>
  );
}

export default InputSearch;
