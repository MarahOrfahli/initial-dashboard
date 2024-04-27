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
                                <!-- Modal -->
                                <TransitionRoot appear :show="addeditSubCategory" as="template">
                            <Dialog as="div" class="relative z-[51]">
                                <TransitionChild
                                    as="template"
                                    enter="duration-300 ease-out"
                                    enter-from="opacity-0"
                                    enter-to="opacity-100"
                                    leave="duration-200 ease-in"
                                    leave-from="opacity-100"
                                    leave-to="opacity-0"
                                >
                                    <DialogOverlay class="fixed inset-0 bg-[black]/60" />
                                </TransitionChild>

                                <div class="fixed inset-0 overflow-y-auto">
                                    <div class="flex min-h-full items-start justify-center px-4 py-8">
                                        <TransitionChild
                                            as="template"
                                            enter="duration-300 ease-out"
                                            enter-from="opacity-0 scale-95"
                                            enter-to="opacity-100 scale-100"
                                            leave="duration-200 ease-in"
                                            leave-from="opacity-100 scale-100"
                                            leave-to="opacity-0 scale-95"
                                        >
                                            <DialogPanel class="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                                <button
                                                    type="button"
                                                    class="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                                    @click="addeditSubCategory = false"
                                                >
                                                    <icon-x />
                                                </button>
                                                <div
                                                    class="text-lg font-bold bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]"
                                                >
                                                    <span>{{ addedit }}</span>
                                                </div>
                                                <div class="p-5">
                                                    <AddEditCategory :dataid="categoryID" :data="currentData" @load-data="startPage" @close="close" />
                                                </div>
                                            </DialogPanel>
                                        </TransitionChild>
                                    </div>
                                </div>
                            </Dialog>
                        </TransitionRoot>
</template>
<script lang="ts">
    import { defineComponent } from 'vue';
    import { storeToRefs } from 'pinia'
    import { useI18n } from 'vue-i18n'
    import Swal from 'sweetalert2';
    import { SubCategories } from '../../../../model/Classes'
    import { useConnectionStore } from '../../../../stores/module/DataModule'
    import AddEditCategory from '@/views/pages/categories/subCategories/add-edit.vue'
    import DataTable from '@/components/datatable.vue';
    import { useMeta } from '@/composables/use-meta';
    import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay }
     from '@headlessui/vue';
    // Icon
    import IconX from '@/components/icon/icon-x.vue';
    export default defineComponent({
        components: {
            AddEditCategory,
            DataTable,
            TransitionRoot,
            TransitionChild,
            DialogOverlay,
            DialogPanel,
            Dialog,
            IconX,
            /////
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
            const { subcategories} = storeToRefs(DataStore)
            const { t, locale } = useI18n()
            return {
                sort: ['name_ar', 'name_en','category_id'],
                datatype: 'S-Category',
                // Data Connection
                DataStore,
                subcategories,
                currentData,
                // Values
                addeditSubCategory: false,
                addedit: '',
                search: '',
                searchText: '',
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
            onDeleteCallback(idrow: number) {
                this.DataStore.deleteData('SubCategories', idrow).then(() => {
                    Swal.fire({ 
                        title: this.t('page-control.delete.done'),
                        text:  this.t('page-control.delete.text-success'),
                        confirmButtonText: this.t('page-control.done'),
                        icon: 'success',
                        customClass: 'sweet-alerts' 
                    }).then((result) => {
                        if (result.value) { this.startPage() }
                    });
                })
            },
            deleteRow(idrow: number){
                Swal.fire({
                    icon: 'warning',
                    title: this.t('page-control.delete.check'),
                    text: this.t('page-control.delete.text') + ' ' + this.t('page-control.delete.title'),
                    confirmButtonText: this.t('page-control.delete.name'),
                    cancelButtonText: this.t('page-control.cancel'),
                    showCancelButton: true,
                    showCloseButton: true,
                    padding: '2em',
                    customClass: 'sweet-alerts',
                }).then((result) => {
                    if (result.value) {
                        this.onDeleteCallback(idrow)
                    }
                });
            }
        }
    })


</script>
