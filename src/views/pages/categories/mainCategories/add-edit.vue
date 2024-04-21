<template>
    <div class="space-y-5">
        <!--  -------------------------------  Arabic title input field  --------------------------------------  -->
        <div :class="isSubmmit ? { 'has-error': errora } : ''">
            <label for="title-in-arabic">{{ t('pages.main_section.fields.title-arabic') }}</label>
            <input id="title-in-arabic" type="text" :placeholder="t('pages.main_section.fields.enter-title')" 
            class="form-input" @keyup="isSubmmit = false,errora = false" v-model="artitle" />
            <template v-if="isSubmmit && errora == true">
            <p class="text-danger mt-1">{{errorArabic}}</p>
            </template>
        </div>
        <!---------------------------------------------------------------------------------------------------------->
        <!--  -------------------------------  English title input field  --------------------------------------  -->
        <div :class="isSubmmit ? { 'has-error': errorE} : ''">
            <label for="title-in-english">{{ t('pages.main_section.fields.title-english') }}</label>
            <input id="title-in-english" type="text" :placeholder="t('pages.main_section.fields.enter-title')"
            class="form-input" @keyup="isSubmmit = false,errorE = false" v-model="entitle" />
            <template v-if="isSubmmit && errorE == true">
            <p class="text-danger mt-1">{{errorEnglish}}</p>
            </template>
        </div>
        <!-------------------------------------------------------------------------------------------->
        <!--  -------------------------------  Image field  --------------------------------------  -->
        <div :class="isSubmmit ? { 'has-error': errorI } : ''">
            <label for="cat-img">{{ t('page-control.upload-category-image') }}</label>
            <input id="cat-img" type="file" class="" @change="handleFileUpload"
            accept="image/*" :model-value="fileVal"/>
            <template v-if="isSubmmit && errorI == true">
                <p class="text-danger mt-1">{{errorImage}}</p>
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
import { useConnectionStore } from '../../../../stores/module/DataModule'
import { useMeta } from '@/composables/use-meta';
import { Categories } from '@/model/Classes';

export default defineComponent({
    props: ['dataid','data'],
    emits: ['close', 'load-data'],
    components: { IconRefresh },
    setup(){
            useMeta({ title: 'Adding Main Category' });
    },
    computed: {
        fileVal(){
            if(this.ID != 0) return this.fileImg
            else return this.file
        }
    },
    data(props){
        // Variables
        let file = ref<File | null>(null);
        const fileImg = { name: 'image', url: '' }
        let currentData: Categories = props.data
        const ID = props.dataid
        // Data & t-translate
        const DataStore = useConnectionStore()
        const { categories, loading, imgLocation } = storeToRefs(DataStore)
        const { t } = useI18n()
        return{
            t,
            // Data Connection
            currentData,
            imgLocation,
            DataStore,
            categories,
            loading,
            fileImg,
            ///////
            ID,
            file,
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
                this.fileImg.url = str
            }
        },
        handleFileUpload(event: Event){
            this.isSubmmit = false
            this.errorI = false
            const target = event.target as HTMLInputElement;
            if (target.files) {
                this.file = target.files[0]
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
            if(this.fileVal == null){
                this.errorI = true
                this.errorImage = this.t('pages.main_section.errors.upload')
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
        if (this.file != null) this.formData.append('image', this.file)
        this.formData.append('_method', "PUT")
        },
        ondismiss() {
        this.$emit('close')
        },
    }
})


</script>