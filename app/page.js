"use client"
import Header from '@/components/Header'
import Image from 'next/image'
import { useState, useEffect } from 'react'


export default function Home() {
  const [productForm, setProductForm] = useState({})
  const [products, setProducts] = useState([])
@@ -12,25 +13,24 @@ export default function Home() {
  const [loadingaction, setLoadingaction] = useState(false)
  const [dropdown, setDropdown] = useState([])


  useEffect(() => {
    // Fetch products on load 
    const fetchProducts = async () => {
      const response = await fetch('/api/product')
      let rjson = await response.json()
      setProducts(rjson.products)
    }
    fetchProducts()

  }, [])


  const buttonAction = async (action, slug, initialQuantity) => {
    // Immediately change the quantity of the product with given slug in Products
    let index = products.findIndex((item) => item.slug == slug)
    console.log(index)
    let newProducts = JSON.parse(JSON.stringify(products))
    if (action == "plus") {
      newProducts[index].quantity = parseInt(initialQuantity) + 1
      console.log(newProducts[index].quantity)
    }
    else {
      newProducts[index].quantity = parseInt(initialQuantity) - 1
@@ -39,18 +39,15 @@ export default function Home() {

    // Immediately change the quantity of the product with given slug in Dropdown
    let indexdrop = dropdown.findIndex((item) => item.slug == slug)
    console.log(indexdrop, "parse")
    let newDropdown = JSON.parse(JSON.stringify(dropdown))
    if (action == "plus") {
      newDropdown[indexdrop].quantity = parseInt(initialQuantity) + 1
      console.log(newDropdown[indexdrop].quantity)
    }
    else {
      newDropdown[indexdrop].quantity = parseInt(initialQuantity) - 1
    }
    setDropdown(newDropdown)

    console.log(action, slug)
    setLoadingaction(true)
    const response = await fetch('/api/action', {
      method: 'POST',
@@ -60,7 +57,6 @@ export default function Home() {
      body: JSON.stringify({ action, slug, initialQuantity })
    });
    let r = await response.json()
    console.log(r)
    setLoadingaction(false)
  }

@@ -76,7 +72,6 @@ export default function Home() {

      if (response.ok) {
        // Product added successfully
        console.log('Product added successfully');
        setAlert("Your Product has been added!")
        setProductForm({})
      } else {
@@ -97,19 +92,19 @@ export default function Home() {
    setProductForm({ ...productForm, [e.target.name]: e.target.value })
  }

  const onDropdownEdit = async (e) => { 
  const onDropdownEdit = async (e) => {
    let value = e.target.value
    setQuery(value) 
    setQuery(value)
    if (value.length > 3) {
      setLoading(true)
      setDropdown([])
      const response = await fetch('/api/search?query=' + query)
      let rjson = await response.json() 
      let rjson = await response.json()
      setDropdown(rjson.products)
      setLoading(false)
    }
    else {  
        setDropdown([]) 
    else {
      setDropdown([])
    }
  }

@@ -128,12 +123,7 @@ export default function Home() {
            {/* Add more options as needed */}
          </select>
        </div>
        {loading && <div className='flex justify-center items-center'> <svg fill="#000000" height="180px" width="180px" version="1.1" id="Layer_1" viewBox="0 0 330 330" >
          <circle className="spinner-path" cx="25" cy="25" r="20" fill="none" strokeWidth="4" stroke="#000" strokeDasharray="31.415, 31.415" strokeDashoffset="0">
            <animate attributeName="strokeDashoffset" repeatCount="indefinite" dur="1.5s" from="0" to="62.83" />
            <animate attributeName="strokeDasharray" repeatCount="indefinite" dur="1.5s" values="31.415, 31.415; 0, 62.83; 31.415, 31.415" />
          </circle>
        </svg> </div>
        {loading && <div className='flex justify-center items-center'> <img width={74} src="/loading.svg" alt="" /> </div>
        }
        <div className="dropcontainer absolute w-[72vw] border-1 bg-purple-100 rounded-md ">

@@ -192,7 +182,6 @@ export default function Home() {
            </tr>
          </thead>
          <tbody>
            {/* Sample data */}
            {products.map(product => {
              return <tr key={product.slug}>
                <td className="border px-4 py-2">{product.slug}</td>
@@ -201,12 +190,9 @@ export default function Home() {
              </tr>
            })}

            {/* Add more rows for each product in your stock */}
          </tbody>
        </table>



      </div>
    </>
  )