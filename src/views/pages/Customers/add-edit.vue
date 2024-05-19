<template>
    <!-- 
        All Inputs:
        - Customer name
        - Phone Number
        - Another Phone Number
        - Select City
        - Select Area After Select City
        - Address
     -->
    <!--  (Back Button) => Back To List  -->
    <div class="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
        <div class="flex items-center gap-2"></div>
        <div class="ltr:ml-auto rtl:mr-auto">
            <router-link to="/pages/customers/list" class="btn btn-secondary gap-2">
                {{ t('pages.customer.fields.back-customer') }}
            </router-link>
        </div>
    </div>
    <!-- Form Fields -->
    <div class="panel space-y-5">
        <div class=" text-xl">
            <strong v-if="pageType == 'Create'">{{ t('pages.customer.fields.add-customer') }}</strong>
            <strong v-if="pageType == 'Edit'">{{ t('pages.customer.fields.edit-customer') }}</strong>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <!--  -------------------------------  Name input field  --------------------------------------  -->
            <div class="p-3">
                <div :class="isSubmmit ? { 'has-error': name.error } : ''">
                    <label for="name">{{ t('pages.customer.fields.name') }}</label>
                    <input id="name" type="text" :disabled="loading_client"
                    :class="loading_client ? 'bg-white-dark opacity-30 text-black' : ''"
                    :placeholder="t('pages.customer.modals.enter-name')" 
                    class="form-input" @keyup="isSubmmit = false,name.error = false" v-model="cus_name" />
                    <template v-if="isSubmmit && name.error == true">
                    <p class="text-danger mt-1">{{name.message}}</p>
                    </template>
                </div>
            </div>
        <!---------------------------------------------------------------------------------------------------------->
        <!--  -------------------------------  Phone Number input field  --------------------------------------  -->
        <div class="p-3">
            <div :class="isSubmmit ? { 'has-error': phone.error} : ''">
                <label for="phone_one">{{ t('pages.customer.fields.phone') }}</label>
                <input id="phone_one" type="text" @keypress="isNumber($event)"
                :disabled="loading_client" :class="loading_client ? 'bg-white-dark opacity-30 text-black' : ''"
                :placeholder="t('pages.customer.modals.enter-phone')" maxlength="20" minlength="11"
                class="form-input" @keyup="isSubmmit = false,phone.error = false" v-model="cus_phone" />
                <template v-if="isSubmmit && phone.error == true">
                <p class="text-danger mt-1">{{phone.message}}</p>
                </template>
            </div>
        </div>
        <!-------------------------------------------------------------------------------------------->
        <!--  -------------------------------  Anoter Phone input field  --------------------------------------  -->
        <div class="p-3">
            <label for="phone_two">{{ t('pages.customer.fields.phone2') }}</label>
            <input id="phone_two" type="text" @keypress="isNumber($event)"
            :disabled="loading_client" :class="loading_client ? 'bg-white-dark opacity-30 text-black' : ''"
            :placeholder="t('pages.customer.modals.enter-phone')" maxlength="20" minlength="11"
            class="form-input" @keyup="isSubmmit = false" v-model="cus_phone_two" />
        </div>
        <!---------------------------------------------------------------------------->
        <!--  -------------------------------  Select field  --------------------------------------  -->
        <div class="p-3">
            <div :class="isSubmmit ? { 'has-error': city.error} : ''">
                <label for="store" class="ltr:mr-2 rtl:ml-2 mb-0">{{ t('pages.customer.fields.city') }}</label>
                <multiselect
                id="store"
                v-model="city_name" :disabled="loading_client"
                :class="loading_client ? 'bg-white-dark opacity-30 text-black' : ''"
                :options="citiesOption.names"
                @click="isSubmmit = false,city.error = false"
                @update:model-value="update_selected('City')"
                class="custom-multiselect"
                :searchable="true"
                :loading="loading_city"
                :placeholder="t('page-control.select-option')"
                ></multiselect>
                <template v-if="isSubmmit && city.error == true">
                <p class="text-danger mt-1">{{city.message}}</p>
                </template>
            </div>
        </div>
        <!---------------------------------------------------------------------------->
        <!--  -------------------------------  Select field  --------------------------------------  -->
        <div class="p-3">
            <div :class="isSubmmit ? { 'has-error': area.error} : ''">
                <label for="area" class="ltr:mr-2 rtl:ml-2 mb-0">{{ t('pages.customer.fields.area') }}</label>
                <!-- searchable -->
                <multiselect
                id="area"
                v-model="area_name" :disabled="loading_client"
                :class="loading_client ? 'bg-white-dark opacity-30 text-black' : ''"
                :options="areasOption.names"
                @click="isSubmmit = false,area.error = false"
                @update:model-value="update_selected('Area')"
                class="custom-multiselect"
                :searchable="true"
                :loading="loading_area"
                :placeholder="t('page-control.select-option')"
                ></multiselect>
                <template v-if="isSubmmit && area.error == true">
                <p class="text-danger mt-1">{{area.message}}</p>
                </template>
            </div>
        </div>
        <!-------------------------------------------------------------------------------------------->
        <!--  -------------------------------  Address input field  ----------------------------------->
        <div class="p-3">
            <div :class="isSubmmit ? { 'has-error': address.error} : ''">
                <label for="address">{{ t('pages.customer.fields.address') }}</label>
                <input id="address" type="text" :disabled="loading_client"
                :class="loading_client ? 'bg-white-dark opacity-30 text-black' : ''"
                :placeholder="t('pages.customer.modals.enter-address')"
                class="form-input" @keyup="isSubmmit = false,address.error = false" v-model="cus_address" />
                <template v-if="isSubmmit && address.error == true">
                <p class="text-danger mt-1">{{address.message}}</p>
                </template>
            </div>
        </div>
    </div>
        <!------------------------------------------------------------------->
        <div class="flex justify-end items-center mt-8">
            <button type="button" @click="saveInfo" :disabled="loading" class="btn btn-primary ltr:ml-4 rtl:mr-4">
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

