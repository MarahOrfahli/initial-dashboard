import { apiClient, formDataApiClient } from '..'
let apiurl = ''
let apiOne = 'https://api.mightcinema.com/api/' // Object for test
let apiUrlCode = apiOne
// Complete the API Url by using APIURL Method....
function APIURL(dname: string, type = 'List', num = 0) {
  switch (dname) {
    /////////////  Store ////////////////
    case 'Store': {
      if (type == 'GET' || type == 'Create') {
        apiurl = 'warehouses'
      } else if (num != 0) {
        apiurl = `warehouses/${num}`
      }
      return apiurl
      break
    }
    // Cities & Areas //////////////////////
    case 'City': {
      if (type == 'GET' || type == 'Create') {
        apiurl = 'cities'
      } else if ( num != 0) {
        apiurl = `cities/${num}`
      }
      return apiurl
      break
    }
    case 'Region': {
      if (type == 'GET' || type == 'Create') {
        apiurl = 'areas'
      } else if (type == 'Edit' && num != 0) {
        apiurl = `areas/${num}`
      } else if (type == 'Delete' && num != 0) {
        apiurl = `areas/${num}`
      } else if (type == 'GET-byCities' && num != 0) { // 'GET-byCities'
        apiurl = `cities/${num}/areas`
      }
      return apiurl
      break
    }
    /////////////  Customer ////////////////
    case 'Customer': {
      if (type == 'GET' || type == 'Create') {
        apiurl = 'customers'
      } else if (num != 0) {
        apiurl = `customers/${num}`
      }
      return apiurl
      break
    }
    /////////////  Brands ////////////////
    case 'Brands': {
      if (type == 'GET' || type == 'Create') {
        apiurl = 'brands'
      } else if (type == 'Edit' && num != 0) {
        apiurl = `brands/${num}`
      } else if (type == 'Delete' && num != 0) {
        apiurl = `brands/${num}`
      }
      return apiurl
      break
    }
    /////////////  Categories ////////////////
    case 'Categories': {
      if (type == 'GET' || type == 'Create') {
        apiurl = 'categories'
      } else if (type == 'Edit' && num != 0) {
        apiurl = `categories/${num}`
      } else if (type == 'Delete' && num != 0) {
        apiurl = `categories/${num}`
      }
      return apiurl
      break
    }
    /////////////  SubCategories ////////////////
    case 'SubCategories': {
      if (type == 'GET' || type == 'Create') {
        apiurl = `subcategories`
      } else if (type == 'Edit'  && num != 0) {
        apiurl = `subcategories/${num}`
      } else if (type == 'Delete' && num != 0) {
        apiurl = `subcategories/${num}`
      } else if (type == 'GET-byCategories' && num != 0) {
        apiurl = `categories/${num}/subcategories`
      }
      return apiurl
      break
    }
    /////////////  Products ////////////////
    case 'Products': {
      if (type == 'GET' || type == 'Create') {
        apiurl = 'products'
      } else if (type == 'GetByBrand' && num != 0) {
        apiurl = `products/brand/${num}`
      }else if (num != 0) {
        apiurl = `products/${num}`
      }
      return apiurl
      break
    }
    /////////////  ProductImages ////////////////
    case 'ProductImages': {
      if (type == 'Create') {
        apiurl = 'product-images'
      } else if (type == 'GET-byProduct' && num != 0) {
        apiurl = `products/${num}/images`
      } else if (num != 0) {
        apiurl = `product-images/${num}`
      }
      return apiurl
      break
    }
    /////////////  Orders  ////////////////
    case 'Orders': {
      if (type == 'GET' || type == 'Create') {
        apiurl = 'orders'
      }else if (type == 'CreateItem') {
        apiurl = 'order-items'
      } else if (type == 'Edit' && num != 0 || type == 'GETByID' && num != 0) {
        apiurl = `orders/${num}`
      } else if (type == 'Delete' && num != 0) {
        apiurl = `orders/${num}`
      } else if (type == 'GETItem' && num != 0) {
        apiurl = `orders/${num}/items`
      } else if (type == 'EditItem' && num != 0 || type == 'DeleteItem' && num != 0) {
        apiurl = `order-items/${num}`
      }
      return apiurl
      break
    }
    /////////////  ShippingCompanies  ////////////////
    case 'ShippingCompanies': {
      apiurl = `shipping-companies`
      return apiurl
      break
    }
    default: {
      console.log('Empty action received...\nThe dataName is: ' + dname + ' And the type is: ' + type)
      return apiurl
    }
  }
}
////////////////////////////////////////////////
/////////////// Main Methods For Connection ////
////////////////////////////////////////////////
// Get Data From Database
export async function getData(dataName: string, dataId = 0, type = 'GET',res = 'data'){
    try{
        const response = await apiClient.get(APIURL(dataName, type, dataId))
        if (res == 'data') return response.data.data
        else return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}
// Updata the data into database (With Image using formDataApiClient / Without Image using apiClient)
export async function updateData(dataName: string, id:number, data: any, type = 'Edit'){
    try{
      let response
      if(dataName == "SubCategories" || dataName == "Store" || dataName == "City" ||
      dataName == "Customer" || dataName == "Orders" && type == 'EditItem') response = await apiClient.put(APIURL(dataName, type, id), data)
        else{
          if(type == 'EditWithImg') response = await formDataApiClient.post(APIURL(dataName, type, id), data)
          else response = await apiClient.post(APIURL(dataName, type, id), data)
        }
     // if (!response.data.status) throw { message: response.data.errors.general }
      return response.data.data
    } catch (error) {
        console.log(error)
        throw error
    }
}
// Create Database (With Image using formDataApiClient / Without Image using apiClient)
export async function createData(dataName: string, data: any, type = 'Create'){
    try{
      let response
      if(type == 'CreateWithImg'){
        response = await formDataApiClient.post(APIURL(dataName, 'Create'), data)
      }else{
        response = await apiClient.post(APIURL(dataName, type), data)
      }
      //  if (!response.data.status) throw { message: response.data.errors.general }
        return response.data.data
    } catch (error) {
        if (type == 'CreateWithImg') console.error('Image upload error:', error)
        else console.log(error)
        throw error
    }
}
// Delete Data from database
export async function deleteData(dataName: string, dataId: number, type = 'Delete') {
    try {
      await apiClient.delete(APIURL(dataName, type, dataId))
    } catch (error) {
      console.log(error)
      throw error
    }
}