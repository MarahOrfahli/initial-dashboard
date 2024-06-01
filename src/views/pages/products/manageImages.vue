<template>
    <!-- 
        All Inputs:
        - Color Code
        - Color
        - Image field
     -->
    <div class="space-y-5">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <!--  -------------------------------  Color Code input field  --------------------------------------  -->
        <div class="p-3"> <!--  : color.includes('#') && color_code == 0 || color.includes('#') && color_code.toString() == ''  ? { 'has-error': true } -->
            <div :class="isSubmmit_items ? { 'has-error': code.error } : ''">
                <input type="number" :min="1" :max="999" class="form-input" 
                @update:model-value="isSubmmit_items = false,code.error = false" v-model="color_code" />
                <template v-if="isSubmmit_items && code.error == true">
                    <p class="text-danger mt-1">{{ code.message}}</p>
                </template>
            </div>
        </div>
        <!---------------------------------------------------------------------------------------------------------->
        <!--  -------------------------------  Color input field  --------------------------------------  -->
        <div class="p-3"> <!-- color == '' && color_code > 0  || color == '' && color_code.toString() == '' ? { 'has-error': true } :  -->
            <div :class="isSubmmit_items ? { 'has-error': hex.error } : ''">
                <input type="color" class="form-input h-10" 
                @update:model-value="isSubmmit_items = false,hex.error = false" v-model="color"/>
                <template v-if="isSubmmit_items && hex.error == true">
                    <p class="text-danger mt-1">{{hex.message}}</p>
                </template>
            </div>
        </div>
        <!---------------------------------------------------------------------------------------------------------->
        <!--  -------------------------------  Image input field  --------------------------------------  -->
        <div class="p-3 col-span-2">
            <div :class="isSubmmit_items ? { 'has-error': file.error } : ''">
                <input id="ctnFile" type="file" @click="isSubmmit_items = false" :model-value="fileVal"
                    @change="handleFileUpload($event),file.error = false"
                    class="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file:ml-5 file:text-white file:hover:bg-primary" required />
                    <template v-if="isSubmmit_items && file.error == true">
                        <p class="text-danger mt-1">{{file.message}}</p>
                    </template>
            </div>
            <div class="mb-10">
                <div class="mt-8 border-slate-500 rounded-md drop-shadow-lg" v-if="imageUrl != ''">
                    <img :src="imageUrl" class="rounded-md w-40">
                </div>
            </div>
        </div>
        <!---------------------------------------------------------------------------->
    </div>
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
import { useConnectionStore } from '../../../stores/module/DataModule'
import { useMeta } from '@/composables/use-meta';
import { ImageItem } from '@/model/Classes';

export default defineComponent({
    props: ['dataid','data'],
    emits: ['close', 'load-data'],
    components: { IconRefresh },
    setup(){
            useMeta({ title: 'Manage Images' });
    },
    computed: {
        fileVal(){
            if(this.ID != 0) return this.imageUrl
            else return this.image_file
        },
    },
    data(props){
        // Variables
        let image_file = ref<File | null>(null);
        let currentData: ImageItem = props.data
        const ID = props.dataid
        // Data & t-translate
        const DataStore = useConnectionStore()
        const validationForm = validationStore()
        const { isSubmmit_items, code, hex, file } = storeToRefs(validationForm)
        const { loading, imgLocation } = storeToRefs(DataStore)
        const { t } = useI18n()
        return{
            t,
            // Data Connection
            datatype: 'ProductImages',
            currentData,
            imgLocation,
            DataStore,
            loading,
            ///////
            ID,
            file,
            color_code: 0,
            color: '',
            imageUrl: '',
            formData: new FormData(),
            ///////// Validation  ////
            isSubmmit_items,
            validationForm,
            code,
            hex,
            image_file,
        }
    },
    async mounted(){ this.FillData() },
    methods: {
        FillData(){
            this.validationForm.clear()
            let str = this.imgLocation + this.currentData.image
            if(this.ID != 0){
                if(this.currentData.code == null) this.currentData.code = 0
                if(this.currentData.hex == null) this.currentData.hex = ''
                this.color_code = this.currentData.code
                this.color = this.currentData.hex
                this.imageUrl = str
            }
        },
        ////////////////////////////////////////////////////////////////////////
        ///////// Upload File And Preview The File In Image ////////////////////
        handleFileUpload(event: Event){
            this.isSubmmit_items = false
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
        /////////////////////////////////////////
        saveInfo(){
            var isValid = this.validationForm.checkImageItemInfo(this.color_code, this.color, this.imageUrl, this.image_file)
            if (isValid == 0) {
                this.getData()
                if (this.ID == 0) { // Create Data
                    this.DataStore.createData(this.datatype, this.formData, 'CreateWithImg').then(() => {
                    this.$emit('load-data')
                    this.ondismiss()
                    })
                } else { // Update Data
                    this.DataStore.updateData(this.datatype, this.ID, this.formData, 'EditWithImg').then(() => {
                    this.$emit('load-data')
                    this.ondismiss()
                    })
                }
            }
        },
        getData(){ // Use Form Data To Submit The Data Into Database
            this.formData.append('product_id', `${this.currentData.product_id}`)
            if(this.image_file != null) this.formData.append(`image`, this.image_file)
            if(this.color_code !== null && this.color_code > 0 ) this.formData.append('code', `${this.color_code}`)
            if(this.color !== null && this.color != '') this.formData.append('hex', `${this.color}`)
            if(this.ID != 0) this.formData.append('_method', "PUT")
        },
        ondismiss() {
        this.$emit('close')
        },
    }
})


</script>