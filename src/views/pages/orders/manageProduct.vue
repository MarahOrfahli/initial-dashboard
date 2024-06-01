<template>
    <!-- 
        All Inputs:
        - Select Brand
        - Select & Search For A Product
        - Product Price (Disabled)
        - Color.. As a string
        - Quantity
        - Notes...
     -->
    <div class="space-y-5">
        <!--  -------------------------------  Select Brand field  --------------------------------------  -->
        <div :class="isSubmmit ? { 'has-error': brandSelect.error } : ''">
            <label for="select">{{ t('pages.brand.fields.brand-name') }}</label>
            <!-- searchable -->
            <multiselect
            id="select"
            v-model="values.brand"
            :options="brandOption.names"
            @click="isSubmmit = false,brandSelect.error = false"
            @update:model-value="updateSelected('Brand')"
            class="custom-multiselect"
            :searchable="true"
            no-result-text="no data"
            :loading="loading_brand || loading_getProduct"
            :disabled="loading_brand || loading_getProduct"
            :placeholder="t('page-control.select-option')"
            >
        </multiselect>
            <template v-if="isSubmmit && brandSelect.error == true">
            <p class="text-danger mt-1">{{brandSelect.message}}</p>
            </template>
        </div>
         <!-------------------------------------------------------------------------------------------->
        <!--  -------------------------------  Select field  --------------------------------------  -->
        <div :class="isSubmmit ? { 'has-error': productSelect.error } : ''">
            <label for="select">{{ t('pages.products_section.fields.product') }}</label>
            <!-- searchable -->
            <multiselect
            id="select"
            v-model="values.product"
            :options="productOption.names"
            @click="isSubmmit = false,productSelect.error = false"
            @update:model-value="updateSelected('Product')"
            class="custom-multiselect"
            :searchable="true"
            no-result-text="no data"
            :loading="loading_product_brand || loading_getProduct"
            :disabled="loading_product_brand || loading_getProduct"
            :placeholder="t('page-control.select-option')"
            >
        </multiselect>
            <template v-if="isSubmmit && productSelect.error == true">
            <p class="text-danger mt-1">{{productSelect.message}}</p>
            </template>
        </div>
        <!--  -------------------------------  price input field  --------------------------------------  -->
             <div :class="isSubmmit ? { 'has-error': price.error } : ''">
            <label for="price">{{ t('pages.products_section.fields.productprice') }}</label>
            <input id="price" type="number" :placeholder="t('pages.products_section.fields.productprice')" class="form-input" 
            @update:model-value="isSubmmit = false,price.error  = false" v-model="values.price" :min="1" />
            <template v-if="isSubmmit && price.error  == true">
            <p class="text-danger mt-1">{{price.message}}</p>
            </template>
        </div>
        <!---------------------------------------------------------------------------------------------------------->
        <!--  -------------------------------  Color input field  --------------------------------------  -->
        <label for="color">{{ t('pages.products_section.fields.colordegree') }}</label>
            <input id="color" type="number" :placeholder="t('pages.products_section.fields.colordegree')" class="form-input" 
            @keyup="isSubmmit = false" v-model="values.color" :min="1" />
        <!---------------------------------------------------------------------------------------------------------->
        <!--  -------------------------------  quantity input field  --------------------------------------  -->
        <div :class="isSubmmit ? { 'has-error': Quantity.error } : ''">
            <label for="quantity">{{ t('pages.store.fields.quantity') }}</label>
            <input id="quantity" type="number" :placeholder="t('pages.store.fields.quantity')" class="form-input" 
            @keyup="isSubmmit = false,Quantity.error  = false" v-model="values.quantity" :min="1" />
            <template v-if="isSubmmit && Quantity.error  == true">
            <p class="text-danger mt-1">{{Quantity.message}}</p>
            </template>
        </div>
        <!---------------------------------------------------------------------------------------------------------->
        <!--  -------------------------------  Note input field  --------------------------------------  -->
        <div>
            <label for="des-arabic" class="ltr:mr-2 rtl:ml-2 mb-0">{{ t('pages.orders.fields.note') }}</label>
                <textarea id="des-arabic"
                :placeholder="t('pages.orders.fields.note')" 
                class="form-textarea" v-model="values.note"></textarea>
        </div>
        <!---------------------------------------------------------------------------->
        <div class="flex justify-end items-center mt-8">
            <button type="button" @click="saveInfo" :disabled="loading" class="btn btn-primary ltr:ml-4 rtl:mr-4">
                <div v-if="ID == 0">
                    <span v-if="loading == false">
                        {{ t('page-control.add') }}
                    </span>
                    <span v-else>
                        <IconRefresh class="animate-[spin_1s_linear_infinite] w-5 h-5" />
                    </span>
                </div>
                <div v-else-if="ID != 0">
                    <span v-if="loading == false">{{ t('page-control.save-changes') }}</span>
                    <span v-else>
                        <IconRefresh class="animate-[spin_1s_linear_infinite] w-5 h-5" />
                    </span>
                </div>
            </button>
            <button type="button" @click="ondismiss" class="btn btn-outline-danger ltr:ml-4 rtl:mr-4">
                {{ t('page-control.cancel') }}
            </button>
        </div>
    </div>
</template>
<script lang="ts">

import { defineComponent } from 'vue';
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { validationStore } from '@/components/validation'
import { useConnectionStore } from '../../../stores/module/DataModule'
import { useMeta } from '@/composables/use-meta';
import IconRefresh from '@/components/icon/icon-refresh.vue';
import Multiselect from '@suadelabs/vue3-multiselect';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';

