<template>
    <div class="panel pb-0 mt-6">
        <div class="datatable">
            <DataTable
                :rows="subcategories"
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
        v-if="addeditSubCategory"
        :dataType="datatype"
        :show="addeditSubCategory"
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
    import { SubCategories } from '../../../../model/Classes'
    import { useConnectionStore } from '../../../../stores/module/DataModule'
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
            useMeta({ title: 'SubCategory List' });
        },
        computed:{
           cols(){
            let { t } = useI18n()
            let cols = [
                { field: 'name_ar', title: t('pages.sub_section.fields.title-arabic'), headerClass: 'justify-center' },
                { field: 'name_en', title: t('pages.sub_section.fields.title-english'), headerClass: 'justify-center'  },
                { field: 'category_id', title: t('pages.sub_section.fields.main-category'), headerClass: 'justify-center'  },
                { field: 'actions', title: t('page-control.action') , sort: false, headerClass: 'justify-center' },
            ];
            return cols;
           },
        },
        data() {
            let currentData = new SubCategories()
            const DataStore = useConnectionStore()
            const notification = notificationStore()
            const { subcategories} = storeToRefs(DataStore)
            const { t, locale } = useI18n()
            return {
                sort: ['name_ar', 'name_en','category_id'],
                datatype: 'S-Category',
                // Data Connection
                DataStore,
                notification,
                subcategories,
                currentData,
                // Values
                addeditSubCategory: false,
                addedit: '',
                categoryID: 0,
                ////////
                t,locale,
            }
        },
        async mounted() { this.startPage() },
        methods: {
            startPage(){
                this.DataStore.getData('SubCategories').then(() => { })
            },
            close(){ // Close The Add-Edit Modal
                this.addeditSubCategory = false
            },
            add(){ // Add New Item
                this.addeditSubCategory = true
                this.addedit = this.t('pages.sub_section.modals.add-new-category')
                this.categoryID = 0
            },
            // Edit the Item data
            editRow(id: number, data:SubCategories){
                this.addeditSubCategory = true
                this.addedit = this.t('pages.sub_section.modals.edit-category')
                this.categoryID = id
                this.currentData = data
            },
            ////////////////////////////////////
            ///// Delete Methods //////////////
            // Call a notification to confirm delete then delete the item
            deleteRow(idrow: number){
                this.notification.deleteNotification(idrow, 'SubCategories')
            }
        }
    })


</script>
