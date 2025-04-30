import axios from "axios";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.js'




export function Fakestore() {

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([{ id: 0, title: "", price: 0, category: "", discription: "", image: "", rating: { rate: 0, count: 0 } }]);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    function LoadCategories() {
        axios.get('https://fakestoreapi.com/products/categories')
            .then(response => {
                response.data.unshift("all");
                setCategories(response.data);
            })
    }

    function LoadProducts(url) {
        axios.get(url)
            .then(response => {
                setProducts(response.data);
            })
    }

    function handleChange(e) {
        if (e.target.value === "all") {
            LoadProducts('https://fakestoreapi.com/products');
        }
        else {
            LoadProducts(`https://fakestoreapi.com/products/category/${e.target.value}`)
        }
    }

    function handleCartChange(product) {
        setCartItems(prevItems => {
            if (prevItems.some(item => item.id === product.id)) {
                return prevItems;
            }
            const newItems = [...prevItems, product];
            setCartCount(newItems.length);
            return newItems;
        });
    }


    useEffect(() => {
        LoadCategories();
        LoadProducts('https://fakestoreapi.com/products');
    }, [])

    return (
        <div className="container-fluid">
            <header className="d-flex justify-content-between mt-2 p-3 bg-light">
                <div className="h2"> Fakestore. </div>
                <div>
                    <span><a> Home </a></span>
                    <span className="mx-3"><a> Electronics </a></span>
                    <span><a> Jewelery </a></span>
                </div>
                <div>
                    <button className="position-relative btn bi bi-cart4" data-bs-toggle="modal" data-bs-target="#cart">
                        <span className="badge bg-danger position-absolute rounded rounded-circle">{cartCount}</span>
                    </button>
                    <div className="modal fade" id="cart">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3> Your Cart Items </h3>
                                    <button className="btn btn-close" data-bs-dismiss="modal"></button>
                                </div>
                                <div className="modal-body">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Product Id</th>
                                                <th>Product Title</th>
                                                <th>Product Preview</th>
                                                <th>Product Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cartItems.map(item => (
                                                    <tr key={item.id}>
                                                        <td>{item.id}</td>
                                                        <td>{item.title}</td>
                                                        <td><img src={item.image} alt={item.title} height='50' width='50' /></td>
                                                        <td>{item.price}</td>
                                                    </tr>
                                                )
                                                )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </header>
            <section className="row mt-4">
                <nav className="col-2">
                    <div>
                        <label className="form-label fw-bold "> Select Category</label>
                        <select className="form-select" onChange={handleChange}>{
                            categories.map(category => <option value={category} key={category}>{category.toUpperCase()}</option>)
                        }</select>
                    </div>
                </nav>
                <main className="col-10 d-flex flex-wrap overflow-auto" >
                    {
                        products.map(product => {
                            return (
                                <div key={product.id} className="card m-2 p-2" style={{ width: '250px' }}>
                                    <img src={product.image} className="card-img-top" height='120' alt={product.title} />
                                    <div className="card-header" style={{ height: "100px" }}>{product.title}</div>
                                    <div className="card-body">
                                        <dl>
                                            <dt>Price</dt>
                                            <dd>{product.price}</dd>
                                            <dt>Rating</dt>
                                            <dd>{product.rating.rate} <span className="bi bi-star-fill text-success"></span></dd>
                                        </dl>
                                    </div>
                                    <div className="card-footer">
                                        <button className="btn btn-warning bi bi-cart4 w-100" onClick={() => handleCartChange(product)}>
                                            Add to Cart
                                        </button>

                                    </div>
                                </div>
                            )
                        })
                    }
                </main>

            </section>
        </div>
    )
}