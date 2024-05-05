<template>
    <div @click="EditProduct(1)">test</div>
    <div class="panel pb-0 mt-6">
        <div class="datatable">
            <DataTable
                :rows="products"
                :columns="cols"
                :dataType="datatype"
                :sortable="sort"
                @add="addProduct"
                @edit="EditProduct"
                @delete="deleteRow"
            />
        </div>
    </div>
</template>
<script lang="ts">
    import { defineComponent } from 'vue';
    // Vue-Router
    import { useRouter } from 'vue-router'
    import { useI18n } from 'vue-i18n'
    import { useMeta } from '@/composables/use-meta';
    import { storeToRefs } from 'pinia'
    import Swal from 'sweetalert2';
    import DataTable from '@/components/datatable.vue';
    import { Products } from '../../../model/Classes'
    import { useConnectionStore } from '../../../stores/module/DataModule'
    import { notificationStore } from '@/components/notifications'
    export default defineComponent({
        components: {
            Swal,
            DataTable
        },
        setup(){
            useMeta({ title: 'Products List' });
        },
        computed:{
           cols(){
            let { t } = useI18n()
            let cols = [
                { field: 'name', title: t('pages.products_section.fields.name'), headerClass: 'justify-center' },
                { field: 'model', title: t('pages.products_section.fields.model'), headerClass: 'justify-center'  },
                { field: 'belongTo', title: t('pages.products_section.fields.belong-to'), headerClass: 'justify-center'  },
                { field: 'price', title: t('pages.products_section.fields.price'), headerClass: 'justify-center'  },
                { field: 'available', title: t('pages.products_section.fields.available'), sort: false, headerClass: 'justify-center'  },
                { field: 'popular', title: t('pages.products_section.fields.popular'), sort: false, headerClass: 'justify-center' },
                { field: 'new', title: t('pages.products_section.fields.new'), sort: false, headerClass: 'justify-center' },
                { field: 'actions', title: t('page-control.action') , sort: false, headerClass: 'justify-center' },
            ];
            return cols;
           }
        },
        data() {
            let currentData = new Products()
            const { t, locale } = useI18n()
            const router = useRouter()
            const DataStore = useConnectionStore()
            const notification = notificationStore()
            const { products} = storeToRefs(DataStore)
            // const products = [
            //     {
            //         id: 1,
            //         name: 'هايلايتر سائل',
            //         model: 1584,
            //         belongTo: 'هاي لايترز - وجه',
            //         price: 35,
            //         available: true,
            //         popular: false,
            //         new: true
            //     },
            //     {
            //         id: 2,
            //         name: 'نيو ليب ستيك',
            //         model: 2503,
            //         belongTo: 'ليب ستيك - شفاة',
            //         price: 15,
            //         available: false,
            //         popular: true,
            //         new: false
            //     },
            //     {
            //         id: 3,
            //         name: 'مخمرية - ست عطور',
            //         model: 1997,
            //         belongTo: 'مخمرية - عناية بالجسم',
            //         price: 0,
            //         available: true,
            //         popular: true,
            //         new: false
            //     },
            // ];
            return {
                router,
                sort: ['name', 'model', 'belongTo', 'price'],
                datatype: 'Product',
                // Data Connection
                products,
                DataStore,
                notification,
                currentData,
                //////////
                t,locale,
                search: '',
            }
        },
        async mounted() { this.startPage() },
        methods: {
            startPage(){
                this.DataStore.getData('Products').then(() => {})
            },
            // Add And Edit the Item data
            addProduct(){
                this.router.push({
                    name: 'products-add',
                    params: { type: 'Create' }, // type: 'add' || type: 'edit'
                })
            },
            EditProduct(productID: number){
                this.router.push({
                    name: 'products-edit',
                    params: { type: 'Edit', id: productID }, // type: 'add' || type: 'edit'
                })
            },
            ManageProductImages(productID: number){
                this.router.push({
                    name: 'products-manageImages',
                    params: { id: productID },
                })
            },
            ////////////////////////////////////
            ///// Delete Methods //////////////
            // Call a notification to confirm delete then delete the item
            deleteRow(idrow: number){
                this.notification.deleteNotification(idrow, 'Products')
            }
        }
    })
</script>
