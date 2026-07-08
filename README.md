# Startup

```
npm install react-bootstrap bootstrap react-router-dom react-icons 
```
# App.js

## index.css

```
:root {
  --brand : #6f3bff;
}

.text-brand{
    color : var(--brand)
}

.bg-brand{
    background-color: var(--brand);
    color: white;
}

.btn-brand{
    --bs-btn-bg :var(--brand);
    --bs-btn-border-bg :var(--brand);

    --bs-btn-hover-bg :var(--brand);
    --bs-btn-hover-border-bg :var(--brand);

    --bs-btn-active-bg :var(--brand);
    --bs-btn-active-border-bg :var(--brand);

    --bs-btn-focus-bg :var(--brand);

    --bs-btn-color:white;
    --bs-btn-hover-color:white;
    --bs-btn-active-color:white;
}

.page{
    background-color: #f6f5fd;
    height: 100vh;
}

input , select{
    color: black;
    background-color: #f6f5fd;
}

```

## Router configs 

```
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Home from './pages/Home';
// import Product from './pages/Product';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Hero />} />
            {/*
            <Route path="/admin" element={<Admin />}>
              <Route index element={<TableProd/>}/>
              <Route path="/admin/orders" element={<Orders/>}/>
            </Route> */}
          </Route>
          {/* <Route path="/signin" element={<Signin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />}>
            <Route index element={<Dash />} />
          </Route> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
```
## Context API

```
import { createContext, useContext, useState, useEffect } from 'react';
import { product } from './globalwrapper';

const ContentContext = createContext();
const ProductContext = createContext();
const OrderContext = createContext();

export const useCart = () => useContext(ContentContext);
export const useProduct = () => useContext(ProductContext);
export const useOrder = () => useContext(OrderContext);

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [orders, setOrders] = useState(JSON.parse(localStorage.getItem('orders')) || []);
  const [products, setProducts] = useState(JSON.parse(localStorage.getItem('products')) || product)

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart])

   useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders])

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products])

  return (
    <ContentContext.Provider value={{ cart, setCart }}>
      <ProductContext.Provider value={{ products, setProducts }}>
        <OrderContext.Provider value={{ orders, setOrders }}>
          {children}
        </OrderContext.Provider>
      </ProductContext.Provider>
    </ContentContext.Provider>
  );
};

```

## Form

