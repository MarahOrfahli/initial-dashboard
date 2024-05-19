<template>
    <!-- 
        All Inputs:
        - Title In Arabic
        - Title In English
        - Price
        - Model
        - Description In Arabic
        - Description In English
        - Select Main Category
        - Select Subcategory
        - Select Brand
        - Is Available
        - storeItems
        - imgColorCodeItems
     -->
    <div class="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
        <div class="flex items-center gap-2"></div>
        <div class="ltr:ml-auto rtl:mr-auto">
            <router-link to="/pages/products/list" class="btn btn-secondary gap-2">
                {{ t('pages.products_section.fields.back-product') }}
            </router-link>
        </div>
    </div>
    <div class="panel space-y-5">
    <div class=" text-xl">
        <strong v-if="pageType == 'Create'">{{ t('pages.products_section.fields.add-product') }}</strong>
        <strong v-if="pageType == 'Edit'">{{ t('pages.products_section.fields.edit-product') }}</strong>
    </div>
    <!-------------------------------------->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div class="p-3"> <!-- Title In Arabic -->
            <div :class="isSubmmit ? { 'has-error': titlearabic.error } : ''">
                <label for="title-arabic" class="ltr:mr-2 rtl:ml-2 mb-0">{{ t('pages.products_section.modals.title-arabic') }}</label>
                <input id="title-arabic" type="text" :disabled="loading_product" :class="loading_product ? 'bg-white-dark opacity-30 text-black' : ''"
                :placeholder="t('pages.products_section.modals.enter-title')" 
                class="form-input" @keyup="isSubmmit = false,titlearabic.error = false" v-model="values.title_ar" />
                <template v-if="isSubmmit && titlearabic.error == true">
                    <p class="text-danger mt-1">{{titlearabic.message}}</p>
                </template>
            </div>
        </div>
        <div class="p-3"> <!-- Title In English -->
            <div :class="isSubmmit ? { 'has-error': titleenglish.error } : ''">
                <label for="title-english" class="ltr:mr-2 rtl:ml-2 mb-0">{{ t('pages.products_section.modals.title-english') }}</label>
                <input id="title-english" type="text" :disabled="loading_product" :class="loading_product ? 'bg-white-dark opacity-30 text-black' : ''"
                :placeholder="t('pages.products_section.modals.enter-title')" 
                class="form-input" @keyup="isSubmmit = false,titleenglish.error = false" v-model="values.title_en" />
                <template v-if="isSubmmit && titleenglish.error == true">
                    <p class="text-danger mt-1">{{titleenglish.message}}</p>
                </template>
            </div>
        </div>
        <div class="p-3"> <!-- Price -->
            <div :class="isSubmmit ? { 'has-error': price.error } : ''">
                <label for="price" class="ltr:mr-2 rtl:ml-2 mb-0">{{ t('pages.products_section.fields.price') }}</label>
                <input id="price" type="number" :disabled="loading_product" :class="loading_product ? 'bg-white-dark opacity-30 text-black' : ''"
                :placeholder="t('pages.products_section.modals.enter-price')" 
                class="form-input" @keyup="isSubmmit = false,price.error = false" v-model="values.price" />
                <template v-if="isSubmmit && price.error == true">
                    <p class="text-danger mt-1">{{price.message}}</p>
                </template>
            </div>
        </div>
        <div class="p-3"> <!-- Model -->
            <div :class="isSubmmit ? { 'has-error': productmodel.error } : ''">
                <label for="model" class="ltr:mr-2 rtl:ml-2 mb-0">{{ t('pages.products_section.fields.model') }}</label>
                <input id="model" type="text" :disabled="loading_product" :class="loading_product ? 'bg-white-dark opacity-30 text-black' : ''"
                :placeholder="t('pages.products_section.modals.enter-model')" 
                class="form-input" @keyup="isSubmmit = false,productmodel.error = false" v-model="values.model" />
                <template v-if="isSubmmit && productmodel.error == true">
                    <p class="text-danger mt-1">{{productmodel.message}}</p>
                </template>
            </div>
        </div>
        <div class="p-3"> <!-- Description In Arabic -->
            <div :class="isSubmmit ? { 'has-error': productdescarabic.error } : ''">
                <label for="des-arabic" class="ltr:mr-2 rtl:ml-2 mb-0">{{ t('pages.products_section.modals.description-arabic') }}</label>
                <textarea id="des-arabic" rows="3" :disabled="loading_product" :class="loading_product ? 'bg-white-dark opacity-30 text-black' : ''"
                :placeholder="t('pages.products_section.modals.enter-descripe-arabic')" 
                class="form-textarea" @keyup="isSubmmit = false,productdescarabic.error = false" v-model="values.desc_ar" required></textarea>
                <template v-if="isSubmmit && productdescarabic.error == true">
                    <p class="text-danger mt-1">{{productdescarabic.message}}</p>
                </template>
            </div>
        </div>
        <div class="p-3"> <!-- Description In English -->
            <div :class="isSubmmit ? { 'has-error': productdescenglish.error } : ''">
                <label for="des-english" class="ltr:mr-2 rtl:ml-2 mb-0">{{ t('pages.products_section.modals.description-english') }}</label>
                <textarea id="des-english" rows="3" :disabled="loading_product" :class="loading_product ? 'bg-white-dark opacity-30 text-black' : ''"
                :placeholder="t('pages.products_section.modals.enter-descripe-english')" 
                class="form-textarea" @keyup="isSubmmit = false,productdescenglish.error = false" v-model="values.desc_en" required></textarea>
                <template v-if="isSubmmit && productdescenglish.error == true">
                    <p class="text-danger mt-1">{{productdescenglish.message}}</p>
                </template>
            </div>
        </div>
        <div class="p-3"> <!-- Main Category -->
            <!--  -------------------------------  Select field  --------------------------------------  -->
            <div :class="isSubmmit ? { 'has-error': productMcategory.error} : ''">
                <label for="main-category" class="ltr:mr-2 rtl:ml-2 mb-0">{{ t('pages.products_section.modals.main-category') }}</label>
                    <!-- searchable -->
                    <multiselect
                    id="main-category"
                    :disabled="loading_product"
                    :class="loading_product ? 'bg-white-dark opacity-30 text-black' : ''"
                    v-model="values.category.field"
                    :options="category_options.names" 
                    @click="isSubmmit = false,productMcategory.error = false"
                    @update:model-value="update_selected('category')"
                    class="custom-multiselect"
                    :searchable="true"
                    :loading="loading"
                    :placeholder="t('page-control.select-option')"
                    ></multiselect>
                <template v-if="isSubmmit && productMcategory.error == true">
                <p class="text-danger mt-1">{{productMcategory.message}}</p>
                </template>
            </div>
        </div>
        <div class="p-3"> <!-- Subcategory -->
            <!--  -------------------------------  Select field  --------------------------------------  -->
            <div :class="isSubmmit ? { 'has-error': productScategory.error} : ''">
                <label for="sub-category" class="ltr:mr-2 rtl:ml-2 mb-0">{{ t('pages.products_section.modals.sub-category') }}</label>
                    <!-- searchable -->
                    <multiselect
                    id="sub-category"
                    :disabled="loading_product"
                    :class="loading_product ? 'bg-white-dark opacity-30 text-black' : ''"
                    v-model="values.subcategory.field"
                    :options="subcategory_options.names"
                    @click="isSubmmit = false,productScategory.error = false"
                    @update:model-value="update_selected('subcategory')"
                    class="custom-multiselect"
                    :searchable="true"
                    :loading="loading_subcategory"
                    :placeholder="t('page-control.select-option')"
                    ></multiselect>
                <template v-if="isSubmmit && productScategory.error == true">
                <p class="text-danger mt-1">{{productScategory.message}}</p>
                </template>
            </div>
        </div>
        <div class="p-3"> <!-- Brand -->
            <!--  -------------------------------  Select field  --------------------------------------  -->
            <div :class="isSubmmit ? { 'has-error': productbrand.error} : ''">
                <label for="brand" class="ltr:mr-2 rtl:ml-2 mb-0">{{ t('pages.products_section.modals.brands') }}</label>
                    <!-- searchable -->
                    <multiselect
                    id="brand"
                    :disabled="loading_product"
                    :class="loading_product ? 'bg-white-dark opacity-30 text-black' : ''"
                    v-model="values.brand.field"
                    :options="brand_options.names"
                    @click="isSubmmit = false,productbrand.error = false"
                    @update:model-value="update_selected('brand')"
                    class="custom-multiselect"
                    :searchable="true"
                    :loading="loading_brand"
                    :placeholder="t('page-control.select-option')"
                    ></multiselect>
                <template v-if="isSubmmit && productbrand.error == true">
                <p class="text-danger mt-1">{{productbrand.message}}</p>
                </template>
            </div>
        </div>
    </div>
    <div class="p-3"> <!-- Is Available -->
        <label class="inline-flex">
            {{ t('pages.products_section.modals.add-available') }}
        </label>
        <div>
            <label class="p-3 inline-flex">
                <input type="radio" name="radio" :value="true" v-model="available"  class="form-radio text-success peer" />
                <span class="peer-checked:text-success">{{ t('page-control.yes') }}</span>
            </label>
            <label class="p-3 inline-flex">
                <input type="radio" name="radio" :value="false" v-model="available"  class="form-radio text-danger peer" />
                <span class="peer-checked:text-danger">{{ t('page-control.no') }}</span>
            </label>
        </div>
    </div>
    <!------------------------------------------------------------->
    <hr/> <!-- Main Image -->
    <div :class="isSubmmit ? { 'has-error': file.error } : ''">
                <div class="flex items-center">
                    <label for="ctnFile" class="ltr:mr-2 rtl:ml-2 mb-0 w-1/5">{{ t('pages.products_section.modals.main-image') }}</label>
                    <input id="ctnFile" type="file" @click="isSubmmit = false,file.error = false" :model-value="fileVal" @change="handleFileUpload"
                    class="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file:ml-5 file:text-white file:hover:bg-primary" required />
                </div>
                <template v-if="isSubmmit && file.error == true">
                    <p class="text-danger mt-1">{{file.message}}</p>
                </template>
    </div>
    <div class="mb-10">
        <div class="mt-8 border-slate-500 rounded-md drop-shadow-lg" v-if="imageUrl != ''">
            <img :src="imageUrl" class="rounded-md w-40">
        </div>
    </div>
