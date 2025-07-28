// 📌 Milestone 2: Implementare il Debounce per Ottimizzare la Ricerca
// Attualmente, ogni pressione di tasto esegue una richiesta API. Questo è inefficiente!
// Implementa una funzione di debounce per ritardare la chiamata API fino a quando l’utente smette di digitare per un breve periodo (es. 300ms)
// Dopo l’implementazione, verifica che la ricerca non venga eseguita immediatamente a ogni tasto premuto, ma solo dopo una breve pausa.

// Obiettivo: Ridurre il numero di richieste API e migliorare le prestazioni.

import { useEffect, useState, useCallback } from "react";

  const debounce= ((callback, delay)=>{
    let timer;
    return ()=>{
      clearTimeout(timer);
      setTimeout(()=>{
        callback();
      }, delay)
    }
  })
  
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

  const callBackSearch = useCallback(debounce(searchQuery, 500), [inputSearch]);

  useEffect(()=>{
    getProducts();
  },[])

  useEffect(()=>{
    callBackSearch();
  },[inputSearch])


  console.log(products);

  return <div className="text-center">
    <h2>Prodotti</h2>
    <input type="text" placeholder="Ricerca Prodotti" onChange={(e)=>setInputSearch(e.target.value)} value={inputSearch} />
    <div className="d-flex justify-content-between text-white">
      <div className="m-3 results row row-cols-4 bg-primary w-70">
        {products.map(p=><div key={p.id} className="p-3">
          <h3>{p.name}</h3>
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
          <h3>{p.name}</h3>
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
