<template>
    <div class="panel pb-0 mt-6">
        <div class="datatable">
            <DataTable
                :rows="storesTrack"
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
        v-if="addeditstore"
        :dataType="datatype"
        :show="addeditstore"
        :dataID="storeID"
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
    // Vue-Router
    import { useRouter } from 'vue-router'
    // Import Class Store && AddEditStore Page && useConnectionStore
    import { Store } from '../../../model/Classes'
    import { useConnectionStore } from '../../../stores/module/DataModule'
    import { notificationStore } from '@/components/notifications'
    // Import Datatable & Modals
    import Swal from 'sweetalert2';
    import Modal from '@/components/modal.vue';
    import DataTable from '@/components/datatable.vue';
    export default defineComponent({
        components: {
            Swal,
            Modal,
            DataTable,
        },
        setup(){
            useMeta({ title: 'Store Track List' });
        },
        computed:{
           cols(){
            let { t } = useI18n()
            let cols = [
                { field: 'productn', title: t('pages.products_section.fields.name'), headerClass: 'justify-center' },
                { field: 'storen', title: t('pages.store.fields.name'), headerClass: 'justify-center' },
                { field: 'in', title: t('pages.store.fields.in'), headerClass: 'justify-center'  },
                { field: 'out', title: t('pages.store.fields.out'), headerClass: 'justify-center'  },
                { field: 'actions', title: t('page-control.action') , sort: false, headerClass: 'justify-center' },
            ];
            return cols;
           },
        },
        data() {
            let currentData = new Store()
            const router = useRouter()
            const DataStore = useConnectionStore()
            const notification = notificationStore()
            const { storesTrack } = storeToRefs(DataStore) // store,
            const { t, locale } = useI18n()
            return {
                router,
                // Data Connection
                currentData,
                DataStore,
                notification,
                storesTrack,
                // Values
                sort: ['productn','storen'],
                datatype: 'StoreTrack',
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
            ////////////////////////////////////
            ///// Delete Methods //////////////
            // Call a notification to confirm delete then delete the item
            deleteRow(idrow: number){
                this.notification.deleteNotification(idrow, 'StoreTrack')
            }
        }
    })
</script>
