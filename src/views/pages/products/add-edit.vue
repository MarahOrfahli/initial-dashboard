<template>
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
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div class="p-3"> <!-- Title In Arabic -->
            <div :class="isSubmmit ? { 'has-error': errora } : ''">
                <div class="flex items-center">
                    <label for="title-arabic" class="ltr:mr-2 rtl:ml-2 mb-0">{{ t('pages.products_section.modals.title-arabic') }}</label>
                    <input id="title-arabic" type="text" :placeholder="t('pages.products_section.modals.enter-title')" 
                    class="form-input" @keyup="isSubmmit = false,errora = false" v-model="artitle" />
                </div>
                <template v-if="isSubmmit && errora == true">
                    <p class="text-danger mt-1">{{errorArabic}}</p>
                </template>
            </div>
        </div>
        <div class="p-3"> <!-- Title In English -->
            <div :class="isSubmmit ? { 'has-error': errorE } : ''">
                <div class="flex items-center">
                    <label for="title-english" class="ltr:mr-2 rtl:ml-2 mb-0">{{ t('pages.products_section.modals.title-english') }}</label>
                    <input id="title-english" type="text" :placeholder="t('pages.products_section.modals.enter-title')" 
                    class="form-input" @keyup="isSubmmit = false,errorE = false" v-model="entitle" />
                </div>
                <template v-if="isSubmmit && errorE == true">
                    <p class="text-danger mt-1">{{errorEnglish}}</p>
                </template>
            </div>
        </div>
        <div class="p-3"> <!-- Price -->
            <div :class="isSubmmit ? { 'has-error': errorp } : ''">
                <div class="flex items-center">
                    <label for="price" class="ltr:mr-2 rtl:ml-2 mb-0">{{ t('pages.products_section.fields.price') }}</label>
                    <input id="price" type="text" :placeholder="t('pages.products_section.modals.enter-price')" 
                    class="form-input" @keyup="isSubmmit = false,errorp = false" v-model="price" />
                </div>
                <template v-if="isSubmmit && errorp == true">
                    <p class="text-danger mt-1">{{errorPrice}}</p>
                </template>
            </div>
        </div>
        <div class="p-3"> <!-- Model -->
            <div :class="isSubmmit ? { 'has-error': errorm } : ''">
                <div class="flex items-center">
                    <label for="model" class="ltr:mr-2 rtl:ml-2 mb-0">{{ t('pages.products_section.fields.model') }}</label>
                    <input id="model" type="text" :placeholder="t('pages.products_section.modals.enter-model')" 
                    class="form-input" @keyup="isSubmmit = false,errorm = false" v-model="model" />
                </div>
                <template v-if="isSubmmit && errorm == true">
                    <p class="text-danger mt-1">{{errorModel}}</p>
                </template>
            </div>
        </div>
        <div class="p-3"> <!-- Description In Arabic -->
            <div :class="isSubmmit ? { 'has-error': errorad } : ''">
                <div class="flex items-center">
                    <label for="des-arabic" class="ltr:mr-2 rtl:ml-2 mb-0">{{ t('pages.products_section.modals.description-arabic') }}</label>
                    <textarea id="des-arabic" rows="3" :placeholder="t('pages.products_section.modals.enter-descripe-arabic')" 
                    class="form-textarea" @keyup="isSubmmit = false,errorad = false" v-model="ardesc" required></textarea>
                </div>
                <template v-if="isSubmmit && errorad == true">
                    <p class="text-danger mt-1">{{errorDescArabic}}</p>
                </template>
            </div>
        </div>
        <div class="p-3"> <!-- Description In English -->
            <div :class="isSubmmit ? { 'has-error': errorEd } : ''">
                <div class="flex items-center">
                    <label for="des-english" class="ltr:mr-2 rtl:ml-2 mb-0">{{ t('pages.products_section.modals.description-english') }}</label>
                    <textarea id="des-english" rows="3" :placeholder="t('pages.products_section.modals.enter-descripe-english')" 
                    class="form-textarea" @keyup="isSubmmit = false,errorEd = false" v-model="endesc" required></textarea>
                </div>
                <template v-if="isSubmmit && errorEd == true">
                    <p class="text-danger mt-1">{{errorDescEnglish}}</p>
                </template>
            </div>
        </div>
        <div class="p-3"> <!-- Main Category -->
            <!--  -------------------------------  Select field  --------------------------------------  -->
            <div :class="isSubmmit ? { 'has-error': errorMC} : ''">
                <div class="flex items-center">
                    <label for="main-category" class="ltr:mr-2 rtl:ml-2 mb-0">{{ t('pages.products_section.modals.main-category') }}</label>
                    <!-- searchable -->
                    <multiselect
                    id="main-category"
                    v-model="category"
                    :options="category_options.names" 
                    @click="isSubmmit = false,errorMC = false"
                    @update:model-value="update_selected('category')"
                    class="custom-multiselect"
                    :searchable="true"
                    :loading="loading"
                    :placeholder="t('pages.products_section.modals.select-option')"
                    ></multiselect>
                </div>
                <template v-if="isSubmmit && errorMC == true">
                <p class="text-danger mt-1">{{errorMC_Selection}}</p>
                </template>
            </div>
        </div>
        <div class="p-3"> <!-- Subcategory -->
            <!--  -------------------------------  Select field  --------------------------------------  -->
            <div :class="isSubmmit ? { 'has-error': errorSC} : ''">
                <div class="flex items-center">
                    <label for="sub-category" class="ltr:mr-2 rtl:ml-2 mb-0">{{ t('pages.products_section.modals.sub-category') }}</label>
                    <!-- searchable -->
                    <multiselect
                    id="sub-category"
                    v-model="subcategory"
                    :options="subcategory_options.names"
                    @click="isSubmmit = false,errorSC = false"
                    @update:model-value="update_selected('subcategory')"
                    class="custom-multiselect"
                    :searchable="true"
                    :loading="loading_subcategory"
                    :placeholder="t('pages.products_section.modals.select-option')"
                    ></multiselect>
                </div>
                <template v-if="isSubmmit && errorSC == true">
                <p class="text-danger mt-1">{{errorSC_Selection}}</p>
                </template>
            </div>
        </div>
        <div class="p-3"> <!-- Brand -->
            <!--  -------------------------------  Select field  --------------------------------------  -->
            <div :class="isSubmmit ? { 'has-error': errorb} : ''">
                <div class="flex items-center">
                    <label for="brand" class="ltr:mr-2 rtl:ml-2 mb-0">{{ t('pages.products_section.modals.brands') }}</label>
                    <!-- searchable -->
                    <multiselect
                    id="brand"
                    v-model="brand"
                    :options="brand_options.names"
                    @click="isSubmmit = false,errorb = false"
                    @update:model-value="update_selected('brand')"
                    class="custom-multiselect"
                    :searchable="true"
                    :loading="loading_brand"
                    :placeholder="t('pages.products_section.modals.select-option')"
                    ></multiselect>
                </div>
                <template v-if="isSubmmit && errorb == true">
                <p class="text-danger mt-1">{{errorBrand_Selection}}</p>
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
    <div :class="isSubmmit ? { 'has-error': errorF } : ''">
                <div class="flex items-center">
                    <label for="ctnFile" class="ltr:mr-2 rtl:ml-2 mb-0 w-1/5">{{ t('pages.products_section.modals.main-image') }}</label>
                    <input id="ctnFile" type="file" @click="isSubmmit = false,errorF = false" :model-value="fileVal" @change="handleFileUpload"
                    class="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file:ml-5 file:text-white file:hover:bg-primary" required />
                </div>
                <template v-if="isSubmmit && errorF == true">
                    <p class="text-danger mt-1">{{errorFile}}</p>
                </template>
    </div>
    <div class="mb-10 " >
        <div class="mt-8 border-slate-500 rounded-md drop-shadow-lg" v-if="imageUrl != ''">
            <img :src="imageUrl" class="rounded-md w-40">
        </div>
    </div>
