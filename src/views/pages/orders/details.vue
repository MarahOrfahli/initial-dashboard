<template>
    <div class="p-3 flex items-center justify-between flex-wrap gap-4">
        <h2 class="text-xl">{{ t('pages.orders.modals.order-details') }}</h2>
        <div class="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
            <div class="flex gap-3">
                <div>
                    <router-link to="/pages/orders/list" class="btn btn-secondary w-fit gap-2">
                        {{ t('pages.orders.fields.back-order') }}
                    </router-link>
                </div>
                <div>
                    <button type="button" class="btn btn-success w-fit gap-2" @click="EditOrder">
                        {{ t('pages.orders.fields.back-order') }}
                    </button>
                </div>
                <div>
                    <button type="button" class="btn btn-success w-fit gap-2" @click="changeStatus">
                        {{ t('pages.orders.fields.change-order-status') }}
                    </button>
                </div>
                <div  class="badge w-fit btn rounded-2xl" :class="`bg-${statusColor()}`">
                    <span>{{ statusTitle('pending') }}</span>
                </div>
                <div>
                    <button type="button" class="btn btn-danger gap-2" @click="print">
                        <icon-printer />
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3">
        <div class="p-3">
            <div class="panel">
                <strong>{{ t('pages.orders.details.customerInfo') }}</strong>
                <div class="p-1 flex">
                    <div class="m-1 p-1">
                        <div class="m-1 p-1 w-7 h-7 bg-white-dark rounded-full text-white">
                            <icon-printer />
                        </div>
                    </div>
                    <div class="m-1 p-1">
                        <div class="text-info">{{ t('pages.customer.fields.name') }}</div>
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
                        <div class="text-info">{{ t('pages.customer.fields.city-name') }}</div>
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
                        <div class="text-info">{{ t('pages.customer.fields.address') }}</div>
                        <div>test</div>
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
        <div class="p-3">
            <div class="panel">
                <strong>{{ t('pages.orders.details.shippingInfo') }}</strong>
                <div class="p-1 flex">
                    <div class="m-1 p-1">
                        <div class="m-1 p-1 w-7 h-7 bg-white-dark rounded-full text-white">
                            <icon-printer />
                        </div>
                    </div>
                    <div class="m-1 p-1">
                        <div class="text-info">{{ t('pages.orders.fields.shipping-company') }}</div>
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
                        <div class="text-info">{{ t('pages.orders.fields.shipping-price') }}</div>
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
                        <div class="text-info">{{ t('pages.orders.fields.shipping-date') }}</div>
                        <div>test</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!------------------------------------------------------------------------------>
    <div class="panel">
        <div class="-m-7 p-2">
            <div class="p-2 bg-white-dark rounded-t-md">
                <div class="px-3 text-lg text-white">{{ t('pages.orders.details.mod') }}</div>
            </div>
        </div>
        <div class="mt-7">
            <div class="flex gap-3">
                <div>
                    <button type="button" class="btn btn-primary" @click="">
                        {{ t('pages.orders.details.add-product') }}
                    </button>
                </div>
                <div>
                    <button type="button" class="btn btn-primary" @click="toggleDiscount">
                        <span v-if="!isDiscount">{{ t('pages.orders.details.add-discount') }}</span>
                        <span v-else>{{ t('pages.orders.details.remove-discount') }}</span>
                    </button>
                </div>
            </div>
            <div class="table-responsive pt-3">
                <table class="rounded-md ">
                    <thead>
                        <tr>
                        <th class="border border-slate-300"><srong>#</srong></th>
                        <th class="border border-slate-300 w-80"><strong>{{ t('pages.products_section.fields.product') }}</strong></th>
                        <th class="border border-slate-300"><strong>{{ t('pages.products_section.fields.model') }}</strong></th>
                        <th class="border border-slate-300"><strong>{{ t('pages.products_section.fields.color') }}</strong></th>
                        <th class="border border-slate-300"><strong>{{ t('pages.products_section.fields.price') }}</strong></th>
                        <th class="border border-slate-300"><strong>{{ t('pages.store.fields.quantity') }}</strong></th>
                        <th class="border border-slate-300"><strong>{{ t('page-control.total') }}</strong></th>
                        <th class="border border-slate-300"><strong>{{ t('page-control.action') }}</strong></th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="items.length <= 0">
                            <tr>
                                <td colspan="8" class="!text-center font-semibold">{{ t('page-control.no-item') }}</td>
                            </tr>
                        </template>
                        <template v-else>
                            <tr v-for="(item, index) in items" :key="index">
                                <td class="border border-slate-300">{{ index + 1 }}</td>
                                <td class="border border-slate-300">{{ item }}hhhhhhhhhhhhhhhhhhhhhhhhhhhhh</td>
                                <td class="border border-slate-300">{{ item }}</td>
                                <td class="border border-slate-300">{{ item }}</td>
                                <td class="border border-slate-300">{{ item }}</td>
                                <td class="border border-slate-300">{{ item }}</td>
                                <td class="border border-slate-300">{{ item }}</td>
                                <td class="border border-slate-300">
                                    <div class="flex items-center gap-2">
                                        <div><button  type="button" class="btn btn-success cursor-pointer"><icon-edit /></button></div>
                                        <div><button  type="button" class="btn btn-danger cursor-pointer"><icon-trash-lines /></button></div>
                                    </div>
                                </td>
                            </tr>
                        </template>
                            <tr class=" border-none">
                                <td colspan="6" class="!text-center font-semibold border border-collapse border-slate-300 border-b-1"><strong>ddddddd</strong></td>
                                <td class="border border-slate-300"><strong>55</strong></td>
                            </tr>
                            <tr v-if="isDiscount" class=" border-none">
                                <td colspan="6" class="!text-center font-semibold border border-collapse border-slate-300 border-b-1"><strong>ddddddd</strong></td>
                                <td class="border border-slate-300"><strong>55</strong></td>
                            </tr>
                            <tr class=" border-none">
                                <td colspan="6" class="!text-center font-semibold border border-collapse border-slate-300 border-b-1"><strong>ddddddd</strong></td>
                                <td class="border border-slate-300"><strong>55</strong></td>
                            </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
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
    import {  Orders } from '../../../model/Classes'
    import { useConnectionStore } from '../../../stores/module/DataModule'
    import { notificationStore } from '@/components/notifications'
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
            IconEdit,
            Swal
        },
        setup(){
            useMeta({ title: 'Orders Details' });
        },
        computed:{
            pendingTitle(){
                return this.t('pages.orders.status.pending')
            },
            preparingTitle(){
                return this.t('pages.orders.status.preparing')
            },
            rtusTitle(){
                return this.t('pages.orders.status.rtus')
            },
            usTitle(){
                return this.t('pages.orders.status.us')
            },
            shippingTitle(){
                return this.t('pages.orders.status.shipping')
            },
            replacementTitle(){
                return this.t('pages.orders.status.replacement')
            },
            deliveredTitle(){
                return this.t('pages.orders.status.delivered')
            },
            returnedTitle(){
                return this.t('pages.orders.status.returned')
            },
            canceledTitle(){
                return this.t('pages.orders.status.canceled')
            }
        },
        data(props) {
            let currentData = new Orders()
            const router = useRouter()
            const orderID = props.id
            const DataStore = useConnectionStore()
            const notification = notificationStore()
            const { orders } = storeToRefs(DataStore)
            const { t, locale } = useI18n()
            return {
                router,
                // Data Connection
                currentData,
                notification,
                DataStore,
                orders,
                orderID,
                // Values
                isDiscount: false,
                ////////
                t,locale,
                items: [{ id: 0}, {id: 1}, {id: 2}],
            }
        },
        async mounted() {
            this.startPage()
        },
        methods: {
            startPage(){
                this.DataStore.getData('Orders').then(() => { })
            },
            EditOrder(){
                this.router.push({
                    name: 'orders-edit',
                    params: { type: 'Edit', id: this.orderID },
                })
            },
            ////////////////////
            toggleDiscount(){
                this.isDiscount = !this.isDiscount
            },
            statusColor(){
                return 'info'
            },
            changeStatus(){

            },
            statusTitle(status: string){
                if(status == 'pending') return this.pendingTitle
                else if(status == 'preparing') return this.preparingTitle
                else if(status == 'rtus') return this.rtusTitle
                else if(status == 'us') return this.usTitle
                else if(status == 'shipping') return this.shippingTitle
                else if(status == 'replacement') return this.replacementTitle
                else if(status == 'delivered') return this.deliveredTitle
                else if(status == 'returned') return this.returnedTitle
                else if(status == 'canceled') return this.canceledTitle
            },
            print(){

            },
        }
    })

</script>