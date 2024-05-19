import { ref } from 'vue';
export class Categories { // Main Categories
    id = 0
    name_ar = ''
    name_en = ''
    image = ''
}
export class SubCategories { // SubCategories
    id = 0
    name_ar = ''
    name_en = ''
    category_id = 0
}
export class Brands { // Brands
    id = 0
    name = ''
    logo = ''
}
export class Store { // Store
    id = 0
    name = ''
    location = ''
}
export class Customer { // Customer
    id = 0
    name = ''
    address= ''
    phone = ''
    phone_2 = ''
    city_id = ''
    area_id = ''
    // email = ''
    // type = ['consumer','wholesaler']
}

export class Products { // Products
    id = 0
    price = 0
    brand_id = 0
    sub_category_id = 0
    name_ar = ''
    name_en = ''
    main_image = ''
    images = []
    color_codes = []
    hex = []
    warehouses = [{ id: 0, quantity: 0, alert_quantity: 0 }]
    // warehouses,.id = []
    // warehouses,.quantity = []
    // warehouses,.alert_quantity = []
    image = ''
    model = ''
    description_ar = ''
    description_en = ''
    is_available = false
}
export class Orders { // Orders
    id = 0
    name = ''
}
//////////////////////// Items
export class StoreItems {
    id = 0
    name = ''
    quantity = 0
    alert_quantity = 0
    storeID = 0
    errorq = false
    error = ''
    erroraq = false
    errorAQ = ''
}
export class Items{
    id = 0
    image = ref<File | null>(null)
    color_code = 0
    color = ''
    errorF = false
    error_color = false
    error_code = false
    errorFile_items = ''
    errorColor_items = ''
    errorCode_items = ''
}
export class item{
    id = 0
    quantity = 0
    alert_quantity = 0
}

export class Region{
    id = 0
    name_ar = ''
    name_en = ''
    city_id = 0
    city = ''
}

