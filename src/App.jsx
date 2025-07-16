import { useEffect, useState } from "react";


function App() {

  const apiUrl = "http://localhost:3333";
  const productQueryUrl = "/products?search=";
  const [inputSearch, setInputSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const searchQuery = async ()=>{
    const res = await fetch(`${apiUrl}${productQueryUrl}${inputSearch}`);
    const data = await res.json();
    setFilteredProducts(data);
  }

  const getProducts = async ()=>{
    const res = await fetch(`${apiUrl}${productQueryUrl}`);
    const data = await res.json();
    setProducts(data);
  }

  useEffect(()=>{
    getProducts();
  },[])

  useEffect(()=>{
    searchQuery();
  },[inputSearch])


  console.log(products);

  return <div className="text-center">
    <h2>Prodotti</h2>
    <input type="text" placeholder="Ricerca Prodotti" onChange={(e)=>setInputSearch(e.target.value)} value={inputSearch} />
    <div className="d-flex justify-content-between text-white">
      <div className="m-3 results row row-cols-4 bg-primary w-70">
        {products.map(p=><div key={p.id} className="p-3">
          <h3>{p.brand}</h3>
          <img src={p.image} alt={p.brand} />
          <h5>{p.price}</h5>
          <p>{p.description}</p>
        </div>)}
      </div>

    {inputSearch && <>
    <div className="m-3 results row row-cols-2 bg-secondary w-30">
      <h3 className="w-100 text-center">Searched Products</h3>
      {filteredProducts.length === 0 && <h4 className="text-center">Nessun Prodotto Trovato</h4>}
        {filteredProducts.map(p=><div key={p.id} className="p-3">
          <h3>{p.brand}</h3>
          <img src={p.image} alt={p.brand} />
          <h5>{p.price}</h5>
          <p>{p.description}</p>
        </div>)}
        
    </div>
    </>}
    </div>
  </div>
}

export default App
