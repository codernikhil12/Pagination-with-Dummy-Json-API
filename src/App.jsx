import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [pages, setPages] = useState(2)

  useEffect(() => {
    const fetchproducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setItems(response.data.products);
      } catch (error) {
        console.log(error);
      }
    };

    fetchproducts();
  }, [pages]);

 
  const handleClickPage = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= items.length / 10 && selectedPage !== pages){
    setPages(selectedPage)
  }
}

  return (
    <>
      <h1>Pagination</h1>
      <div className="products">
      {items.slice(pages* 10 - 10, pages *10 ).map((item) => (
        <span className="products__single" key={item.id}>
          <img src={item.thumbnail}></img>
          <span>{item.title}</span>
        </span>
      ))}
      </div>
      {items.length > 0 && <div className="pagination">

       <span onClick= {() => handleClickPage(pages-1)} className={pages > 1 ? "" : "pagination__disable"}>⬅️</span>
       {[...Array(items.length/10)].map((_, i) => {
         return <span
         className={pages === i+1 ? "pagination__selected": "" }
          onClick= {() => handleClickPage(i+1)}key={i}>{i+1}</span>
       })}
       <span onClick= {() => handleClickPage(pages+1)} className={pages < items.length / 10 ? "" : "pagination__disable"}>▶️</span>
      </div>}
    </>
  );
}

export default App;
