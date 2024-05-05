<template>
    <div class="p-3 flex items-center justify-between flex-wrap gap-4">
        <h2 class="text-xl">{{ t('pages.products_section.fields.img-color-code') }}</h2>
        <div class="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
            <div class="flex gap-3">
                <div>
                    <router-link to="/pages/products/list" class="btn btn-secondary w-fit gap-2">
                        {{ t('pages.products_section.fields.back-product') }}
                    </router-link>
                </div>
            </div>
        </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2">
        <div class="p-3">
            <div class="panel h-full">
                <strong>{{ t('pages.orders.details.customerInfo') }}</strong>
                <div class="m-1 p-1">
                        <div>test</div>
                </div>
                <div class="mb-10">
                    <div class="mt-8 border-slate-500 rounded-md drop-shadow-lg" v-if="imageUrl != ''">
                        <img :src="imageUrl" class="rounded-md w-40">
                    </div>
                </div>
            </div>
        </div>
        <!------------------------------------>
        <div class="p-3">
            <div class="panel">
                <strong>{{ t('pages.orders.details.contactInfo') }}</strong>
                <div class="p-1 flex">
                    <div class="m-1 p-1">
                        <div class="m-1 p-1 w-7 h-7 bg-white-dark rounded-full text-white">
                            <icon-printer />
                        </div>
                    </div>
                    <div class="m-1 p-1">
                        <div class="text-info">{{ t('pages.customer.fields.phone') }}</div>
                        <div>test</div>
                    </div>
                </div>
                <div class="p-1 flex">
                    <div class="m-1 p-1">
                        <div class="m-1 p-1 w-7 h-7 bg-white-dark rounded-full text-white">
                            <icon-printer />
                        </div>
                    </div>
                    <div class="m-1 p-1">
                        <div class="text-info">{{ t('pages.customer.fields.email') }}</div>
                        <div>test</div>
                    </div>
                </div>
                <div class="p-1 flex">
                    <div class="m-1 p-1">
                        <div class="m-1 p-1 w-7 h-7 bg-white-dark rounded-full text-white">
                            <icon-printer />
                        </div>
                    </div>
                    <div class="m-1 p-1">
                        <div class="text-info">{{ t('pages.orders.fields.delivery-date') }}</div>
                        <div>test</div>
                    </div>
                </div>
            </div>
        </div>
        <!------------------------------------>
    </div>
    <!-------------------->
    <imgColorCodeItems :type="'Preview'" data=""  @getUpdateItem="getUpdateItem"/>
</template>
<script lang="ts">
    // Import Vue & Pinia
    import { defineComponent } from 'vue';
    import { storeToRefs } from 'pinia'
    import { useMeta } from '@/composables/use-meta';
    import { useI18n } from 'vue-i18n'
    // Vue-Router
    import { useRouter } from 'vue-router'
    // Import Class Orders && EditBrand Page && useConnectionStore
    import {  Items } from '../../../model/Classes'
    import { useConnectionStore } from '../../../stores/module/DataModule'
    import { notificationStore } from '@/components/notifications'
    import imgColorCodeItems from '@/components/imgColorCode.vue'
    // Import Datatable & Modals
    import Swal from 'sweetalert2';
    import DataTable from '@/components/datatable.vue';
    import IconPrinter from '@/components/icon/icon-printer.vue';
    import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
    import IconEdit from '@/components/icon/icon-edit.vue';
    export default defineComponent({
        props: ['id'],
        components: {
            // Datatable & Modals
            DataTable,
            IconPrinter,
            IconTrashLines,
            imgColorCodeItems,
            IconEdit,
            Swal
        },
        setup(){
            useMeta({ title: 'Orders Details' });
        },
        computed:{ },
        data(props) {
           // let currentData = new Orders()
            const router = useRouter()
            const orderID = props.id
            const DataStore = useConnectionStore()
            const notification = notificationStore()
            const { orders } = storeToRefs(DataStore)
            const { t, locale } = useI18n()
            let values = { images: [] , colors: [], codes: [] }
            return {
                router,
                // Data Connection
              //  currentData,
                notification,
                DataStore,
                orders,
                orderID,
                // Values
                imageUrl: '',
                values,
                itemsErrors: 0,
                ////////
                t,locale,
            }
        },
        async mounted() {
            this.startPage()
        },
        methods: {
            startPage(){
                this.DataStore.getData('Products').then(() => { })
            },
            getUpdateItem(item: Items[], itemsErrors: number){
                this.values.images = []
                this.values.colors = []
                this.values.codes = []
                for (let index = 0; index < item.length; index++) {
                    if(item[index].image != null){
                        this.values.images.push(item[index].image)
                        this.values.colors.push(item[index].color)
                        this.values.codes.push(item[index].color_code)
                    }
                }
                this.itemsErrors = itemsErrors
            },
        }
    })

</script>