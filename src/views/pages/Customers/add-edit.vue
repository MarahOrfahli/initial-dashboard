<template>
    <div class="space-y-5">
        <!--  -------------------------------  Name input field  --------------------------------------  -->
        <div :class="isSubmmit ? { 'has-error': errora } : ''">
            <label for="name">{{ t('pages.main_section.fields.title-arabic') }}</label>
            <input id="name" type="text" :placeholder="t('pages.main_section.fields.enter-title')" 
            class="form-input" @keyup="isSubmmit = false,errora = false" v-model="artitle" />
            <template v-if="isSubmmit && errora == true">
            <p class="text-danger mt-1">{{errorArabic}}</p>
            </template>
        </div>
        <!---------------------------------------------------------------------------------------------------------->
        <!--  -------------------------------  Phone Number input field  --------------------------------------  -->
        <div :class="isSubmmit ? { 'has-error': errorE} : ''">
            <label for="phone_one">{{ t('pages.main_section.fields.title-english') }}</label>
            <input id="phone_one" type="text" :placeholder="t('pages.main_section.fields.enter-title')"
            class="form-input" @keyup="isSubmmit = false,errorE = false" v-model="entitle" />
            <template v-if="isSubmmit && errorE == true">
            <p class="text-danger mt-1">{{errorEnglish}}</p>
            </template>
        </div>
        <!-------------------------------------------------------------------------------------------->
        <!--  -------------------------------  Anoter Phone input field  --------------------------------------  -->
        <div :class="isSubmmit ? { 'has-error': errorE} : ''">
            <label for="phone_two">{{ t('pages.main_section.fields.title-english') }}</label>
            <input id="phone_two" type="text" :placeholder="t('pages.main_section.fields.enter-title')"
            class="form-input" @keyup="isSubmmit = false,errorE = false" v-model="entitle" />
            <template v-if="isSubmmit && errorE == true">
            <p class="text-danger mt-1">{{errorEnglish}}</p>
            </template>
        </div>
        <!-------------------------------------------------------------------------------------------->
        <!--  -------------------------------  Email input field  --------------------------------------  -->
        <div :class="isSubmmit ? { 'has-error': errorE} : ''">
            <label for="email">{{ t('pages.main_section.fields.title-english') }}</label>
            <input id="email" type="text" :placeholder="t('pages.main_section.fields.enter-title')"
            class="form-input" @keyup="isSubmmit = false,errorE = false" v-model="entitle" />
            <template v-if="isSubmmit && errorE == true">
            <p class="text-danger mt-1">{{errorEnglish}}</p>
            </template>
        </div>
        <!-------------------------------------------------------------------------------------------->
        <!--  -------------------------------  Address input field  --------------------------------------  -->
        <div :class="isSubmmit ? { 'has-error': errorE} : ''">
            <label for="address">{{ t('pages.main_section.fields.title-english') }}</label>
            <input id="address" type="text" :placeholder="t('pages.main_section.fields.enter-title')"
            class="form-input" @keyup="isSubmmit = false,errorE = false" v-model="entitle" />
            <template v-if="isSubmmit && errorE == true">
            <p class="text-danger mt-1">{{errorEnglish}}</p>
            </template>
        </div>
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
            <button type="button" @click="ondismiss" class="btn btn-outline-danger ltr:ml-4 rtl:mr-4">{{ t('page-control.cancel') }}</button>
        </div>
    </div>
</template>
<script lang="ts">

import { ref, defineComponent } from 'vue';
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import IconRefresh from '@/components/icon/icon-refresh.vue';
import { useConnectionStore } from '../../../stores/module/DataModule'
import { useMeta } from '@/composables/use-meta';
import { Categories } from '@/model/Classes';

export default defineComponent({
    props: ['dataid','data'],
    emits: ['close', 'load-data'],
    components: { IconRefresh },
    setup(){
            useMeta({ title: 'Add-Edit Customer' });
    },
    computed: { },
    data(props){
        let currentData: Categories = props.data
        const ID = props.dataid
        // Data & t-translate
        const DataStore = useConnectionStore()
        const { loading, imgLocation } = storeToRefs(DataStore)
        const { t } = useI18n()
        return{
            t,
            // Data Connection
            currentData,
            imgLocation,
            DataStore,
            loading,
            ///////
            ID,
            artitle: '',
            entitle: '',
            formData: new FormData(),
            ///////// Validation  ////
            isSubmmit: false,
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
            let str = this.imgLocation + this.currentData.image
            if(this.ID != 0){
                this.artitle = this.currentData.name_ar
                this.entitle = this.currentData.name_en
            }
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