```
import { useState, useEffect } from "react"
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'

import { useProduct } from '../context/context'

export default function Product() {
    const navigate = useNavigate();
    const { products, setProducts } = useProduct()
    const [count, setCount] = useState(Number(JSON.parse(localStorage.getItem('count'))) || 30);
    const [product, setProduct] = useState({
        id: "",
        title: "",
        image: "",
        description: "",
        category: "",
        price: 0
    })

    const [error, setError] = useState({
        id: "",
        title: "",
        image: "",
        description: "",
        category: "",
        price: ""
    })
    const handleChange = (e) => {
        setProduct(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate()) {
            setProducts(prev => {
                return [product, ...prev]
            })
            setCount(count + 1);

            setProduct({
                id: "",
                title: "",
                image: "",
                description: "",
                category: "",
                price: 0
            })
            navigate('/admin')
        }
    }
    const validate = () => {
        const error = {};

        const isEmpty = (value) => !value || value.trim() === "";

        const isTooShort = (value, minLength = 2) => value && value.trim().length < minLength;

        if (isEmpty(product.title)) {
            error.title = "title required";
        } else if (isTooShort(product.title)) {
            error.title = "Name must be at least 2 characters";
        }
        if (isEmpty(product.image)) {
            error.image = "image url required";
        }

        if (isEmpty(product.description)) {
            error.description = "description required";

        }
        if (isEmpty(product.category)) {
            error.category = "Category required";
        }
        setError(error);
        return Object.keys(error).length === 0;
    }

    useEffect(() => {
        console.log(count);
        (count != 30) && localStorage.setItem('count', count.toString())
    }, [count]);

    useEffect(() => {
        setProduct(prev => ({ ...prev, id: (count + 1) }))
    }, [])

    useEffect(() => {
        console.log('mount')
        return () => console.log('unmount')
    }, [])

    return (
        <div className='w-100 p-4 page'>
            <Form className=" p-3 m-2 border rounded-5 text-start" onSubmit={(e) => handleSubmit(e)}>
                <h3 className="text-start mb-4"><FaPlusCircle />  Add Product</h3>
                <div className="row w-100 mb-3">
                    <div className="form-group col-12 col-md-6">
                        <label className="p-2">Product Id</label>
                        <input name='id' type="number" className="form-control rounded-pill w-100 p-2" value={product.id} onChange={(e) => handleChange(e)} />
                    </div>
                    <div className="form-group col-12 col-md-6">
                        <label className="p-2">Product title</label>
                        <input type="title" name="title" className="form-control rounded-pill w-100 p-2" value={product.title} onChange={(e) => handleChange(e)} />
                        {error.title && <p className="text-danger">{error.title}</p>}
                    </div>
                </div>
                <div className="row w-100 mb-3">
                    <div className="form-group col-12 col-md-6">
                        <label className="p-2">Product Image</label>
                        <input type="text" name='image' className="form-control rounded-pill w-100 p-2" value={product.image} onChange={(e) => handleChange(e)} />
                        {error.image && <p className="text-danger">{error.image}</p>}
                    </div>
                    <div className="form-group col-12 col-md-6">
                        <label className="p-2">Product category</label>
                        <select name='category' className="form-select rounded-pill w-100 p-2" value={product.category} onChange={(e) => handleChange(e)}>
                            <option value="">Select Category</option>
                            <option>Mens Clothes</option>
                            <option>Womens Fashions</option>
                            <option>Electronics</option>
                        </select>
                        {error.category && <p className="text-danger">{error.category}</p>}
                    </div>
                </div>
                <div className="row w-100 mb-3">
                    <div className="form-group col-12 col-md-6">
                        <label className="p-2">Description</label>
                        <input type="text" name="description" className="form-control rounded-pill w-100 p-2" value={product.description} onChange={(e) => handleChange(e)} />
                        {error.description && <p className="text-danger">{error.description}</p>}
                    </div>
                    <div className="form-group col-12 col-md-6">
                        <label className="p-2">Price</label>
                        <input type="number" name='price' className="form-control rounded-pill w-100 p-2" value={product.price} onChange={(e) => handleChange(e)} />
                        {error.price && <p className="text-danger">{error.impriceage}</p>}
                    </div>
                </div>
                <div>
                    <button className="btn border rounded-pill px-5">Reset</button>
                    <button className="btn btn-primary rounded-pill px-5" type="submit">Save</button>
                </div>
            </Form>
        </div>
    )
}
```

# Table