export default defineComponent({
    props: ['dataid','data'],
    emits: ['close', 'load-data'],
    components: {
        Multiselect,
        IconRefresh
    },
    setup(){
            useMeta({ title: 'Manage Product' });
    },
    data(props){
        // Item ID
        const ID = props.dataid
        let orderID = props.data.orderID
        let productID = props.data.productID
        let dataItem = props.data.dataItem
        const DataStore = useConnectionStore()
        const validationForm = validationStore()
        const { isSubmmit, Quantity, brandSelect, productSelect, price } = storeToRefs(validationForm)
        const { brands, products, loading_brand, productByBrand, loading, itemByOrder, loading_product_brand } = storeToRefs(DataStore)
        const { t, locale } = useI18n()
        return{
            /// Data Connection
            productByBrand, loading,
            loading_product_brand,
            loading_brand,
            itemByOrder,
            dataItem,
            brands,
            products,
            orderID,
            productID,
            DataStore,
            //// 
            loading_getProduct: false,
            ID, t, locale,
            categoryID: 0,
            values: { 
                brand: '', brandID: 0, product: '', productID: 0, price: '' , color: '',
                quantity: '', note: ''
            },
            brandOption: { ids: [], names: [] },
            productOption: { ids: [], names: [], prices: [] },
            ///////// Validation  ////
            isSubmmit,
            validationForm,
            Quantity,
            price,
            brandSelect,
            productSelect,
        }
    },
    async mounted(){
        this.startPage()
     },
    methods: {
        updateSelected(type: string){
            if(type == 'Brand'){
                for (let index = 0;  index < this.brandOption.names.length; index++) {
                    if(this.brandOption.names[index] == this.values.brand){
                        this.values.brandID = this.brandOption.ids[index]
                    }
                }
                this.getProductByBrand()
            }else if(type == 'Product'){
                for (let index = 0;  index < this.productOption.names.length; index++) {
                    if(this.productOption.names[index] == this.values.product){
                        this.values.productID = this.productOption.ids[index]
                        this.values.price = this.productOption.prices[index]
                    }
                }
            }
        },
        startPage(){
            this.validationForm.clear()
            this.getBrand()
        },
        async getProduct(){
            this.DataStore.getData('Products').then(()=>{
                this.productOption.ids = []
                this.productOption.names = []
                this.productOption.prices = []
                this.products.forEach(element => {
                    this.productOption.ids.push(element.id)
                    this.productOption.prices.push(element.price)
                    if(this.locale == 'eg') this.productOption.names.push(element.name_ar)
                    else if(this.locale == 'en') this.productOption.names.push(element.name_en)
                    if(element.id == this.productID) {
                        this.values.productID = this.productID
                        if(this.locale == 'eg') this.values.product = element.name_ar
                        else if(this.locale == 'en') this.values.product = element.name_en
                    }
                });
                for (let index = 0; index < this.products.length; index++) {
                    if(this.products[index].id == this.productID){
                        for (let index = 0;  index < this.brandOption.names.length; index++) {
                            if(this.brandOption.ids[index] == this.products[index].brand_id){
                                this.values.brandID = this.brandOption.ids[index]
                                this.values.brand = this.brandOption.names[index]
                            }
                        }
                    }
                }
                this.values.color = this.dataItem.code
                this.values.price = this.dataItem.price
                this.values.note = this.dataItem.note
                this.values.quantity = this.dataItem.quantity
                this.loading_getProduct = false
            })
        },
        async getProductByBrand(){
            this.DataStore.getData('Products', this.values.brandID, 'GetByBrand').then(() => {
                this.productOption.ids = []
                this.productOption.names = []
                this.productOption.prices = []
                this.productByBrand.forEach(element => {
                    this.productOption.ids.push(element.id)
                    this.productOption.prices.push(element.price)
                    if(this.locale == 'eg') this.productOption.names.push(element.name_ar)
                    else if(this.locale == 'en') this.productOption.names.push(element.name_en)
                });
            })
        },
        async getBrand(){
            if(this.ID != 0) this.loading_getProduct = true
            this.DataStore.getData('Brands').then(() => {
                this.brands.forEach(element => {
                    this.brandOption.ids.push(element.id)
                    this.brandOption.names.push(element.name)
                });
                if(this.ID == 0) {
                    this.values.brandID = this.brandOption.ids[0]
                    this.values.brand = this.brandOption.names[0]
                    this.getProductByBrand()
                }else{
                    this.getProduct()
                }
            })
        },
        saveInfo(){
            let color_code
            if(parseInt(this.values.color) > 0 ){
                color_code = parseInt(this.values.color)
            }else color_code = null
            // Use JSON Data To Submit The Data Into Database
            let data = {
                order_id: parseInt(this.orderID),
                product_price : parseInt(this.values.price),
                quantity : this.values.quantity,
                product_id : this.values.productID,
                color : color_code,
                note : this.values.note
            }
            var isValid = this.validationForm.checkProduct_BrandInfo(this.values)
            if (isValid == 0) {
                if (this.ID == 0) { // Create Data
                    this.DataStore.createData('Orders', data,'CreateItem').then(() => {
                    this.$emit('load-data')
                    this.ondismiss()
                    })
                } else if (this.ID > 0) { // Update Data
                    this.DataStore.updateData('Orders', this.ID, data, 'EditItem').then(() => {
                    this.$emit('load-data')
                    this.ondismiss()
                    })
                }
            }
        },
        ondismiss() {
        this.$emit('close')
        },
    }
})


</script>