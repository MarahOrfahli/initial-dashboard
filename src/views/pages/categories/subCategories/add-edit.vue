<template>
    <div class="space-y-5">
        <!--  -------------------------------  Arabic title input field  --------------------------------------  -->
        <div :class="isSubmmit ? { 'has-error': titlearabic.error } : ''">
            <label for="title-in-arabic">{{ t('pages.sub_section.fields.title-arabic') }}</label>
            <input id="title-in-arabic" type="text" :placeholder="t('pages.sub_section.fields.enter-title')" class="form-input" 
            @keyup="isSubmmit = false,titlearabic.error  = false" v-model="artitle" />
            <template v-if="isSubmmit && titlearabic.error  == true">
            <p class="text-danger mt-1">{{titlearabic.message}}</p>
            </template>
        </div>
        <!---------------------------------------------------------------------------------------------------------->
        <!--  -------------------------------  English title input field  --------------------------------------  -->
        <div :class="isSubmmit ? { 'has-error': titleenglish.error } : ''">
            <label for="title-in-english">{{ t('pages.sub_section.fields.title-english') }}</label>
            <input id="title-in-english" type="text" :placeholder="t('pages.sub_section.fields.enter-title')" class="form-input" 
            @keyup="isSubmmit = false,titleenglish.error = false" v-model="entitle" />
            <template v-if="isSubmmit && titleenglish.error == true">
            <p class="text-danger mt-1">{{titleenglish.message}}</p>
            </template>
        </div>
        <!-------------------------------------------------------------------------------------------->
        <!--  -------------------------------  Select field  --------------------------------------  -->
        <div :class="isSubmmit ? { 'has-error': categorySelect.error } : ''">
            <label for="select">{{ t('pages.sub_section.fields.select') }}</label>
            <!-- searchable -->
            <multiselect
            id="select"
            v-model="category"
            :options="options.names"
            @click="isSubmmit = false,categorySelect.error = false"
            @update:model-value="updateSelected"
            class="custom-multiselect"
            :searchable="true"
            no-result-text="no data"
            :loading="loading"
            :placeholder="t('page-control.select-option')"
            >
        </multiselect>
            <template v-if="isSubmmit && categorySelect.error == true">
            <p class="text-danger mt-1">{{categorySelect.message}}</p>
            </template>
        </div>
        <br/><br/><br/><br/><br/><br/>
        <!---------------------------------------------------------------------------->
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
import { useConnectionStore } from '../../../../stores/module/DataModule'
import { useMeta } from '@/composables/use-meta';
import IconRefresh from '@/components/icon/icon-refresh.vue';
import { SubCategories } from '@/model/Classes';
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
            useMeta({ title: 'Adding SubCategory' });
    },
    data(props){
       const ID = props.dataid
       const DataStore = useConnectionStore()
        const validationForm = validationStore()
        const { isSubmmit, titlearabic, titleenglish, categorySelect } = storeToRefs(validationForm)
        const { categories, subcategories, loading } = storeToRefs(DataStore)
        const { t } = useI18n()
        let currentData: SubCategories = props.data
        return{
            /// Data Connection
            subcategories, loading,
            categories,
            currentData,
            DataStore,
            //// 
            ID, t,
            categoryID: 0,
            category: '',
            artitle: '',
            entitle: '',
            options: { ids: [], names: [] },
            ///////// Validation  ////
            isSubmmit,
            validationForm,
            titlearabic,
            titleenglish,
            categorySelect,
        }
    },
    async mounted(){ 
        this.startPage()
     },
    methods: {
        updateSelected(){
            for (let index = 0;  index < this.options.names.length; index++) {
                if(this.options.names[index] == this.category){
                    this.categoryID = this.options.ids[index]
                }
            }
        },
        startPage(){
            this.validationForm.clear()
            this.DataStore.getData('Categories').then(() => {
                this.categories.forEach(element => {
                    let name = element.name_ar + '-' + element.name_en
                    this.options.ids.push(element.id)
                    this.options.names.push(name)
                });
            }).then(()=>{
                this.FillData()
            })
        },
        FillData(){
            if(this.ID != 0){
                this.artitle = this.currentData.name_ar
                this.entitle = this.currentData.name_en
                this.categoryID = this.currentData.category_id
                for (let index = 0;  index < this.options.ids.length; index++) {
                    if(this.options.ids[index] == this.categoryID){
                        this.category = this.options.names[index]
                    }
                }
            }
        },
        saveInfo(){
            // Use JSON Data To Submit The Data Into Database
            let data = { name_ar: this.artitle, name_en: this.entitle, category_id: this.categoryID }
            var isValid = this.validationForm.checkSubcategoryInfo(this.artitle, this.entitle, this.category )
            if (isValid == 0) {
                if (this.ID === 0) { // Create Data
                    this.DataStore.createData('SubCategories', data).then(() => {
                    this.$emit('load-data')
                    this.ondismiss()
                    })
                } else { // Update Data
                    this.DataStore.updateData('SubCategories', this.ID, data).then(() => {
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