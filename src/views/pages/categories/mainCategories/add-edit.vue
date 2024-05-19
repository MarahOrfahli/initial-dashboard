<template>
    <!-- 
        All Inputs:
        - Title in arabic
        - Title in english
        - Image field
     -->
    <div class="space-y-5">
        <!--  -------------------------------  Arabic title input field  --------------------------------------  -->
        <div :class="isSubmmit ? { 'has-error': titlearabic.error } : ''">
            <label for="title-in-arabic">{{ t('pages.main_section.fields.title-arabic') }}</label>
            <input id="title-in-arabic" type="text" :placeholder="t('pages.main_section.fields.enter-title')" 
            class="form-input" @keyup="isSubmmit = false,titlearabic.error = false" v-model="artitle" />
            <template v-if="isSubmmit && titlearabic.error == true">
            <p class="text-danger mt-1">{{titlearabic.message}}</p>
            </template>
        </div>
        <!---------------------------------------------------------------------------------------------------------->
        <!--  -------------------------------  English title input field  --------------------------------------  -->
        <div :class="isSubmmit ? { 'has-error': titleenglish.error} : ''">
            <label for="title-in-english">{{ t('pages.main_section.fields.title-english') }}</label>
            <input id="title-in-english" type="text" :placeholder="t('pages.main_section.fields.enter-title')"
            class="form-input" @keyup="isSubmmit = false,titleenglish.error = false" v-model="entitle" />
            <template v-if="isSubmmit && titleenglish.error == true">
            <p class="text-danger mt-1">{{titleenglish.message}}</p>
            </template>
        </div>
        <!-------------------------------------------------------------------------------------------->
        <!--  -------------------------------  Image field  --------------------------------------  -->
        <div :class="isSubmmit ? { 'has-error': file.error } : ''">
                
            <label for="cat-img" class="ltr:mr-2 rtl:ml-2 mb-0">{{ t('page-control.upload-category-image') }}</label>
                <input id="cat-img" type="file" @click="isSubmmit = false,file.error = false"
                :model-value="fileVal" @change="handleFileUpload" accept="image/*"
                class="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file:ml-5 file:text-white file:hover:bg-primary" required />
                <template v-if="isSubmmit && file.error == true">
                    <p class="text-danger mt-1">{{file.message}}</p>
                </template>
        </div>
        <div class="mb-10">
            <div class="mt-8 border-slate-500 rounded-md drop-shadow-lg" v-if="imageUrl != ''">
                <img :src="imageUrl" class="rounded-md w-40">
            </div>
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

import { ref, defineComponent } from 'vue';
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { validationStore } from '@/components/validation'
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
            if(this.ID != 0) return this.imageUrl
            else return this.image_file
        }
    },
    data(props){
        // Variables
        let image_file = ref<File | null>(null);
        let currentData: Categories = props.data
        const ID = props.dataid
        // Data & t-translate
        const DataStore = useConnectionStore()
        const validationForm = validationStore()
        const { isSubmmit, titlearabic, titleenglish, file } = storeToRefs(validationForm)
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
            file,
            artitle: '',
            entitle: '',
            imageUrl: '',
            formData: new FormData(),
            ///////// Validation  ////
            isSubmmit,
            validationForm,
            titlearabic,
            titleenglish,
            image_file,
        }
    },
    async mounted(){ this.FillData() },
    methods: {
        FillData(){
            this.validationForm.clear()
            let str = this.imgLocation + this.currentData.image
            if(this.ID != 0){
                this.artitle = this.currentData.name_ar
                this.entitle = this.currentData.name_en
                this.imageUrl = str
            }
        },
        ////////////////////////////////////////////////////////////////////////
        ///////// Upload File And Preview The File In Image ////////////////////
        handleFileUpload(event: Event){
            this.isSubmmit = false
            this.file.error = false
            const target = event.target as HTMLInputElement;
            if (target.files) {
                this.image_file = target.files[0]
            }
            this.uploadImage()
        },
        uploadImage() {
            if (this.image_file) {
                this.imageUrl = URL.createObjectURL(this.image_file);
            }
        },
        saveInfo(){
            var isValid = this.validationForm.checkMainCategoryInfo(this.artitle, this.entitle, this.fileVal)
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
        if (this.image_file != null) this.formData.append('image', this.image_file)
        if(this.ID != 0) this.formData.append('_method', "PUT")
        },
        ondismiss() {
        this.$emit('close')
        },
    }
})


</script>