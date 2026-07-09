const categories = ['All snippets', 'Commands', 'Components', 'Pages', 'Layout', 'Utilities']

export const snippets = [
    {
        id: 'package-installation',
        title: 'Common Packages which we need ',
        language: 'shell',
        category: 'Commands',
        description: 'Use this to install all mandatory packages ',
        code: `npm install react-bootstrap bootstrap react-router-dom react-icons `,
    },
    {
        id: 'font-initial-css',
        title: 'Font Initial Css',
        language: 'CSS',
        category: 'Layout',
        description: 'Font Initial Css font custom brand btn',
        code: ` 
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  --brand : var(--bs-primary);
  --sans: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --heading: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --mono: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
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
`,
    },
    {
        id: 'router-setup',
        title: 'Router setup',
        language: 'JavaScript',
        category: 'Layout',
        description: 'Router setup with react router dom',
        code: `
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

export default App`,
    },
    {
        id: 'Context API',
        title: 'Context API',
        language: 'JavaScript',
        category: 'Utilities',
        description: 'Context API',
        code: `
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
`,
    },
    {
        id: 'Signin',
        title: 'Signin module',
        language: 'JavaScript',
        category: 'Auth',
        description: 'Signin module',
        code: `import './Signin.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

import Form from 'react-bootstrap/Form';

export default function Signin() {
    const navigate = useNavigate();

    const [showPw, setShowPw] = useState(false)
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
            [name]: name == 'email' || name == 'password' ? value.trim() : value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            let users = JSON.parse(localStorage.getItem('auth')) || [];
            console.log(users)
            users.push(data)
            localStorage.setItem('auth', JSON.stringify(users))
            setData({
                name: "",
                email: "",
                password: ""
            })
            navigate('/')
        }
    }
    const validate = () => {
        const emailRegex = /^[A-Za-z0-9_%+-]+(?:\.[A-Za-z0-9_%+-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;;
        const error = {};
        if (!data.name || !data.name.trim()) error.name = "Name required";
        if (!data.email || !data.name.trim()) {
            error.email = "Email required"
        } else if (!emailRegex.test(data.email)) {
            error.email = "not a valid email";
        }
        if (!data.password || !data.password.trim()) {
            error.password = 'Password required'
        } else if (data.password.length < 8) {
            error.password = "Password should be 8 or above characters";
        }

        setError(error);
        console.log(error);
        return Object.keys(error).length === 0;
    };
    return (
        <section className='outbox d-flex justify-content-center align-items-center'>
            <Form onSubmit={(e) => handleSubmit(e)} className='box border form rounded m-2 text-start'>
                <h3 className='my-3 text-center'>Signin</h3>
                <Form.Group className='form-group m-2 text-start'>
                    <Form.Label className='p-2'>Name</Form.Label>
                    <Form.Control type='text' name='name' value={data.name} onChange={(e) => handleChange(e)} />
                </Form.Group>
                    {error.name && <p className='text-danger ms-2'>{error.name}</p>}
                <Form.Group className='form-group m-2 text-start'>
                    <Form.Label className='p-2'>Email</Form.Label>
                    <Form.Control type='text' name='email' value={data.email} onChange={(e) => handleChange(e)} />
                </Form.Group>
                    {error.email && <p className='text-danger ms-2'>{error.email}</p>}
                <Form.Group className='form-group m-2 text-start position-relative'>
                    <Form.Label className='p-2'>Password</Form.Label>
                    <Form.Control type={showPw ? 'text' : 'password'} name='password' value={data.password} onChange={(e) => handleChange(e)} />
                    { showPw ? <FaEyeSlash onClick={()=>setShowPw(!showPw)} className='position-absolute' style={{right:"10px", bottom:'10px'}}/>
                        : <FaEye onClick={()=>setShowPw(!showPw)} className='position-absolute' style={{right:"10px", bottom:'10px'}}/>
                    }
                </Form.Group>
                    {error.password && <p className='text-danger ms-2'>{error.password}</p>}
                <Form.Group className='m-2'>
                    <button type='submit' className='w-100 btn btn-primary'>Submit</button>
                    <Form.Text>Already signed up login here <Link to='/'>here</Link></Form.Text>
                </Form.Group>
            </Form>
        </section>
    )
}`,
    },
    {
        id: 'Signin css',
        title: 'Signin module css',
        language: 'CSS',
        category: 'Auth',
        description: 'Signin module css',
        code: `
        .outbox {
    background: linear-gradient(90deg, #7dff9d 0%, #7dfce7 100%);
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
}`,
    },
    {
        id: 'Login',
        title: 'Login Module',
        language: 'JavaScript',
        category: 'Auth',
        description: 'Login with LocalStorage',
        code: `import './Login.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

export default function Login() {
    const navigate = useNavigate();
    const [showPw, setShowPw] = useState(false)
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('auth')) || [])
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState({
        email: "",
        password: "",
        auth: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: value.trim()
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let user = users.find(user => user.email === data.email);
        if (validate()) {
            if (!user) {
                setError(prev => ({ ...prev, auth: 'User not found' }))
                console.log(error)
                return
            }

            if (user.password === data.password) {
                localStorage.setItem('loggedIn', JSON.stringify(user))
                navigate('/home')
            } else {
                setError(prev => ({ ...prev, auth: "Password doesn't match" }))
            }
        }
    }

    const validate = () => {
        const emailRegex = /^[A-Za-z0-9_%+-]+(?:\.[A-Za-z0-9_%+-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;;
        const error = {};
        if (!data.email || !data.email.trim()) {
            error.email = "Email required"
        } else if (!emailRegex.test(data.email)) {
            error.email = "not a valid email";
        }
        if (!data.password || !data.password.trim()) {
            error.password = 'Password required'
        } else if (data.password.length < 8) {
            error.password = "Password should be 8 or above characters";
        }

        setError(error);
        return Object.keys(error).length === 0;
    };
    return (
        <section className='outbox d-flex justify-content-center align-items-center'>
            <Form onSubmit={(e) => handleSubmit(e)} className='box border form rounded m-2 text-start'>
                <h3 className='my-3 text-center'>Login</h3>
                <Form.Group className='form-group m-2 text-start'>
                    <Form.Label className='p-2'>Email</Form.Label>
                    <Form.Control type='text' name='email' value={data.email} onChange={(e) => handleChange(e)} />
                </Form.Group>
                    {error.email && <p className='text-danger ms-2'>{error.email}</p>}
                <Form.Group className='form-group m-2 text-start position-relative'>
                    <Form.Label className='p-2'>Password</Form.Label>
                    <Form.Control type={showPw ? 'text' : 'password'} name='password' value={data.password} onChange={(e) => handleChange(e)} />
                    {showPw ? <FaEyeSlash onClick={() => setShowPw(!showPw)} className='position-absolute' style={{ right: "10px", bottom: '10px' }} />
                        : <FaEye onClick={() => setShowPw(!showPw)} className='position-absolute' style={{ right: "10px", bottom: '10px' }} />
                    }
                </Form.Group>
                    {error.password && <p className='text-danger ms-2'>{error.password}</p>}
                <Form.Group className='m-2 text-center'>
                    {error.auth && <p className='text-danger'>{error.auth}</p>}
                    <Button type='submit' className='w-100 btn btn-primary'>Submit</Button>
                    <Form.Text >New user? signin <Link to='/signin'>here</Link></Form.Text>
                </Form.Group>
            </Form>
        </section>
    )
}`,
    },
    {
        id: 'Login css',
        title: 'Login css Module',
        language: 'CSS',
        category: 'Auth',
        description: 'Login css',
        code: `.outbox {
    background: linear-gradient(90deg, #7dff9d 0%, #7dfce7 100%);
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
}`,
    },
    {
        id: 'form',
        title: 'Form',
        language: 'JavaScript',
        category: 'Pages',
        description: 'Form with state maintendance',
        code: `
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
}`,
    },
    {
        id: 'table-crud-ops',
        title: 'Table Crud Ops',
        language: 'React',
        category: 'Pages',
        description: 'Table with crud serach adv-search pagination',
        code: `
import { Table, Modal, Form, Button, Badge, Pagination, Dropdown, Collapse } from 'react-bootstrap'
import { BiSolidEdit } from "react-icons/bi";
import { FaPlusCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { toast } from 'react-toastify'
import { CiSearch } from "react-icons/ci";
import { GoStack } from "react-icons/go";

import { useState, useEffect } from 'react'
import { useProduct } from '../context/context'
import { useNavigate } from 'react-router-dom';

import { reduceLength } from '../utils/len'

export default function TableProd() {

    const navigate = useNavigate()
    const { products, setProducts } = useProduct();
    const [category, setCategory] = useState([])

    const [showId, setShowId] = useState(0)
    const [edit, setEdit] = useState(0);
    const [delId, setDelId] = useState(0);

    const [show, setShow] = useState(false);
    const [showCreate, setShowCreate] = useState(0)
    const [showDel, setShowDel] = useState(false);
    const [showOpen, setShowOpen] = useState(false);

    const [active, setActive] = useState(0)
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(5);
    // const [perPage , setPerPage] = useState(5)

    const [search, setSearch] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products)
    const [searchProd, setSearchProd] = useState({
        title: "",
        brand: "",
        category: "",
        price: ""
    })
    const [advShow, setAdvShow] = useState(false);


    const [count, setCount] = useState(Number(JSON.parse(localStorage.getItem('count'))) || 30);
    const [newProduct, setNewProduct] = useState({
        id: "",
        images: [],
        title: "",
        brand: "",
        category: "",
        stock: "",
        price: ""
    })


    const [product, setProduct] = useState({
        id: "",
        images: [],
        title: "",
        brand: "",
        category: "",
        stock: "",
        price: ""
    })

    const [error, setError] = useState({
        id: "",
        images: [],
        title: "",
        brand: "",
        category: "",
        stock: "",
        price: ""
    })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCreateClose = () => setShowCreate(false);
    const handleCreateOpen = () => setShowCreate(true);

    const handleDelClose = () => setShowDel(false);
    const handleDelShow = () => setShowDel(true);

    const handleAdvChange = (e) => {
        setSearchProd(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleAdvSearch = (e) => {
        e.preventDefault();
        setFilteredProducts(products)
        setFilteredProducts(prev =>
            prev.filter(item => {
                return Object.keys(searchProd).every(key => {
                    const query = searchProd[key].trim().toLowerCase();
                    if (!query) return true;

                    const value = item[key] ? item[key].toString().toLowerCase() : "";
                    return value.includes(query);
                });
            })
        );
    };

    const resetAdv = () => {
        setFilteredProducts(products);
        setSearchProd({
            title: "",
            brand: "",
            category: "",
            price: ""
        })
    }

    const handleOpenClose = () => {
        setShowOpen(false);
        setProduct({
            id: "",
            images: [],
            title: "",
            brand: "",
            category: "",
            stock: "",
            price: ""
        })
    }
    const handleOpenShow = () => setShowOpen(true);

    const openShowModel = (id) => {
        setShowId(id)
        handleOpenShow()
        const product = products.find(product => product.id === id);
        setProduct(product)
    }
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

    const handleSearch = () => {
        if (search.length == 0) {
            setFilteredProducts(products)
        } else {
            setFilteredProducts(products)
            setFilteredProducts(prev =>
                prev.filter(item => Object.values(item).join('').toLowerCase().includes(search.toLowerCase()))
            )
        }
    }

    const handleDelete = () => {
        console.log(delId)
        setProducts(prev =>
            prev.filter(item => Number(item.id) != Number(delId))
        )

        setProduct({
            id: "",
            images: [],
            title: "",
            brand: "",
            category: "",
            stock: "",
            price: ""
        })
        setDelId(0);
        handleDelClose()
        toast.success('Product deleted successfully');
    }
    const handleChange = (e) => {
        setProduct(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleNewChange = (e) => {
        const { name, value } = e.target;

        if (name === 'images') {
            setNewProduct(prev => {
                return ({
                    ...prev,
                    images: [value]
                })
            }
            );
        } else {
            setNewProduct(prev => ({ ...prev, [name]: value }));
        }

    }
    const handleNewSubmit = (e) => {
        e.preventDefault()
        if (newValidate()) {
            console.log(newProduct)
            setProducts(prev => {
                return [newProduct, ...prev]
            })
            setCount(count + 1);
            setNewProduct({
                id: "",
                images: [],
                title: "",
                brand: "",
                category: "",
                stock: "",
                price: ""
            })
            handleCreateClose()
            toast.success('Product created successfully');
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(edit)
        console.log(product)
        if (validate()) {
            setProducts(prev =>
                prev.map(item =>
                    item.id === edit ? { ...item, ...product } : item
                )
            )

            setProduct({
                id: "",
                images: [],
                title: "",
                brand: "",
                category: "",
                stock: "",
                price: ""
            })
            handleClose()
            toast.success('Product updated successfully');
        }
    }
    const newValidate = () => {
        const error = {};
        const isEmpty = (value) => !value || value.trim() === "";
        const isTooShort = (value, minLength = 2) => value && value.trim().length < minLength;

        if (isEmpty(newProduct.title)) {
            error.title = "title required";
        } else if (isTooShort(newProduct.title)) {
            error.title = "Name must be at least 2 characters";
        }
        if (isEmpty(newProduct.images[0])) {
            error.image = "image url required";
        }

        if (isEmpty(newProduct.brand)) {
            error.brand = "brand required";

        }
        if (isEmpty(newProduct.stock)) {
            error.stock = "stock required";

        }
        if (isEmpty(newProduct.price)) {
            error.price = "price required";

        }
        if (isEmpty(newProduct.category)) {
            error.category = "Category required";
        }
        setError(error);
        return Object.keys(error).length === 0;
    }

    const validate = () => {
        const error = {};
        const isEmpty = (value) => !value
        const isTooShort = (value, minLength = 2) => value && value.trim().length < minLength;

        if (isEmpty(product.title)) {
            error.title = "title required";
        } else if (isTooShort(product.title)) {
            error.title = "title required";
        }
        if (isEmpty(product.images[0])) {
            error.image = "image url required";
        }

        if (isEmpty(product.brand)) {
            error.brand = "brand required";

        }
        if (isEmpty(product.stock)) {
            error.stock = "stock required";

        }
        if (isEmpty(product.price)) {
            error.price = "price required";

        }
        if (isEmpty(product.category)) {
            error.category = "Category required";
        }
        setError(error);
        return Object.keys(error).length === 0;
    }
    useEffect(() => {
        fetch('https://dummyjson.com/products/category-list')
            .then(res => res.json())
            .then(res => setCategory(res));
    }, [])

    useEffect(() => {
        (count != 30) && localStorage.setItem('count', count.toString())
    }, [count]);

    useEffect(() => {
        handleSearch()
    }, [search])

    useEffect(() => {
        setNewProduct(prev => ({ ...prev, id: (count + 1) }))
    }, [])

    useEffect(()=>{
        setFilteredProducts(products)  
    },[products])

    return (
        <div className='w-100 m-3 text-start'>
            <div className='d-flex justify-content-between mb-4'>
                <div className='d-flex gap-4'>
                    <div className='position-relative'>
                        <CiSearch className='position-absolute' style={{ left: "8px", top: '23px' }} />
                        <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} className='form-control rounded ps-4 my-2' placeholder='search' />
                    </div>
                    <Button variant="primary" className='m-2 cus-ani' onClick={() => setAdvShow(!advShow)}>
                        <div className='d-flex gap-2'>
                            <GoStack className='m-1' /> AdvanceSearch
                        </div>
                    </Button>
                </div>
            </div>
            <Collapse in={advShow}>
                <div className='border rounded-3 my-4 p-2 text-start '>
                    <Form onSubmit={(e) => handleAdvSearch(e)}>
                        <Form.Group className='row py-2'>
                            {/* <Form.Group className='form-group col-12 col-md-2'>
                                        <Form.Label className='mb-2'>user ID</Form.Label>
                                        <Form.Control type='number' name='id' value={searchProd.id} onChange={(e) => handleAdvChange(e)} />
                                    </Form.Group> */}
                            <Form.Group className='form-group col-12 col-md-2'>
                                <Form.Label className='mb-2'>Title</Form.Label>
                                <Form.Control type='text' name='title' value={searchProd.title} onChange={(e) => handleAdvChange(e)} />
                            </Form.Group>
                            <Form.Group className='form-group col-12 col-md-2'>
                                <Form.Label className='mb-2'>Category</Form.Label>
                                <Form.Control type='text' name='category' value={searchProd.category} onChange={(e) => handleAdvChange(e)} />
                            </Form.Group>
                            <Form.Group className='form-group col-12 col-md-2'>
                                <Form.Label className='mb-2'>Brand</Form.Label>
                                <Form.Control type='text' name='brand' value={searchProd.brand} onChange={(e) => handleAdvChange(e)} />
                            </Form.Group>
                            <Form.Group className='form-group col-12 col-md-2'>
                                <Form.Label className='mb-2'>Price</Form.Label>
                                <Form.Control type='number' name='price' value={searchProd.price} onChange={(e) => handleAdvChange(e)} />
                            </Form.Group>
                            <Form.Group className='form-group col-12 col-md-2'>
                                <div className='d-flex h-100 justify-content-center align-items-end'>
                                    <Button variant="secondary" className='mx-2' type='button' onClick={() => resetAdv()}>
                                        Reset
                                    </Button>
                                    <div className='position-relative'>
                                        <CiSearch className='position-absolute text-white' style={{ left: "16px", top: '12px' }} />
                                        <Button variant="success" className='mx-2 ps-4' type='submit'>Search</Button>
                                    </div>
                                </div>

                            </Form.Group>
                        </Form.Group>
                    </Form>
                </div>
            </Collapse>


            <Button onClick={() => handleCreateOpen()} className='m-2 d-flex gap-2'><FaPlusCircle className="m-1" />Add New Product</Button>
            {/* show model */}
            <Modal size="xl" show={showOpen} onHide={handleOpenClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{product.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex gap-2'>
                    <div className='w-50 d-flex flex-wrap'>
                        {product?.images?.map(item => {
                            return < img src={item} className='w-50 border'
                                style={{
                                    height: "200px",
                                    width: "100%",
                                    objectFit: "contain",
                                    objectPosition: "center",
                                    backgroundColor: "#f8f9fa"
                                }}
                            />
                        })}
                    </div>
                    <div className='text-start'>
                        <h3>{product.title}</h3>
                        <p>Brand : {product.brand}</p>
                        <Badge>{product.category}</Badge>
                        <p>Left : {product.stock}</p>
                        <p>$ {product.price}</p>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Create model */}
            <Modal size="xl" show={showCreate} onHide={handleCreateClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="text-start" onSubmit={(e) => handleNewSubmit(e)}>
                        <div className="row w-100 mb-3">
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Product Id</label>
                                <input name='id' type="number" className="form-control rounded-pill w-100 p-2" value={newProduct.id} onChange={(e) => handleNewChange(e)} />
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Product title</label>
                                <input type="title" name="title" className="form-control rounded-pill w-100 p-2" value={newProduct.title} onChange={(e) => handleNewChange(e)} />
                                {error.title && <p className="text-danger">{error.title}</p>}
                            </div>
                        </div>
                        <div className="row w-100 mb-3">
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Product Image</label>
                                <input type="text" name='images' className="form-control rounded-pill w-100 p-2" value={newProduct.images} onChange={(e) => handleNewChange(e)} />
                                {error.image && <p className="text-danger">{error.image}</p>}
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Product Brand</label>
                                <select name='category' className="form-select rounded-pill w-100 p-2" value={newProduct.category} onChange={(e) => handleNewChange(e)}>
                                    <option value="">Select Category</option>
                                    {category.map(cat => {
                                        return <option value={cat}>{cat}</option>
                                    })}
                                </select>
                                {error.category && <p className="text-danger">{error.category}</p>}
                            </div>
                        </div>
                        <div className="row w-100 mb-3">
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Brand</label>
                                <input type="text" name="brand" className="form-control rounded-pill w-100 p-2" value={newProduct.brand} onChange={(e) => handleNewChange(e)} />
                                {error.brand && <p className="text-danger">{error.brand}</p>}
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Price</label>
                                <input type="number" name='price' className="form-control rounded-pill w-100 p-2" value={newProduct.price} onChange={(e) => handleNewChange(e)} />
                                {error.price && <p className="text-danger">{error.price}</p>}
                            </div>
                        </div>
                        <div className="row w-100 mb-3">
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Stocks</label>
                                <input type="number" name='stock' className="form-control rounded-pill w-100 p-2" value={newProduct.stock} onChange={(e) => handleNewChange(e)} />
                                {error.stock && <p className="text-danger">{error.stock}</p>}
                            </div>
                        </div>
                        <div>
                            <button className="btn border rounded-pill px-5">Reset</button>
                            <button className="btn btn-primary rounded-pill px-5" type="submit">Save</button>
                        </div>
                    </Form>

                </Modal.Body>
            </Modal>

            {/* Edit model */}
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
                                <input type="text" name="title" className="form-control rounded-pill w-100 p-2" value={product.title} onChange={(e) => handleChange(e)} />
                                {error.title && <p className="text-danger">{error.title}</p>}
                            </div>
                        </div>
                        <div className="row w-100 mb-3">
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Product Image</label>
                                <input type="text" name='images' className="form-control rounded-pill w-100 p-2" value={product.images[0]} onChange={(e) => handleChange(e)} />
                                {error.image && <p className="text-danger">{error.image}</p>}
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Product Brand</label>
                                <select name='category' className="form-select rounded-pill w-100 p-2" value={product.category} onChange={(e) => handleChange(e)}>
                                    <option value="">Select Category</option>
                                    {category.map(cat => {
                                        return <option value={cat}>{cat}</option>
                                    })}
                                </select>
                                {error.category && <p className="text-danger">{error.category}</p>}
                            </div>
                        </div>
                        <div className="row w-100 mb-3">
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Brand</label>
                                <input type="text" name="brand" className="form-control rounded-pill w-100 p-2" value={product.brand} onChange={(e) => handleChange(e)} />
                                {error.brand && <p className="text-danger">{error.brand}</p>}
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Price</label>
                                <input type="number" name='price' className="form-control rounded-pill w-100 p-2" value={product.price} onChange={(e) => handleChange(e)} />
                                {error.price && <p className="text-danger">{error.price}</p>}
                            </div>
                        </div>
                        <div className="row w-100 mb-3">
                            <div className="form-group col-12 col-md-6">
                                <label className="p-2">Stocks</label>
                                <input type="number" name='stock' className="form-control rounded-pill w-100 p-2" value={product.stock} onChange={(e) => handleChange(e)} />
                                {error.stock && <p className="text-danger">{error.stock}</p>}
                            </div>
                        </div>
                        <div>
                            <button className="btn border rounded-pill px-5">Reset</button>
                            <button className="btn btn-primary rounded-pill px-5" type="submit">Save</button>
                        </div>
                    </Form>

                </Modal.Body>
            </Modal>
            {/* delete model */}
            <Modal size="xl" show={showDel} onHide={handleDelClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure , you wanna delete this</Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex gap-2'>
                    <img src={product?.images[0]} className='w-50' style={{
                        height: "500px",
                        width: "100%",
                        objectFit: "contain",
                        objectPosition: "center",
                        backgroundColor: "#f8f9fa"
                    }} />
                    <div className='text-start'>
                        <h3>{product.title}</h3>
                        <p>Brand : {product.brand}</p>
                        <Badge>{product.category}</Badge>
                        <p>Left : {product.stock}</p>
                        <p>$ {product.price}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary">Cancel</Button>
                    <Button variant="danger" onClick={() => handleDelete()}>Delete</Button>
                </Modal.Footer>
            </Modal>

            <Table bordered hover >
                <thead className='bg-primary text-white'>
                    <tr>
                        {/* {id,images,title,brand,category,stock,price} */}
                        <th >id</th>
                        <th>images</th>
                        <th>title</th>
                        {/* <th>category</th>
                        <th>brand</th> */}
                        <th>stock</th>
                        <th>price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {userData?.length > 0 ? userData?.map((user, i) => { */}
                    {filteredProducts?.length > 0 ? filteredProducts.map(((product, i) => {
                        return i >= offset && i < limit ? <tr key={product.id}>
                            <td>{product.id}</td>
                            <td style={{ width: "200px", height: "100px" }} ><img src={product?.images[0]} style={{
                                height: "200px",
                                width: "100%",
                                objectFit: "contain",
                                objectPosition: "center",
                                backgroundColor: "#f8f9fa"
                            }} /></td>
                            <td>{reduceLength(product.title, 34)}</td>
                            {/* <td>{product.category}</td>
                            <td style={{ width: "500px" }}>{product.brand}</td> */}
                            <td>{product.stock}</td>
                            <td>$ {product.price}</td>
                            <td>
                                <Button className='bg-success text-white m-2' onClick={() => openShowModel(product.id)}><FaEye /></Button>
                                <Button className='bg-warning text-white m-2' onClick={() => openEditModel(product.id)}><BiSolidEdit /></Button>
                                <Button className='btn-danger m-2' onClick={() => openDeleteModel(product.id)}><MdDelete /></Button>
                            </td>
                        </tr> : ""
                    })) : <tr><td colSpan={6}>No Data Found</td></tr>
                    }
                </tbody>
            </Table>
            <section className='w-100 d-flex justify-content-end gap-3'>
                {/* <Dropdown className='m-2'>
                    <Dropdown.Toggle variant="light" id="dropdown-basic" className="d-flex align-items-center m-0 p-0 bg-transparent border-0">
                        Items per page : {limit}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                         <Dropdown.Item onClick={() => setLimit(5)}>5</Dropdown.Item>
                         <Dropdown.Item onClick={() => setLimit(10)}>10</Dropdown.Item>
                         <Dropdown.Item onClick={() => setLimit(15)}>15</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> */}
                <Pagination>
                    {Array.from({ length: Math.ceil(filteredProducts?.length / 5) }).map((_, i) => {
                        const pageNumber = i;
                        return (
                            <Pagination.Item
                                key={pageNumber}
                                active={pageNumber === active}
                                onClick={() => {
                                    setOffset(pageNumber * 5)
                                    setLimit((pageNumber * 5) + 5)
                                    setActive(pageNumber)
                                }
                                }
                            >
                                {pageNumber + 1}
                            </Pagination.Item>
                        );
                    })}
                </Pagination>
            </section>
        </div>
    )
}
    `
    },

    {
        id: 'Header',
        title: 'Header with hamburger menu and avatar',
        language: 'JavaScript',
        category: 'Components',
        description: 'Header with hamburger menu and avatar',
        code: `
import { FaUserCircle } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { HiOutlineMenu } from "react-icons/hi";
import { IconContext } from "react-icons";
import './Header.css'

// import { useCart } from '../context/context'
import { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from "react-router-dom";
// import { reduceLength } from '../utils/len'

import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Dropdown from 'react-bootstrap/Dropdown';

function Header() {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const [creds, setCreds] = useState({})
    // const { cart, setCart } = useCart()
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
    // const cartTotal = useMemo(() => {
    //     return cart.filter(item => item && Object.keys(item).length > 0).reduce((acc, item) => acc + item.price * item?.qty, 0).toFixed(2);
    // }, [cart]);

    useEffect(() => {
        setCreds(JSON.parse(localStorage.getItem('loggedIn')) || {});
    }, [])

    const logout = () => {
        localStorage.removeItem('loggedIn')
    }

    return <header className="d-flex px-4 p-3 justify-content-between border top">
        <div className="d-flex gap-2 align-items-center">
            <Button className='hamburger btn btn-light' onClick={handleShow}><HiOutlineMenu /></Button>
            <h2 className="mb-0 text-brand ">Admin console</h2>
        </div>


        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ul className="list-unstyled m-3 text-none ">
                    <Link to="/home" onClick={()=>handleClose()}><li className='w-100 p-2 text-start'>Home</li></Link>
                    <Link to="/home/users" onClick={()=>handleClose()}><li className='w-100 p-2 text-start'>Users</li></Link>
                    <Link to="/home/products" onClick={()=>handleClose()}><li className='w-100 p-2 text-start'>Products</li></Link>
                </ul>
            </Offcanvas.Body>
        </Offcanvas>
        <IconContext.Provider value={{ size: "2rem", color: "black", className: "global-className-name" }}>
            <div>

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
                                <Dropdown.Item href="/" onClick={() => logout()}>Logout</Dropdown.Item>
                            </>
                            : <>
                                <Dropdown.Item href="/signin">Signin</Dropdown.Item>
                                <Dropdown.Item href="/">Login</Dropdown.Item>
                            </>
                        }
                    </Dropdown.Menu>
                </Dropdown>

            </div>
        </IconContext.Provider>
    </header >
}

export default Header
`,
    },

    {
        id: 'Header css',
        title: 'Header with hamburger menu and avatar',
        language: 'CSS',
        category: 'Components',
        description: 'Header with hamburger menu and avatar',
        code: `
@media screen and ( width > 768px) {
    .hamburger {
        display: none;
    }
}

.username{
    font-size: 12px;
}`,
    },

    {
        id: 'Sidebar',
        title: 'Sidebar',
        language: 'JavaScript',
        category: 'Components',
        description: 'Sidebar with nav items',
        code: `
import './SideBar.css'
import { Link } from "react-router-dom"

function Sidebar() {
    return <aside className='border-end aside'>
        <ul className="list-unstyled m-3 text-brand">
            <Link to="/home"><li className='w-100 p-2 text-start'>Home</li></Link>
            <Link to="/home/users"><li className='w-100 p-2 text-start'>Users</li></Link>
            <Link to="/home/products"><li className='w-100 p-2 text-start'>Products</li></Link>
        </ul>
    </aside>
}

export default Sidebar
`,
    },
    {
        id: 'Sidebar css',
        title: 'Sidebar css',
        language: 'CSS',
        category: 'Components',
        description: 'Sidebar with nav items css',
        code: `
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
    `,
    },
    {
        id: 'Footer',
        title: 'Footer',
        language: 'JavaScript',
        category: 'Components',
        description: 'Footer',
        code: `

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
  `,
    },
     {
        id: 'Cart',
        title: 'Cart',
        language: 'JavaScript',
        category: 'Components',
        description: 'Cart',
        code: `

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
    `,
    },

]