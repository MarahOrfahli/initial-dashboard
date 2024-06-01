<template>
    <!-- 
        All Inputs:
        - Brand name
        - Image field (Logo)
     -->
    <div class="space-y-5">
        <!--  -------------------------------  Brand name input field  --------------------------------------  -->
        <div :class="isSubmmit ? { 'has-error': name.error } : ''">
            <label for="name">{{ t('pages.brand.fields.brand-name') }}</label>
            <input id="name" type="text" :placeholder="t('pages.brand.fields.enter-title')" class="form-input" 
            @keyup="isSubmmit = false,name.error = false" v-model="brandname" />
            <template v-if="isSubmmit && name.error == true">
            <p class="text-danger mt-1">{{name.message}}</p>
            </template>
        </div>
        <!-------------------------------------------------------------------------------------------->
        <!--  -------------------------------  Image field  --------------------------------------  -->
        <div :class="isSubmmit ? { 'has-error': file.error } : ''">
                <label for="cat-img" class="ltr:mr-2 rtl:ml-2 mb-0">{{ t('page-control.upload-brand-image') }}</label>
                    <input id="cat-img" type="file" @click="isSubmmit = false,file.error = false"
                    :model-value="fileVal" @change="handleFileUpload" accept="image/*"
                    class="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file:ml-5 file:text-white file:hover:bg-primary" required />
                    <template v-if="isSubmmit && file.error == true">
                        <p class="text-danger mt-1">{{file.message}}</p>
                    </template>
        </div>
        <div class="mb-10"> <!-- Show Logo -->
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
            <button type="button" @click="ondismiss" class="btn btn-outline-danger ltr:ml-4 rtl:mr-4">
                {{ t('page-control.cancel') }}
            </button>
        </div>
        
    </div>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue';
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { validationStore } from '@/components/validation'
import { useConnectionStore } from '../../../stores/module/DataModule'
import IconRefresh from '@/components/icon/icon-refresh.vue';
import { Brands } from '@/model/Classes';
import { useMeta } from '@/composables/use-meta';

export default defineComponent({
    props: ['dataid','data'],
    emits: ['close', 'load-data'],
    components: {
        IconRefresh
    },
    setup(){
        useMeta({ title: 'Add-Edit Brand' });
    },
    computed: {
        fileVal(){
            if(this.ID != 0) return this.imageUrl
            else return this.image_file
        }
    },
    data(props){
       const image_file = ref<File | null>(null);
        const DataStore = useConnectionStore()
        const validationForm = validationStore()
        const { isSubmmit, file, name } = storeToRefs(validationForm)
        const { brands, loading, imgLocation } = storeToRefs(DataStore)
        const { t } = useI18n()
       const ID = props.dataid
       let currentData: Brands = props.data
        return{
            t,
            // Data Connection
            datatype: 'Brands',
            brands,
            loading,
            currentData,
            imgLocation,
            DataStore,
            //// Variabls
            ID,
            file,
            brandname: '',
            imageUrl: '',
            formData: new FormData(),
            ///////// Validation  ////
            validationForm,
            isSubmmit,
            image_file,
            name,
        }
    },
    async mounted(){ this.FillData()},
    methods: {
        FillData(){
            this.validationForm.clear()
            let str = this.imgLocation + this.currentData.logo
            if(this.ID != 0){
                this.brandname = this.currentData.name
                this.imageUrl = str
            }
        },
        handleFileUpload(event: Event){ // Get The File data..
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
            var isValid = this.validationForm.checkBrandInfo(this.brandname, this.fileVal)
            if (isValid == 0) {
                this.getData()
                if (this.ID == 0) { // Add New Brand
                    this.DataStore.createData('Brands', this.formData, 'CreateWithImg').then(() => {
                    this.$emit('load-data')
                    this.ondismiss()
                    })
                } else { // Edit Brand
                    this.DataStore.updateData('Brands', this.ID, this.formData, 'EditWithImg').then(() => {
                    this.$emit('load-data')
                    this.ondismiss()
                    })
                }
            }
        },
        // Prepare Data To Create New Brand
        getData(){
        if (this.brandname != '' && this.brandname != null) this.formData.append('name', this.brandname)
        if (this.image_file != null) this.formData.append('logo', this.image_file)
        if(this.ID != 0) this.formData.append('_method', "PUT")
        },
        ondismiss() {
        this.$emit('close')
        },
    }
})


</script>