</div>
<!-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
<storeItems v-if="pageType == 'Create'" :type="pageType" :value="values.store.field" @getUpdateItem="getUpdateStoreItem" />
<!--------------------------------------------------------------------------------------------------------------->
<imgColorCodeItems v-if="pageType == 'Create'" :type="pageType"  @getUpdateItem="getUpdateItem"/>
<!--------------------------------------------------------------------------------------------------------------->
<div  class="mt-5">
    <button type="button" @click="onSubmit" :disabled="loading_create" class="btn btn-primary !mt-6">
        <div v-if="pageType == 'Create'">
            <span v-if="loading_create == false">
                {{ t('page-control.add') }}
            </span>
            <span v-else>
                <IconRefresh class="animate-[spin_1s_linear_infinite] w-5 h-5" />
            </span>
        </div>
        <div v-else-if="pageType == 'Edit'">
            <span v-if="loading_create == false">{{ t('page-control.save-changes') }}</span>
                <span v-else>
                    <IconRefresh class="animate-[spin_1s_linear_infinite] w-5 h-5" />
            </span>
        </div>
    </button>
</div>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue';
    // Vue-Router
    import { useRouter } from 'vue-router'
    import { useI18n } from 'vue-i18n'
    import { useMeta } from '@/composables/use-meta';
    import { storeToRefs } from 'pinia'
    import { StoreItems, Items, item } from '../../../model/Classes'
     import storeItems from '@/components/storeItems.vue'
     import imgColorCodeItems from '@/components/imgColorCode.vue'
    import { validationStore } from '@/components/validation'
    import { useConnectionStore } from '../../../stores/module/DataModule'
    import IconRefresh from '@/components/icon/icon-refresh.vue';
    import IconX from '@/components/icon/icon-x.vue';
    // Multiselect
    import Multiselect from '@suadelabs/vue3-multiselect';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';

    export default defineComponent({
        props:['type','id'],
        components: {
            IconX,
            IconRefresh,
            imgColorCodeItems,
            storeItems,
            Multiselect
        },
    ////// Alert Window ///////////
    beforeMount() {
      window.addEventListener('beforeunload', this.preventNav)
    },
    beforeDestroy() {
      window.removeEventListener('beforeunload', this.preventNav)
    },
    beforeRouteLeave(to, from, next) {
      if (this.loadPage) {
        if (!window.confirm(this.t('page-control.delete.title') + ' ' + this.t('page-control.delete.unsave-data'))) {
          return
        }
      }
      next()
      window.removeEventListener('beforeunload', this.preventNav)
    },
    /////////////////
        setup(){
            useMeta({ title: 'Products List' });
        },
        computed: {
            fileVal(){
                if(this.pageType == 'Edit') return this.imageUrl
                else return this.image_file
            },
        },
        data(props){
            let image_file = ref<File | null>(null);
            let temp: item[] = []
            const ID = props.id
            const pageType = props.type
            const { t, locale } = useI18n()
            const router = useRouter()
            const DataStore = useConnectionStore()
            const validationForm = validationStore()
            const { isSubmmit, titlearabic, titleenglish, productdescarabic, productdescenglish, file,
                price, productmodel, productMcategory, productScategory, productbrand,
            } = storeToRefs(validationForm)
            const { productByID, brands, subcategories, categories, loading, imgLocation,
                loading_subcategory, loading_brand, loading_create, loading_product} = storeToRefs(DataStore)
            return{
                loadPage: true,
                t, router, locale,
                // Data Connection
                ID,
                pageType,
                productByID,
                categories,
                subcategories,
                brands,
                DataStore,
                imgLocation,
                loading,
                loading_brand,
                loading_create,
                loading_product,
                loading_subcategory,
                /// Variables
                values : { title_ar : '', title_en : '', desc_ar: '' , desc_en: '',
                price: 0, model: '', file: ref<File | null>(null), brand: { field: '' , id: 0 },
                store: { field: '' , storeitem: {}, vals: temp },
                category: { field: '' , id: 0}, subcategory: { field: '' , id: 0 },
                storeErrors: 0 , items : { vals: { images: [], colors: [], codes: [] } , Errors: 0}
                },
                image_file,
                available: true,
                imageUrl: '',
                brand_options: { ids: [], names: [] },
                category_options: { ids: [], names: [] },
                subcategory_options: { ids: [], names: [], categoryIds:[] },
                // Form Data
                formData: new FormData(),
                ///////// Validation  ////
                validationForm,
                isSubmmit, titlearabic, titleenglish,
                productdescarabic, productdescenglish, file,
                price, productmodel, productMcategory, 
                productScategory, productbrand,
                ///////////////
                isSubmmit_items: false,
            }
        },
        async mounted(){
            this.startPage()
        },
        methods:{
            intoArray(arr: item[]){
                let arr_warehouses = [{ id: 0, quantity: 0, alert_quantity: 0 }]
                for (let index = 0; index < arr.length; index++) {
                    if(arr_warehouses[index] != undefined){
                        arr_warehouses[index].id = arr[index].id
                        arr_warehouses[index].quantity = arr[index].quantity
                        arr_warehouses[index].alert_quantity = arr[index].alert_quantity
                    }else arr_warehouses.push({ id: arr[index].id, quantity: arr[index].quantity, alert_quantity: arr[index].alert_quantity })
                }
                return arr_warehouses
            },
            ////////// Manage Update Items ///////////////////
            getUpdateStoreItem(storename: string, storitem: any, arr: item[], storeitemsErrors: number){
                this.values.store.field = storename
                this.values.store.storeitem = storitem
                this.values.storeErrors = storeitemsErrors
                this.values.store.vals = arr
            },
            getUpdateItem(item: Items[], itemsErrors: number){
                this.values.items.vals.images = []
                this.values.items.vals.colors = []
                this.values.items.vals.codes = []
                for (let index = 0; index < item.length; index++) {
                    if(item[index].image != null){
                        this.values.items.vals.images.push(item[index].image)
                        if(item[index].color == '') this.values.items.vals.colors.push(null)
                        else this.values.items.vals.colors.push(item[index].color)
                        this.values.items.vals.codes.push(item[index].color_code)
                    }
                }
                this.values.items.Errors = itemsErrors
            },
            ////////////////////  Sending Data   //////////////////
            onSubmit(){
                this.loadPage = false
                var isValid = this.validationForm.checkProductInfo(this.pageType,this.values, this.imageUrl)
                if (isValid == 0) {
                    this.getData()
                    if (this.pageType == 'Create') { // Add New Product
                        this.DataStore.createData('Products', this.formData, 'CreateWithImg').then(() => {
                        this.ondismiss()
                        })
                    } else if(this.pageType == 'Edit') { // Edit Product
                        this.DataStore.updateData('Products', this.ID, this.formData, 'EditWithImg').then(() => {
                        this.ondismiss()
                        })
                    }
                }
            },
            // Prepare Data To Create New product
            getData(){
                let arr_images = []
                let arr_codes = []
                let arr_hex = []
                let arr_warehouses: any = this.intoArray(this.values.store.vals)
            if(this.pageType == 'Create'){
                for (let index = 0; index < this.values.items.vals.images.length; index++) {
                    arr_images.push(this.values.items.vals.images[index])
                }
                for (let index = 0; index < this.values.items.vals.codes.length; index++) {
                    arr_codes.push(this.values.items.vals.codes[index])
                }
                for (let index = 0; index < this.values.items.vals.codes.length; index++) {
                    arr_hex.push(this.values.items.vals.colors[index])
                }
                //this.formData.append('images', `${arr_images}`)
                for (let i = 0; i < arr_images.length; i++) {
                    this.formData.append(`images[${i}]`, arr_images[i]); // warehouses[${i}][id]
                }
                for (let i = 0; i < arr_codes.length; i++) {
                    this.formData.append(`color_codes[${i}]`, arr_codes[i]); // warehouses[${i}][id]
                }
                for (let i = 0; i < arr_hex.length; i++) {
                    this.formData.append(`hex[${i}]`, arr_hex[i]);
                }
                for (let i = 0; i < arr_warehouses.length; i++) {
                    this.formData.append(`warehouses[${i}][id]`, arr_warehouses[i].id); // warehouses[${i}][id]
                    this.formData.append(`warehouses[${i}][quantity]`, arr_warehouses[i].quantity);
                    this.formData.append(`warehouses[${i}][alert_quantity]`, arr_warehouses[i].alert_quantity);
                }
            }
            if (this.values.subcategory.id > 0) this.formData.append('sub_category_id', `${this.values.subcategory.id}`)
            if (this.values.brand.id > 0) this.formData.append('brand_id', `${this.values.brand.id}`)
            if (this.values.price > 0) this.formData.append('price', `${this.values.price}`)
            if (this.values.title_ar != '' || this.values.title_ar != null) this.formData.append('name_ar', this.values.title_ar)
            if (this.values.title_en != '' || this.values.title_en != null) this.formData.append('name_en', this.values.title_en)
            if (this.values.desc_ar != '' || this.values.desc_ar != null) this.formData.append('description_ar', this.values.desc_ar)
            if (this.values.desc_en != '' || this.values.desc_en != null) this.formData.append('description_en', this.values.desc_en)
            if (this.values.model != '' || this.values.model != null) this.formData.append('model', this.values.model)
            if (this.image_file != null) this.formData.append('main_image', this.image_file)
            if(this.available) this.formData.append('is_available', `${1}`)
            else this.formData.append('is_available', `${0}`)
            if(this.pageType == 'Edit') this.formData.append('_method', "PUT")

            // this.formData.forEach(element => {
            //     console.log(element)
            //     console.log('****************')
            // });

            },
        ///////////////////////////////////////  Start Page   ////////////////////////////
            startPage(){
                this.validationForm.clear()
                this.getData_ToOptions('Brands')
                this.getData_ToOptions('Categories')
                if(this.ID != 0 && this.ID != undefined && this.pageType == 'Edit'){
                    this.DataStore.getData('Products',this.ID, 'GETByID').then(() => {
                        this.values.title_ar = this.productByID.name_ar
                        this.values.title_en = this.productByID.name_en
                        this.values.desc_ar = this.productByID.description_ar
                        this.values.desc_en = this.productByID.description_en
                        this.values.price = this.productByID.price
                        this.values.model = this.productByID.model
                        this.values.brand.id = this.productByID.brand_id
                        this.values.brand.field = this.productByID.brand.name
                        if(this.productByID.is_available == 1) this.available = true
                        else this.available = false
                        
                        this.imageUrl = this.imgLocation + this.productByID.image
                        this.values.subcategory.id = this.productByID.sub_category_id
                        if(this.locale == 'eg') this.values.subcategory.field = this.productByID.subCategory.name_ar
                        if(this.locale == 'en') this.values.subcategory.field = this.productByID.subCategory.name_en
                    }).then(()=>{
                        this.values.category.field = this.category_options.names[0]
                        for (let index = 0; index < this.category_options.names.length; index++) {
                            if(this.category_options.names[index] == this.values.category.field){
                                this.getSubcategoryData(this.category_options.ids[index]).then(()=>{
                                    if(this.subcategory_options.ids.includes(this.values.subcategory.id)) {
                                        this.showCategoryInEdit(this.category_options.ids[index])
                                        this.showsubCategoryInEdit(this.values.subcategory.id)
                                    }
                                })
                            }
                        }
                    })
                }
            },
            showCategoryInEdit(id: number){
                for (let index = 0;  index < this.category_options.ids.length; index++) {
                    if(this.category_options.ids[index] == id){
                        this.values.category.field = this.category_options.names[index]
                    }
                }
            },
            showsubCategoryInEdit(id: number){
                for (let index = 0;  index < this.subcategory_options.ids.length; index++) {
                        if(this.subcategory_options.ids[index] == id &&
                           this.subcategory_options.categoryIds[index] == this.values.category.id){
                            this.values.subcategory.field = this.subcategory_options.names[index]
                        }
                }
            },
            ///////////////////Prevent Page From Loading/////////////
            preventNav(event) {
                if (!this.loadPage) return
                event.preventDefault()
                // Chrome requires returnValue to be set.
                event.returnValue = ''
            },
            ////////////////////////////////////////////////////////////////////////
            ////    Upload File And Preview The File In Image /////////////////////
            handleFileUpload(event: Event){
                this.isSubmmit = false
                this.file.error = false
                const target = event.target as HTMLInputElement;
                if (target.files) {
                    this.image_file = target.files[0]
                    this.values.file = this.image_file
                }
                this.uploadImage()
            },
            uploadImage() {
                if (this.image_file) {
                    this.imageUrl = URL.createObjectURL(this.image_file);
                }
            },
            ////////////////////////////////////////////////////////////////////////////////////////////////
            //////////////////////////////////// Brand - Category - Subcategory Connection /////////////////
            getData_ToOptions(type: string){
                this.DataStore.getData(type).then(() => {  // Brand_Store_Category Connection
                    if(type == 'Brands'){ // Data Connection Data into options object
                        this.brands.forEach(element => {
                            this.brand_options.ids.push(element.id)
                            this.brand_options.names.push(element.name)
                        });
                    }
                    if(type == 'Categories'){
                        this.categories.forEach(element => {
                            if(this.locale == 'eg') this.category_options.names.push(element.name_ar)
                            else if(this.locale == 'en') this.category_options.names.push(element.name_en)
                            this.category_options.ids.push(element.id)
                            
                        });
                    }
                })
            },
            async getSubcategoryData(id_category){
                this.DataStore.getData('SubCategories', id_category  , 'GET-byCategories' ).then(() => { // Subcategory Connection
                        this.subcategories.forEach(element => { // Subcategory Connection Data into Subcategory_options object
                            this.subcategory_options.ids.push(element.id)
                            this.subcategory_options.categoryIds.push(element.category_id)
                            if(this.locale == 'eg') this.subcategory_options.names.push(element.name_ar)
                            else if(this.locale == 'en') this.subcategory_options.names.push(element.name_en)
                        });
                })
            },
            update_selected(type: string){ // Every Select You Do.. Select Will Updated...
                if(type == 'category'){
                    for (let index = 0;  index < this.category_options.names.length; index++) {
                        if(this.category_options.names[index] == this.values.category.field){
                            this.values.category.id = this.category_options.ids[index]
                        }
                    }
                    this.values.subcategory.field = ''
                    this.subcategory_options = { ids: [], names: [], categoryIds:[] },
                    this.getSubcategoryData(this.values.category.id)
                }else if(type == 'subcategory'){
                    for (let index = 0;  index < this.subcategory_options.names.length; index++) {
                        if(this.subcategory_options.names[index] == this.values.subcategory.field &&
                           this.subcategory_options.categoryIds[index] == this.values.category.id){
                            this.values.subcategory.id = this.subcategory_options.ids[index]
                        }
                    }
                }else if(type == 'brand'){
                    for (let index = 0;  index < this.brand_options.names.length; index++) {
                        if(this.brand_options.names[index] == this.values.brand.field){
                            this.values.brand.id = this.brand_options.ids[index]
                        }
                    }
                }
            },
            ondismiss(){
                this.router.push({
                    name: 'products-list',
                })
            }
        }
    })
</script>