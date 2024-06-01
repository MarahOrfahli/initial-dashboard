<template>
    <!-- <div class=" h-screen w-screen text-center pt-40 aligncenter" v-if="loading_product">
        <icon-loader class="animate-[spin_2s_linear_infinite] inline-block align-middle shrink-0" />
    </div> -->
    <div v-if="!loading_product">
        <div class="p-3 flex items-center justify-between flex-wrap gap-4">
        <h2 class="text-xl">{{ t('pages.products_section.fields.img-color-code') }}</h2>
        <div class="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
            <div class="flex gap-3">
                <div>
                    <router-link to="/pages/products/list" class="btn btn-secondary w-fit gap-2">
                        {{ t('pages.products_section.fields.back-product') }}
                    </router-link>
                </div>
            </div>
        </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2">
        <div class="p-3">
            <div class="panel h-full">
                <div class="grid grid-cols-2">
                    <div>
                        <strong v-if="locale == 'eg'">{{ productByID.name_ar }}</strong>
                        <strong v-else-if="locale == 'en'">{{ productByID.name_en }}</strong>
                        <div class="p-1 m-2">
                                <div v-if="locale == 'eg'">{{ productByID.description_ar }}</div>
                                <div v-else-if="locale == 'en'">{{ productByID.description_en }}</div>
                        </div>
                    </div>
                    <div class="mb-1">
                        <div class="mt-2 mr-10 border-slate-500 rounded-md drop-shadow-lg" v-if="imageUrl != ''">
                            <img :src="imageUrl" class="rounded-md w-40">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!------------------------------------>
        <div class="p-3">
            <div class="panel">
                <strong>{{ t('pages.products_section.fields.info') }}</strong>
                <div class="p-1 flex">
                    <div class="m-1 p-1">
                        <div class="m-1 p-1 w-7 h-7 bg-white-dark rounded-full text-white">
                            <icon-printer />
                        </div>
                    </div>
                    <div class="m-1 p-1">
                        <div class="text-info">{{ t('pages.products_section.fields.price') }}:</div>
                        <div>{{ productByID.price }}</div>
                    </div>
                </div>
                <div class="p-1 flex">
                    <div class="m-1 p-1">
                        <div class="m-1 p-1 w-7 h-7 bg-white-dark rounded-full text-white">
                            <icon-printer />
                        </div>
                    </div>
                    <div class="m-1 p-1">
                        <div class="text-info">{{ t('pages.products_section.fields.model') }}:</div>
                        <div>{{ productByID.model }}</div>
                    </div>
                </div>
                <div class="p-1 flex">
                    <div class="m-1 p-1">
                        <div class="m-1 p-1 w-7 h-7 bg-white-dark rounded-full text-white">
                            <icon-printer />
                        </div>
                    </div>
                    <div class="m-1 p-1">
                        <div class="text-info">{{ t('pages.brand.fields.brand-name') }}:</div>
                        <div>{{ brand }}</div>
                    </div>
                </div>
            </div>
        </div>
        <!------------------------------------>
    </div>
    <!-------------------->
    <!-- <imgColorCodeItems :type="'Preview'" :id="ID"  @getUpdateItem="getUpdateItem"/> -->
    </div>
    <div class="panel pb-0 mt-6">
        <div class="datatable">
                <DataTable
                    :rows="productImages"
                    :columns="cols"
                    :dataType="datatype"
                    :sortable="sort"
                    @add="add"
                    @edit="editRow"
                    @delete="deleteRow"
                />
        </div>
    </div>
    <Modal
        v-if="addeditimages"
        :dataType="datatype"
        :show="addeditimages"
        :dataID="imageID"
        :modalTitle="addedit"
        :data="currentData"
        @loadData="getImages"
        @closeModal="close"
    />
</template>
<script lang="ts">
    // Import Vue & Pinia
    import { defineComponent } from 'vue';
    import { storeToRefs } from 'pinia'
    import { useMeta } from '@/composables/use-meta';
    import { useI18n } from 'vue-i18n'
    // Vue-Router
    import { useRouter } from 'vue-router'
    // Import Class Orders && EditBrand Page && useConnectionStore
    import {  Items, ImageItem } from '../../../model/Classes'
    import { useConnectionStore } from '../../../stores/module/DataModule'
    import { notificationStore } from '@/components/notifications'
    import imgColorCodeItems from '@/components/imgColorCode.vue'
    // Import Datatable & Modals
    import Swal from 'sweetalert2';
    import DataTable from '@/components/datatable.vue';
    import IconPrinter from '@/components/icon/icon-printer.vue';
    import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
    import IconEdit from '@/components/icon/icon-edit.vue';
    import IconLoader from '@/components/icon/icon-loader.vue';
    import Modal from '@/components/modal.vue';
    export default defineComponent({
        props: ['id'],
        components: {
            // Datatable & Modals
            DataTable,
            IconPrinter,
            IconTrashLines,
            imgColorCodeItems,
            IconEdit,
            IconLoader,
            Modal
        },
        setup(){
            useMeta({ title: 'Manage Images' });
        },
        computed:{
           cols(){
            let { t } = useI18n()
            let cols = [
                { field: 'image', title: t('page-control.img'), search: false, sort: false, headerClass: 'justify-center'  },
                { field: 'code', title: t('pages.products_section.fields.color-code') , headerClass: 'justify-center' },
                { field: 'hex', title: t('pages.products_section.fields.color'), headerClass: 'justify-center' },
                { field: 'actions', title: t('page-control.action') , search: false , sort: false, headerClass: 'justify-center' },
            ];
            return cols;
           },
           brand(){
            return this.productByID.brand.name
           },
        },
        data(props) {
            const router = useRouter()
            const ID = props.id
            const DataStore = useConnectionStore()
            const notification = notificationStore()
            const { productByID,imgLocation, loading_product, productImages } = storeToRefs(DataStore)
            const { t, locale } = useI18n()
            let currentData = new ImageItem()
            //let values = { images: [] , colors: [], codes: [] }
            return {
                router,
                // Data Connection
              currentData,
              loading_product,
              productImages,
                notification,
                DataStore,
                productByID,
                imgLocation,
                ID,
                addeditimages: false,
                imageID: 0,
                addedit: '',
                // Values
                imageUrl: '',
                sort: ['code'],
                datatype: 'ProductImages',
                ////////
                t,locale,
            }
        },
        async mounted() {
            this.startPage()
            this.getImages()
        },
        methods: {
            startPage(){
                this.DataStore.getData('Products',this.ID, 'GETByID').then(() => {
                    this.imageUrl = this.imgLocation + this.productByID.image
                })
            },
            getImages(){
                this.DataStore.getData(this.datatype,this.ID, 'GET-byProduct')
            },
            // Close The Add-Edit Modal
            close(){
                this.addeditimages = false
            },
            // Add New Item
            add(){
                this.addedit = this.t('pages.products_section.fields.add-img-color-code')
                this.currentData.product_id = this.ID
                this.addeditimages = true
                this.imageID = 0
            },
            // Edit the Item data
            editRow(id: number,data: ImageItem){
                this.addedit = this.t('pages.products_section.fields.edit-img-color-code')
                this.imageID = id
                this.currentData = data
                this.currentData.product_id = this.ID
                this.addeditimages = true
            },
            ////////////////////////////////////
            ///// Delete Methods //////////////
            // Call a notification to confirm delete then delete the item
            deleteRow(idrow: number){
                this.notification.deleteNotification(idrow, this.datatype,this.ID)
            },
        }
    })

</script>