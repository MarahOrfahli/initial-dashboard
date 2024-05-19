<template>
    <!-- 
        All Inputs:
        - Client Name
        - Select Shipping Company
        - Select Status
        - Price
        - Shipping Date
        - Order Date
        - Delivery Date
        - Discount CheckBox
        - Note
     -->
    <div class="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
        <div class="flex items-center gap-2"></div>
        <div class="ltr:ml-auto rtl:mr-auto">
            <router-link to="/pages/orders/list" class="btn btn-secondary gap-2">
                {{ t('pages.orders.fields.back-order') }}
            </router-link>
        </div>
    </div>
    <div class="panel space-y-5">
        <div class=" text-xl">
            <strong v-if="pageType == 'Create'">{{ t('pages.orders.modals.add-new-order') }}</strong>
            <strong v-if="pageType == 'Edit'">{{ t('pages.orders.modals.edit-order') }}</strong>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <!--  ------------------------------- Client Name Select field  --------------------------------------  -->
            <div class="p-3">
                <div :class="isSubmmit ? { 'has-error': name.error } : ''">
                    <label for="name">{{ t('pages.customer.fields.name') }}</label>
                    <multiselect
                    id="name"
                    v-model="values.client_name"
                    :options="clientOption.names"
                    @click="isSubmmit = false,name.error = false"
                    @update:model-value="update_selected('client')"
                    class="custom-multiselect"
                    :searchable="true"
                    :loading="loading_client"
                    :placeholder="t('page-control.select-option')"
                    ></multiselect>
                    <template v-if="isSubmmit && name.error == true">
                    <p class="text-danger mt-1">{{name.message}}</p>
                    </template>
                </div>
            </div>
        <!---------------------------------------------------------------------------------------------------------->
        <!--  -------------------------------  Shipping Company Select field  --------------------------------------  -->
        <div class="p-3">
                <div :class="isSubmmit ? { 'has-error': shipping_name.error } : ''">
                    <label for="shi-name">{{ t('pages.orders.fields.car') }}</label>
                    <multiselect
                    id="shi-name"
                    v-model="values.company_name"
                    :options="clientOption.names"
                    @click="isSubmmit = false,shipping_name.error = false"
                    @update:model-value="update_selected('client')"
                    class="custom-multiselect"
                    :searchable="true"
                    :loading="loading"
                    :placeholder="t('page-control.select-option')"
                    ></multiselect>
                    <template v-if="isSubmmit && shipping_name.error == true">
                    <p class="text-danger mt-1">{{shipping_name.message}}</p>
                    </template>
                </div>
            </div>
        <!-------------------------------------------------------------------------------------------->
        <!--  -------------------------------  Status Select field  ------------------------------  -->
        <div class="p-3">
                <div :class="isSubmmit ? { 'has-error': status.error } : ''">
                    <label for="Status">{{ t('pages.orders.fields.status') }}</label>
                    <multiselect
                    id="Status"
                    v-model="values.status"
                    :options="statusOption.names"
                    @click="isSubmmit = false,status.error = false"
                    @update:model-value="update_selected('client')"
                    class="custom-multiselect"
                    :searchable="true"
                    :loading="loading_status"
                    :placeholder="t('page-control.select-option')"
                    ></multiselect>
                    <template v-if="isSubmmit && status.error == true">
                    <p class="text-danger mt-1">{{status.message}}</p>
                    </template>
                </div>
            </div>
        <!-------------------------------------------------------------------------------------------->
        <!--  -------------------------------  Price field  ------------------------------  -->
        <div class="p-3"> <!-- Price -->
            <div :class="isSubmmit ? { 'has-error': price.error } : ''">
                <label for="price" class="ltr:mr-2 rtl:ml-2 mb-0">{{ t('pages.products_section.fields.price') }}</label>
                <input id="price" type="number" :placeholder="t('pages.products_section.modals.enter-price')" 
                class="form-input" @keyup="isSubmmit = false,price.error = false" v-model="values.price" />
                <template v-if="isSubmmit && price.error == true">
                    <p class="text-danger mt-1">{{price.message}}</p>
                </template>
            </div>
        </div>
        <!-------------------------------------------------------------------------------------------->
        <!--  -------------------------------  Shipping Date field  ------------------------------  -->
        <div class="p-3"> <!-- Price -->
            <div :class="isSubmmit ? { 'has-error': shipping_date.error } : ''">
            <label for="startDate" class="flex-1 ltr:mr-2 rtl:ml-2 mb-0">{{ t('pages.orders.fields.shipping-date') }}</label>
            <flat-pickr id="startDate" v-model="values.shippingDate" class="form-input" @click="isSubmmit = false,shipping_date.error = false"  :config="config"></flat-pickr>
            <template v-if="isSubmmit && shipping_date.error == true">
                <p class="text-danger mt-1">{{shipping_date.message}}</p>
            </template>
            </div>
        </div>
        <!-------------------------------------------------------------------------------------------->
        <!--  -------------------------------  Order Date field  ------------------------------  -->
        <div class="p-3"> <!-- Price -->
            <div :class="isSubmmit ? { 'has-error': order_date.error } : ''">
            <label for="startDate" class="flex-1 ltr:mr-2 rtl:ml-2 mb-0">{{ t('pages.orders.fields.order-date') }}</label>
            <flat-pickr id="startDate" v-model="values.orderDate" class="form-input" @click="isSubmmit = false,order_date.error = false"  :config="config"></flat-pickr>
            <template v-if="isSubmmit && order_date.error == true">
                <p class="text-danger mt-1">{{order_date.message}}</p>
            </template>
            </div>
        </div>
        <!-------------------------------------------------------------------------------------------->
        <!--  -------------------------------  Delivery Date field  ------------------------------  -->
        <div class="p-3">
            <div :class="isSubmmit ? { 'has-error': delivery_date.error } : ''">
            <label for="startDate" class="flex-1 ltr:mr-2 rtl:ml-2 mb-0">{{ t('pages.orders.fields.delivery-date') }}</label>
            <flat-pickr id="startDate" v-model="values.deliveryDate" class="form-input" @click="isSubmmit = false,delivery_date.error = false"  :config="config"></flat-pickr>
            <template v-if="isSubmmit && delivery_date.error == true">
                <p class="text-danger mt-1">{{delivery_date.message}}</p>
            </template>
            </div>
        </div>
        <!--------------CheckBox--------------->
        <div class="p-7">
            <div class="inline-flex">
                <label for="check" class="flex-1 ltr:mr-2 rtl:ml-2 mb-0">{{ t('pages.orders.fields.discount') }}</label>
                <input id="check" type="checkbox" v-model="values.isDiscount" class="form-checkbox rounded-full" />
            </div>
        </div>
        <!-----------------------------------Note---------------------------------------->
        <div class="p-3">
            <label for="note" class="ltr:mr-2 rtl:ml-2 mb-0">{{ t('pages.orders.fields.note') }}</label>
            <textarea id="note" rows="3" :placeholder="t('pages.orders.modals.enter-note')" 
            class="form-textarea" v-model="values.note" required></textarea>
        </div>
    </div>
        <!--------------------------------------------->
        <div class="flex justify-end items-center mt-8">
            <button type="button" @click="saveInfo" class="btn btn-primary ltr:ml-4 rtl:mr-4">
                <div v-if="pageType == 'Create'">
                    <span v-if="loading == false">
                        {{ t('page-control.add') }}
                    </span>
                    <span v-else>
                        <IconRefresh class="animate-[spin_1s_linear_infinite] w-5 h-5" />
                    </span>
                </div>
                <div v-else-if="pageType == 'Edit'">
                    <span v-if="loading == false">{{ t('page-control.save-changes') }}</span>
                    <span v-else>
                        <IconRefresh class="animate-[spin_1s_linear_infinite] w-5 h-5" />
                    </span>
                </div>
            </button>
            <button type="button" @click="ondismiss" class="btn btn-outline-danger ltr:ml-4 rtl:mr-4">{{ t('page-control.cancel') }}</button>
        </div>
    </div>
