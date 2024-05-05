<template>
    <div v-if="pageType == 'Create'" class="panel space-y-5 mt-5">
    <div class="mt-3 mb-3 text-xl">{{ t('pages.products_section.fields.add-product-store') }}</div>
        <div class="mt-8 mb-4">
            <div class="p-3 flex gap-3">
                <label class="inline-flex" @click="unsetQuantities">
                    <input type="radio" :value="true" v-model="only_quantity" name="default_radio" class="form-radio" />
                    <span>{{ t('pages.store.modals.specific-value') }}</span>
                </label>
                <label class="inline-flex">
                    <input type="radio" :value="false" v-model="only_quantity" name="default_radio" class="form-radio" />
                    <span>{{ t('pages.store.modals.value-for-all') }}</span>
                </label>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div class="p-3">
                    <div v-if="!only_quantity">
                        <div class="flex items-center">
                            <label for="quantity" class="ltr:mr-2 rtl:ml-2 mb-0 w-3/4">{{ t('pages.store.modals.set') }}</label>
                            <input id="quantity" type="number" :min="1"
                            class="form-input cursor-pointer w-1/4" v-model="quantity"  @update:model-value="addQuantitiesToStores"/>
                        </div>
                    </div>
                </div>
                <div class="p-3">
                    <div v-if="!only_quantity">
                        <div class="flex items-center">
                            <label for="quantity" class="ltr:mr-2 rtl:ml-2 mb-0 w-3/4">{{ t('pages.store.modals.choose-alert') }}</label>
                            <input id="quantity" type="number" :min="1"
                            class="form-input cursor-pointer w-1/4" v-model="alert_quantity"  @update:model-value="addAlertQuantitiesToStores"/>
                        </div>
                    </div>
                </div>
                <div class="p-3">
                <!--  -------------------------------  Select field  --------------------------------------  -->
                <div :class="isSubmmit ? { 'has-error': productstore.error} : ''">
                    <div class="flex items-center">
                        <label for="store" class="ltr:mr-2 rtl:ml-2 mb-0">{{ t('pages.products_section.modals.stores') }}</label>
                        <!-- searchable -->
                        <multiselect
                        id="store"
                        v-model="store"
                        :options="storesOption.names"
                        @click="isSubmmit = false,productstore.error = false"
                        @update:model-value="update_selected"
                        class="custom-multiselect"
                        :searchable="true"
                        :loading="loading_store"
                        :placeholder="t('page-control.select-option')"
                        ></multiselect>
                    </div>
                    <template v-if="isSubmmit && productstore.error == true">
                    <p class="text-danger mt-1">{{productstore.message}}</p>
                    </template>
                </div>
            </div>
        </div>
        <div>
            <template v-if="isSubmmit && Quantity.error == true">
                <p class="text-danger mt-1">{{Quantity.message}}</p>
            </template>
        </div>
    </div>
    <div class="table-responsive drop-shadow-lg">
    <table>
        <thead>
            <tr>
                <th class="w-40">{{ t('pages.store.fields.name') }}</th>
                <th class="w-10">{{ t('pages.store.fields.quantities') }}</th>
                <th class="w-80">{{ t('pages.store.modals.alert-values') }}</th>
                <th class="w-10"></th>
            </tr>
        </thead>
        <tbody>
           <template v-if="stores_items.length == 0">
                <tr>
                    <td colspan="4" class="!text-center font-semibold">{{ t('page-control.no-item') }}</td>
                </tr>
            </template>
            <template v-for="(item, i) in stores_items" :key="i">
                <tr v-if="item.id > 0" class="align-top">
                    <td>
                        <div class="p-3">
                            <label><Strong>{{ item.name }}</Strong></label>
                        </div>
                    </td>
                    <td>
                        <div :class="{ 'has-error': item.errorq }">
                            <div class="flex items-center">
                                <input id="quantity" type="number" :min="0"
                                :class="only_quantity == false? 'form-input w-32' : 'form-input w-32 cursor-pointer'"
                                @update:model-value="getUpdateItem"
                                v-model="item.quantity" :disabled="!only_quantity"/>
                            </div>
                            <template v-if="item.errorq == true">
                                <p class="text-danger mt-1">{{item.error}}</p>
                            </template>
                        </div>
                    </td>
                    <td>
                        <div :class=" { 'has-error': item.erroraq }">
                            <div class="flex items-center">
                                <input id="quantity" type="number" :min="0"
                                :class="only_quantity == false? 'form-input w-32' : 'form-input w-32 cursor-pointer'"
                                @update:model-value="getUpdateItem"
                                v-model="item.alert_quantity" :disabled="!only_quantity" />
                            </div>
                            <template v-if="item.erroraq == true">
                                <p class="text-danger mt-1">{{item.errorAQ}}</p>
                            </template>
                        </div>
                    </td>
                    <td>
                        <div class="m-3">
                            <button class="hover:text-danger" type="button" @click="removeItem(item)">
                                <IconTrashLines class="w-5 h-5" />
                            </button>
                        </div>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
