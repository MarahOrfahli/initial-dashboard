import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'
import { StoreItems, Items } from '../model/Classes'

export const validationStore = defineStore('Validation',{
    state: () => {
        const { t } = useI18n()
        return{
            t,isSubmmit: false,
            isSubmmit_itemsStore: false,
            isSubmmit_items: false,
            //////////// Errors Objects  ///////////////
            // Store //////////////////////
            storelocation: { error: false, message: ''},
            // ItemsImages ////////////////
            hex: { error: false, message: ''},
            code: { error: false, message: ''},
            // Categories /////////////////
            categorySelect: { error: false, message: ''},
            // Customer
            city: { error: false, message: ''},
            area: { error: false, message: ''},
            phone: { error: false, message: ''},
            address: { error: false, message: ''},
            // Orders
            shipping_name : { error: false, message: ''},
            shipping_date : { error: false, message: ''},
            order_date  : { error: false, message: ''},
            delivery_date : { error: false, message: ''},
            status : { error: false, message: ''},
            // Products /////////////////
            productdescarabic: { error: false, message: ''},
            productdescenglish: { error: false, message: ''},
            productmodel : { error: false, message: ''},
            Quantity: { error: false, message: ''},
            itemEntry: { error: false, message: ''},
            // Products arrays
            productMcategory: { error: false, message: ''},
            productScategory: { error: false, message: ''},
            productbrand : { error: false, message: ''},
            productstore: { error: false, message: ''},
            brandSelect : { error: false, message: ''},
            productSelect : { error: false, message: ''},
            //////////////////////////////////
            // Product && Order
            price : { error: false, message: ''},
            // Brand && Store && Customer
            name: { error: false, message: ''},
            // Brand && Categories && Products && ItemsImages
            file: { error: false, message: ''},
            // Categories && Subcategories && Products
            titlearabic :  { error: false, message: ''},
            titleenglish :  { error: false, message: ''},
            /////// Errors Messages  /////
            error_length: t('page-control.error-length'),
        }
    },
    actions: {
        isNull(data){
            return data == null ? true : false
        },
        checkNumZero(num: number){
            return num == 0 ? true : false
        },
        checkEmpty(data: string){
            return data == ''? true : false
        },
        checkDateEmpty(date: Date){
            return date == null ? true : false
        },
        checkMore30Char(data: string){
            return data.length > 29 ? true : false
        },
        checkPhone(phone: string){
            if (phone == '') {
                this.phone.message = this.t('pages.customer.errors.phone-empty')
                return true
              } else {
                if (phone.search(/^[0-9]*$/) == -1) {
                    this.phone.message = this.t('pages.customer.errors.phone-number')
                    return true
                } else if (phone.length > 20) {
                    this.phone.message = this.t('pages.customer.errors.phone-digit-above') 
                    return true
                } else if (phone.length < 11) {
                    this.phone.message = this.t('pages.customer.errors.phone-digit-under') 
                    return true
                }
              }
        },
        ///////////////// Validation Store Methods //////////////////////////
        checkStoreErrors(){
            return this.name.error == true || this.storelocation.error == true ? true : false
        },
        checkStoreInfo(name: string, location: string){ 
            let counter = 0
            this.isSubmmit = true
            if(this.checkEmpty(name)){
                this.name.error = true
                this.name.message = this.t('pages.store.errors.name-empty')
            }else if(this.checkMore30Char(name)){
                this.name.error = true
                this.name.message = this.error_length
            }
            if(this.checkEmpty(location)){
                this.storelocation.error = true
                this.storelocation.message = this.t('pages.store.errors.location-empty')
            }
            if (this.checkStoreErrors()) {
                counter++
            } else {
                counter = 0
            }
            return counter
        },
        ///////////////// Validation Brand Methods //////////////////////////
        checkBrandErrors(){
            return this.name.error == true || this.file.error == true ? true : false
        },
        checkBrandInfo(name: string , file){
            let counter = 0
            this.isSubmmit = true
            if(this.checkEmpty(name)){
                this.name.error = true
                this.name.message = this.t('pages.brand.errors.brand-empty')
            }else if(this.checkMore30Char(name)){
                this.name.error = true
                this.name.message = this.error_length
            }
            if(this.isNull(file)){
                this.file.error = true
                this.file.message = this.t('pages.brand.errors.upload')
            }
            if (this.checkBrandErrors()) {
                counter++
            } else {
                counter = 0
            }
            return counter
        },
        ///////////////// Validation Main Category Methods //////////////////////////
        checkMainCategoryErrors(){
            return this.titlearabic.error == true || this.titleenglish.error == true ||
            this.file.error == true ? true : false
        },
        checkMainCategoryInfo(title_ar: string, title_en: string, file){ 
            let counter = 0
            this.isSubmmit = true
            if(this.checkEmpty(title_ar)){
                this.titlearabic.error = true
                this.titlearabic.message = this.t('pages.main_section.errors.arabic-empty')
            }else if(this.checkMore30Char(title_ar)){
                this.titlearabic.error = true
                this.titlearabic.message = this.error_length
            }
            if(this.checkEmpty(title_en)){
                this.titleenglish.error = true
                this.titleenglish.message = this.t('pages.main_section.errors.english-empty')
            }else if(this.checkMore30Char(title_en)){
                this.titleenglish.error = true
                this.titleenglish.message = this.error_length
            }
            if(this.isNull(file)){
                this.file.error = true
                this.file.message = this.t('pages.main_section.errors.upload')
            }
            if (this.checkMainCategoryErrors()) {
                counter++
            } else {
                counter = 0
            }
            return counter
        },
        ///////////////// Validation Subcategory Methods //////////////////////////
        checkSubcategoryErrors(){
            return this.titlearabic.error == true || this.titleenglish.error == true || 
            this.categorySelect.error == true ? true : false
        },
        checkSubcategoryInfo(title_ar: string, title_en: string, select: string){
            let counter = 0
            this.isSubmmit = true
            if(this.checkEmpty(title_ar)){
                this.titlearabic.error = true
                this.titlearabic.message = this.t('pages.sub_section.errors.arabic-empty')
            }else if(this.checkMore30Char(title_ar)){
                this.titlearabic.error = true
                this.titlearabic.message = this.error_length
            }
            if(this.checkEmpty(title_en)){
                this.titleenglish.error = true
                this.titleenglish.message = this.t('pages.sub_section.errors.english-empty')
            }else if(this.checkMore30Char(title_en)){
                this.titleenglish.error = true
                this.titleenglish.message = this.error_length
            }
            if(this.checkEmpty(select)){
                this.categorySelect.error = true
                this.categorySelect.message = this.t('pages.sub_section.errors.select')
            }
            if (this.checkSubcategoryErrors()) {
                counter++
            } else {
                counter = 0
            }
            return counter
        },
        ///////////////// Validation Product Methods //////////////////////////
        checkProductErrors(){
            return this.titlearabic.error == true || this.titleenglish.error == true || 
            this.productdescarabic.error ==  true || this.productdescenglish.error == true ||
            this.productMcategory.error ==  true || this.productScategory.error == true ||
            this.price.error ==  true || this.productmodel.error == true ||
            this.productbrand.error ==  true || this.file.error == true ||
            this.productstore.error == true || this.Quantity.error == true ? true : false
        },
        checkProductInfo(pageType:string ,values, url: string){
            let counter = 0
            this.isSubmmit = true
            if(this.checkEmpty(values.title_ar)){ // Title In Arabic
                this.titlearabic.error = true
                this.titlearabic.message = this.t('pages.products_section.errors.arabic-empty')
            }else if(this.checkMore30Char(values.title_ar)){
                this.titlearabic.error = true
                this.titlearabic.message = this.error_length
            }
            if(this.checkEmpty(values.title_en)){ // Title In English
                this.titleenglish.error = true
                this.titleenglish.message = this.t('pages.products_section.errors.english-empty')
            }else if(this.checkMore30Char(values.title_en)){
                this.titleenglish.error = true
                this.titleenglish.message = this.error_length
            }
            if(this.checkEmpty(values.desc_ar)){ // Description In Arabic
                this.productdescarabic.error = true
                this.productdescarabic.message = this.t('pages.products_section.errors.desc-arabic-empty')
            }
            if(this.checkEmpty(values.desc_en)){ // Description In English
                this.productdescenglish.error = true
                this.productdescenglish.message = this.t('pages.products_section.errors.desc-english-empty')
            }
            if(this.checkNumZero(values.price)){ // Price
                this.price.error = true
                this.price.message = this.t('pages.products_section.errors.price')
            }
            if(this.checkEmpty(values.model)){ // Model
                this.productmodel.error = true
                this.productmodel.message = this.t('pages.products_section.errors.model')
            }else if(this.checkMore30Char(values.model)){
                this.productmodel.error = true
                this.productmodel.message = this.error_length
            }
            if(this.checkEmpty(values.brand.field) && this.checkNumZero(values.brand.id)){ // Brand Select
                this.productbrand.error = true
                this.productbrand.message = this.t('pages.products_section.errors.brand')
            }
            if(this.checkEmpty(values.category.field) && this.checkNumZero(values.category.id)){ // Category Select
                this.productMcategory.error = true
                this.productMcategory.message = this.t('pages.products_section.errors.category')
            }
            if(this.checkEmpty(values.subcategory.field) && this.checkNumZero(values.subcategory.id)){ // Subcategory Select
                this.productScategory.error = true
                this.productScategory.message = this.t('pages.products_section.errors.subcategory')
            }
            if(this.isNull(values.file) && this.checkEmpty(url) || values.file == File && this.checkEmpty(url)){ // Main Image
                this.file.error = true
                this.file.message = this.t('pages.products_section.errors.upload')
            }
            if(pageType == 'Create'){
                if(!this.checkNumZero(values.storeErrors)){ // Store (Select)
                    this.Quantity.error = true
                    this.Quantity.message = 'entry not correct'
                }
                if(this.checkEmpty(values.store.field) && this.checkNumZero(values.store.storeitem.length)){ // Store Select
                    this.productstore.error = true
                    this.productstore.message = 'You must at least add product quantity to one store'
                }
                if(!this.checkNumZero(values.items.Errors)){ // Img-Color-Code (Select)
                    this.itemEntry.error = true
                    this.itemEntry.message = 'entry not correct'
                }
            }
            if (this.checkProductErrors()) {
                counter++
            } else {
                counter = 0
            }
            return counter
        },
        ///////////////// Validation Product_Brand Methods //////////////////////////
        checkProduct_BrandErrors(){
            return this.price.error == true || this.brandSelect.error == true || 
            this.productSelect.error == true || this.Quantity.error == true ? true : false
        },
        checkProduct_BrandInfo(values){
            let counter = 0
            this.isSubmmit = true
            if(isNaN(parseInt(values.price)) || this.checkNumZero(parseInt(values.price))){ // Price
                this.price.error = true
                this.price.message = this.t('pages.products_section.errors.price')
            }
            if(this.checkNumZero(values.brandID)){ // Brand
                this.brandSelect.error = true
                this.brandSelect.message = this.t('pages.products_section.errors.price')
            }
            if(this.checkNumZero(values.productID)){ // Product
                this.productSelect.error = true
                this.productSelect.message = this.t('pages.products_section.errors.price')
            }
            if(this.checkNumZero(values.quantity)){ // Quantity
                this.Quantity.error = true
                this.Quantity.message = this.t('pages.products_section.errors.price')
            }
            if (this.checkProduct_BrandErrors()) {
                counter++
            } else {
                counter = 0
            }
            return counter
        },
        ///////////////// Validation Order Methods //////////////////////////
        checkOrderErrors(){
            return this.name.error == true || this.shipping_name.error == true ||
            this.price.error == true || this.order_date.error == true ? true : false
        },
        checkOrderInfo(values){
            let counter = 0
            this.isSubmmit = true
            if(this.checkEmpty(values.client_name)){ // Client Name
                this.name.error = true
                this.name.message = this.t('pages.products_section.errors.arabic-empty')
            }else if(this.checkMore30Char(values.client_name)){
                this.name.error = true
                this.name.message = this.error_length
            }
            if(this.checkEmpty(values.company_name)){ // Shipping Company Name
                this.shipping_name.error = true
                this.shipping_name.message = this.t('pages.products_section.errors.english-empty')
            }
            if(this.checkNumZero(values.price)){ // Price
                this.price.error = true
                this.price.message = this.t('pages.products_section.errors.price')
            }
            if(this.checkDateEmpty(values.orderDate)){
                this.order_date.error = true
                this.order_date.message = this.t('pages.products_section.errors.price')
            }
            if (this.checkOrderErrors()) {
                counter++
            } else {
                counter = 0
            }
            return counter
        },
        ///////////////////// Items Validations ////////////////////////////
        checkItemsError(type: string, items: any){
            if(type == 'Store'){
                return items.errorq == true || items.erroraq == true
            }else if(type == 'ICC'){
                return items.errorF == true || items.error_code == true || items.error_color == true
            }
        },
        checkItemsInfo(type: string, items: any[] = []){
            let counter = 0
            this.isSubmmit_items = true
            if(type == 'Store'){
                let itemsStore: StoreItems[] = items
                for (let index = 0; index < itemsStore.length; index++){
                    let theItems = itemsStore[index]
                    if(theItems.quantity > 0 && theItems.alert_quantity > 0 && theItems.alert_quantity < theItems.quantity){
                        this.isSubmmit_itemsStore = false
                        theItems.errorq = false
                        theItems.erroraq = false
                        theItems.error = ''
                        theItems.errorAQ = ''
                    }else {
                        if(theItems.quantity == 0){
                            theItems.errorq = true
                            theItems.error = 'Error'
                        } // alert_quantity
                        if(theItems.alert_quantity == 0){
                            theItems.erroraq = true
                            theItems.errorAQ = 'Error'
                        }
                        if(theItems.alert_quantity >= theItems.quantity && theItems.quantity > 0){
                            theItems.erroraq = true
                            theItems.errorAQ = 'Error'
                            theItems.errorq = true
                            theItems.error = 'Error'
                        }
                    }
                }
                for (let index = 0; index < items.length; index++) {
                    let theItems = items[index]
                    if(this.checkItemsError('Store', theItems)){
                        counter++
                    }
                }
                items = itemsStore
            }else if(type == 'ICC'){
                let itemsICC:Items[] = items
                for (let index = 0; index < itemsICC.length; index++) {
                    let theItems = itemsICC[index]
                    theItems.errorF = false
                    theItems.errorFile_items = ''
                    theItems.error_code = false
                    theItems.errorCode_items = ''
                    theItems.error_color = false
                    theItems.errorColor_items = ''
                    if(theItems.image == null && theItems.img_url == ''){
                        theItems.errorF = true
                        theItems.errorFile_items = this.t('pages.products_section.errors.upload-img-item')
                    }
                    if(theItems.color.includes('#') && theItems.color_code == 0 || 
                        theItems.color.includes('#') && theItems.color_code.toString() == ''){
                        theItems.error_code = true
                        theItems.errorCode_items = this.t('pages.products_section.errors.code')
                    }else if(!theItems.color.includes('#') && theItems.color_code != 0 &&
                         theItems.color_code.toString() != ''){
                        theItems.error_color = true
                        theItems.errorColor_items = this.t('pages.products_section.errors.color')
                    }
                }
                for (let index = 0; index < itemsICC.length; index++) {
                    let theItems = itemsICC[index]
                    if(this.checkItemsError('ICC', theItems)){
                        counter++
                    }
                }
                items = itemsICC
            }
            return { count: counter, items: items }
        },
        ///
        checkImageItemErrors(){
            return this.file.error == true || this.code.error == true || this.hex.error == true ? true : false
        },
        checkImageItemInfo(code: number, color: string, url: string, file){
            let counter = 0
            this.isSubmmit_items = true
            if(this.isNull(file) && url == ''){
                this.file.error = true
                this.file.message = this.t('pages.products_section.errors.upload-img-item')
            }
            if(color.includes('#') && color != '' && code == 0 || 
                color.includes('#') && color != '' && code.toString() == ''){
                this.code.error = true
                this.code.message = this.t('pages.products_section.errors.code')
            }else if(!color.includes('#') && color == '' && code != 0 &&
                 code.toString() != ''){
                this.hex.error = true
                this.hex.message = this.t('pages.products_section.errors.color')
            }
            if (this.checkImageItemErrors()) {
                counter++
            } else {
                counter = 0
            }
            return counter
        },
        ///////////////// Validation Region Methods //////////////////////////
        checkRegionErrors(){
            return this.titlearabic.error == true || this.titleenglish.error == true || this.city.error == true ? true : false
        },
        checkRegionInfo(name_ar: string, name_en: string, city: string){ 
            let counter = 0
            this.isSubmmit = true
            if(this.checkEmpty(name_ar)){
                this.titlearabic.error = true
                this.titlearabic.message = this.t('pages.region.errors.arabic-empty')
            }else if(this.checkMore30Char(name_ar)){
                this.titlearabic.error = true
                this.titlearabic.message = this.error_length
            }
            if(this.checkEmpty(name_en)){
                this.titleenglish.error = true
                this.titleenglish.message = this.t('pages.region.errors.english-empty')
            }else if(this.checkMore30Char(name_en)){
                this.titleenglish.error = true
                this.titleenglish.message = this.error_length
            }
            if(this.checkEmpty(city)){
                this.city.error = true
                this.city.message = this.t('pages.region.errors.city-empty')
            }
            if (this.checkRegionErrors()) {
                counter++
            } else {
                counter = 0
            }
            return counter
        },
        ///////////////// Validation Customer Methods //////////////////////////
        checkCustomerErrors(){
            return this.name.error == true || this.phone.error == true || this.area.error == true
            || this.address.error == true ? true : false
        },
        checkCustomerInfo(name: string, phone: string, area: string, address: string){ 
            let counter = 0
            this.isSubmmit = true
            if(this.checkEmpty(name)){
                this.name.error = true
                this.name.message = this.t('pages.customer.errors.name-empty')
            }else if(this.checkMore30Char(name)){
                this.name.error = true
                this.name.message = this.error_length
            }
             if(this.checkPhone(phone)){
                this.phone.error = true
            }
            if(this.checkEmpty(area)){
                this.area.error = true
                this.area.message = this.t('pages.customer.errors.select')
            }
            if(this.checkEmpty(address)){
                this.address.error = true
                this.address.message = this.t('pages.customer.errors.address-empty')
            }
            if (this.checkCustomerErrors()) {
                counter++
            } else {
                counter = 0
            }
            return counter
        },
        ///////////////// Clear All Validations ////////////////////////////
        clear(){
            ////// Clear Store //////////
            this.storelocation.error = false
            this.storelocation.message = ''
             ////// Clear Brand //////////
            ////// Clear Categories //
            this.categorySelect.error = false
            this.categorySelect.message = ''
            // Orders
            this.shipping_name.error = false
            this.shipping_name.message = ''
            this.shipping_date.error = false
            this.shipping_date.message = ''
            this.order_date.error = false
            this.order_date.message = ''
            this.delivery_date.error = false
            this.delivery_date.message = ''
            this.status.error = false
            this.status.message = ''
            ////// Clear Customer ////
            this.city.error = false
            this.city.message = ''
            this.area.error = false
            this.area.message = ''
            this.phone.error = false
            this.phone.message = ''
            this.address.error = false
            this.address.message = ''
            ////// Clear Products //
            this.productdescenglish.error = false
            this.productdescenglish.message = ''
            this.productdescarabic.error = false
            this.productdescarabic.message = ''
            this.price.error = false
            this.price.message = ''
            this.productmodel.error = false
            this.productmodel.message = ''
            this.Quantity.error = false
            this.Quantity.message = ''
            this.itemEntry.error = false
            this.itemEntry.message = ''
            /// Products Array ///
            this.productMcategory.error = false
            this.productMcategory.message = ''
            this.productScategory.error = false
            this.productScategory.message = ''
            this.productbrand.error = false
            this.productbrand.message = ''
            this.productstore.error = false
            this.productstore.message = ''
            ///////////////////////////////////
            ////// Clear Categories && Products
            this.titlearabic.error = false
            this.titlearabic.message = ''
            this.titleenglish.error = false
            this.titleenglish.message = ''
            // Clear Brand && Categories && Products
            this.file.error = false
            this.file.message = ''
            // Clear Store && Brand && Customer
            this.name.error = false
            this.name.message = ''
            // Clear Images Item
            this.code.error = false
            this.code.message = ''
            this.hex.error = false
            this.hex.message = ''
        },
    }
})