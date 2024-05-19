<template>
    <div class="panel pb-0 mt-6">
        <div class="datatable">
            <DataTable
                :rows="regions"
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
        v-if="addeditregion"
        :dataType="datatype"
        :show="addeditregion"
        :dataID="regionID"
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
    // Import Class Region && AddEditRegion Page && useConnectionStore
    import { Region } from '../../../model/Classes'
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
            useMeta({ title: 'Region List' });
        },
        computed:{
           cols(){
            let { t } = useI18n()
            let cols = [
                { field: 'name', title: t('pages.region.fields.name'), headerClass: 'justify-center' },
                { field: 'city', title: t('pages.region.fields.city'), headerClass: 'justify-center'  },
                { field: 'actions', title: t('page-control.action') , sort: false, headerClass: 'justify-center' },
            ];
            return cols;
           },
        },
        data() {
            let currentData = new Region()
            const router = useRouter()
            const DataStore = useConnectionStore()
            const notification = notificationStore()
            const { regions } = storeToRefs(DataStore)
            const { t, locale } = useI18n()
            return {
                router,
                // Data Connection
                currentData,
                DataStore,
                notification,
                regions,
                // Values
                sort: ['name','city'],
                datatype: 'Region',
                addeditregion: false,
                addedit: '',
                regionID: 0,
                ////////
                t,locale,
            }
        },
        async mounted() {
            this.startPage()
        },
        methods: {
            startPage(){
                this.DataStore.getData('Region').then(() => { /* console.log(this.regions)  */})
            },
            close(){
                this.addeditregion = false
            },
            add(){
                this.regionID = 0
                this.addedit = this.t('pages.region.modals.add-new-region')
                this.addeditregion = true
            },
            editRow(id: number,data: Region){
                this.addeditregion = true
                this.addedit = this.t('pages.region.modals.edit-region')
                this.regionID = id
                this.currentData = data
            },
            ////////////////////////////////////
            ///// Delete Methods //////////////
            // Call a notification to confirm delete then delete the item
            deleteRow(idrow: number){
                this.notification.deleteNotification(idrow, 'Region')
            }
        }
    })
</script>
