<template>
    <div class="panel pb-0 mt-6">
        <div class="datatable">
            <DataTable
                :rows="categories"
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
        v-if="addeditMainCategory"
        :dataType="datatype"
        :show="addeditMainCategory"
        :dataID="categoryID"
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
    import DataTable from '@/components/datatable.vue';
    import { Categories } from '../../../../model/Classes'
    import { useConnectionStore } from '../../../../stores/module/DataModule'
    import { notificationStore } from '@/components/notifications'
    import { useMeta } from '@/composables/use-meta';
    export default defineComponent({
        components: {
            DataTable,
            Modal,
            Swal
        },
        setup(){
            useMeta({ title: 'Main Category List' });
        },
        computed:{
           cols(){
            let { t } = useI18n()
            let cols = [
                { field: 'name_ar', title: t('pages.main_section.fields.title-arabic'), headerClass: 'justify-center' },
                { field: 'name_en', title: t('pages.main_section.fields.title-english'), headerClass: 'justify-center'  }, 
                { field: 'image', title: t('page-control.img'),sort: false, headerClass: 'justify-center' },
                { field: 'actions', title: t('page-control.action') , sort: false, headerClass: 'justify-center' },
            ];
            return cols;
           },
        },
        data() {
            let currentData = new Categories()
            const DataStore = useConnectionStore()
            const notification  = notificationStore()
            const { categories} = storeToRefs(DataStore)
            const { t, locale } = useI18n()
            return {
                sort: ['name_ar', 'name_en'],
                datatype: 'M-Category',
                // Values
                addeditMainCategory: false,
                addedit: '',
                categoryID: 0,
                ////////
                currentData,
                notification,
                DataStore,
                categories,
                t,locale,
            }
        },
        async mounted() {
            this.startPage()
        },
        methods: {
            startPage(){
                this.DataStore.getData('Categories').then(() => {})
            },
            close(){ // Close The Add-Edit Modal
                this.addeditMainCategory = false
            },
            add(){ // Add New Item
                this.addeditMainCategory = true
                this.addedit = this.t('pages.main_section.modals.add-new-category')
                this.categoryID = 0
            },
            // Edit the Item data
            editRow(id: number, data:Categories){
                this.addeditMainCategory = true
                this.addedit = this.t('pages.main_section.modals.edit-category')
                this.categoryID = id
                this.currentData = data
            },
            ////////////////////////////////////
            ///// Delete Methods //////////////
            // Call a notification to confirm delete then delete the item
            deleteRow(idrow: number){
                this.notification.deleteNotification(idrow, 'Categories')
            }
        }
    })


</script>