import { defineComponent } from 'vue';
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import IconRefresh from '@/components/icon/icon-refresh.vue';
import { validationStore } from '@/components/validation'
import { useConnectionStore } from '../../../stores/module/DataModule'
import { useMeta } from '@/composables/use-meta';
// Vue-Router
import { useRouter } from 'vue-router'
// Multiselect
import Multiselect from '@suadelabs/vue3-multiselect';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';

export default defineComponent({
    props:['type','id'],
    components: {
        Multiselect,
        IconRefresh
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
            useMeta({ title: 'Add-Edit Customer' });
    },
    computed: { },
    data(props){
       // let currentData: Categories = props.data
       const ID = props.id
        const pageType = props.type
        // Data & t-translate
        const router = useRouter()
        const DataStore = useConnectionStore()
        const validationForm = validationStore()
            const { isSubmmit, area, phone, address, name, city } = storeToRefs(validationForm)
        const { regions, customerByID, cities, loading, loading_area, loading_city, loading_client } = storeToRefs(DataStore)
        const { t, locale } = useI18n()
        return{
            loadPage: true,
            /////////////////
            t,router,locale,
            // Data Connection
            regions,
            cities,
            customerByID,
            pageType,
            DataStore,
            loading,
            loading_area,
            loading_city,
            loading_client,
            ///////
            ID,
            //citiesOption: { ids: [], names: [] },
            areasOption: { ids: [], names: [], cities: [] },
            citiesOption: { ids: [], names: [] },
            cus_name: '',
            cus_phone: '',
            cus_phone_two: '',
            cus_address: '',
            area_name: '',
            city_name: '',
            areaID: 0,
            cityID: 0,
            ///////// Validation  ////
            isSubmmit,
            validationForm,
            phone,
            area,
            name,
            city,
            address,
        }
    },
    async mounted(){ this.startPage() },
    methods: {
        ///////////////////Prevent Page From Loading/////////////
        preventNav(event) {
            if (!this.loadPage) return
            event.preventDefault()
            // Chrome requires returnValue to be set.
            event.returnValue = ''
        },
        startPage(){ // Start The Page............
            this.validationForm.clear()
            if(this.pageType == 'Create'){
                this.getCityOption().then(()=>{
                    this.getAreaOption()
                })
            }else if(this.pageType == 'Edit'){
                this.getCityOption()
                this.DataStore.getData('Customer',this.ID, 'GETByID').then(() => {
                   this.areaID = this.customerByID.area_id
                   this.cityID = this.customerByID.city_id
                   this.cus_name = this.customerByID.name
                   this.cus_phone = this.customerByID.phone
                   this.cus_phone_two = this.customerByID.phone2
                   this.cus_address = this.customerByID.address
                }).then(()=>{
                    this.check('City','id')
                }).then(()=>{
                    this.getAreaOption()
                })
            } 
        },
        // Get The City Option Data...........
        async getCityOption(){
            this.DataStore.getData('City').then(() => {
                this.cities.forEach(element => {
                    this.citiesOption.ids.push(element.id)
                    if(this.locale == 'eg') this.citiesOption.names.push(element.name_ar)
                    else this.citiesOption.names.push(element.name_en)
                })
                if(this.pageType == 'Create'){
                    this.cityID = this.citiesOption.ids[0]
                    this.city_name = this.citiesOption.names[0]
                }
            })
        },
        // Check the (City_ID / City_Name) || (Area_ID / Area_Name)...
        check(type: string, value: string){
            if(type == 'City' && value == 'id'){
                for (let index = 0;  index < this.citiesOption.names.length; index++) {
                    if(this.citiesOption.ids[index] == this.cityID){
                        this.city_name = this.citiesOption.names[index]
                    }
                }
            }else if(type == 'City' && value == 'name'){
                for (let index = 0;  index < this.citiesOption.names.length; index++) {
                    if(this.citiesOption.names[index] == this.city_name){
                        this.cityID = this.citiesOption.ids[index]
                    }
                }
            }else if(type == 'Area' && value == 'id'){
                for (let index = 0;  index < this.areasOption.names.length; index++) {
                    if(this.areasOption.ids[index] == this.areaID){
                        this.area_name = this.areasOption.names[index]
                    }
                }
            }else if(type == 'Area' && value == 'name'){
                for (let index = 0;  index < this.areasOption.names.length; index++) {
                    if(this.areasOption.names[index] == this.area_name){
                        this.areaID = this.areasOption.ids[index]
                    }
                }
            }
        },
        // Get The Area Option Data (Deppending On CityID)
        getAreaOption(select: boolean = false){
            this.areasOption.ids = []
            this.areasOption.names = []
            this.areasOption.cities = []
            this.DataStore.getData('Region').then(() => {
                this.regions.forEach(element => {
                    if(this.cityID == element.city_id){
                        this.areasOption.ids.push(element.id)
                        if(this.locale == 'eg') this.areasOption.names.push(element.name_ar)
                        else this.areasOption.names.push(element.name_en)
                        this.areasOption.cities.push(element.city_id)
                    }
                });
            }).then(()=>{
                if(this.pageType == 'Edit' && select == false) this.check('Area','id')
            })
        },
        update_selected(type: string){
            this.check(type,'name')
            if(type == 'City') this.getAreaOption()
        },
        saveInfo(){
            this.loadPage = false
            let data = { 
                name: this.cus_name, phone: this.cus_phone, city_id: this.cityID,
                area_id: this.areaID, address: this.cus_address, phone2: this.cus_phone_two 
            }
            var isValid = this.validationForm.checkCustomerInfo(this.cus_name, this.cus_phone, this.area_name,this.cus_address)
            if (isValid == 0) {
                
                if (this.pageType == 'Create') { // Create Data
                    this.DataStore.createData('Customer', data).then(() => {
                    this.ondismiss()
                    })
                } else if(this.pageType == 'Edit') { // Update Data
                    this.DataStore.updateData('Customer', this.ID, data).then(() => {
                    this.ondismiss()
                    })
                }
            }
        },
        isNumber(evt) {
        const charCode = evt.which ? evt.which : evt.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
          evt.preventDefault()
        }
        },
        ondismiss(){
            this.router.push({
                name: 'customers-list',
            })
        }
    }
})


</script>