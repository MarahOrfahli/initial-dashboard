<template>
    <div class="panel space-y-5 mt-5">
    <div v-if="pageType == 'Create'" class="mt-3 mb-3 text-xl">{{ t('pages.products_section.fields.add-img-color-code') }}</div>
    <div v-if="pageType == 'Preview'">
        <div class="p-3 flex items-center justify-between flex-wrap gap-4">
            <div class="mt-3 mb-3 text-xl">{{ t('pages.products_section.fields.Manage-img-color-code') }}</div>
            <div class="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    <div class="flex gap-3">
                        <!-- <button type="button" :disabled="disabled" class="btn btn-primary"
                        @click="done()">
                        <span v-if="loading == false">
                            {{ t('page-control.done') }}
                        </span>
                        <span v-else>
                            <IconRefresh class="animate-[spin_1s_linear_infinite] w-5 h-5" />
                        </span>
                        </button> -->
                    </div>
            </div>
        </div>
    </div>
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
                        <th class="w-70">{{ t('page-control.img') }}</th>
                        <th class="w-15">{{ t('pages.products_section.fields.color-code') }}</th>
                        <th class="w-15">{{ t('pages.products_section.fields.color') }}</th>
                        <th class="w-13">
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
                                    @change="handleFileUploadImage($event, item.id, index),item.errorF = false"
                                    class="form-input w-80 file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file:ml-5 file:text-white file:hover:bg-primary" required />
                                    <template v-if="isSubmmit_items && item.errorF == true">
                                        <p class="text-danger mt-1">{{item.errorFile_items}}</p>
                                    </template>
                                </div>
                                <div class="mb-3" v-if="pageType == 'Preview'">
                                    <div class="mt-8 border-slate-500 rounded-md drop-shadow-lg" v-if="item.img_url != ''">
                                        <img :src="item.img_url" class="rounded-md w-32">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="isSubmmit_items ? { 'has-error': item.error_code } : itemEntry.error && item.color.includes('#') && item.color_code == 0 || itemEntry.error && item.color.includes('#') && item.color_code.toString() == ''  ? { 'has-error': true } : ''">
                                    <input type="number" @keyup="isSubmmit_items = false,item.error_code = false" :min="1"
                                    class="form-input w-32" @update:model-value="getUpdateItem,item.visibale = true" v-model="item.color_code" max="999"/>
                                    <template v-if="isSubmmit_items && item.error_code == true">
                                        <p class="text-danger mt-1">{{ item.errorCode_items}}</p>
                                    </template>
                                </div>
                            </td>
                            <td>
                                <div :class="isSubmmit_items ? { 'has-error': item.error_color } :  itemEntry.error && item.color == '' && item.color_code > 0  || itemEntry.error && item.color == '' && item.color_code.toString() == '' ? { 'has-error': true } : ''">
                                    <input type="color" class="form-input w-32 h-10" @update:model-value="getUpdateItem,item.visibale = true"
                                    @click="isSubmmit_items = false,item.error_color = false" v-model="item.color"/>
                                    <template v-if="isSubmmit_items && item.error_color == true">
                                        <p class="text-danger mt-1">{{item.errorColor_items}}</p>
                                    </template>
                                </div>
                            </td>
                            <td> 
                                <button v-if="items.length != 1" class="hover:text-danger p-2" type="button" @click="removeItem(item)">
                                    <span v-if="loading_product_images == false">
                                        <IconTrashLines class="w-5 h-5" />
                                    </span>
                                    <span v-else-if="!item.visibale">
                                        <IconRefresh class="animate-[spin_1s_linear_infinite] w-5 h-5" />
                                    </span>
                                </button>
                                <!-- <button v-if="pageType == 'Preview' && item.type == 'Edit' && item.visibale" class="hover:text-success p-2" type="button" @click="editItem(item.image_id,item)">
                                    <span v-if="loading_product_images == false">
                                        <icon-edit class="w-5 h-5" />
                                    </span>
                                    <span v-else>
                                        <IconRefresh class="animate-[spin_1s_linear_infinite] w-5 h-5" />
                                    </span>
                                </button>
                                <button v-if="pageType == 'Preview' && item.type == 'Create' && item.visibale" class="hover:text-secondary p-2" type="button" @click="addItemToDatabase(item)">
                                    <span v-if="loading_product_images == false">
                                        <icon-plus class="w-5 h-5" />
                                    </span>
                                    <span v-else>
                                        <IconRefresh class="animate-[spin_1s_linear_infinite] w-5 h-5" />
                                    </span>
                                </button> -->
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
    import { StoreItems, Items } from '../model/Classes'
    import { validationStore } from '@/components/validation'
    import { useConnectionStore } from '../stores/module/DataModule'
    import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
    import IconRefresh from '@/components/icon/icon-refresh.vue';
    import IconPlus from '@/components/icon/icon-plus.vue';
    import IconEdit from '@/components/icon/icon-edit.vue';
    // Multiselect
    import Multiselect from '@suadelabs/vue3-multiselect';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
    export default defineComponent({
        props:['type','option','id'],
        emits: ['addItemToSelect','getUpdateItem','validation'],
        components: { IconTrashLines, Multiselect,IconRefresh, IconPlus, IconEdit },
        computed:{ },
        data(props) {
            const { t } = useI18n()
            const pageType = props.type
            const ID = props.id
            let image_file = ref<File | null>(null);
            let temp:Items[] = []
            let items:Items[] = [{id: 0, image: null, img_url : '', color_code: 0, color: '', errorF: false, error_color: false, 
            error_code: false, errorFile_items: '', errorColor_items: '', errorCode_items: '', type: '', image_id: 0, visibale: false }]
            const option = props.option
            const DataStore = useConnectionStore()
            const { productImages, imgLocation, loading, loading_product_images } = storeToRefs(DataStore)
            const validationForm = validationStore()
            const { itemEntry, isSubmmit_items } = storeToRefs(validationForm)
            return {
                // Data Connection
                ID,
                DataStore,
                loading,
                loading_product_images,
                productImages,
                imgLocation,
                itemEntry,
                //////////
                t,pageType,
                option,
                visibale: false,
                image_file,
                items,
                temp,
                // Form Data
                formData: new FormData(),
                // Options For Select
                storesOption: { ids: [], names: [] },
                store_options: { ids: [], names: [] },
                //// Validation
                validationForm,
                isSubmmit_items,
            }
        },
        async mounted() {
            if(this.pageType == 'Preview') this.items = []
          //  this.FillItems()
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
            async FillItems(){
                this.temp = []
                if(this.pageType == 'Preview'){
                    this.DataStore.getData('ProductImages',this.ID, 'GET-byProduct').then(()=>{
                        for (let index = 0; index < this.productImages.length; index++) {
                            if(this.temp[index] != undefined){
                                this.temp[index].img_url = this.imgLocation + this.productImages[index].image
                                this.temp[index].color_code = this.productImages[index].code
                                this.temp[index].color = this.productImages[index].hex
                                this.temp[index].type = 'Edit'
                                this.temp[index].image_id = this.productImages[index].image_id
                            }else{
                                this.addItem(this.productImages[index],'Data')
                            }
                        }
                    }).then(()=>{
                        setTimeout(() => {
                            this.items = this.temp
                            for (let index = 0; index < this.items.length; index++) {
                                this.items[index].image = null
                            }
                        }, .5);
                    })
                }
            },
            addItem(value: any = null, type: string = ''){
                let item
                if(this.pageType == 'Preview' && type == 'Data'){
                    item = {
                        id: this.maxID(this.temp) + 1, image: <File | null>(null), img_url: this.imgLocation + value.image , color_code: value.code == '0' || value.code == 'null' || value.code == null ? 0 : value.code,
                        color: value.hex == 'null' || value.hex == null ? '' : value.hex,
                        errorF: false, error_color: false, error_code: false,
                        errorFile_items: '', errorColor_items: '',  errorCode_items: '', type: 'Edit', image_id : value.image_id
                    }
                    this.temp.push(item)
                }else{
                    item = {
                        id: this.maxID(this.items) + 1, image: <File | null>(null), img_url: '', color_code: 0, color: '',
                        errorF: false, error_color: false, error_code: false,
                        errorFile_items: '', errorColor_items: '',  errorCode_items: '', type: 'Create', image_id : 0
                    }
                if(this.validationForm.checkItemsInfo('ICC',this.items).count == 0) this.items.push(item)
                }
                this.getUpdateItem()
            },
            removeItem(item: any){
                // Filter And Remove This item
                if(this.pageType == 'Preview'){
                    this.DataStore.deleteData('ProductImages', item.image_id).then(()=>{
                        this.FillItems()
                    })
                }else{
                    this.items = this.items.filter((d: any) => d.id != item.id);
                    this.getUpdateItem()
                }
            },
            editItem(id: number, item: Items){
                let arr:Items[] = []
                arr.push(item)
                var valid = this.validationForm.checkItemsInfo('ICC',arr).count
                if(valid == 0){
                    if(item.image == null) this.image_file = null
                    console.log('test')
                    this.prepareData('Edit', item)
                    this.DataStore.updateData('ProductImages', id, this.formData, 'EditWithImg').then(() => {
                        this.FillItems()
                    })
                }
            },
            addItemToDatabase(item: any){
                let arr:Items[] = []
                arr.push(item)
                var valid = this.validationForm.checkItemsInfo('ICC',arr).count
                if(valid == 0){
                    this.image_file = item.image
                    this.prepareData('Create', item)
                    this.DataStore.createData('ProductImages', this.formData, 'CreateWithImg').then(() => {
                        this.FillItems()
                    })
                }
            },
            prepareData(type: string, item: Items){
                this.formData = new FormData()
                this.formData.append('product_id', `${this.ID}`)
                if(item.image != null) this.formData.append(`image`, this.image_file)
                if(item.color_code !== null && item.color_code !== 0 ) this.formData.append('code', `${item.color_code}`)
                if(item.color !== null && item.color != '') this.formData.append('hex', `${item.color}`)
                if(type == 'Edit') this.formData.append('_method', "PUT")
                // this.formData.forEach(element => {
                //     console.log(element)
                //     console.log('****************')
                // });
                //console.log('////////////////////////////////////////////////////////////')
            },
            //////////// Solution For Uploading File Into Array
            handleFileUploadImage(event: Event, itemsId: number , index: number){
                this.items[index].visibale = true
                const target = event.target as HTMLInputElement;
                if (target.files) {
                    this.items[index].image = target.files[0]
                    this.image_file = target.files[0]
                }
                this.uploadImage(index)
                this.getUpdateItem()
            },
            uploadImage(itemsId: number) {
                if (this.image_file) {
                    this.items[itemsId].img_url =  URL.createObjectURL(this.image_file)
                }
            },
            getUpdateItem(){
                this.itemEntry.error = false
                setTimeout(() => {
                    var valid = this.validationForm.checkItemsInfo('ICC',this.items).count
                    this.items = this.validationForm.checkItemsInfo('ICC',this.items).items
                    this.$emit('getUpdateItem',this.items,  valid)
                }, 0.3);
            },
        }
    })
</script>