</div>
</div>
<div v-if="pageType == 'Preview'" class="panel space-y-5 mt-5">
<div class="mt-3 mb-3 text-xl">{{ t('pages.products_section.modals.stores') }}</div>
<div class="table-responsive drop-shadow-lg">
    <table>
        <thead>
            <tr>
                <th class="w-40">{{ t('pages.store.fields.name') }}</th>
                <th class="w-10">{{ t('pages.store.fields.quantities') }}</th>
                <th class="w-80">{{ t('pages.store.modals.alert-values') }}</th>
            </tr>
        </thead>
        <tbody>
           <template v-if="stores_items.length == 0">
                <tr>
                    <td colspan="3" class="!text-center font-semibold">{{ t('page-control.no-item') }}</td>
                </tr>
            </template>
            <template v-for="(item, i) in stores_items" :key="i">
                <tr v-if="item.id > 0" class="align-top">
                    <td>
                        <div class="p-3">
                            <label><Strong>{{ item.name }}</Strong></label>
                        </div>
                    </td>
                    <td>
                        <div>{{ item.quantity }}</div>
                    </td>
                    <td>
                        <div>{{ item.alert_quantity }}</div>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
</div>
</div>
</template>
<script lang="ts">
    import { defineComponent } from 'vue';
    import { useI18n } from 'vue-i18n'
    import { storeToRefs } from 'pinia'
    import { StoreItems, item } from '../model/Classes'
    import { validationStore } from '@/components/validation'
    import { useConnectionStore } from '../stores/module/DataModule'
    import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
    // Multiselect
    import Multiselect from '@suadelabs/vue3-multiselect';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
    export default defineComponent({
        props:['type', 'items','option'],
        emits: ['addItemToSelect','getUpdateItem','validation'],
        components: { IconTrashLines, Multiselect },
        computed:{ },
        data(props) {
            const { t } = useI18n()
            const pageType = props.type
            let stores_items: StoreItems[] = []
            const option = props.option
            const DataStore = useConnectionStore()
            const { stores, loading_store} = storeToRefs(DataStore)
            const validationForm = validationStore()
            const { isSubmmit, productstore, Quantity } = storeToRefs(validationForm)
            return {
                // Data Connection
                stores,
                DataStore,
                validationForm,
                loading_store,
                //////////
                t,pageType,
                option,
                store: '',
                storeID: 0,
                stores_items,
                only_quantity: true,
                quantity: 1,
                alert_quantity: 1,
                // Options For Select
                storesOption: { ids: [], names: [] },
                store_options: { ids: [], names: [] },
                //// Validation
                isSubmmit,
                productstore,
                Quantity,
            }
        },
        async mounted() {
            this.getUpdateItem()
            this.getData_ToOption()
        },
        methods: {
            ////////// Manage Items ( Stores )///////////////////
            addQuantitiesToStores(){
                if(this.only_quantity == false && this.stores_items.length > 0){
                    for (let index = 0; index < this.stores_items.length; index++){
                    let theItems = this.stores_items[index]
                    theItems.quantity = this.quantity
                    }
                }
                this.getUpdateItem()
            },
            addAlertQuantitiesToStores(){
                if(this.only_quantity == false && this.stores_items.length > 0){
                    for (let index = 0; index < this.stores_items.length; index++){
                    let theItems = this.stores_items[index]
                    theItems.alert_quantity = this.alert_quantity
                    }
                }
                this.getUpdateItem()
            },
            unsetQuantities(){
                console.log(this.quantity)
                console.log(this.alert_quantity)
                this.quantity = 1
                this.alert_quantity = 1
            },
            maxID(array: any){ // Help With Order The IDs.
                let maxId
                if (array && array.length) {
                    maxId = array.reduce((max: number, character: any) => 
                    (character.id > max ? character.id : max), array[0].id);
                }
                if(Number.isNaN(maxId) || maxId == undefined) maxId = 0
                return maxId
            },
            addItem(type: string, storename = '', storeid = 0, valAQantity = 0, valQantity = 0){
                let item
                if(type == 'stores'){ // stores_items 
                    item = {
                        id: this.maxID(this.stores_items) + 1, name: storename, quantity: valQantity, erroraq: false, errorAQ: '',
                        alert_quantity: valAQantity, storeID: storeid, errorq: false, error: ''
                    }
                    if(this.validationForm.checkItemsInfo('Store',this.stores_items).count == 0) this.stores_items.push(item);
                }
                this.getUpdateItem()
            },
            getData_ToOption(){
                this.DataStore.getData('Store').then(() => {
                    this.stores.forEach(element => {  // Data Connection Data into options object
                        this.store_options.ids.push(element.id)
                        this.store_options.names.push(element.name)
                    });
                }).then(()=>{
                    this.storesOption = this.store_options
                })
            },
            update_selected(){
                let id
                    if(!this.only_quantity && this.quantity == 0) this.quantity  = 1
                    if(!this.only_quantity && this.alert_quantity == 0) this.alert_quantity  = 1
                    for (let index = 0;  index < this.storesOption.names.length; index++) {
                        if(this.storesOption.names[index] == this.store){
                            id = this.storesOption.ids[index]
                            if(this.validationForm.checkItemsInfo('Store',this.stores_items).count != 0){
                                this.store = ''
                            }else if(this.validationForm.checkItemsInfo('Store',this.stores_items).count == 0){
                                this.addItem('stores', this.store, this.storesOption.ids[index],this.alert_quantity, this.quantity)
                                this.storesOption.names = this.storesOption.names.filter(item => item !== this.store)
                                this.storesOption.ids = this.storesOption.ids.filter(item => item !== id)
                            }
                        }
                    }
                    
            },
            removeItem(item: any){
                // Filter And Remove This item
                this.store = ''
                this.stores_items = this.stores_items.filter((d: any) => d.id != item.id);
                // Add The Item Again Into the Select...
                this.storesOption.names.push(item.name)
                this.storesOption.ids.push(item.id)
                this.getUpdateItem()
            },
            getUpdateItem(){
                let arr: item[] = []
                this.Quantity.error = false
                setTimeout(() => {
                this.stores_items = this.validationForm.checkItemsInfo('Store',this.stores_items).items
                for (let index = 0; index < this.stores_items.length; index++) {
                    let storitem = this.stores_items[index]
                    arr.push({ id: storitem.storeID, quantity: storitem.quantity, alert_quantity: storitem.alert_quantity  })
                }
                this.$emit('getUpdateItem',this.store, this.stores_items, arr, this.validationForm.checkItemsInfo('Store',this.stores_items).count)
                }, 0.3);
            },
        }
    })
</script>