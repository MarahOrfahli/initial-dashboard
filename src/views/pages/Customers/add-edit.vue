<template>
    <div class="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
        <div class="flex items-center gap-2"></div>
        <div class="ltr:ml-auto rtl:mr-auto">
            <router-link to="/pages/orders/list" class="btn btn-secondary gap-2">
                {{ t('pages.customer.fields.back-customer') }}
            </router-link>
        </div>
    </div>
    <div class="panel space-y-5">
        <div class=" text-xl">
            <strong v-if="pageType == 'Create'">{{ t('pages.customer.fields.add-customer') }}</strong>
            <strong v-if="pageType == 'Edit'">{{ t('pages.customer.fields.edit-customer') }}</strong>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <!--  -------------------------------  Name input field  --------------------------------------  -->
            <div class="p-3">
                <div :class="isSubmmit ? { 'has-error': errora } : ''">
                    <label for="name">{{ t('pages.customer.fields.name') }}</label>
                    <input id="name" type="text" :placeholder="t('pages.customer.modals.enter-name')" 
                    class="form-input" @keyup="isSubmmit = false,errora = false" v-model="artitle" />
                    <template v-if="isSubmmit && errora == true">
                    <p class="text-danger mt-1">{{errorArabic}}</p>
                    </template>
                </div>
            </div>
        <!---------------------------------------------------------------------------------------------------------->
        <!--  -------------------------------  Phone Number input field  --------------------------------------  -->
        <div class="p-3">
            <div :class="isSubmmit ? { 'has-error': errorE} : ''">
                <label for="phone_one">{{ t('pages.customer.fields.phone') }}</label>
                <input id="phone_one" type="text" :placeholder="t('pages.customer.modals.enter-phone')"
                class="form-input" @keyup="isSubmmit = false,errorE = false" v-model="entitle" />
                <template v-if="isSubmmit && errorE == true">
                <p class="text-danger mt-1">{{errorEnglish}}</p>
                </template>
            </div>
        </div>
        <!-------------------------------------------------------------------------------------------->
        <!--  -------------------------------  Anoter Phone input field  --------------------------------------  -->
        <div class="p-3">
            <div :class="isSubmmit ? { 'has-error': errorE} : ''">
                <label for="phone_two">{{ t('pages.customer.fields.phone2') }}</label>
                <input id="phone_two" type="text" :placeholder="t('pages.customer.modals.enter-phone')"
                class="form-input" @keyup="isSubmmit = false,errorE = false" v-model="entitle" />
                <template v-if="isSubmmit && errorE == true">
                <p class="text-danger mt-1">{{errorEnglish}}</p>
                </template>
            </div>
        </div>
        <!-------------------------------------------------------------------------------------------->
        <!--  -------------------------------  Email input field  ------------------------------------->
        <div class="p-3">
            <div :class="isSubmmit ? { 'has-error': errorE} : ''">
                <label for="email">{{ t('pages.customer.fields.email2') }}</label>
                <input id="email" type="text" :placeholder="t('pages.customer.modals.enter-email')"
                class="form-input" @keyup="isSubmmit = false,errorE = false" v-model="entitle" />
                <template v-if="isSubmmit && errorE == true">
                <p class="text-danger mt-1">{{errorEnglish}}</p>
                </template>
            </div>
        </div>
        <!---------------------------------------------------------------------------->
        <!--  -------------------------------  Select field  --------------------------------------  -->
        <div class="p-3">
            <div :class="isSubmmit ? { 'has-error': city.error} : ''">
                <label for="store" class="ltr:mr-2 rtl:ml-2 mb-0">{{ t('pages.customer.fields.city') }}</label>
                <!-- searchable -->
                <multiselect
                id="store"
                v-model="city_name"
                :options="citiesOption.names"
                @click="isSubmmit = false,city.error = false"
                @update:model-value="update_selected('city')"
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
                <label for="store" class="ltr:mr-2 rtl:ml-2 mb-0">{{ t('pages.customer.fields.area') }}</label>
                <!-- searchable -->
                <multiselect
                id="store"
                v-model="area_name"
                :options="areasOption.names"
                @click="isSubmmit = false,area.error = false"
                @update:model-value="update_selected('area')"
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
            <div :class="isSubmmit ? { 'has-error': errorE} : ''">
                <label for="address">{{ t('pages.customer.fields.address') }}</label>
                <input id="address" type="text" :placeholder="t('pages.customer.modals.enter-address')"
                class="form-input" @keyup="isSubmmit = false,errorE = false" v-model="entitle" />
                <template v-if="isSubmmit && errorE == true">
                <p class="text-danger mt-1">{{errorEnglish}}</p>
                </template>
            </div>
        </div>
        <!---------------------------------------------------------------------------->
        <!--  -------------------------------  Select field  --------------------------------------  -->
        <div class="p-3">
            <div :class="isSubmmit ? { 'has-error': type.error} : ''">
                <label for="store" class="ltr:mr-2 rtl:ml-2 mb-0">{{ t('pages.customer.fields.type') }}</label>
                <!-- searchable -->
                <multiselect
                id="store"
                v-model="city_name"
                :options="citiesOption.names"
                @click="isSubmmit = false,type.error = false"
                @update:model-value="update_selected('type')"
                class="custom-multiselect"
                :searchable="true"
                :loading="loading_city"
                :placeholder="t('page-control.select-option')"
                ></multiselect>
                <template v-if="isSubmmit && type.error == true">
                <p class="text-danger mt-1">{{type.message}}</p>
                </template>
            </div>
        </div>
    </div>
        
        <div class="flex justify-end items-center mt-8">
            <button type="button" @click="saveInfo" class="btn btn-primary ltr:ml-4 rtl:mr-4">
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

