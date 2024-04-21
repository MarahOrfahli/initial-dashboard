<template>
    <div>
        <!-- Search Input -->
        <div class="panel pb-0 mt-6">
            <div class="grid sm:grid-cols-2 gap-3 mb-4.5 px-5">
                    <div style="width: 160px"> <!-- Add Category Button -->
                        <div @click="addbrand" class="btn btn-primary gap-2 hover:cursor-pointer">
                            <icon-plus />
                            {{ t('page-control.add') }}
                        </div>
                    </div>
                    <div> <!-- Search Input -->
                        <input v-model="search" type="text" class="form-input" :placeholder="t('page-control.search-placeholder')" />
                    </div>
            </div>
            <!-- Datatable -->
            <div class="datatable">
                <vue3-datatable
                    :rows="brand"
                    :columns="cols"
                    :totalRows="brand?.length"
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
                <template #name="data">
                        <div class="text-center" v-if="data.value.id > 0">{{ data.value.name }}</div>
                    </template>
                <template #logo="data">
                        <div v-if="data.value.id > 0" class="flex items-center justify-center font-semibold">
                            <div class="p-0.5 bg-white-dark/30 rounded-md w-max ltr:mr-2 rtl:ml-2">
                                <img class="h-20 w-20 rounded-md object-cover" :src="`${imgLocation}${data.value.logo}`" />
                            </div>
                        </div>
                    </template>
                    <template #actions="data">
                        <div  v-if="data.value.id > 0" class="flex gap-4 items-center justify-center">
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
                                <TransitionRoot appear :show="addeditbrand" as="template">
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
                                                    @click="addeditbrand = false"
                                                >
                                                    <icon-x />
                                                </button>
                                                <div
                                                    class="text-lg font-bold bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]"
                                                >
                                                    <span>{{ addedit }}</span>
                                                </div>
                                                <div class="p-5">
                                                    <AddEditBrand :dataid="brandID" @close="close" :data="currentData" @load-data="startPage"/>
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
    // Import Vue & Pinia
    import { defineComponent } from 'vue';
    import { storeToRefs } from 'pinia'
    import { useMeta } from '@/composables/use-meta';
    import { useI18n } from 'vue-i18n'
    // Import Class Brands && EditBrand Page && useConnectionStore
    import { Brands } from '../../../model/Classes'
    import { useConnectionStore } from '../../../stores/module/DataModule'
    import AddEditBrand from '@/views/pages/brand/add-edit.vue'
    // Import Datatable & Modals
    import Swal from 'sweetalert2';
    import Vue3Datatable from '@bhplugin/vue3-datatable';
    import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay }
    from '@headlessui/vue';
    // Import Icons
    import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
    import IconX from '@/components/icon/icon-x.vue';
    import IconPlus from '@/components/icon/icon-plus.vue';
    import IconEdit from '@/components/icon/icon-edit.vue';
    import IconEye from '@/components/icon/icon-eye.vue';
    export default defineComponent({
        components: {
            AddEditBrand,
            // Datatable & Modals
            Vue3Datatable,
            TransitionRoot,
            TransitionChild,
            DialogPanel,
            Dialog,
            // ICONS
            IconTrashLines,
            IconX,
            IconPlus,
            IconEdit,
            IconEye,
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
                { field: 'logo', title: t('page-control.img'), sort: false, headerClass: 'justify-center'  },
                { field: 'actions', title: t('page-control.action') , sort: false, headerClass: 'justify-center' },
            ];
            return cols;
           },
        },
        data() {
            let currentData = new Brands()
            const datatable: any = null;
            const DataStore = useConnectionStore()
            const { brand, loading, imgLocation,
                firstArrow, lastArrow, previousArrow, nextArrow } = storeToRefs(DataStore)
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
                sortable: ['name'],
                sortIcon: {
                    base: 'sort-icon-none',
                    up: 'sort-icon-asc',
                    down: 'sort-icon-desc'
                }
            };
            return {
                // Arrows
                firstArrow,
                lastArrow,
                previousArrow,
                nextArrow,
                // Data Connection
                currentData,
                DataStore,
                brand,
                loading,
                imgLocation,
                // Values
                addedit: '',
                // String..
                search: '',
                // Boolean..
                addeditbrand: false,
                // Numbers...
                brandID: 0,
                counter: 0,
                ////////
                datatable,
                t,locale,
                tableOption,
                formData: new FormData(),
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
            addbrand(){
                this.addedit = this.t('pages.brand.modals.add-new-brand')
                this.addeditbrand = true
                this.brandID = 0
            },
            // Edit the Item data
            editRow(id: number,data: Brands){
                this.addeditbrand = true
                this.addedit = this.t('pages.brand.modals.edit-brand')
                this.brandID = id
                this.currentData = data
            },
            ////////////////////////////////////
            ///// Delete Methods //////////////
            // Call a notification to confirm delete then delete the item
            onDeleteCallback(idrow: number) {
                this.DataStore.deleteData('Brands', idrow).then(() => {
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
