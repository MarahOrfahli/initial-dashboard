<template>
    <div class="panel pb-0 mt-6">
        <div class="datatable">
            <DataTable
                :rows="orders"
                :columns="cols"
                :dataType="datatype"
                :sortable="sort"
                @add="addOrder"
                @edit="EditOrder"
                @delete="deleteRow"
                @showOrderDetails="showOrderDetails"
                @showTimeLine="showTimeLine"
            />
        </div>
    </div>
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
    import {  Orders } from '../../../model/Classes'
    import { useConnectionStore } from '../../../stores/module/DataModule'
    import { notificationStore } from '@/components/notifications'
    // Import Datatable & Modals
    import Swal from 'sweetalert2';
    import DataTable from '@/components/datatable.vue';
    export default defineComponent({
        components: {
            // Datatable & Modals
            DataTable,
            Swal
        },
        setup(){
            useMeta({ title: 'Orders List' });
        },
        computed:{
           cols(){
            let { t } = useI18n()
            let cols = [
                { field: 'ordernum', title: t('pages.orders.fields.order'),search: false , sort: false, headerClass: 'justify-center' },
                { field: 'date', title: t('pages.orders.fields.order-date'), sort: false, headerClass: 'justify-center' },
                { field: 'shippingcompany', title: t('pages.orders.fields.shipping-company'), headerClass: 'justify-center' },
                { field: 'status', title: t('pages.orders.fields.status'), headerClass: 'justify-center' },
                { field: 'actions', title: t('page-control.action') , search: false , sort: false, headerClass: 'justify-center' },
            ];
            return cols;
           },
        },
        data() {
            let currentData = new Orders()
            const router = useRouter()
            const DataStore = useConnectionStore()
            const notification = notificationStore()
            const { orders } = storeToRefs(DataStore)
            const { t, locale } = useI18n()
            return {
                router,
                sort: ['name'],
                datatype: 'Order',
                // Data Connection
                currentData,
                notification,
                DataStore,
                orders,
                // Values
                ////////
                t,locale,
            }
        },
        async mounted() {
            this.startPage()
        },
        methods: {
            startPage(){
                this.DataStore.getData('Orders').then(() => { })
            },
            // Add And Edit the Item data
            addOrder(){
                this.router.push({
                    name: 'orders-add',
                    params: { type: 'Create' }, // type: 'add' || type: 'edit'
                })
            },
            EditOrder(orderID: number){
                this.router.push({
                    name: 'orders-edit',
                    params: { type: 'Edit', id: orderID }, // type: 'add' || type: 'edit'
                })
            },
            showOrderDetails(id: number){
                this.router.push({
                    name: 'orders-details',
                    params: { id: id },
                })
            },
            showTimeLine(id: number){
                this.router.push({
                    name: 'orders-timeline',
                    params: { id: id },
                })
            },
            ////////////////////////////////////
            ///// Delete Methods //////////////
            // Call a notification to confirm delete then delete the item
            deleteRow(idrow: number){
                this.notification.deleteNotification(idrow, 'Orders')
            }
        }
    })
</script>
