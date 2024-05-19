<template>
    <div class="panel space-y-5 mt-5">
    <div v-if="pageType == 'Create'" class="mt-3 mb-3 text-xl">{{ t('pages.products_section.fields.add-img-color-code') }}</div>
    <div v-if="pageType == 'Preview'" class="mt-3 mb-3 text-xl">{{ t('pages.products_section.fields.Manage-img-color-code') }}</div>
    <div>
        <template v-if="itemEntry.error == true">
            <p class="badge bg-danger">{{itemEntry.message}}</p>
        </template>
    </div>
    <div class="mt-8">
        <div class="table-responsive drop-shadow-lg">
            <table>
                <thead>
                    <tr>
                        <th class="w-80">{{ t('page-control.img') }}</th>
                        <th class="w-10">{{ t('pages.products_section.fields.color-code') }}</th>
                        <th class="w-10">{{ t('pages.products_section.fields.color') }}</th>
                        <th class="w-3">
                            <div class="sm:mb-0 mb-6">
                                <button type="button" class="btn btn-primary" @click="addItem()">{{ t('page-control.add-more') }}</button>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="items.length <= 0">
                        <tr>
                            <td colspan="4" class="!text-center font-semibold">{{ t('page-control.no-item') }}</td>
                        </tr>
                    </template>
                    <template v-for="(item, index) in items" :key="index">
                        <tr class="align-top">
                            <td>
                                <div :class="isSubmmit_items ? { 'has-error': item.errorF } : itemEntry.error ? { 'has-error': item.errorF } : ''">
                                    <input id="ctnFile" type="file" @click="isSubmmit_items = false" :model-value="item.image"
                                    @change="handleFileUploadImage($event, index),item.errorF = false"
                                    class="form-input w-80 file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file:ml-5 file:text-white file:hover:bg-primary" required />
                                    <template v-if="isSubmmit_items && item.errorF == true">
                                        <p class="text-danger mt-1">{{item.errorFile_items}}</p>
                                    </template>
                                </div>
                                <div class="mb-10" v-if="pageType == 'Preview'">
                                    <div class="mt-8 border-slate-500 rounded-md drop-shadow-lg" v-if="imageUrl != ''">
                                        <img :src="imageUrl" class="rounded-md w-40">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="isSubmmit_items ? { 'has-error': item.error_code } : itemEntry.error && item.color.includes('#') && item.color_code == 0 || itemEntry.error && item.color.includes('#') && item.color_code.toString() == ''  ? { 'has-error': true } : ''">
                                    <input type="number" @keyup="isSubmmit_items = false,item.error_code = false" :min="1"
                                    class="form-input w-32" @update:model-value="getUpdateItem" v-model="item.color_code" max="999"/>
                                    <template v-if="isSubmmit_items && item.error_code == true">
                                        <p class="text-danger mt-1">{{ item.errorCode_items}}</p>
                                    </template>
                                </div>
                            </td>
                            <td>
                                <div :class="isSubmmit_items ? { 'has-error': item.error_color } :  itemEntry.error && item.color == '' && item.color_code > 0  || itemEntry.error && item.color == '' && item.color_code.toString() == '' ? { 'has-error': true } : ''">
                                    <input type="color" class="form-input w-32 h-10" @update:model-value="getUpdateItem"
                                    @click="isSubmmit_items = false,item.error_color = false" v-model="item.color"/>
                                    <template v-if="isSubmmit_items && item.error_color == true">
                                        <p class="text-danger mt-1">{{item.errorColor_items}}</p>
                                    </template>
                                </div>
                            </td>
                            <td>
                                <button v-if="index != 0" class="hover:text-danger p-2" type="button" @click="removeItem(item)">
                                    <IconTrashLines class="w-5 h-5" />
                                </button>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
                    
    </div>
