<template>
    <div>
        <div class="panel px-0 pb-1.5 border-[#e0e6ed] dark:border-[#1b2e4b]">
            <div class="datatable invoice-table">
                <div class="grid sm:grid-cols-2 gap-3 mb-4.5 px-5">
                    <div style="width: 160px"> <!-- Add Category Button -->
                        <div @click="add" class="btn btn-primary gap-2 hover:cursor-pointer">
                            <icon-plus />
                            {{ t('page-control.add') }}
                        </div>
                    </div>
                    <div> <!-- Search Input -->
                        <input v-model="search" type="text" class="form-input" :placeholder="t('page-control.search-placeholder')" />
                    </div>
                </div>
                <!-- Datatable -->
                <vue3-datatable
                    ref="datatable"
                    :rows="categories"
                    :columns="cols"
                    :totalRows="categories?.length"
                    :hasCheckbox="false"
                    :sortable="true"
                    :search="search"
                    :loading="loading"
                    :noDataContent="t('page-control.table.no-data-content')"
                    :showNumbersCount="tableOption.pagination.chunk"
                    :pageSize="tableOption.perPage"
                    :paginationInfo="t('page-control.table.rows-count', { from:'{0}', to:'{1}', count:'{2}'})"
                    :pageSizeOptions="tableOption.perPageValues"
                    skin="whitespace-nowrap bh-table-hover"
                    :firstArrow= "firstArrow"
                    :lastArrow="lastArrow"
                    :previousArrow="previousArrow"
                    :nextArrow="nextArrow"
                >
                    <template #name_ar="data">
                        <div class="text-center">{{ data.value.name_ar }}</div>
                    </template>
                    <template #name_en="data">
                        <div class="text-center">{{ data.value.name_en }}</div>
                    </template>
                    <template #image="data">
                        <div v-if="data.value.id > 0" class="flex items-center justify-center font-semibold">
                            <div class="p-0.5 bg-white-dark/30 rounded-md w-max ltr:mr-2 rtl:ml-2">
                                <img class="h-20 w-20 rounded-md object-cover" :src="`${imgLocation}${data.value.image}`" />
                            </div>
                        </div>
                    </template>
                    <template #actions="data">
                        <div v-if="data.value.id > 0" class="flex gap-4 items-center justify-center">
                            <div class="btn btn-white w-4 cursor-pointer hover:text-success" @click="editRow(data.value.id, data.value)">
                                <button type="button">
                                    <icon-edit />
                                </button>
                            </div>
                            <div class="btn btn-white w-4 cursor-pointer hover:text-danger" @click="deleteRow(data.value.id)">
                                <button type="button">
                                    <icon-trash-lines />
                                </button>
                            </div>
                            
                        </div>
                    </template>
                </vue3-datatable>
            </div>
        </div>

        <div>
                                <!-- Modal -->
                                <TransitionRoot appear :show="addeditMainCategory" as="template">
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
                                                    @click="addeditMainCategory = false"
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
                            </div>
    </div>
</template>
<script lang="ts">
    import { defineComponent } from 'vue';
    import { storeToRefs } from 'pinia'
    import { useI18n } from 'vue-i18n'
    import Swal from 'sweetalert2';
    import { Categories } from '../../../../model/Classes'
    import { useConnectionStore } from '../../../../stores/module/DataModule'
    import AddEditCategory from '@/views/pages/categories/mainCategories/add-edit.vue'
    import Vue3Datatable from '@bhplugin/vue3-datatable';
    import { useMeta } from '@/composables/use-meta';
    import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
    import IconX from '@/components/icon/icon-x.vue';
    import IconPlus from '@/components/icon/icon-plus.vue';
    import IconEdit from '@/components/icon/icon-edit.vue';
    import IconEye from '@/components/icon/icon-eye.vue';
    import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay }
     from '@headlessui/vue';
    export default defineComponent({
        components: {
            AddEditCategory,
            Vue3Datatable,
            TransitionRoot,
            TransitionChild,
            DialogPanel,
            Dialog,
            // ICONs
            IconX,
            IconPlus,
            IconEdit,
            IconEye,
            IconTrashLines,
            ///////
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
            const datatable: any = null;
            const DataStore = useConnectionStore()
            const { categories, loading, imgLocation,
                firstArrow, lastArrow, previousArrow, nextArrow
             } = storeToRefs(DataStore)
            const { t, locale } = useI18n()
            const tableOption = {
                perPage: 10,
                perPageValues: [10, 20, 30, 50, 100],
                skin: 'table-hover',
                columnsClasses: { actions: 'actions !text-center w-1' },
                pagination: { show: true, nav: 'scroll', chunk: 3 },
                texts: {
                    count: t('page-control.table.rows-count', { from:'{0}', to: '{1}', count: '{2}'}) ,
                    filter: '',
                    filterPlaceholder: t('page-control.search-placeholder'),
                    limit: '',
                },
                resizableColumns: false,
                sortable: ['name_ar', 'name_en'],
                sortIcon: {
                    base: 'sort-icon-none',
                    up: 'sort-icon-asc',
                    down: 'sort-icon-desc',
                },
            };
            return {
                // Arrows
                firstArrow,
                lastArrow,
                previousArrow,
                nextArrow,
                // Values
                addeditMainCategory: false,
                addedit: '',
                search: '',
                searchText: '',
                categoryID: 0,
                ////////
                currentData,
                imgLocation,
                DataStore,
                categories,
                loading,
                datatable,
                t,locale,
                tableOption
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
            onDeleteCallback(idrow: number) {
                this.DataStore.deleteData('Categories', idrow).then(() => {
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
