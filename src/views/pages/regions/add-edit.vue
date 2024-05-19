<template>
    <!-- 
        All Inputs:
        - Title In Arabic
        - Title In English
        - Select City
     -->
    <div class="space-y-5">
        <!--  -------------------------------  Region title input field  --------------------------------------  -->
        <div :class="isSubmmit ? { 'has-error': titlearabic.error} : ''">
            <label for="name">{{ t('pages.region.fields.title-arabic') }}</label>
            <input id="name" type="text" :placeholder="t('pages.region.modals.enter-title')" class="form-input" 
            @keyup="isSubmmit = false,titlearabic.error = false" v-model="arabic" />
            <template v-if="isSubmmit && titlearabic.error == true">
            <p class="text-danger mt-1">{{titlearabic.message}}</p>
            </template>
        </div>
        <!--  -------------------------------  Region title input field  --------------------------------------  -->
        <div :class="isSubmmit ? { 'has-error': titleenglish.error} : ''">
            <label for="name">{{ t('pages.region.fields.title-english') }}</label>
            <input id="name" type="text" :placeholder="t('pages.region.modals.enter-title')" class="form-input" 
            @keyup="isSubmmit = false,titleenglish.error = false" v-model="english" />
            <template v-if="isSubmmit && titleenglish.error == true">
            <p class="text-danger mt-1">{{titleenglish.message}}</p>
            </template>
        </div>
        <!-------------------------------------------------------------------------------------------->
        <!--  -------------------------------  Select City input field  --------------------------------------  -->
        <div :class="isSubmmit ? { 'has-error': city.error } : ''">
            <label for="location">{{ t('pages.region.fields.city') }}</label>
            <multiselect
                id="store"
                v-model="city_name"
                :options="citiesOption.names"
                @click="isSubmmit = false,city.error = false"
                @update:model-value="update_selected()"
                class="custom-multiselect"
                :searchable="true"
                :loading="loading_city"
                :placeholder="t('page-control.select-option')"
                ></multiselect>
            <template v-if="isSubmmit && city.error == true">
            <p class="text-danger mt-1">{{city.message}}</p>
            </template>
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
            <button type="button" @click="ondismiss" class="btn btn-outline-danger ltr:ml-4 rtl:mr-4">{{ t('page-control.cancel') }}</button>
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
import { Region } from '@/model/Classes';
// Multiselect
import Multiselect from '@suadelabs/vue3-multiselect';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';

export default defineComponent({
    props: ['dataid', 'data'],
    emits: ['close', 'load-data'],
    components: {
        IconRefresh,
        Multiselect,
    },
    setup(){
            useMeta({ title: 'Add-Edit Region' });
    },
    data(props){
        const DataStore = useConnectionStore()
        const validationForm = validationStore()
        const { isSubmmit, city, titleenglish, titlearabic } = storeToRefs(validationForm)
        const { regions,cities, loading, loading_city } = storeToRefs(DataStore)
        const { t } = useI18n()
        let currentData: Region = props.data
       const ID = props.dataid
        return{
            t,
            // Data Connection
            currentData,
            DataStore,
            loading,
            loading_city,
            regions,
            cities,
            //// 
            ID,
            cityID: 0,
            arabic: '',
            english: '',
            city_name: '',
            citiesOption: { ids: [], names: [] },
            ///////// Validation  ////
            validationForm,
            titlearabic,
            titleenglish,
            isSubmmit,
            city
        }
    },
    async mounted(){ this.startPage() },
    methods: {
        startPage(){
            this.validationForm.clear()
            this.getData_ToOptions()
        },
        FillData(){
            if(this.ID > 0){
                this.arabic = this.currentData.name_ar
                this.english = this.currentData.name_en
                this.cityID = this.currentData.city_id
                for (let index = 0;  index < this.citiesOption.names.length; index++) {
                    if(this.citiesOption.ids[index] == this.cityID){
                        this.city_name = this.citiesOption.names[index]
                    }
                }
            }
        },
        saveInfo(){
            // Prepare Data To Create New Store
            let DataConnect = { id: this.ID, name_ar: this.arabic, name_en: this.english, city_id: this.cityID  }
            var isValid = this.validationForm.checkRegionInfo(this.arabic,this.english, this.city_name)
            if (isValid == 0) {
                if (this.ID === 0) { // Add New Region
                    this.DataStore.createData('Region', { name_ar: this.arabic, name_en: this.english, city_id: this.cityID  }).then(() => {
                    this.$emit('load-data')
                    this.ondismiss()
                    })
                } else { // Edit Region
                    this.DataStore.updateData('Region', this.ID, DataConnect).then(() => {
                    this.$emit('load-data')
                    this.ondismiss()
                    })
                }
            }
        },
        update_selected(){
            for (let index = 0;  index < this.citiesOption.names.length; index++) {
                if(this.citiesOption.names[index] == this.city_name){
                    this.cityID = this.citiesOption.ids[index]
                }
            }
        },
        getData_ToOptions(){
            this.DataStore.getData('City').then(() => {
                this.cities.forEach(element => {
                    let name = element.name_ar + '-' + element.name_en
                    this.citiesOption.ids.push(element.id)
                    this.citiesOption.names.push(name)
                })
            }).then(()=>{
                this.FillData()
            })
        },
        ondismiss() {
        this.$emit('close')
        },
    }
})


</script>