</div>
</template>
<script lang="ts">
    import { ref,defineComponent } from 'vue';
    import { useI18n } from 'vue-i18n'
    import { storeToRefs } from 'pinia'
    import { validationStore } from '@/components/validation'
    import { useConnectionStore } from '../stores/module/DataModule'
    import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
    // Multiselect
    import Multiselect from '@suadelabs/vue3-multiselect';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
    export default defineComponent({
        props:['type','items','option','data'],
        emits: ['addItemToSelect','getUpdateItem','validation'],
        components: { IconTrashLines, Multiselect },
        computed:{ },
        data(props) {
            const { t } = useI18n()
            const pageType = props.type
            let image_file = ref<File | null>(null);
            let items = [{id: 0, image: null, color_code: 0, color: '', errorF: false, error_color: false, 
            error_code: false, errorFile_items: '', errorColor_items: '', errorCode_items: '' }]
            const option = props.option
            const DataStore = useConnectionStore()
            const { } = storeToRefs(DataStore)
            const validationForm = validationStore()
            const { itemEntry } = storeToRefs(validationForm)
            return {
                // Data Connection
                DataStore,
                itemEntry,
                //////////
                t,pageType,
                option,
                imageUrl: '',
                image_file,
                items,
                only_quantity: true,
                quantity: 1,
                alert_quantity: 1,
                // Options For Select
                storesOption: { ids: [], names: [] },
                store_options: { ids: [], names: [] },
                //// Validation
                validationForm,
                isSubmmit_items : false,
            }
        },
        async mounted() {
            this.validationForm.clear()
            this.getUpdateItem()
        },
        methods: {
            ////////////////////// Manage Items ( Images-Colors-Codes ) ///////////////////
            maxID(array: any){ // Help With Order The IDs.
                let maxId
                if (array && array.length) {
                    maxId = array.reduce((max: number, character: any) => 
                    (character.id > max ? character.id : max), array[0].id);
                }
                if(Number.isNaN(maxId) || maxId == undefined) maxId = 0
                return maxId
            },
            items_formValidate(){
                let Error_Counter = 0
                this.isSubmmit_items = true
                for (let index = 0; index < this.items.length; index++) {
                    let theItems = this.items[index]
                    theItems.errorF = false
                    theItems.errorFile_items = ''
                    theItems.error_code = false
                    theItems.errorCode_items = ''
                    theItems.error_color = false
                    theItems.errorColor_items = ''
                    if(theItems.image == null){
                        theItems.errorF = true
                        theItems.errorFile_items = this.t('pages.products_section.errors.upload-img-item')
                    }
                    if(theItems.color.includes('#') && theItems.color_code == 0 || 
                        theItems.color.includes('#') && theItems.color_code.toString() == ''){
                        theItems.error_code = true
                        theItems.errorCode_items = this.t('pages.products_section.errors.code')
                    }else if(!theItems.color.includes('#') && theItems.color_code != 0 &&
                         theItems.color_code.toString() != ''){
                        theItems.error_color = true
                        theItems.errorColor_items = this.t('pages.products_section.errors.color')
                    }
                }
                for (let index = 0; index < this.items.length; index++) {
                    let theItems = this.items[index]
                    if( theItems.errorF == true || theItems.error_code == true || theItems.error_color == true){
                        Error_Counter++
                    }
                }
                return Error_Counter
            },
            addItem(){
                let item
                item = {
                        id: this.maxID(this.items) + 1, image: <File | null>(null), color_code: 0, color: '',
                        errorF: false, error_color: false, error_code: false,
                        errorFile_items: '', errorColor_items: '',  errorCode_items: ''
                    }
                if(this.items_formValidate() == 0) this.items.push(item);
                this.getUpdateItem()
            },
            removeItem(item: any){
                // Filter And Remove This item
                this.items = this.items.filter((d: any) => d.id != item.id);
                this.getUpdateItem()
            },
            //////////// Solution For Uploading File Into Array
            handleFileUploadImage(event: Event, itemsId: number ){
                const target = event.target as HTMLInputElement;
                if (target.files) {
                    this.items[itemsId].image = target.files[0]
                    this.image_file = target.files[0]
                }
                this.uploadImage()
                this.getUpdateItem()
            },
            uploadImage() {
                if (this.image_file) {
                    this.imageUrl = URL.createObjectURL(this.image_file);
                }
            },
            getUpdateItem(){
                this.itemEntry.error = false
                setTimeout(() => {
                    var valid = this.items_formValidate()
                    this.$emit('getUpdateItem',this.items,  valid)
                }, 0.3);
            },
        }
    })
</script>