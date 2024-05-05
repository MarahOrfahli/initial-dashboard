<template>
    <div class="flex items-center justify-between flex-wrap gap-4">
        <h2 class="text-xl">{{ t('pages.store.fields.details') }}</h2>
        <div class="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
            <div class="flex gap-3">
                <div>
                    <button type="button" class="btn btn-primary" @click="exportDetails">
                        {{ t('page-control.export') }}
                    </button>
                </div>
                <div>
                    <router-link to="/pages/store/list" class="btn btn-secondary gap-2">
                        {{ t('pages.store.modals.back-store') }}
                    </router-link>
                </div>
            </div>
        </div>
    </div>
    <div class="mt-5 panel p-0 border-0 overflow-hidden">
        <div class="table-responsive">
            <table class="table-striped table-hover">
                <thead>
                    <tr>
                        <th>{{ t('pages.products_section.fields.name') }}</th>
                        <th>{{ t('pages.store.fields.quantity') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="storeDetails.length <= 0">
                        <tr>
                            <td colspan="2" class="!text-center font-semibold">{{ t('page-control.table.no-data-content') }}</td>
                        </tr>
                    </template>
                    <template v-for="detail in storeDetails" :key="detail.id">
                        <tr>
                            <td>{{  detail }}</td>
                            <td>{{  detail }}</td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script lang="ts">

import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n'
import { useMeta } from '@/composables/use-meta';
import { storeToRefs } from 'pinia'
import { useConnectionStore } from '../../../stores/module/DataModule'

export default defineComponent({
    props:['id'],
    setup(){
        useMeta({ title: 'Store Details' });
    },
    data(props){
        const ID = props.id
        const DataStore = useConnectionStore()
        const { storeDetails } = storeToRefs(DataStore)
        const { t } = useI18n()
        return{
            ID,
            t, DataStore,
            storeDetails
        }
    },
    async mounted() { this.startPage() },
    methods:{
        startPage(){
            this.DataStore.getData('Store',this.ID ).then(()=>{
                console.log(this.storeDetails)
            })
        },
        exportDetails(){
            console.log('test')
        }
    }
})




</script>