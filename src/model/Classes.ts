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
    phone2 = ''
    city_id = ''
    area_id = ''
    email = ''
    type = ['consumer','wholesaler']
}

export class Products { // Products
    id = 0
    price = 0
    brand_id = 0
    sub_category_id = 0
    name_ar = ''
    name_en = ''
    // main_image = ''
    // images = []
    // color_codes = []
    // hex = []
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