```
import { useState } from 'react'
import { Table, Modal, Form, Button, Badge } from 'react-bootstrap'
import { useProduct } from '../context/context'
import { reduceLength } from '../utils/len'
import { BiSolidEdit } from "react-icons/bi";
import { FaPlusCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import './TableProd'

export default function TableProd() {
    const { products, setProducts } = useProduct()
    const [edit, setEdit] = useState(0);
    const [delId, setDelId] = useState(0);
    const [show, setShow] = useState(false);
    const [showDel, setShowDel] = useState(false);

    const [product, setProduct] = useState({
        id: "",
        title: "",
        image: "",
        description: "",
        category: "",
        price: ""
    })

    const [error, setError] = useState({
        id: "",
        title: "",
        image: "",
        description: "",
        category: "",
        price: ""
    })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleDelClose = () => setShowDel(false);
    const handleDelShow = () => setShowDel(true);
    const openEditModel = (id) => {
        setEdit(id);
        handleShow();
        const product = products.find(product => product.id === id);
        setProduct(product)
    }

    const openDeleteModel = (id) => {
        setDelId(id);
        handleDelShow()
        const product = products.find(product => product.id === id);
        setProduct(product)
    }

    const handleDelete = () => {
        console.log(delId)
        setProducts(prev =>
            prev.filter(item => item.id != delId)
        )
        setProduct({
            id: "",
            title: "",
            image: "",
            description: "",
            category: "",
            price: ""
        })
        setDelId(0);
        handleDelClose()
    }
    const handleChange = (e) => {
        setProduct(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate()) {
            setProducts(prev =>
                prev.map(item =>
                    item.id === edit ? { ...item, ...product } : item
                )
            )

            setProduct({
                id: "",
                date: "",
                name: "",
                shop: "",
                total: "",
                status: ""
            })
            handleClose()
        }
    }
    const validate = () => {
        const error = {};

        const isEmpty = (value) => !value || value.trim() === "";

        const isTooShort = (value, minLength = 2) => value && value.trim().length < minLength;

        if (isEmpty(product.title)) {
            error.title = "title required";
        } else if (isTooShort(product.title)) {
            error.title = "Name must be at least 2 characters";
        }
        if (isEmpty(product.image)) {
            error.image = "image url required";
        }

        if (isEmpty(product.description)) {
            error.description = "description required";

        }
        if (isEmpty(product.category)) {
            error.category = "Category required";
        }
        setError(error);
        return Object.keys(error).length === 0;
    }



    return (
        <div className='w-100 m-3'>
            <Modal size="xl" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="text-start" onSubmit={(e) => handleSubmit(e)}>
                        <div className="row w-100 mb-3">
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Product Id</label>
                                <input name='id' type="number" className="form-control rounded-pill w-100 p-2" value={product.id} onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Product title</label>
                                <input type="title" name="title" className="form-control rounded-pill w-100 p-2" value={product.title} onChange={(e) => handleChange(e)} />
                                {error.title && <p className="text-danger">{error.title}</p>}
                            </div>
                        </div>
                        <div className="row w-100 mb-3">
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Product Image</label>
                                <input type="text" name='image' className="form-control rounded-pill w-100 p-2" value={product.image} onChange={(e) => handleChange(e)} />
                                {error.image && <p className="text-danger">{error.image}</p>}
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Product category</label>
                                <select name='category' className="form-select rounded-pill w-100 p-2" value={product.category} onChange={(e) => handleChange(e)}>
                                    <option value="">Select Category</option>
                                    <option>Mens Clothes</option>
                                    <option>Womens Fashions</option>
                                    <option>Electronics</option>
                                </select>
                                {error.category && <p className="text-danger">{error.category}</p>}
                            </div>
                        </div>
                        <div className="row w-100 mb-3">
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Description</label>
                                <input type="text" name="description" className="form-control rounded-pill w-100 p-2" value={product.description} onChange={(e) => handleChange(e)} />
                                {error.description && <p className="text-danger">{error.description}</p>}
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Price</label>
                                <input type="number" name='price' className="form-control rounded-pill w-100 p-2" value={product.price} onChange={(e) => handleChange(e)} />
                                {error.price && <p className="text-danger">{error.impriceage}</p>}
                            </div>
                        </div>
                        <div>
                            <button className="btn border rounded-pill px-5">Reset</button>
                            <button className="btn btn-primary rounded-pill px-5" type="submit">Save</button>
                        </div>
                    </Form>

                </Modal.Body>
            </Modal>

            <Modal size="xl" show={showDel} onHide={handleDelClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure , you wanna delete this</Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex gap-2'>
                    <img src={product?.image} className='w-50' style={{
                        height: "500px",
                        width: "100%",
                        objectFit: "contain",
                        objectPosition: "center",
                        backgroundColor: "#f8f9fa"
                    }} />
                    <div className='text-start'>
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>
                        <Badge>{product.category}</Badge>
                        <p>$ {product.price}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary">Cancel</Button>
                    <Button variant="danger" onClick={()=>handleDelete()}>Delete</Button>
                </Modal.Footer>
            </Modal>

            <Table bordered hover >
                <thead className='bg-primary text-white'>
                    <tr>
                        <th >id</th>
                        <th>image</th>
                        <th>title</th>
                        <th>category</th>
                        <th>Description</th>
                        <th>price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => {
                        return <tr key={product.id}>
                            <td>{product.id}</td>
                            <td style={{ width: "200px", height: "100px" }} ><img src={product.image} style={{
                                height: "200px",
                                width: "100%",
                                objectFit: "contain",
                                objectPosition: "center",
                                backgroundColor: "#f8f9fa"
                            }} /></td>
                            <td style={{ width: "300px" }}>{reduceLength(product.title, 24)}</td>
                            <td>{product.category}</td>
                            <td style={{ width: "500px" }}>{product.description}</td>
                            <td>{product.price}</td>
                            <td>
                                <Button className='bg-warning text-white m-2' onClick={() => openEditModel(product.id)}><BiSolidEdit /></Button>
                                <Button className='btn-danger m-2' onClick={() => openDeleteModel(product.id)}><MdDelete /></Button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </Table>
        </div>
    )
}
```

