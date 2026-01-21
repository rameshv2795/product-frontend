import { useState } from "react";
import { Modal } from "react-bootstrap";
import './ProductForm.css'

function ProductForm({show, setShowForm}) {

  const [productData, setProductData] = useState("");

  const handleChangeName = (e) => {

    setProductData({
        ...productData,
        name: e.target.value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/products", {
        method: "POST",
        headers : {
            "Content-Type": "Application/JSON",
        },
        body: JSON.stringify(productData),
    })
     .then((response) => response.json())
     .then((newProduct) => {
        console.log(newProduct);
        setShowForm(false);
     })
     .catch((error) => {
        console.log(error);
     })
  }

  const handleClose = () => setShowForm(false);

  return (
    <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
            <form onSubmit={handleSubmit} className="formStyle">
            <label>
                Name:
            <input className="inputBoxStyle" type="text" name="name" onChange={handleChangeName} value={productData.name}/>
            </label>
            <input className="submitStyle" type="submit" value="Submit" />
            </form>

          </Modal.Body>

    </Modal>
  );
}

export default ProductForm;