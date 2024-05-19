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
    getData
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
    Region
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
        brands: [Brands],
        stores: [Store],
        orders: [Orders],
        orderByID: [Orders],
        products: [Products],
        productByID: [Products],
        customers: [Customer],
        customerByID: [Customer],
        categories: [Categories],
        subcategories: [SubCategories],
        /////////////
        storesTrack: [],
        storeDetails: [],
        /// Loading.........
        loading: false,
        loading_product: false,
        loading_order: false,
        loading_brand: false,
        loading_create: false,
        loading_store: false,
        loading_city: false,
        loading_client: false,
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
                } else if (dataName == 'Products') {
                  if(type == 'GETByID'){
                    this.loading_product = true
                    this.productByID = await getData(dataName, dataId, type)
                  }else{
                    this.products = await getData(dataName, dataId, type)
                  }
                //  if(type == 'GET') console.log(await getData(dataName, dataId,'GET','test'))
                } else if (dataName == 'Customer') {
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
                  }else{
                    this.orders = await getData(dataName, dataId, type)
                  }
                } else if (dataName == 'Region') {
                  this.loading_area = true
                  this.regions = await getData(dataName, dataId)
                } else if (dataName == 'City') {
                  this.loading_city = true
                  this.cities = await getData(dataName, dataId)
                }
            } catch (error) {
              handleApiError(error, this.storeSetting.rtlClass)
            } finally {
              this.loading = false
              this.loading_area = false
              this.loading_city = false
              this.loading_store = false
              this.loading_brand = false
              this.loading_subcategory = false
              this.loading_product = false
              this.loading_client = false
              this.loading_order = false
            }
        },
        /////////////////////////////////////////
        // Create The Data
        async createData(dataName: string, data: any, type = 'Create') {
          try {
            this.loading_create = true
            this.loading = true
            await createData(dataName, data, type)
          } catch (error) {
            handleApiError(error, this.storeSetting.rtlClass)
          } finally {
            this.loading_create = false
            this.loading = false
          }
        },
        /////////////////////////////////////////
        // Update The Data
        async updateData(dataName: string,id: number, data: any, type = '') {
          let index: any
          const DataType = data
          try {
            this.loading_create = true
            this.loading = true
            await updateData(dataName,id, data,type)
            if (dataName == 'Categories') {
              index = this.categories.findIndex((t: any) => t.id === DataType.id)
              if (index !== -1) {
                this.categories.splice(index, 1, DataType)
              }
            }else if (dataName == 'SubCategories') {
              index = this.subcategories.findIndex((t: any) => t.id === DataType.id)
              if (index !== -1) {
                this.subcategories.splice(index, 1, DataType)
              }
            }else if (dataName == 'Brands') {
              index = this.brands.findIndex((t: any) => t.id === DataType.id)
              if (index !== -1) {
                this.brands.splice(index, 1, DataType)
              }
            }else if (dataName == 'Store') {
              index = this.stores.findIndex((t: any) => t.id === DataType.id)
              if (index !== -1) {
                this.stores.splice(index, 1, DataType)
              }
            }else if (dataName == 'Products') {
              index = this.products.findIndex((t: any) => t.id === DataType.id)
              if (index !== -1) {
                this.products.splice(index, 1, DataType)
              }
            }else if (dataName == 'Customer') {
              index = this.customers.findIndex((t: any) => t.id === DataType.id)
              if (index !== -1) {
                this.customers.splice(index, 1, DataType)
              }
            }else if (dataName == 'Orders') {
              index = this.orders.findIndex((t: any) => t.id === DataType.id)
              if (index !== -1) {
                this.orders.splice(index, 1, DataType)
              }
            }else if (dataName == 'Region') {
              index = this.regions.findIndex((t: any) => t.id === DataType.id)
              if (index !== -1) {
                this.regions.splice(index, 1, DataType)
              }
            }
          } catch (error) {
            handleApiError(error, this.storeSetting.rtlClass)
          } finally {
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
    }
});