## Login.jsx

```
import './Login.css'
import { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Signin() {
    const navigate = useNavigate();
    const [users , setUsers] = useState(JSON.parse(localStorage.getItem('users')) || [])
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState({
        email: "",
        password: "",
        auth : ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let user = users.find(user=> user.email === data.email);
        if(!user) {
            setError(prev => ({...prev , auth:'User not found'}))
            console.log(error)
            return
        }
        if(validate(user)){ 
            if(user.password === data.password){
                localStorage.setItem('loggedIn', JSON.stringify(user))
                navigate('/')
            }else{
                setError(prev => ({...prev , auth:"Password doesn't match"}))
            }
        }
    }

    const validate = () => {
        const emailRegex = /^[A-Za-z0-9_%+-]+(?:\.[A-Za-z0-9_%+-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;;
        const error = {};
        if (!data?.email) error.email = "email required";
        if(data.email){
            if (!emailRegex.test(data?.email)) error.email = "not a valid email";
        }
        if (data.password.length < 8) error.password = "Password should be 8 or above characters";
        if(!data.password) error.password = 'Password Required'

        setError(error);
        return Object.keys(error).length === 0;
    };
    return (
        <section className='outbox d-flex justify-content-center align-items-center'>
            <Form onSubmit={(e) => handleSubmit(e)} className='box border form rounded m-2'>
                <h3 className='my-3'>Login</h3>
                <Form.Group className='form-group m-2 text-start'>
                    <Form.Label className='p-2'>Email</Form.Label>
                    <Form.Control  type='text' name='email' value={data.email} onChange={(e) => handleChange(e)} />
                    {error.email && <p className='text-danger'>{error.email}</p>}
                </Form.Group>
                <Form.Group className='form-group m-2 text-start'>
                    <Form.Label className='p-2'>Password</Form.Label>
                    <Form.Control type='password' name='password' value={data.password} onChange={(e) => handleChange(e)} />
                    {error.password && <p className='text-danger'>{error.password}</p>}
                </Form.Group>
                <Form.Group className='m-2'>
                    {error.auth && <p className='text-danger'>{error.auth}</p>}
                    <Button type='submit' className='w-100 btn btn-primary'>Submit</Button>
                    <Form.Text>New user? signin here <Link to='/signin'>here</Link></Form.Text>
                </Form.Group>
            </Form>
        </section>
    )
}
```
## login.css

```
.outbox {
    background: linear-gradient(90deg, #8e7dff 0%, #7dd3fc 100%);
    min-height: 100vh;
}

.box {
    background-color: white;
    width: 25%;
    height: fit-content;
}

@media screen and (width < 1024px) {
    .box {
        width: 50%;
    }
}

@media screen and (width < 768px) {
    .box {
        width: 100%;
    }
}
```

## Signin.jsx

