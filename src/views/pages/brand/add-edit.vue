<template>
    <div class="space-y-5">
        <!--  -------------------------------  Brand name input field  --------------------------------------  -->
        <div :class="isSubmmit ? { 'has-error': errorn } : ''">
            <label for="name">{{ t('pages.brand.fields.brand-name') }}</label>
            <input id="name" type="text" :placeholder="t('pages.brand.fields.enter-title')" class="form-input" 
            @keyup="isSubmmit = false,errorn = false" v-model="name" />
            <template v-if="isSubmmit && errorn == true">
            <p class="text-danger mt-1">{{errorName}}</p>
            </template>
        </div>
        <!-------------------------------------------------------------------------------------------->
        <!--  -------------------------------  Image field  --------------------------------------  -->
        <div :class="isSubmmit ? { 'has-error': errorI, 'has-success': !errorI } : ''">
            <label for="cat-img">{{ t('page-control.upload-brand-image') }}</label>
            <input id="cat-img" type="file" class="" @change="handleFileUpload"
            accept="image/*" @click="" :model-value="fileVal"/>
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
            if(this.ID != 0) return this.fileImg
            else return this.file
        }
    },
    data(props){
       const file = ref<File | null>(null);
        const DataStore = useConnectionStore()
        const { brand, loading, imgLocation } = storeToRefs(DataStore)
        const { t, locale } = useI18n()
       const ID = props.dataid
       const fileImg = { name: 'image', url: '' }
       let currentData: Brands = props.data
        return{
            t,
            // Data Connection
            brand,
            loading,
            currentData,
            imgLocation,
            DataStore,
            //// Variabls
            ID,
            file,
            fileImg,
            name: '',
            counter: 0,
            formData: new FormData(),
            ///////// Validation  ////
            isSubmmit: false,
            errorn: false,
            errorI: false,
            errorImage: '',
            errorName: '',
        }
    },
    async mounted(){ this.FillData()},
    methods: {
        FillData(){
            let str = this.imgLocation + this.currentData.logo
            if(this.ID != 0){
                this.name = this.currentData.name
                this.fileImg.url = str
            }
        },
        handleFileUpload(event: Event){ // Get The File data..
            this.isSubmmit = false
            this.errorI = false
            const target = event.target as HTMLInputElement;
            if (target.files) {
                this.file = target.files[0]
                console.log(this.file)
            }
        },
        formValidate(){  // Validation Method
            this.isSubmmit = true
            if(this.name == ''){
                this.errorn = true
                this.errorName = this.t('pages.brand.errors.brand-empty')
            }else if(this.name.length > 29){
                this.errorn = true
                this.errorName = this.t('page-control.error-length')
            }
            if(this.fileVal == null){
                this.errorI = true
                this.errorImage = this.t('pages.brand.errors.upload')
            }
            if (this.errorn == true || this.errorI == true) {
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
                if (this.ID === 0) { // Add New Brand
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
        this.formData.append('id', this.ID)
        if (this.name != '' && this.name != null) this.formData.append('name', this.name)
        if (this.file != null) this.formData.append('logo', this.file)
        this.formData.append('_method', "PUT")
        },
        ondismiss() {
        this.$emit('close')
        },
    }
})


</script>