</div>
<!-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
<div class="panel space-y-5 mt-5">
    <div class="mt-3 mb-3 text-xl">{{ t('pages.products_section.fields.add-product-store') }}</div>
        <div class="mt-8 mb-4">
            <div class="p-3 flex gap-3">
                <label class="inline-flex">
                    <input type="radio" :value="true" v-model="only_quantity" name="default_radio" class="form-radio" />
                    <span>اختيار قيمة محددة لكل مستودع على حدى</span>
                </label>
                <label class="inline-flex">
                    <input type="radio" :value="false" v-model="only_quantity" name="default_radio" class="form-radio" />
                    <span>اختيار قيمة لجميع المستودعات المختارة</span>
                </label>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div class="p-3">
                    <div v-if="!only_quantity" :class="isSubmmit ? { 'has-error': errorq } : ''">
                        <div class="flex items-center">
                            <label for="quantity" class="ltr:mr-2 rtl:ml-2 mb-0 w-3/4">ضع الكمية لجميع المستودعات</label>
                            <input id="quantity" type="number" :min="1"
                            class="form-input w-1/4" @keyup="addQuantitiesToStores" v-model="quantity"  @update:model-value="addQuantitiesToStores"/>
                        </div>
                        <template v-if="isSubmmit && errorq == true">
                            <p class="text-danger mt-1">{{errorQuantity}}</p>
                        </template>
                    </div>
                </div>
                <div class="p-3">
                    <div v-if="!only_quantity" :class="isSubmmit ? { 'has-error': erroraq } : ''">
                        <div class="flex items-center">
                            <label for="quantity" class="ltr:mr-2 rtl:ml-2 mb-0 w-3/4">اختر قيمة للتنبيه في حال وصول الكمية اليها</label>
                            <input id="quantity" type="number" :min="1"
                            class="form-input w-1/4" @keyup="addAlertQuantitiesToStores" v-model="alert_quantity"  @update:model-value="addAlertQuantitiesToStores"/>
                        </div>
                        <template v-if="isSubmmit && erroraq == true">
                            <p class="text-danger mt-1">{{errorAlertQuantity}}</p>
                        </template>
                    </div>
                </div>
                <div class="p-3">
                <!--  -------------------------------  Select field  --------------------------------------  -->
                <div :class="isSubmmit ? { 'has-error': errors} : ''">
                    <div class="flex items-center">
                        <label for="store" class="ltr:mr-2 rtl:ml-2 mb-0">{{ t('pages.products_section.modals.stores') }}</label>
                        <!-- searchable -->
                        <multiselect
                        id="store"
                        v-model="store"
                        :options="storesOption.names"
                        @click="isSubmmit = false,errors = false"
                        @update:model-value="update_selected('store')"
                        class="custom-multiselect"
                        :searchable="true"
                        :loading="loading_store"
                        :placeholder="t('pages.products_section.modals.select-option')"
                        ></multiselect>
                    </div>
                    <template v-if="isSubmmit && errors == true">
                    <p class="text-danger mt-1">{{errorstore_Selection}}</p>
                    </template>
                </div>
            </div>
        </div>
    </div>
    <div class="table-responsive drop-shadow-lg">
                        <table>
                            <thead>
                                <tr>
                                    <th class="w-40">Store Name</th>
                                    <th class="w-80">Alert notifications valus</th>
                                    <th class="w-10">Quantities</th>
                                    <th class="w-10"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-if="stores_items.length <= 1">
                                    <tr>
                                        <td colspan="2" class="!text-center font-semibold">{{ t('page-control.no-item') }}</td>
                                    </tr>
                                </template>
                                <template v-for="(item, i) in stores_items" :key="i">
                                    <tr v-if="item.id > 0" class="align-top">
                                        <td>
                                            <div class="p-3">
                                                <label><Strong>{{ item.name }}</Strong></label>
                                            </div>
                                        </td>
                                        <td>
                                            <div :class="isSubmmit_itemsStore ? { 'has-error': item.erroraq } : ''">
                                                <div class="flex items-center">
                                                    <input id="quantity" type="number" :min="1"
                                                    class="form-input w-32" @keyup="isSubmmit_itemsStore = false,item.erroraq = false" v-model="item.alert_quantity" :disabled="!only_quantity" />
                                                </div>
                                                <template v-if="isSubmmit_itemsStore && item.erroraq == true">
                                                    <p class="text-danger mt-1">{{item.errorAQ}}</p>
                                                </template>
                                            </div>
                                        </td>
                                        <td>
                                            <div :class="isSubmmit_itemsStore ? { 'has-error': item.errorq } : ''">
                                                <div class="flex items-center">
                                                    <input id="quantity" type="number" :min="1"
                                                    class="form-input w-32" @keyup="isSubmmit_itemsStore = false,item.errorq = false" v-model="item.quantity" :disabled="!only_quantity"/>
                                                </div>
                                                <template v-if="isSubmmit_itemsStore && item.errorq == true">
                                                    <p class="text-danger mt-1">{{item.error}}</p>
                                                </template>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="m-3">
                                                <button type="button" @click="removeItem(item,'stores')">
                                                    <icon-x class="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