```
import './Signin.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Form from 'react-bootstrap/Form';

export default function Signin() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [error, setError] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            console.log(users)
            users.push(data)
            localStorage.setItem('users', JSON.stringify(users))
            setData({
                name: "",
                email: "",
                password: ""
            })
            navigate('/login')
        }
    }
    const validate = () => {
       const emailRegex = /^[A-Za-z0-9_%+-]+(?:\.[A-Za-z0-9_%+-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;;
         const error = {};
        if (!data.name) error.name = "Name required";
        if (!data.email) error.email = "email required";
        if (!emailRegex.test(data.email)) error.email = "not a valid email";
        if (data.password.length < 8) error.password = "Password should be 8 or above characters";

        setError(error);
        console.log(error);
        return Object.keys(error).length === 0;
    };
    return (
        <section className='outbox d-flex justify-content-center align-items-center'>
            <Form onSubmit={(e) => handleSubmit(e)} className='box border form rounded m-2'>
                <h3 className='my-3'>Signin</h3>
                <Form.Group className='form-group m-2 text-start'>
                    <Form.Label className='p-2'>Name</Form.Label>
                    <Form.Control type='text' name='name' value={data.name} onChange={(e) => handleChange(e)} />
                    {error.name && <p className='text-danger'>{error.name}</p>}
                </Form.Group>
                <Form.Group className='form-group m-2 text-start'>
                    <Form.Label className='p-2'>Email</Form.Label>
                    <Form.Control type='text' name='email' value={data.email} onChange={(e) => handleChange(e)} />
                    {error.email && <p className='text-danger'>{error.email}</p>}
                </Form.Group>
                <Form.Group className='form-group m-2 text-start'>
                    <Form.Label className='p-2'>Password</Form.Label>
                    <Form.Control type='password' name='password' value={data.password} onChange={(e) => handleChange(e)} />
                    {error.password && <p className='text-danger'>{error.password}</p>}
                </Form.Group>
                <Form.Group className='m-2'>
                    <button type='submit' className='w-100 btn btn-primary'>Submit</button>
                    <Form.Text>Already signed up login here <Link to='/login'>here</Link></Form.Text>
                </Form.Group>
            </Form>
        </section>
    )
}
```
## Signin.css

```
.outbox {
    background: linear-gradient(90deg, #8e7dff 0%, #7dd3fc 100%);
    min-height: 100vh;
}

.box {
    background-color: white;
    width: 25%;
    height: fit-content;
}

@media screen and (width < 1024px) {
    .box {
        width: 50%;
    }
}

@media screen and (width < 768px) {
    .box {
        width: 100%;
    }
}
```