</template>
<script lang="ts">

import { ref, defineComponent } from 'vue';
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import IconRefresh from '@/components/icon/icon-refresh.vue';
import { validationStore } from '@/components/validation'
import { useConnectionStore } from '../../../stores/module/DataModule'
import { useMeta } from '@/composables/use-meta';
// Multiselect
import Multiselect from '@suadelabs/vue3-multiselect';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
//flatpickr
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { useAppStore } from '@/stores/index';

export default defineComponent({
    props:['type','id'],
    components: {
        Multiselect,
        IconRefresh,
        flatPickr
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
            useMeta({ title: 'Add-Edit Order' });
    },
    computed: { },
    data(props){
       const ID = props.id
        const pageType = props.type
        const store = useAppStore();
        const config: any = ref({
            dateFormat: 'Y-m-d',
            minDate: new Date(),
            position: store.rtlClass === 'rtl' ? 'auto right' : 'auto left',
        });
        const DataStore = useConnectionStore()
        const validationForm = validationStore()
            const { isSubmmit, status, price, name, shipping_name, shipping_date,
                order_date, delivery_date
             } = storeToRefs(validationForm)
        const { loading, imgLocation, loading_client, loading_status } = storeToRefs(DataStore)
        const { t } = useI18n()
        return{
            loadPage: true,
            /////////////////
            t,config,
            // Data Connection
            pageType,
            imgLocation,
            DataStore,
            loading,
            loading_client,
            loading_status,
            ///////
            ID,
            clientOption: { ids: [], names: [] },
            areasOption: { ids: [], names: [] },
            statusOption: { ids: [], names: [] },
            values: {
                client_name: '',
                company_name: '',
                shippingDate: new Date(),
                orderDate: new Date(),
                deliveryDate: new Date(),
                isDiscount: false,
                status: '',
                price: 0,
                note: ''
            },
            formData: new FormData(),
            ///////// Validation  ////
            isSubmmit,
            validationForm,
            status,
            price,
            name,
            shipping_name,
            shipping_date,
            order_date,
            delivery_date,
        }
    },
    async mounted(){ this.FillData() },
    methods: {
        ///////////////////Prevent Page From Loading/////////////
        preventNav(event) {
            if (!this.loadPage) return
            event.preventDefault()
            // Chrome requires returnValue to be set.
            event.returnValue = ''
        },
        FillData(){
            this.validationForm.clear()
            // if(this.ID != 0){
            //     this.artitle = this.currentData.name_ar
            //     this.entitle = this.currentData.name_en
            // }
        },
        update_selected(type: string){

        },
        saveInfo(){
            this.loadPage = false
            var isValid = this.validationForm.checkOrderInfo(this.values)
            if (isValid == 0) {
                this.getData()
                if (this.ID === 0) { // Create Data
                    this.DataStore.createData('Categories', this.formData, 'CreateWithImg').then(() => {
                    this.$emit('load-data')
                    this.ondismiss()
                    })
                } else { // Update Data
                    this.DataStore.updateData('Categories', this.ID, this.formData, 'EditWithImg').then(() => {
                    this.$emit('load-data')
                    this.ondismiss()
                    })
                }
            }
        },
        getData(){ // Use Form Data To Submit The Data Into Database
        // if (this.artitle != '' && this.artitle != null) this.formData.append('name_ar', this.artitle)
        // if (this.entitle != '' && this.entitle != null) this.formData.append('name_en', this.entitle)
        if(this.ID != 0) this.formData.append('_method', "PUT")
        },
        ondismiss() {
        this.$emit('close')
        },
    }
})


</script>