<div class="panel space-y-5 mt-5">
    <div class="mt-3 mb-3 text-xl">{{ t('pages.products_section.fields.add-img-color-code') }}</div>
                <div class="mt-8">
                    <div class="table-responsive drop-shadow-lg">
                        <table>
                            <thead>
                                <tr>
                                    <th class="w-80">{{ t('page-control.img') }}</th>
                                    <th class="w-10">{{ t('pages.products_section.fields.color-code') }}</th>
                                    <th class="w-10">{{ t('pages.products_section.fields.color') }}</th>
                                    <th class="w-3">
                                        <div class="sm:mb-0 mb-6">
                                            <button type="button" class="btn btn-primary" @click="addItem('ICC')">{{ t('page-control.add-more') }}</button>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-if="items.length <= 0">
                                    <tr>
                                        <td colspan="4" class="!text-center font-semibold">{{ t('page-control.no-item') }}</td>
                                    </tr>
                                </template>
                                <template v-for="(item, i) in items" :key="i">
                                    <tr class="align-top">
                                        <td>
                                            <div :class="isSubmmit_items ? { 'has-error': item.errorF } : ''">
                                                <input id="ctnFile" type="file" @click="isSubmmit_items = false,item.errorF = false" :model-value="item.image" @change="handleFileUploadImage($event, item.id)"
                                                            class="form-input w-80 file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file:ml-5 file:text-white file:hover:bg-primary" required />
                                                        <template v-if="isSubmmit_items && item.errorF == true">
                                                            <p class="text-danger mt-1">{{item.errorFile_items}}</p>
                                                        </template>
                                            </div>
                                        </td>
                                        <td>
                                            <div :class="isSubmmit_items ? { 'has-error': item.error_code } : ''">
                                                <input type="number" @keyup="isSubmmit_items = false,item.error_code = false"
                                                class="form-input w-32" v-model="item.color_code" max="999"/>
                                                <template v-if="isSubmmit_items && item.error_code == true">
                                                    <p class="text-danger mt-1">{{ item.errorCode_items}}</p>
                                                </template>
                                            </div>
                                        </td>
                                        <td>
                                            <div :class="isSubmmit_items ? { 'has-error': item.error_color } : ''">
                                                <input type="color" class="form-input w-32 h-10"  v-model="item.color"/>
                                                <template v-if="isSubmmit_items && item.error_color == true">
                                                    <p class="text-danger mt-1">{{item.errorColor_items}}</p>
                                                </template>
                                            </div>
                                        </td>
                                        <td>
                                            <button v-if="item.id != 0" type="button" @click="removeItem(item,'ICC')">
                                                <icon-x class="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                    
                </div>
