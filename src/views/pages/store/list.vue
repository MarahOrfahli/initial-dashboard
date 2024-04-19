<template>
    <div>
        <div class="panel pb-0 mt-6">
            <div class="grid sm:grid-cols-2 gap-3 mb-4.5 px-5">
                    <div style="width: 160px"> <!-- Add Category Button -->
                        <div @click="addstore" class="btn btn-primary gap-2 hover:cursor-pointer">
                            <icon-plus />
                            {{ t('add') }}
                        </div>
                    </div>
                    <div> <!-- Search Input -->
                        <input v-model="search" type="text" class="form-input" :placeholder="t('search-ph')" />
                    </div>
            </div>
            <div class="datatable">
                <vue3-datatable
                    :rows="store"
                    :columns="cols"
                    :totalRows="store?.length"
                    :search="search"
                    :loading="loading"
                    skin="whitespace-nowrap bh-table-hover"
                    firstArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                    lastArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg> '
                    previousArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                    nextArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                >
                <template #name="data">
                        <div v-if="data.value.id > 0">{{ data.value.name }}</div>
                    </template>
                <template #location="data">
                    <div v-if="data.value.id > 0">{{ data.value.location }}</div>
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
                                <TransitionRoot appear :show="addeditstore" as="template">
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
                                                    @click="addeditstore = false"
                                                >
                                                    <icon-x />
                                                </button>
                                                <div
                                                    class="text-lg font-bold bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]"
                                                >
                                                    <span>{{ addedit }}</span>
                                                </div>
                                                <div class="p-5">
                                                    <AddEditStore :dataid="storeID" @close="close" :data="currentData" @load-data="startPage" />
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
    // Import Class Store && AddEditStore Page && useConnectionStore
    import { Store } from '../../../model/Classes'
    import { useConnectionStore } from '../../../stores/module/DataModule'
    import AddEditStore from '@/views/pages/store/add-edit.vue'
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
            Swal,
            AddEditStore,
            Vue3Datatable,
            TransitionRoot,
            TransitionChild,
            IconTrashLines,
            DialogPanel,
            Dialog,
            IconX,
            IconPlus,
            IconEdit,
            IconEye
        },
        setup(){
            useMeta({ title: 'Store List' });
        },
        computed:{
           cols(){
            let { t } = useI18n()
            let cols = [
                { field: 'name', title: t('store') },
                { field: 'location', title: t('location')  },
                { field: 'actions', title: t('action.name') , sort: false, headerClass: 'justify-center' },
            ];
            return cols;
           },
        },
        data() {
            let currentData = new Store()
            const datatable: any = null;
            const DataStore = useConnectionStore()
            const {  loading } = storeToRefs(DataStore) // store,
            const { t, locale } = useI18n()
            const store = [
                {
                    id: 1,
                    name: 'test',
                    location: 'test',
                },
                {
                    id: 2,
                    name: 'test',
                    location: 'test',
                },
                {
                    id: 3,
                    name: 'test',
                    location: 'test',
                },
                {
                    id: 4,
                    name: 'test',
                    location: 'test',
                },
            ];
            const tableOption = {
                headings: {
                    id: (h: any, row: any, index: number) => {
                        return '#';
                    },
                },
                perPage: 10,
                perPageValues: [10, 20, 30, 50, 100],
                skin: 'table-hover',
                columnsClasses: { actions: 'actions !text-center w-1' },
                pagination: { show: true, nav: 'scroll', chunk: 10 },
                texts: {
                    count: 'Showing {from} to {to} of {count} entries',
                    filter: '',
                    filterPlaceholder: 'Search...',
                    limit: '',
                },
                resizableColumns: false,
                sortable: ['name','location'],
                sortIcon: {
                    base: 'sort-icon-none',
                    up: 'sort-icon-asc',
                    down: 'sort-icon-desc'
                }
            };
            return {
                // Data Connection
                currentData,
                DataStore,
                loading,
                store,
                // Values
                addeditstore: false,
                addedit: '',
                search: '',
                searchText: '',
                storeID: 0,
                ////////
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
               // this.DataStore.getData('Store').then(() => { })
            },
            close(){
                this.addeditstore = false
            },
            addstore(){
                this.storeID = 0
                this.addedit = 'Adding New Store'
                this.addeditstore = true
            },
            editRow(id: number,data: Store){
                this.addeditstore = true
                this.addedit = 'Edit Store'
                this.storeID = id
                this.currentData = data
            },
            ////////////////////////////////////
            ///// Delete Methods //////////////
            // Call a notification to confirm delete then delete the item
            onDeleteCallback(idrow: number) {
                this.DataStore.deleteData('Store', idrow).then(() => {
                    Swal.fire({ 
                        title: 'Deleted!',
                        text: 'Your file has been deleted.',
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
                    title: 'هل تريد الاستمرار؟',
                    text: "سيتم مسح هذا العنصر نهائياً!",
                    confirmButtonText: 'حذف',
                    cancelButtonText: 'إلغاء',
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
