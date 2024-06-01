<template>
    <div class="panel pb-0 mt-6">
        <div class="datatable">
            <DataTable
                :rows="brands"
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
        v-if="addeditbrand"
        :dataType="datatype"
        :show="addeditbrand"
        :dataID="brandID"
        :modalTitle="addedit"
        :data="currentData"
        @loadData="startPage"
        @closeModal="close"
    />
</template>
<script lang="ts">
    // Import Vue & Pinia
    import { defineComponent } from 'vue';
    import { storeToRefs } from 'pinia'
    import { useMeta } from '@/composables/use-meta';
    import { useI18n } from 'vue-i18n'
    // Import Class Brands && EditBrand Page && useConnectionStore
    import { Brands } from '../../../model/Classes'
    import { useConnectionStore } from '../../../stores/module/DataModule'
    import { notificationStore } from '@/components/notifications'
    // Import Datatable & Modals
    import Swal from 'sweetalert2';
    import Modal from '@/components/modal.vue';
    import DataTable from '@/components/datatable.vue';
    export default defineComponent({
        components: {
            // Datatable & Modals
            DataTable,
            Modal,
            Swal
        },
        setup(){
            useMeta({ title: 'Brand List' });
        },
        computed:{
           cols(){
            let { t } = useI18n()
            let cols = [
                { field: 'name', title: t('pages.brand.fields.brand-name'), headerClass: 'justify-center' },
                { field: 'logo', title: t('page-control.img'), search: false, sort: false, headerClass: 'justify-center'  },
                { field: 'actions', title: t('page-control.action') , search: false , sort: false, headerClass: 'justify-center' },
            ];
            return cols;
           },
        },
        data() {
            let currentData = new Brands()
            const DataStore = useConnectionStore()
            const notification = notificationStore()
            const { brands } = storeToRefs(DataStore)
            const { t, locale } = useI18n()
            return {
                sort: ['name'],
                datatype: 'Brands',
                // Data Connection
                currentData,
                notification,
                DataStore,
                brands,
                // Values
                addedit: '',
                addeditbrand: false,
                brandID: 0,
                ////////
                t,locale,
            }
        },
        async mounted() {
            this.startPage()
        },
        methods: {
            startPage(){
                this.DataStore.getData('Brands').then(() => { })
            },
            // Close The Add-Edit Modal
            close(){
                this.addeditbrand = false
            },
            // Add New Item
            add(){
                this.addedit = this.t('pages.brand.modals.add-new-brand')
                this.addeditbrand = true
                this.brandID = 0
            },
            // Edit the Item data
            editRow(id: number,data: Brands){
                this.addedit = this.t('pages.brand.modals.edit-brand')
                this.brandID = id
                this.currentData = data
                this.addeditbrand = true
            },
            ////////////////////////////////////
            ///// Delete Methods //////////////
            // Call a notification to confirm delete then delete the item
            deleteRow(idrow: number){
                this.notification.deleteNotification(idrow, this.datatype)
            }
        }
    })


</script>
