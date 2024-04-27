<template>
    <div class="panel pb-0 mt-6">
        <div class="datatable">
            <DataTable
                :rows="customer"
                :columns="cols"
                :dataType="datatype"
                :sortable="sort"
                @add="add"
                @edit="editRow"
                @delete="deleteRow"
            />
        </div>
    </div>
    <!-- Modal -->
    <Modal
        v-if="addeditcustomer"
        :dataType="datatype"
        :show="addeditcustomer"
        :dataID="customerID"
        :modalTitle="addedit"
        :data="currentData"
        @loadData="startPage"
        @closeModal="close"
    />
</template>
<script lang="ts">
    import { defineComponent } from 'vue';
    import { storeToRefs } from 'pinia'
    import { useI18n } from 'vue-i18n'
    import Swal from 'sweetalert2';
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
                { field: 'name', title: t('pages.sub_section.fields.title-arabic'), headerClass: 'justify-center' },
                { field: 'phone', title: t('pages.sub_section.fields.title-english'), headerClass: 'justify-center'  },
                { field: 'address', title: t('pages.sub_section.fields.main-category'), headerClass: 'justify-center'  },
                { field: 'email', title: t('pages.sub_section.fields.main-category'), headerClass: 'justify-center'  },
                { field: 'actions', title: t('page-control.action') , sort: false, headerClass: 'justify-center' },
            ];
            return cols;
           },
        },
        data() {
            let currentData = new Customer()
            const DataStore = useConnectionStore()
            const notification = notificationStore()
            const { customer} = storeToRefs(DataStore)
            const { t, locale } = useI18n()
            return {
                datatype: 'Customer',
                sort: ['name', 'address', 'phone','email'],
                // Data Connection
                DataStore,
                notification,
                customer,
                currentData,
                // Values
                addeditcustomer: false,
                addedit: '',
                customerID: 0,
                ////////
                t,locale
            }
        },
        async mounted() { this.startPage() },
        methods: {
            startPage(){
                this.DataStore.getData('Customer').then(() => {})
            },
            close(){ // Close The Add-Edit Modal
                this.addeditcustomer = false
            },
            add(){ // Add New Item
                this.addeditcustomer = true
                this.addedit = this.t('pages.sub_section.modals.add-new-category')
                this.customerID = 0
            },
            // Edit the Item data
            editRow(id: number, data:Customer){
                this.addeditcustomer = true
                this.addedit = this.t('pages.sub_section.modals.edit-category')
                this.customerID = id
                this.currentData = data
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
