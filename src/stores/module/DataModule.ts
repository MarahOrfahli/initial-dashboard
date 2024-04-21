import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'
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
    Orders
  } from '../../model/Classes'
  /// Make Data Connection Store 
  // Put the data into objects..
  export const useConnectionStore = defineStore('connection', {
    state: () => {
      const { t } = useI18n()
      return {
        // Project Name
        project_name: 'ZanobiaMarket',
        // Arrows
        firstArrow: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>`,
        lastArrow: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>`,
        previousArrow: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>`,
        nextArrow: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>`,
        // Lang Variable [not used yet..]
        t,
        // variable for images storage
        imgLocation : 'https://api.mightcinema.com/storage/',
        // Variables For Connection
        brand: [Brands],
        store: [Store],
        orders: [Orders],
        products: [Products],
        customer: [Customer],
        categories: [Categories],
        subcategories: [SubCategories],
        /// Loading.........
        loading: false,
        loading_create: false,
      }
    },
    actions: {
      // Main Actions /////////////////////////////////////////////////
      // Get The Data
        async getData(dataName: string, dataId = 0) {
            try {
              
                this.loading = true
                if (dataName == 'Categories') {
                  this.categories = await getData(dataName, dataId)
                } else if (dataName == 'SubCategories') {
                  this.subcategories = await getData(dataName, dataId)
                } else if (dataName == 'Brands') {
                  this.brand = await getData(dataName, dataId)
                } else if (dataName == 'Store') {
                  this.store = await getData(dataName, dataId)
                } else if (dataName == 'Products') {
                  this.products = await getData(dataName, dataId)
                } else if (dataName == 'Customer') {
                  this.customer = await getData(dataName, dataId)
                } else if (dataName == 'Orders') {
                  this.orders = await getData(dataName, dataId)
                }
            } catch (error) {
              console.log(error)
              this.categories = []
            } finally {
              this.loading = false
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
            console.log(error)
          } finally {
            this.loading = false
          }
        },
        /////////////////////////////////////////
        // Update The Data
        async updateData(dataName: string,id: number, data: any, type = '') {
          let index: any
          const DataType = data
          try {
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
              index = this.brand.findIndex((t: any) => t.id === DataType.id)
              if (index !== -1) {
                this.brand.splice(index, 1, DataType)
              }
            }else if (dataName == 'Store') {
              index = this.store.findIndex((t: any) => t.id === DataType.id)
              if (index !== -1) {
                this.store.splice(index, 1, DataType)
              }
            }else if (dataName == 'Products') {
              index = this.products.findIndex((t: any) => t.id === DataType.id)
              if (index !== -1) {
                this.products.splice(index, 1, DataType)
              }
            }else if (dataName == 'Customer') {
              index = this.customer.findIndex((t: any) => t.id === DataType.id)
              if (index !== -1) {
                this.customer.splice(index, 1, DataType)
              }
            }else if (dataName == 'Orders') {
              index = this.orders.findIndex((t: any) => t.id === DataType.id)
              if (index !== -1) {
                this.orders.splice(index, 1, DataType)
              }
            }
          } catch (error) {
            console.log(error)
          } finally {
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
              this.brand = this.brand.filter((t: any) => t.id !== dataId)
            } else if (dataName == 'Store') {
              this.store = this.store.filter((t: any) => t.id !== dataId)
            } else if (dataName == 'Products') {
              this.products = this.products.filter((t: any) => t.id !== dataId)
            } else if (dataName == 'Customer') {
              this.customer = this.customer.filter((t: any) => t.id !== dataId)
            }else if (dataName == 'Orders') {
              this.orders = this.orders.filter((t: any) => t.id !== dataId)
            }
          } catch (error) {
            console.log(error)
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