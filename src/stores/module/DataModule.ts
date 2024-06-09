import { defineStore } from 'pinia'
// Store Object For rtl / ltr
import { useAppStore } from '@/stores/index';
import { useI18n } from 'vue-i18n'
import { handleApiError } from '../../api/apiError'
// Import The Main Methods From DataConnect.ts File...
import {
    deleteData,
    updateData,
    createData,
    getData,
    login,
    logout
  } from '../../api/services/DataConnect'
  // Import The Classes From Classes.ts File... 
  // It Is Help For Take the same data by using the same objects..
  import {
    Brands,
    SubCategories,
    Categories,
    Store,
    Customer,
    Products,
    Orders,
    Region,
    ProductImages,
    ShippingCompanies,
    OrderByID,
    Credentials,
    ProductItems,
    Login,
  } from '../../model/Classes'
  /// Make Data Connection Store 
  // Put the data into objects..
  export const useConnectionStore = defineStore('connection', {
    state: () => {
      const { t } = useI18n()
      const storeSetting = useAppStore();
      return {
        // Project Name
        project_name: 'Trendy Beauty',
        // Arrows
        firstArrow: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>`,
        lastArrow: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>`,
        previousArrow: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>`,
        nextArrow: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>`,
        // Lang Variable [not used yet..]
        t, storeSetting,
        // variable for images storage
        imgLocation : 'https://api.mightcinema.com/storage/',
        // Variables For Connection
        regions: [Region],
        cities: [],
        shipping_companies : [ShippingCompanies],
        brands: [Brands],
        stores: [Store],
        orders: [Orders],
        orderByID: new OrderByID(),
        itemByOrder: [ProductItems] ,
        //orderDetails: new OrderDetails(),
        products: [Products],
        productByID: new Products(),
        productByBrand: [],
        productImages: [ProductImages],
        customers: [Customer],
        customerByID: [Customer],
        categories: [Categories],
        subcategories: [SubCategories],
        /////////////
        storesTrack: [],
        ///////// Auth /////////////
        userInfo: new Login(),
        // loginInfo: new Credentials(),
        token: '',
        authStatue : false,
        ////////////////////////////
        storeDetails: [],
        /// Loading.........
        loading: false,
        loading_product_images: false,
        loading_product_brand: false,
        loading_product: false,
        loading_order: false,
        loading_brand: false,
        loading_create: false,
        loading_store: false,
        loading_city: false,
        loading_client: false,
        loading_company: false,
        loading_customer: false,
        loading_status: false,
        loading_area: false,
        loading_subcategory: false,
      }
    },
    actions: {
      // Main Actions /////////////////////////////////////////////////
      // Get The Data
        async getData(dataName: string, dataId = 0, type = 'GET') {
            try {
                this.loading = true
                if (dataName == 'Categories') {
                  this.categories = await getData(dataName, dataId)
                //  console.log(await getData(dataName, dataId,'GET','test'))
                } else if (dataName == 'SubCategories') {
                  this.loading_subcategory = true
                  this.subcategories = await getData(dataName, dataId, type)
                } else if (dataName == 'Brands') {
                  this.loading_brand = true
                  this.brands = await getData(dataName, dataId)
                } else if (dataName == 'Store') {
                  this.loading_store = true
                  this.stores = await getData(dataName, dataId)
                } else if (dataName == 'ProductImages') {
                  this.loading_product_images = true
                  this.productImages = await getData(dataName, dataId, type)
                } else if (dataName == 'Products') {
                  if(type == 'GETByID'){
                    this.loading_product = true
                    this.productByID = await getData(dataName, dataId, type)
                  }else if(type == 'GetByBrand'){
                    this.loading_product_brand = true
                    this.productByBrand = await getData(dataName, dataId, type)
                  }else{
                    this.products = await getData(dataName, dataId, type)
                  }
                //  if(type == 'GET') console.log(await getData(dataName, dataId,'GET','test'))
                } else if (dataName == 'Customer') {
                  this.loading_customer = true
                  if(type == 'GETByID'){
                    this.loading_client = true
                    this.customerByID = await getData(dataName, dataId, type)
                  }else{
                    this.customers = await getData(dataName, dataId,type)
                  }
                } else if (dataName == 'Orders') {
                  if(type == 'GETByID'){
                    this.loading_order = true
                    this.orderByID = await getData(dataName, dataId, type)
                  }else if(type == 'GETItem'){
                    this.loading_order = true
                    this.itemByOrder = await getData(dataName, dataId, type)
                  }else{
                    this.orders = await getData(dataName, dataId, type)
                  }
                } else if (dataName == 'Region') {
                  this.loading_area = true
                  this.regions = await getData(dataName, dataId)
                } else if (dataName == 'City') {
                  this.loading_city = true
                  this.cities = await getData(dataName, dataId)
                } else if (dataName == 'ShippingCompanies') {
                  this.loading_company = true
                  this.shipping_companies = await getData(dataName, dataId)
                }
            } catch (error) {
              handleApiError(error, this.storeSetting.rtlClass)
            } finally {
              this.loading = false
              this.loading_area = false
              this.loading_city = false
              this.loading_store = false
              this.loading_brand = false
              this.loading_product_brand = false,
              this.loading_product_images = false
              this.loading_subcategory = false
              this.loading_product = false
              this.loading_client = false
              this.loading_customer = false
              this.loading_company = false
              this.loading_order = false
            }
        },
        /////////////////////////////////////////
        // Create The Data
        async createData(dataName: string, data: any, type = 'Create') {
          try {
            this.loading_product_images = true
            this.loading_create = true
            this.loading = true
            await createData(dataName, data, type)
          } catch (error) {
            handleApiError(error, this.storeSetting.rtlClass)
          } finally {
            this.loading_create = false
            this.loading_product_images = false
            this.loading = false
          }
        },
        /////////////////////////////////////////
        // Update The Data
        async updateData(dataName: string,id: number, data: any, type = 'Edit') {
          let index: any
          const DataType = data
          try {
            this.loading_product_images = true
            this.loading_create = true
            this.loading = true
            await updateData(dataName,id, data,type)
          } catch (error) {
            handleApiError(error, this.storeSetting.rtlClass)
          } finally {
            this.loading_product_images = false
            this.loading_create = false
            this.loading = false
          }
        },
        /////////////////////////////////////////
        // Delete The Data
        async deleteData(dataName: string, dataId: number, type = 'Delete') {
          try {
            this.loading = true
            await deleteData(dataName, dataId, type)
            if (dataName == 'Categories') {
              this.categories = this.categories.filter((t: any) => t.id !== dataId)
            } else if (dataName == 'SubCategories') {
              this.subcategories = this.subcategories.filter((t: any) => t.id !== dataId)
            } else if (dataName == 'Brands') {
              this.brands = this.brands.filter((t: any) => t.id !== dataId)
            } else if (dataName == 'Store') {
              this.stores = this.stores.filter((t: any) => t.id !== dataId)
            } else if (dataName == 'Products') {
              this.products = this.products.filter((t: any) => t.id !== dataId)
            } else if (dataName == 'Customer') {
              this.customers = this.customers.filter((t: any) => t.id !== dataId)
            }else if (dataName == 'Orders') {
              this.orders = this.orders.filter((t: any) => t.id !== dataId)
            }else if (dataName == 'Region') {
              this.regions = this.regions.filter((t: any) => t.id !== dataId)
            }
          } catch (error) {
            handleApiError(error, this.storeSetting.rtlClass)
          } finally {
            this.loading = false
          }
        },
        ////////////////////////////////////////////////////////////////////////
        // Other Actions ////////////////////////////////
        // it will used into a select input..
        async getCategoriesForSelection(){
          this.getData('Categories',0)
        },
        // Auth ////////////////////////////////////////
        
      async login(log: any) {
        this.loading = true
        try {
          this.userInfo = await login(log)
          let token = this.userInfo.token
          if (token == null) {
            this.authStatue = false
            return
          } else {
            this.authStatue = true
            this.setToken(token)
            this.setUserInfo(this.userInfo.user.name, this.userInfo.user.email)
          }
        } catch (error) {
          handleApiError(error)
        } finally {
          this.loading = false
        }
      },
      
    async logout() {
      // Clear the token and user information in the store
      try {
        await logout().then(()=>{
          this.setToken(null)
          this.setUserInfo(null, null)
        })
      } catch (error) {
        handleApiError(error)
      } finally {
        this.loading = false
      }
    },
    /////////////////////////
      setToken(token: any) {
        if (token != null) {
          localStorage.setItem('authToken', token)
        } else {
          localStorage.removeItem('authToken')
        }
      },
      getToken() {
        let token = localStorage.getItem('authToken') as any
        return token
      },
      
    setUserInfo(name: any, email: any) { // , pass: any
      if (name != null) {
        localStorage.setItem('authName', name)
      } else {
        localStorage.removeItem('authName')
      }
      if (email != null) {
        localStorage.setItem('authEmail', email)
      } else {
        localStorage.removeItem('authEmail')
      }
      // if (pass != null) {
      //   localStorage.setItem('authPass', pass)
      // } else {
      //   localStorage.removeItem('authPass')
      // }
    },
    getUserInfoName() {
      return localStorage.getItem('authName') as any
    },
    getUserInfoEmail() {
      return localStorage.getItem('authEmail') as any
    },
    }
});