## header.jsx
```
import { FaUserCircle } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { HiOutlineMenu } from "react-icons/hi";
import { IconContext } from "react-icons";
import './Header.css'

import { useCart } from '../context/context'
import { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { reduceLength } from '../utils/len'

import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Dropdown from 'react-bootstrap/Dropdown';

function Header() {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const [creds, setCreds] = useState({})
    const { cart, setCart } = useCart()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const SubQty = (e, id) => {
        e.stopPropagation()
        setCart(prev =>
            prev.map(item => item.id == id ? item.qty > 1 ? { ...item, qty: item.qty -= 1 } : {} : item)
        )
    }

    const AddQty = (e, id) => {
        e.stopPropagation()
        setCart(prev =>
            prev.map(item => item.id == id ? { ...item, qty: item.qty += 1 } : item)
        )
    }
    const cartTotal = useMemo(() => {
        return cart.filter(item => item && Object.keys(item).length > 0).reduce((acc, item) => acc + item.price * item?.qty, 0).toFixed(2);
    }, [cart]);

    useEffect(() => {
        setCreds(JSON.parse(localStorage.getItem('loggedIn')) || {});
    }, [])

    console.log(cart)

    const logout = () => {
        localStorage.removeItem('loggedIn')
    }

    return <header className="d-flex px-4 p-3 justify-content-between border top">
        <div className="d-flex gap-2 align-items-center">
            <Button className='hamburger btn btn-light' onClick={handleShow}><HiOutlineMenu /></Button>
            <h2 className="mb-0 text-brand ">Z-com</h2>
            <ul className="list-unstyled m-3 text-none d-flex mb-0">
                <Link to="/" onClick={handleClose}><li className='w-100 p-2 text-start mb-0'>Home</li></Link>
                <Link to="/products" onClick={handleClose}><li className='w-100 p-2 text-start mb-0'>product</li></Link>
                <Link to="/cart" onClick={handleClose}><li className='w-100 p-2 text-start mb-0'>cart</li></Link>
            </ul>
        </div>


        <Offcanvas show={show} onHide={handleClose} className='bg-secondary'>
            <Offcanvas.Header closeButton>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ul className="list-unstyled m-3 text-none ">
                    <Link to="/" onClick={handleClose}><li className='w-100 p-2 text-start'>Home</li></Link>
                    <Link to="/products" onClick={handleClose}><li className='w-100 p-2 text-start mb-0'>product</li></Link>
                    <Link to="/cart" onClick={handleClose}><li className='w-100 p-2 text-start mb-0'>cart</li></Link>
                </ul>
            </Offcanvas.Body>
        </Offcanvas>
        <IconContext.Provider value={{ size: "2rem", color: "black", className: "global-className-name" }}>
            <div className="d-flex gap-3">
                <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic" className="d-flex align-items-center m-0 p-0 bg-transparent border-0">
                        <div>
                            <IoMdCart />
                            {creds?.name && <p className="mb-0 username">{creds.name}</p>}
                        </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{ width: "18rem" }}>
                        <h4 className="text-start p-2">Cart</h4>
                        {cart
                            .filter(item => item && Object.keys(item).length > 0)
                            .map(item => {
                                return <Dropdown.Item className="d-flex gap-2">
                                    <img src={item.image} width={"50px"} height={'50px'} style={{
                                        height: "50px",
                                        width: "50px",
                                        objectFit: "contain",
                                        objectPosition: "center",
                                        backgroundColor: "#f8f9fa"
                                    }} />
                                    <div className="w-100">
                                        <h6>{reduceLength(item?.title, 16)}</h6>
                                        <div className="d-flex justify-content-between">
                                            <p className="mb-0">x {item?.qty || 1}</p>
                                            <p className="mb-0">$ {item.price * item?.qty}</p>
                                            <div className="d-flex align-items-cenetr justify-content-center">
                                                <Button onClick={(e) => SubQty(e, item.id)}>-</Button>
                                                <p className="m-1">{item?.qty}</p>
                                                <Button onClick={(e) => AddQty(e, item.id)}>+</Button>
                                            </div>
                                        </div>
                                    </div>

                                </Dropdown.Item>
                            })}
                        <div className="w-100 d-flex justify-content-between">
                            <p className="m-2" >Total {cartTotal}</p>
                            <Button variant="primary" className="m-2" onClick={() => navigate('./cart')}>checkout</Button>
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic" className="d-flex align-items-center m-0 p-0 bg-transparent border-0">
                        <div>
                            <FaUserCircle />
                            {creds?.name && <p className="mb-0 username">{creds.name}</p>}
                        </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {creds?.name
                            ? <>
                                <Dropdown.Item href="/admin" >Admin Panel</Dropdown.Item>
                                <Dropdown.Item href="/login" onClick={() => logout()}>Logout</Dropdown.Item>
                            </>
                            : <>
                                <Dropdown.Item href="/signin">Signin</Dropdown.Item>
                                <Dropdown.Item href="/login">Login</Dropdown.Item>
                            </>
                        }
                    </Dropdown.Menu>
                </Dropdown>

            </div>
        </IconContext.Provider>
    </header >
}

export default Header
```
## header.css

```
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; 
  background-color: white;
}
@media screen and ( width > 768px) {
    .hamburger {
        display: none;
    }
}

.username{
    font-size: 12px;
}
```

## sidebar.jsx

```
import './Sidebar.css'
import { Link } from "react-router-dom"

function Sidebar() {
    return <aside className='border-end aside'>
        <ul className="list-unstyled m-3 text-brand">
            <Link to="/"><li className='w-100 p-2 text-start'>Home</li></Link>
        </ul>
    </aside>
}

export default Sidebar
```

