import { useEffect, useState } from "react"
import ProductForm from './ProductForm'
import './Products.css'

function Products() {

    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])

    const [showForm, setShowForm] = useState(false);
    const handleClose = () => setShowForm(false);
    const handleShow = () => setShowForm(true);
    const openForm = () => setShowForm(true);

// http://localhost:8080/products
    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:8080/products")
        .then(response => response.json())
        .then(json => setProducts(json))
        .finally( () => {
            setLoading(false);
        })
        

    }, [])



    return (
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <h1>Products</h1>
              <table border={2} className="tableStyle">
              <tbody>
                <tr>
                  <th>Name</th>
                </tr>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                  </tr>
                ))}
                </tbody>
              </table>
       
              <button className = "buttonStyle" onClick={openForm}>Create Product</button>
            </>
          )}

    <ProductForm show={showForm} setShowForm={setShowForm}></ProductForm>

        </div>
      )
  }


export default Products