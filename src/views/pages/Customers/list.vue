<template>
    <div class="panel pb-0 mt-6">
        <div class="datatable">
            <DataTable
                :rows="customers"
                :columns="cols"
                :dataType="datatype"
                :sortable="sort"
                @add="addCustomer"
                @edit="EditCustomer"
                @delete="deleteRow"
            />
        </div>
    </div>
</template>
<script lang="ts">
    import { defineComponent } from 'vue';
    import { storeToRefs } from 'pinia'
    import { useI18n } from 'vue-i18n'
    import Swal from 'sweetalert2';
    // Vue-Router
    import { useRouter } from 'vue-router'
    import Modal from '@/components/modal.vue';
    import { Customer } from '../../../model/Classes'
    import { useConnectionStore } from '../../../stores/module/DataModule'
    import { notificationStore } from '@/components/notifications'
    import DataTable from '@/components/datatable.vue';
    import { useMeta } from '@/composables/use-meta';
    export default defineComponent({
        components: {
            DataTable,
            Modal,
            Swal
        },
        setup(){
            useMeta({ title: 'Customer List' });
        },
        computed:{
           cols(){
            let { t } = useI18n()
            let cols = [
                { field: 'name', title: t('pages.customer.fields.name'), headerClass: 'justify-center' },
                { field: 'phone', title: t('pages.customer.fields.phone'), headerClass: 'justify-center'  },
                { field: 'address', title: t('pages.customer.fields.address'), headerClass: 'justify-center'  },
                { field: 'actions', title: t('page-control.action') , sort: false, headerClass: 'justify-center' },
            ];
            return cols;
           },
        },
        data() {
            let currentData = new Customer()
            const router = useRouter()
            const DataStore = useConnectionStore()
            const notification = notificationStore()
            const { customers} = storeToRefs(DataStore)
            const { t, locale } = useI18n()
            return {
                router,
                datatype: 'Customer',
                sort: ['name', 'address', 'phone','email'],
                // Data Connection
                DataStore,
                notification,
                customers,
                currentData,
                ////////
                t,locale
            }
        },
        async mounted() {
             this.startPage() },
        methods: {
            startPage(){
                this.DataStore.getData('Customer').then(() => { })
            },
            ////////////////////////////////////////////////
            // Add And Edit the Item data (Using Vue-Router)
            addCustomer(){
                this.router.push({
                    name: 'customers-add',
                    params: { type: 'Create' }, // type: 'add' || type: 'edit'
                })
            },
            EditCustomer(customerID: number){
                this.router.push({
                    name: 'customers-edit',
                    params: { type: 'Edit', id: customerID }, // type: 'add' || type: 'edit'
                })
            },
            ////////////////////////////////////
            ///// Delete Methods //////////////
            // Call a notification to confirm delete then delete the item
            deleteRow(idrow: number){
                this.notification.deleteNotification(idrow, 'Customer')
            }
        }
    })


</script>