## sidebar.css

```
aside {
    display: none;
    width: 200px;
    min-height: 100vh;
    background-color: white;
}

ul a {
    text-decoration: none;
    color: var(--brand);
    font-weight:500;
}

li {
    border-radius: 10px;
}

ul a:hover {
    color: white;

    li {
        background-color: var(--brand);
    }
}

@media screen and ( width > 768px) {
    aside {
        display: block;
         width: 200px;
    }
}
```
## footer.jsx

```
import React from 'react'
import { IoLocationOutline } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { CiMail } from "react-icons/ci";


function Footer() {
    return (
        <div className='brand-muted m-3'>
            <div className='d-flex flex-column flex-md-row w-100 justify-content-evenly'>
                <div>
                    <h3 className='text-black'>KNOW IT ALL FIRST!</h3>
                    <p>Same Day Delivery is Available Across Chennai.</p>
                </div>
                <div className='vr d-none d-md-block'></div>
                <div>
                    <input type="text" placeholder='Enter your Email' className='bg-light p-2 border-none me-1' />
                    <button className='brand-btn p-2'>Subscrile</button>
                </div>
            </div>
            <hr className='text-danger' />
            <div className='d-flex flex-column flex-md-row justify-content-evenly'>
                <div className='text-start'>
                    <p>
                        Order Fresh Cream Cake online and get them <br />Delivered Free. Serving in Bangalore,<br /> Chennai, Tiruvallur, Kancheepuram,<br /> Coimbatore, Madurai and Hyderabad and so<br /> on....
                    </p>
                </div>
                <div className='text-start'>
                    <h3 className='text-black'>Quick Links</h3>
                    <div className='row'>

                        <ul className='list-unstyled col-6'>
                            <li>Home</li>
                            <li> FAQ</li>
                            <li>Terms & Conditions</li>
                            <li>Refund Policy</li>
                            <li>Gallery</li>
                        </ul>
                        <ul className='list-unstyled col-6'>
                            <li> About</li>
                            <li> Store List</li>
                            <li> Privacy Policy</li>
                            <li> Delivery Policy</li>
                        </ul>
                    </div>
                </div>
                <div className='text-start'>
                    <h3 className='text-black'>store information</h3>
                    <div className='d-flex gap-2'>
                       <IoLocationOutline  className='m-1'/> <p>FB CAKES PRODUCTIONS,<br /> NO:22,SUDHARSAN NAGAR,<br />THIRUMULLAIVOYAL,<br />CHENNAI-600062,<br />TAMILNADU</p>
                    </div>
                     <div className='d-flex gap-2'>
                        <FaPhoneAlt className='m-1'/> <p>9003432888</p>
                    </div>
                     <div className='d-flex gap-2'>
                        <CiMail className='m-1' /> <p>Email Us:Support@fbcakes.com</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
```
## card 
```
import { Badge, Card, Button } from 'react-bootstrap'


import { useCart } from '../context/context'
import { reduceLength } from '../utils/len'


export default function ProductCard({ product }) {
    const { cart, setCart } = useCart()

    function AddCart(product) {
        setCart(prev => [{ ...product, price: Number(product.price), qty: 1 }, ...prev,])
    }
    return (
        <Card key={product.id} style={{ width: '14rem' }} className='text-start'>
            <Card.Img
                variant="top"
                src={product.image}
                style={{
                    height: "200px",
                    width: "100%",
                    objectFit: "contain",
                    objectPosition: "center",
                    backgroundColor: "#f8f9fa"
                }}
            />

            <Card.Body className='d-flex flex-column justify-content-between'>
                <div>
                    <Card.Title style={{ fontSize: "20px" }}>{reduceLength(product.title, 24)}</Card.Title>
                    <Badge bg="success">{product.category}</Badge>
                </div>
                <div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <Card.Text className='mb-0'>
                            $ {product.price}
                        </Card.Text>
                        <Button variant="primary" onClick={() => AddCart(product)}>Add to Cart</Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}
```



