<template>
    <div class="p-3 flex items-center justify-between flex-wrap gap-4">
        <h2 class="text-xl">{{ t('pages.orders.modals.order-details') }} <span class=" text-teal-500">{{ orderByID.code }}</span></h2>
        <div class="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
            <div class="flex gap-3">
                <div>
                    <router-link to="/pages/orders/list" class="btn btn-secondary w-fit gap-2">
                        {{ t('pages.orders.fields.back-order') }}
                    </router-link>
                </div>
                <div>
                    <button type="button" class="btn btn-success w-fit gap-2" @click="EditOrder">
                        {{ t('pages.orders.modals.edit-order') }}
                    </button>
                </div>
                <div>
                    <button type="button" class="btn btn-success w-fit gap-2" @click="changeStatus">
                        {{ t('pages.orders.fields.change-order-status') }}
                    </button>
                </div>
                <div  class="badge w-fit btn rounded-2xl" :class="`bg-${statusColor()}`">
                    <span>{{ statusTitle(orderByID.status) }}</span>
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
                        <div>{{ orderByID.customer.name }}</div>
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
                        <div>{{ orderByID.customer.city_id }}</div>
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
                        <div>{{ orderByID.customer.address }}</div>
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
                        <div>{{ orderByID.customer.phone }}</div>
                    </div>
                </div>
                <div class="p-1 flex">
                    <div class="m-1 p-1">
                        <div class="m-1 p-1 w-7 h-7 bg-white-dark rounded-full text-white">
                            <icon-printer />
                        </div>
                    </div>
                    <div class="m-1 p-1">
                        <div class="text-info">{{ t('pages.customer.fields.phone-second') }}</div>
                        <div v-if="orderByID.customer.phone2 != null && orderByID.customer.phone2 != ''">{{ orderByID.customer.phone2 }}</div>
                        <div v-else>----</div>
                    </div>
                </div>
                <div class="p-1 flex">
                    <div class="m-1 p-1">
                        <div class="m-1 p-1 w-7 h-7 bg-white-dark rounded-full text-white">
                            <icon-printer />
                        </div>
                    </div>
                    <div class="m-1 p-1">
                        <div class="text-info">{{ t('pages.orders.fields.order-date') }}</div>
                        <div>{{ orderByID.date }}</div>
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
                        <div>{{ orderByID.shipping_company.name }}</div>
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
                        <div v-if="orderByID.shipping_price != 0">{{ orderByID.shipping_price }}</div>
                        <div v-else>----</div>
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
                        <div v-if="orderByID.shipping_date != null">{{ orderByID.shipping_date }}</div>
                        <div v-else>----</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!------------------------------------------------------------------------------>
    <div class="panel">
        <div class="-m-7 p-2">
            <div class="p-2 bg-white-dark rounded-t-md">
                <div class="px-3 text-lg text-white flex">
                    <span class="ml-1">{{ t('pages.orders.details.mod') }}</span>
                    <span v-if="loading" class="m-1">
                        <IconRefresh class="animate-[spin_1s_linear_infinite] w-5 h-5" />
                 </span>
                </div>
            </div>
        </div>
        <div class="mt-7">
            <div class="flex gap-3">
                <div>
                    <button type="button" class="btn btn-primary" @click="add">
                        {{ t('pages.orders.details.add-product') }}
                    </button>
                </div>
            </div>
            <div class="table-responsive pt-3">
                <table class="rounded-md">
                    <thead>
                        <tr>
                        <th class="border border-slate-300"><srong>#</srong></th>
                        <th class="border border-slate-300 w-80"><strong>{{ t('pages.products_section.fields.product') }}</strong></th>
                        <th class="border border-slate-300"><strong>{{ t('pages.products_section.fields.model') }}</strong></th>
                        <th class="border border-slate-300"><strong>{{ t('pages.products_section.fields.color') }}</strong></th>
                        <th class="border border-slate-300"><strong>{{ t('pages.products_section.fields.price') }}</strong></th>
                        <th class="border border-slate-300"><strong>{{ t('pages.store.fields.quantity') }}</strong></th>
                        <th class="border border-slate-300"><strong>{{ t('pages.orders.fields.notes') }}</strong></th>
                        <th class="border border-slate-300"><strong>{{ t('page-control.total') }}</strong></th>
                        <th class="border border-slate-300"><strong>{{ t('page-control.action') }}</strong></th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="orderByID.items.length <= 0">
                            <tr>
                                <td colspan="9" class="!text-center font-semibold border border-slate-300">{{ t('page-control.no-item') }}</td>
                            </tr>
                        </template>
                        <template v-else>
                            <tr v-for="(item, index) in orderByID.items" :key="index">
                                <td class="border border-slate-300">{{ index + 1 }}</td>
                                <td class="border border-slate-300">
                                    <div v-if="locale == 'eg'">
                                        <span class="font-bold">{{ item.product.name_ar }}</span>
                                        <p>{{ item.product.description_ar }}</p>
                                    </div>
                                    <div v-if="locale == 'en'">
                                        <span class="font-bold">{{ item.product.name_en }}</span>
                                        <p>{{ item.product.description_en }}</p>
                                    </div>
                                </td>
                                <td class="border border-slate-300">{{ item.product.model }}</td>
                                <td class="border border-slate-300">
                                    <span v-if="item.color != null && item.color > 0">{{ item.color }}</span>
                                    <span v-else>----</span>
                                </td>
                                <td class="border border-slate-300">{{ item.product_price }}</td>
                                <td class="border border-slate-300">{{ item.quantity }}</td>
                                <td class="border border-slate-300">
                                    <span v-if="item.note != null && item.note != ''">{{ item.note }}</span>
                                    <span v-else>----</span>
                                </td>
                                <td class="border border-slate-300">{{ item.product_price * item.quantity }}</td>
                                <td class="border border-slate-300">
                                    <div class="flex items-center gap-2 ">
                                        <div><button type="button" @click="editRow(item.id, item)" class="btn btn-success cursor-pointer"><icon-edit /></button></div>
                                        <div><button type="button" @click="deleteRow(item.id)" class="btn btn-danger cursor-pointer"><icon-trash-lines /></button></div>
                                    </div>
                                </td>
                            </tr>
                        </template>
                        <template v-if="orderByID.items.length > 0">
                            <tr class=" border-none" v-if="orderByID.shipping_price != 0">
                                <td colspan="7" class="!text-center font-semibold border border-collapse border-slate-300 border-b-1"><strong>{{ t('pages.orders.fields.shipping-price') }}</strong></td>
                                <td class="border border-slate-300"><strong>{{ orderByID.shipping_price }}</strong></td>
                            </tr>
                            <tr v-if="isDiscount" class=" border-none">
                                <td colspan="7" class="!text-center font-semibold border border-collapse border-slate-300 border-b-1"><strong>ddddddd</strong></td>
                                <td class="border border-slate-300"><strong>55</strong></td>
                            </tr>
                            <tr class=" border-none">
                                <td colspan="7" class="!text-center font-semibold border border-collapse border-slate-300 border-b-1"><strong>{{ t('pages.orders.fields.order-total') }}</strong></td>
                                <td class="border border-slate-300"><strong>{{ totalPrice() }}</strong></td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <Modal
        v-if="addeditproduct"
        :dataType="datatype"
        :show="addeditproduct"
        :dataID="itemID"
        :modalTitle="addedit"
        :data="{ orderID : orderID, productID: productID, dataItem: dataItem}"
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
    // Import Class Orders && EditBrand Page && useConnectionStore
    import {  Orders } from '../../../model/Classes'
    import { useConnectionStore } from '../../../stores/module/DataModule'
    import { notificationStore } from '@/components/notifications'
    // Import Datatable & Modals
    import DataTable from '@/components/datatable.vue';
    import IconPrinter from '@/components/icon/icon-printer.vue';
    import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
    import IconEdit from '@/components/icon/icon-edit.vue';
    import IconRefresh from '@/components/icon/icon-refresh.vue';
    import Modal from '@/components/modal.vue';
    export default defineComponent({
        props: ['id'],
        components: {
            // Datatable & Modals
            DataTable,
            IconPrinter,
            IconTrashLines,
            IconRefresh,
            IconEdit,
            Modal
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
            const { orders, orderByID, loading } = storeToRefs(DataStore)
            const { t, locale } = useI18n()
            const dataItem = { price: 0, code: 0, quantity: 0, note: '' }
            return {
                router,
                // Data Connection
                currentData,
                notification,
                DataStore,
                orders,
                loading,
                orderByID,
                orderID,
                // Values
                datatype: 'ProductInOrder',
                itemID: 0,
                productID: 0,
                addedit: '',
                isDiscount: false,
                addeditproduct: false,
                ////////
                dataItem,
                t,locale,
            }
        },
        async mounted() {
            this.startPage()
        },
        methods: {
            startPage(){
                this.DataStore.getData('Orders',this.orderID, 'GETByID').then(() => { })
            },
            EditOrder(){
                this.router.push({
                    name: 'orders-edit',
                    params: { type: 'Edit', id: this.orderID },
                })
            },
            ////////////////////
            totalPrice(){
                let total = 0
                for (let index = 0; index < this.orderByID.items.length; index++) {
                    total += this.orderByID.items[index].product_price * this.orderByID.items[index].quantity
                }
                if(this.orderByID.shipping_price != null && this.orderByID.shipping_price > 0){
                    total += this.orderByID.shipping_price
                }
                return total
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
            //////////////////////////
            // Close The Add-Edit Modal
            close(){
                this.addeditproduct = false
            },
            // Add New Item
            add(){
                this.currentData.id = this.orderID
                this.addedit = this.t('pages.products_section.fields.add-new')
                this.addeditproduct = true
                this.itemID = 0
            },
            // Edit the Item data
            editRow(id: number, item: any){
                this.addedit = this.t('pages.products_section.fields.edit')
                this.itemID = id
                this.productID = item.product_id
                this.dataItem.code = item.color
                this.dataItem.price = item.product_price
                this.dataItem.quantity = item.quantity
                this.dataItem.note = item.note
                this.addeditproduct = true
            },
            ////////////////////////////////////
            ///// Delete Methods //////////////
            // Call a notification to confirm delete then delete the item
            deleteRow(idrow: number){
                this.notification.deleteNotification(idrow, 'Orders', this.orderID, 'DeleteItem')
            }
        }
    })

</script>