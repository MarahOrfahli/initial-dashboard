<template>
    <div class="space-y-5">
        <!--  -------------------------------  Arabic title input field  --------------------------------------  -->
        <div :class="isSubmmit ? { 'has-error': errora } : ''">
            <label for="title-in-arabic">Title In Arabic</label>
            <input id="title-in-arabic" type="text" placeholder="Enter Title" class="form-input" 
            @keyup="isSubmmit = false,errora = false" v-model="artitle" />
            <template v-if="isSubmmit && errora == true">
            <p class="text-danger mt-1">{{errorArabic}}</p>
            </template>
        </div>
        <!---------------------------------------------------------------------------------------------------------->
        <!--  -------------------------------  English title input field  --------------------------------------  -->
        <div :class="isSubmmit ? { 'has-error': errorE } : ''">
            <label for="title-in-english">Title In English</label>
            <input id="title-in-english" type="text" placeholder="Enter Title" class="form-input" 
            @keyup="isSubmmit = false,errorE = false" v-model="entitle" />
            <template v-if="isSubmmit && errorE == true">
            <p class="text-danger mt-1">{{errorEnglish}}</p>
            </template>
        </div>
        <!-------------------------------------------------------------------------------------------->
        <!--  -------------------------------  Select field  --------------------------------------  -->
        <div :class="isSubmmit ? { 'has-error': errorS } : ''">
            <label for="cat-img">Choose one of these category</label>
            <!-- searchable -->
            <multiselect
            v-model="category"
            :options="options.names"
            @click="isSubmmit = false,errorS = false"
            @update:model-value="updateSelected"
            class="custom-multiselect"
            :searchable="true"
            noResult="no data"
            :loading="loading"
            placeholder="Select an option"
            >
            <template #noResult>
                Oops! No elements found. Consider changing the search query.
            </template>
        </multiselect>
            <template v-if="isSubmmit && errorS == true">
            <p class="text-danger mt-1">{{errorSelection}}</p>
            </template>
        </div>
        
        <!---------------------------------------------------------------------------->
        <div class="flex justify-end items-center mt-8">
            <button type="button" @click="saveInfo" class="btn btn-primary ltr:ml-4 rtl:mr-4">
                <div v-if="ID == 0">
                    <span v-if="loading == false">Add SubCategory</span>
                    <span v-else>
                        <IconRefresh class="animate-[spin_1s_linear_infinite] w-5 h-5" />
                    </span>
                </div>
                <div v-else-if="ID != 0">
                    <span v-if="loading == false">Edit</span>
                    <span v-else>
                        <IconRefresh class="animate-[spin_1s_linear_infinite] w-5 h-5" />
                    </span>
                </div>
            </button>
            <button type="button" @click="ondismiss" class="btn btn-outline-danger ltr:ml-4 rtl:mr-4">Discard</button>
        </div>
        
    </div>
</template>
<script lang="ts">

import { defineComponent } from 'vue';
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useConnectionStore } from '../../../../stores/module/DataModule'
import { useMeta } from '@/composables/use-meta';
import IconRefresh from '@/components/icon/icon-refresh.vue';
import { SubCategories, Categories } from '@/model/Classes';
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
        const { categories, subcategories, loading } = storeToRefs(DataStore)
        const { t, locale } = useI18n()
        let currentData: SubCategories = props.data
        let options : typeof Categories[] = []
        return{
            /// Data Connection
            subcategories, loading,
            categories,
            currentData,
            DataStore,
            //// 
            ID, t,
            categoryID: 0,
            counter: 0,
            category: '',
            artitle: '',
            entitle: '',
            update: '',
            options: { ids: [], names: [] },
            ///////// Validation  ////
            isSubmmit: false,
            errora: false,
            errorE: false,
            errorS: false,
            errorEnglish: '',
            errorSelection: '',
            errorArabic: '',
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
        formValidate(){
            this.isSubmmit = true
            if(this.artitle == ''){
                this.errora = true
                this.errorArabic = 'Please fill the Name'
            }
            if(this.entitle == ''){
                this.errorE = true
                this.errorEnglish = 'Please fill the Name'
            }
            if(this.category == ''){
                this.errorS = true
                this.errorSelection = 'Please fill the Name'
            }
            if (this.errora == true || this.errorE == true || this.errorS == true) {
                this.counter++
            } else {
                this.counter = 0
            }
            return this.counter
        },
        saveInfo(){
            let data = { name_ar: this.artitle, name_en: this.entitle, category_id: this.categoryID }
            var isValid = this.formValidate()
            if (isValid == 0) {
                if (this.ID === 0) {
                    this.DataStore.createData('SubCategories', data).then(() => {
                    this.$emit('load-data')
                    this.ondismiss()
                    })
                } else {
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