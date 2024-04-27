<template>
    <div class="panel pb-0 mt-6">
        <div class="datatable">
            <DataTable
                :rows="stores"
                :columns="cols"
                :dataType="datatype"
                :sortable="sort"
                @add="add"
                @edit="editRow"
                @delete="deleteRow"
                @preview="previewRow"
            />
        </div>
    </div>
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
    import DataTable from '@/components/datatable.vue';
    import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay }
    from '@headlessui/vue';
    // Icon
    import IconX from '@/components/icon/icon-x.vue';
    export default defineComponent({
        components: {
            Swal,
            AddEditStore,
            DataTable,
            TransitionRoot,
            TransitionChild,
            DialogPanel,
            Dialog,
            IconX
        },
        setup(){
            useMeta({ title: 'Store List' });
        },
        computed:{
           cols(){
            let { t } = useI18n()
            let cols = [
                { field: 'name', title: t('pages.store.fields.name'), headerClass: 'justify-center' },
                { field: 'location', title: t('pages.store.fields.location'), headerClass: 'justify-center'  },
                { field: 'actions', title: t('page-control.action') , sort: false, headerClass: 'justify-center' },
            ];
            return cols;
           },
        },
        data() {
            let currentData = new Store()
            const DataStore = useConnectionStore()
            const { stores } = storeToRefs(DataStore) // store,
            const { t, locale } = useI18n()
            return {
                // Data Connection
                currentData,
                DataStore,
                stores,
                // Values
                sort: ['name','location'],
                datatype: 'Store',
                addeditstore: false,
                addedit: '',
                storeID: 0,
                ////////
                t,locale,
            }
        },
        async mounted() {
            this.startPage()
        },
        methods: {
            startPage(){
                this.DataStore.getData('Store').then(() => { })
            },
            close(){
                this.addeditstore = false
            },
            add(){
                this.storeID = 0
                this.addedit = this.t('pages.store.modals.add-new-store')
                this.addeditstore = true
            },
            editRow(id: number,data: Store){
                this.addeditstore = true
                this.addedit = this.t('pages.store.modals.edit-store')
                this.storeID = id
                this.currentData = data
            },
            previewRow(id: number){

            },
            ////////////////////////////////////
            ///// Delete Methods //////////////
            // Call a notification to confirm delete then delete the item
            onDeleteCallback(idrow: number) {
                this.DataStore.deleteData('Store', idrow).then(() => {
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