</div>
<div  class="mt-5">
    <button type="button" @click="onSubmit" class="btn btn-primary !mt-6">{{ t('page-control.add') }}</button>
</div>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue';
    // Vue-Router
    import { useRouter } from 'vue-router'
    import { useI18n } from 'vue-i18n'
    import { useMeta } from '@/composables/use-meta';
    import { storeToRefs } from 'pinia'
    import Swal from 'sweetalert2';
    import { Products } from '../../../model/Classes'
    import { useConnectionStore } from '../../../stores/module/DataModule'
    // Import Icons
    import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
    import IconCircleCheck from '@/components/icon/icon-circle-check.vue';
    import IconGallery from '@/components/icon/icon-gallery.vue';
    import IconXCircle from '@/components/icon/icon-x-circle.vue';
    import IconPlus from '@/components/icon/icon-plus.vue';
    import IconX from '@/components/icon/icon-x.vue';
    import IconEdit from '@/components/icon/icon-edit.vue';
    import IconEye from '@/components/icon/icon-eye.vue';
    // Multiselect
    import Multiselect from '@suadelabs/vue3-multiselect';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';

    export default defineComponent({
        props:['type','id'],
        components: {
            // Import Icons
            IconCircleCheck,
            IconTrashLines,
            IconGallery,
            IconXCircle,
            IconPlus,
            IconEdit,
            IconEye,
            IconX,
            ////////
            Multiselect,
            Swal
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
                if(this.ID != 0 && this.ID != undefined && this.pageType == 'Edit') return this.fileImg
                else return this.file
            },
        },
        data(props){
            let file = ref<File | null>(null);
            const fileImg = { name: 'image', url: '' }
            const ID = props.id
            const pageType = props.type
            const { t } = useI18n()
            const router = useRouter()
            const DataStore = useConnectionStore()
            const { stores, products, brands, subcategories, categories, loading,
                loading_subcategory, loading_brand, loading_store} = storeToRefs(DataStore)
            return{
                items: [{ id: 0, image: File, color_code: 0, color: '', errorF: false, error_color: false,
                error_code: false, errorFile_items: '', errorColor_items: '',  errorCode_items: ''}],
                stores_items: [{ id: 0, name: '', quantity: 0, alert_quantity: 0, storeID: 0, errorq: false,
                error: '', erroraq: false, errorAQ: ''}],
                fileImg,
                loadPage: true,
                t, router,
                // Data Connection
                ID,
                pageType,
                products,
                categories,
                subcategories,
                brands,
                stores,
                DataStore,
                loading,
                loading_brand,
                loading_store,
                loading_subcategory,
                /// Variables
                file,
                available: true,
                only_quantity: true,
                quantity: 1,
                alert_quantity: 1,
                imageUrl: '',
                artitle: '',
                ardesc: '',
                entitle: '',
                endesc: '',
                price: '',
                model: '',
                category: '',
                subcategory: '',
                brand: '',
                store: '',
                storeID: 0,
                brandID: 0,
                categoryID: 0,
                subcategoryID: 0,
                // Options For Select
                storesOption: { ids: [], names: [] },
                store_options: { ids: [], names: [] },
                brand_options: { ids: [], names: [] },
                category_options: { ids: [], names: [] },
                subcategory_options: { ids: [], names: [], categoryIds:[] },
                // Form Data
                formData: new FormData(),
                ///////// Validation  ////
                isSubmmit: false,
                isSubmmit_items: false,
                isSubmmit_itemsStore: false,
                errora: false,
                errorE: false,
                errorp: false,
                errorm: false,
                errorad: false,
                errorEd: false,
                errorMC: false,
                errorSC: false,
                errorb:false,
                errors: false,
                errorq: false,
                erroraq: false,
                errorF: false,
                ////// Error Messages
                errorArabic: '',
                errorEnglish: '',
                errorPrice: '',
                errorModel: '',
                errorQuantity: '',
                errorAlertQuantity: '',
                errorFile_items: '',
                errorColor_items: '',
                errorCode_items: '',
                errorDescArabic: '',
                errorDescEnglish: '',
                errorMC_Selection: '',
                errorSC_Selection: '',
                errorstore_Selection: '',
                errorBrand_Selection: '',
                errorFile: '',
                counter: 0,
            }
        },
        async mounted(){
            this.startPage()
        },
        methods:{
            ////////// Manage Items ( Stores )///////////////////
            addQuantitiesToStores(){
                if(!this.only_quantity && this.stores_items.length > 1){
                    for (let index = 1; index < this.stores_items.length; index++){
                    let theItems = this.stores_items[index]
                    theItems.quantity = this.quantity
                }
                }
                this.isSubmmit = false
                this.errorq = false
            },
            addAlertQuantitiesToStores(){
                if(!this.only_quantity && this.stores_items.length > 1){
                    for (let index = 1; index < this.stores_items.length; index++){
                    let theItems = this.stores_items[index]
                    theItems.alert_quantity = this.alert_quantity
                }
                }
                this.isSubmmit = false
                this.erroraq = false
            },
            itemsStore_formValidate(){
                let Error_Counter = 0
                this.isSubmmit_itemsStore = true
                for (let index = 0; index < this.stores_items.length; index++){
                    let theItems = this.stores_items[index]
                    if(theItems.quantity == 0){
                        theItems.errorq = true
                        theItems.error = 'Error'
                    } // alert_quantity
                    if(theItems.alert_quantity == 0){
                        theItems.erroraq = true
                        theItems.errorAQ = 'Error'
                    }
                }
                for (let index = 0; index < this.stores_items.length; index++) {
                    let theItems = this.stores_items[index]
                    if( theItems.errorq == true || theItems.erroraq == true ){
                        Error_Counter++
                    }
                }
                return Error_Counter
            },
            ////////// Manage Items ( Images-Colors-Codes )///////////////////
            items_formValidate(){
                let Error_Counter = 0
                this.isSubmmit_items = true
                for (let index = 0; index < this.items.length; index++) {
                    let theItems = this.items[index]
                    if(theItems.image == File || theItems.image == null){
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
                for (let index = 0; index < this.items.length; index++) {
                    let theItems = this.items[index]
                    if( theItems.errorF == true || theItems.error_code == true || theItems.error_color == true){
                        Error_Counter++
                    }
                }
                return Error_Counter
            },
            maxID(array: any){ // Help With Order The IDs.
                let maxId
                if (array && array.length) {
                    maxId = array.reduce((max: number, character: any) => 
                    (character.id > max ? character.id : max), array[0].id);
                }
                return maxId
            },
            addItem(type: string, storename = '', storeid = 0, valAQantity = 0, valQantity = 0){
                let item
                if(type == 'stores'){ // stores_items 
                    item = {
                        id: this.maxID(this.stores_items) + 1, name: storename, quantity: valQantity, erroraq: false, errorAQ: '',
                        alert_quantity: valAQantity, storeID: storeid, errorq: false, error: ''
                    }
                    if(this.itemsStore_formValidate()) this.stores_items.push(item);
                }else if(type == 'ICC'){ // ImagesColorsCodes_items
                    item = {
                        id: this.maxID(this.items) + 1, image: <File | null>(null), color_code: 0, color: '',
                        errorF: false, error_color: false, error_code: false,
                        errorFile_items: '', errorColor_items: '',  errorCode_items: ''
                    }
                    if(this.items_formValidate()) this.items.push(item);
                }
            },
            removeItem(item: any, type: string){
                if(type == 'stores') {
                    // Filter And Remove This item
                    this.stores_items = this.stores_items.filter((d: any) => d.id != item.id);
                    // Add The Item Again Into the Select...
                    this.storesOption.names.push(item.name)
                    this.storesOption.ids.push(item.id)
                }
                else if(type == 'ICC') this.items = this.items.filter((d: any) => d.id != item.id);
            },
            //////////////////////////////////////////////////////////////////////////////
            formValidate(){  // Validation Method
            this.isSubmmit = true
            if(this.artitle == ''){ // Title In Arabic
                this.errora = true
                this.errorArabic = this.t('pages.products_section.errors.arabic-empty')
            }else if(this.artitle.length > 29){
                this.errora = true
                this.errorArabic = this.t('page-control.error-length')
            } //////////////////////////
            if(this.entitle == ''){ // Title In English
                this.errorE = true
                this.errorEnglish = this.t('pages.products_section.errors.english-empty')
            }else if(this.entitle.length > 29){
                this.errorE = true
                this.errorEnglish = this.t('page-control.error-length')
            } //////////////////////////
            if(this.ardesc == ''){ // Description In Arabic
                this.errorad = true
                this.errorDescArabic = this.t('pages.products_section.errors.desc-arabic-empty')
            }else if(this.ardesc.length > 29){
                this.errorad = true
                this.errorDescArabic = this.t('page-control.error-length')
            } //////////////////////////
            if(this.endesc == ''){ // Description In English
                this.errorEd = true
                this.errorDescEnglish = this.t('pages.products_section.errors.desc-english-empty')
            }else if(this.endesc.length > 29){
                this.errorEd = true
                this.errorDescEnglish = this.t('page-control.error-length')
            } //////////////////////////
            if(this.price == ''){ // Price
                this.errorp = true
                this.errorPrice = this.t('pages.products_section.errors.price')
            }else if(this.price.length > 29){
                this.errorp = true
                this.errorPrice = this.t('page-control.error-length')
            } //////////////////////////
            if(this.model == ''){ // Model
                this.errorm = true
                this.errorModel = this.t('pages.products_section.errors.model')
            }else if(this.model.length > 29){
                this.errorm = true
                this.errorModel = this.t('page-control.error-length')
            } //////////////////////////
            if(this.brand == '' && this.brandID == 0){ // Brand (Select)
                this.errorb = true
                this.errorBrand_Selection = this.t('pages.products_section.errors.brand')
            }//////////////////////////
            if(this.store == '' && this.storeID == 0){ // Store (Select)
                this.errors = true
                this.errorstore_Selection = this.t('pages.products_section.errors.brand')
            }//////////////////////////
            if(this.category == '' && this.categoryID == 0){ // Category (Select)
                this.errorMC = true
                this.errorMC_Selection = this.t('pages.products_section.errors.category')
            }//////////////////////////
            if(this.subcategory == '' && this.subcategoryID == 0){ // Subcategory (Select)
                this.errorSC = true
                this.errorSC_Selection = this.t('pages.products_section.errors.subcategory')
            }//////////////////////////
            if(this.fileVal == null){
                this.errorF = true
                this.errorFile = this.t('pages.products_section.errors.upload')
            }
            if (this.errora == true || this.errorE == true|| this.errorm == true || this.errorMC == true ||
            this.errorad == true || this.errorEd == true|| this.errorb == true || this.errorF == true || 
            this.errorSC == true || this.errorp == true
            ) {
                this.counter++
            } else {
                this.counter = 0
            }
            return this.counter
        }, ////////////////////        Sending Data   //////////////////
            onSubmit(){
                this.loadPage = false
                var isValid = this.formValidate()
                if (isValid == 0) {
                this.getData()
                if (this.ID === 0) { // Add New Product
                    this.DataStore.createData('Products', this.formData, 'CreateWithImg').then(() => {
                    this.$emit('load-data')
                    this.ondismiss()
                    })
                } else { // Edit Product
                    this.DataStore.updateData('Products', this.ID, this.formData, 'EditWithImg').then(() => {
                    this.$emit('load-data')
                    this.ondismiss()
                    })
                }
                }
            },
            // Prepare Data To Create New Brand
            getData(){
            //if (this.name != '' && this.name != null) this.formData.append('name', this.name)
            if (this.file != null) this.formData.append('logo', this.file)
            if(this.pageType == 'Edit') this.formData.append('_method', "PUT")
            },
        ///////////////////////////////////////  Start Page   ////////////////////////////
            startPage(){
                this.getCategoryData()
                this.getBrandData()
                this.getStoreData()
                if(this.ID != 0 && this.ID != undefined && this.pageType == 'Edit'){
                    // this.DataStore.getData('Products',this.ID ).then(() => {
                    //     this.artitle = this.products.name_ar
                    //     this.entitle = this.products.name_en
                    //     this.ardesc = this.products.description_ar
                    //     this.endesc = this.products.description_en
                    //     this.price = this.products.price
                    //     this.model = this.products.model
                    //     this.brandID = this.products.brand_id
                    //     this.available = this.products.is_available
                    //     this.fileImg.url = this.products.image
                    //     this.subcategoryID = this.products.sub_category_id
                    // }).then(()=>{
                    //     for (let index = 0;  index < this.category_options.names.length; index++) {
                    //         if(this.category_options.names[index] == this.category){
                    //             this.getSubcategoryData(this.category_options.ids[index]).then(()=>{
                    //                 if(this.subcategory_options.ids.includes(this.subcategoryID)) {
                    //                     this.showCategoryInEdit(this.category_options.ids[index])
                    //                     this.showsubCategoryInEdit(this.subcategoryID)
                    //                     return
                    //                 }
                    //             })
                    //         }
                    //     }
                    // })
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
                this.errorF = false
                const target = event.target as HTMLInputElement;
                if (target.files) {
                    this.file = target.files[0]
                }
                this.uploadImage()
            },
            uploadImage() {
                if (this.file) {
                    this.imageUrl = URL.createObjectURL(this.file);
                }else if(this.fileImg.url != '') this.imageUrl = this.fileImg.url
            },
            //////////// Solution For Uploading File Into Array
            handleFileUploadImage(event: Event, itemsId: number ){
                const target = event.target as HTMLInputElement;
                if (target.files) {
                    this.items[itemsId].image = target.files[0]
                }
            },
            ////////////////////////////////////////////////////////////////////////////////////////////////
            //////////////////////////////////// Brand - Category - Subcategory Connection /////////////////
            getStoreData(){
                this.DataStore.getData('Store').then(() => {  // Brand Connection
                    this.stores.forEach(element => {  // Brand Connection Data into store_options object
                        this.store_options.ids.push(element.id)
                        this.store_options.names.push(element.name)
                    });
                }).then(()=>{
                    this.storesOption = this.store_options
                })
            },
            getBrandData(){
                this.DataStore.getData('Brands').then(() => {  // Brand Connection
                    this.brands.forEach(element => {  // Brand Connection Data into brand_options object
                        this.brand_options.ids.push(element.id)
                        this.brand_options.names.push(element.name)
                    });
                })
            },
            getCategoryData(){
                this.DataStore.getData('Categories').then(() => { // Category Connection
                    this.categories.forEach(element => { // Category Connection Data into Category_options object
                        let name = element.name_ar + '-' + element.name_en
                        this.category_options.ids.push(element.id)
                        this.category_options.names.push(name)
                    });
                })
            },
            async getSubcategoryData(id_category){
                this.DataStore.getData('SubCategories', id_category  , 'GET-byCategories' ).then(() => { // Subcategory Connection
                        this.subcategories.forEach(element => { // Subcategory Connection Data into Subcategory_options object
                            let name = element.name_ar + '-' + element.name_en
                            let cat_name = element.category_name_ar + '-' + element.category_name_en
                            this.subcategory_options.ids.push(element.id)
                            this.subcategory_options.categoryIds.push(element.category_id)
                            this.subcategory_options.names.push(name)
                        });
                })
            },
            showCategoryInEdit(id: number){
                for (let index = 0;  index < this.category_options.ids.length; index++) {
                    if(this.category_options.ids[index] == id){
                        this.category = this.category_options.names[index]
                    }
                }
            },
            showsubCategoryInEdit(id: number){
                for (let index = 0;  index < this.subcategory_options.ids.length; index++) {
                    if(this.subcategory_options.ids[index] == id){
                        this.subcategory = this.subcategory_options.names[index]
                    }
                }
            },
            update_selected(type: string){ // Every Select You Do.. Select Will Updated...
                if(type == 'category'){
                    for (let index = 0;  index < this.category_options.names.length; index++) {
                        if(this.category_options.names[index] == this.category){
                            this.categoryID = this.category_options.ids[index]
                        }
                    }
                    this.subcategory = ''
                    this.subcategory_options = { ids: [], names: [], categoryIds:[] },
                    this.getSubcategoryData(this.categoryID)
                }else if(type == 'subcategory'){
                    for (let index = 0;  index < this.subcategory_options.names.length; index++) {
                        if(this.subcategory_options.names[index] == this.subcategory &&
                           this.subcategory_options.categoryIds[index] == this.categoryID){
                            this.subcategoryID = this.subcategory_options.ids[index]
                        }
                    }
                }else if(type == 'brand'){
                    for (let index = 0;  index < this.brand_options.names.length; index++) {
                        if(this.brand_options.names[index] == this.brand){
                            this.brandID = this.brand_options.ids[index]
                        }
                    }
                }else if(type == 'store'){
                    let id
                    if(!this.only_quantity && this.quantity == 0) this.quantity  = 1
                    if(!this.only_quantity && this.alert_quantity == 0) this.alert_quantity  = 1
                    for (let index = 0;  index < this.storesOption.names.length; index++) {
                        if(this.storesOption.names[index] == this.store){
                            id = this.storesOption.ids[index]
                            this.addItem('stores', this.store, this.storesOption.ids[index],this.alert_quantity, this.quantity  )
                            this.storesOption.names = this.storesOption.names.filter(item => item !== this.store)
                            this.storesOption.ids = this.storesOption.ids.filter(item => item !== id)
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