export default defineComponent({
    props:['type','id'],
    components: {
        Multiselect,
        IconRefresh
    },
    setup(){
            useMeta({ title: 'Add-Edit Customer' });
    },
    computed: { },
    data(props){
       // let currentData: Categories = props.data
       const ID = props.id
        const pageType = props.type
        // Data & t-translate
        const DataStore = useConnectionStore()
        const validationForm = validationStore()
            const { isSubmmit, city, area, type, name } = storeToRefs(validationForm)
        const { loading, imgLocation, loading_city, loading_area } = storeToRefs(DataStore)
        const { t } = useI18n()
        return{
            t,
            // Data Connection
            pageType,
            imgLocation,
            DataStore,
            loading,
            loading_city,
            loading_area,
            ///////
            ID,
            citiesOption: { ids: [], names: [] },
            areasOption: { ids: [], names: [] },
            artitle: '',
            entitle: '',
            city,
            area,
            type,
            name,
            formData: new FormData(),
            ///////// Validation  ////
            isSubmmit,
            city_name: '',
            area_name: '',
            errora: false,
            errorE: false,
            errorI: false,
            errorEnglish: '',
            errorImage: '',
            errorArabic: '',
            counter: 0,
        }
    },
    async mounted(){ this.FillData() },
    methods: {
        FillData(){
            // if(this.ID != 0){
            //     this.artitle = this.currentData.name_ar
            //     this.entitle = this.currentData.name_en
            // }
        },
        formValidate(){
            this.isSubmmit = true
            if(this.artitle == ''){
                this.errora = true
                this.errorArabic = this.t('pages.main_section.errors.arabic-empty')
            }else if(this.artitle.length > 29){
                this.errora = true
                this.errorArabic = this.t('page-control.error-length')
            }
            if(this.entitle == ''){
                this.errorE = true
                this.errorEnglish = this.t('pages.main_section.errors.english-empty')
            }else if(this.entitle.length > 29){
                this.errorE = true
                this.errorEnglish = this.t('page-control.error-length')
            }
            if (this.errora == true || this.errorE == true || this.errorI == true) {
                this.counter++
            } else {
                this.counter = 0
            }
            return this.counter
        },
        update_selected(type: string){

        },
        saveInfo(){
            var isValid = this.formValidate()
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
        if (this.artitle != '' && this.artitle != null) this.formData.append('name_ar', this.artitle)
        if (this.entitle != '' && this.entitle != null) this.formData.append('name_en', this.entitle)
        if(this.ID != 0) this.formData.append('_method', "PUT")
        },
        ondismiss() {
        this.$emit('close')
        },
    }
})


</script>