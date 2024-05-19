<template>
    <div class="grid sm:grid-cols-2 gap-3 mb-4.5 px-5">
        <div style="width: 160px"> <!-- Add Button -->
            <div @click="addRow" class="btn btn-primary gap-2 hover:cursor-pointer">
                <icon-plus />
                {{ t('page-control.add') }}
            </div>
        </div>
        <div> <!-- Search Input -->
            <input v-model="search" type="text" class="form-input" :placeholder="t('page-control.search-placeholder')" />
        </div>
    </div>
    <vue3-datatable
        :rows="rows"
        :columns="columns"
        :totalRows="rows?.length"
        :hasCheckbox="false"
        :sortable="true"
        :search="search"
        :loading="loading"
        :noDataContent="t('page-control.table.no-data-content')"
        :showNumbersCount="tableOption.pagination.chunk"
        :pageSize="tableOption.perPage"
        :page="1"
        :paginationInfo="t('page-control.table.rows-count', { from:'{0}', to:'{1}', count:'{2}'})"
        :pageSizeOptions="tableOption.perPageValues"
        skin="whitespace-nowrap bh-table-hover"
        :firstArrow= "firstArrow"
        :lastArrow="lastArrow"
        :previousArrow="previousArrow"
        :nextArrow="nextArrow">
        <!-- (Name) => Store / Brand / Product / Customer / Region -->
        <template v-if="dataType == 'Store' || dataType == 'Brand' || dataType == 'Product' || dataType == 'Customer' || dataType == 'Region'" #name="data">
            <div v-if="dataType == 'Region' || dataType == 'Product'" class="text-center">
                <span v-if="locale == 'eg'">{{ data.value.name_ar }}</span>
                <span v-if="locale == 'en'">{{ data.value.name_en }}</span>
            </div>
            <div v-else class="text-center" v-if="data.value.id > 0">{{ data.value.name }}</div>
        </template>
        <!-- (Location) => Store -->
        <template v-if="dataType == 'Store'" #location="data">
            <div class="text-center" v-if="data.value.id > 0">{{ data.value.location }}</div>
        </template>
        <!-- (Logo) => Brand -->
        <template v-if="dataType == 'Brand'" #logo="data">
            <div v-if="data.value.id > 0" class="flex items-center justify-center font-semibold">
                <div class="p-0.5 bg-white-dark/30 rounded-md w-max ltr:mr-2 rtl:ml-2">
                    <img class="h-20 w-20 rounded-md object-cover" :src="`${imgLocation}${data.value.logo}`" />
                </div>
            </div>
        </template>
        <!-- (city) => Region -->
        <template v-if="dataType == 'Region'" #city="data">
            <div class="text-center">{{ data.value.city_id }}</div>
        </template>
        <!---------------------- Orders ----------------------------->
        <!-- (Order Number) => Order -->
        <template v-if="dataType == 'Order'" #ordernum="data">
            <div class="text-center cursor-pointer text-purple-600" @click="showOrderDetails(data.value.id)"
            v-if="data.value.id > 0">{{ data.value.ordernum }}</div>
        </template>
        <!-- (Date) => Order -->
        <template v-if="dataType == 'Order'" #date="data">
            <div class="text-center" v-if="data.value.id > 0">{{ DateFormatDetails(data.value.date) }}</div>
        </template>
        <!-- (Shipping Company) => Order -->
        <template v-if="dataType == 'Order'" #shippingcompany="data">
            <div class="text-center" v-if="data.value.id > 0">{{ data.value.shippingcompany }}</div>
        </template>
        <!-- (Status) => Order -->
        <template v-if="dataType == 'Order'" #status="data">
            <div class="text-center" v-if="data.value.id > 0">
                <span class="badge" :class="`bg-${statusColor(data.value.status)}`">{{ statusTitle(data.value.status) }}</span>
            </div>
        </template>
        <!---------------------- Category / Subcategory ----------------------------->
        <!-- (name_ar) => Category / Subcategory -->
        <template v-if="dataType == 'M-Category' || dataType == 'S-Category'" #name_ar="data">
            <div class="text-center">{{ data.value.name_ar }}</div>
        </template>
        <!-- (name_en) => Category / Subcategory -->
        <template v-if="dataType == 'M-Category' || dataType == 'S-Category'" #name_en="data">
            <div class="text-center">{{ data.value.name_en }}</div>
        </template>
        <!-- (Category) =>  Subcategory -->
        <template v-if="dataType == 'S-Category'" #category_id="data">
                    <div class="text-center">
                        <span v-if="locale == 'eg'">{{ data.value.category_name_ar }}</span>
                        <span v-if="locale == 'en'">{{ data.value.category_name_en }}</span>
                    </div>
        </template>
        <!-- (image) => Category -->
        <template v-if="dataType == 'M-Category'" #image="data">
            <div v-if="data.value.id > 0" class="flex items-center justify-center font-semibold">
                <div class="p-0.5 bg-white-dark/30 rounded-md w-max ltr:mr-2 rtl:ml-2">
                    <img class="h-20 w-20 rounded-md object-cover" :src="`${imgLocation}${data.value.image}`" />
                </div>
            </div>
        </template>
        <!---------------------- Customers ----------------------------->
        <!-- (phone) => Customer -->
        <template v-if="dataType == 'Customer'" #phone="data">
            <div class="text-center text-cyan-600">{{ data.value.phone }}</div>
        </template>
        <!-- (address) => Customer -->
        <template v-if="dataType == 'Customer'" #address="data">
            <div class="text-center">{{ data.value.address }}</div>
        </template>
        <!---------------------- Products ----------------------------->
        <!-- (model) => Product -->
        <template v-if="dataType == 'Product'" #model="data">
            <div class="text-center">{{ data.value.model}}</div>
        </template>
        <!-- (belongTo) => Product -->
        <template v-if="dataType == 'Product'" #belongTo="data">
            <div class="text-center">
                <span v-if="locale == 'eg'">{{ categoryName(data.value.subCategory) }}</span>
                <span v-if="locale == 'en'">{{ categoryName(data.value.subCategory) }}</span>
            </div>
        </template>
        <!-- (price) => Product -->
        <template v-if="dataType == 'Product'" #price="data">
            <div class="text-center">{{ data.value.price}}</div>
        </template>
        <!-- (is_available) => Product -->
        <template v-if="dataType == 'Product'" #is_available="data">
            <div v-if="data.value.id > 0" class="items-center justify-center">
                <div class="text-success text-center" v-if="data.value.is_available == true"><icon-circle-check class="w-6 h-6" /></div>
                <div class="text-danger text-center" v-else><icon-x-circle class="w-6 h-6" /></div>
            </div>
        </template>
        <!-- (popular) => Product -->
        <template v-if="dataType == 'Product'" #popular="data">
            <div v-if="data.value.id > 0" class="items-center justify-center">
                <div class="text-success" v-if="data.value.popular == true"><icon-circle-check class="w-6 h-6" /></div>
                <div class="text-danger" v-else><icon-x-circle class="w-6 h-6" /></div>
            </div>
        </template>
        <!-- (new) => Product -->
        <template v-if="dataType == 'Product'" #new="data">
            <div v-if="data.value.id > 0" class="items-center justify-center">
                <div class="text-success" v-if="data.value.new == true"><icon-circle-check class="w-6 h-6" /></div>
                <div class="text-danger" v-else><icon-x-circle class="w-6 h-6" /></div>
            </div>
        </template>
        <!---------------------- Manage Actions ----------------------------->
        <template #actions="data">
            <div v-if="data.value.id > 0" class="flex gap-4 items-center justify-center">
                <div v-if="dataType == 'Product'" class="btn btn-white w-4 cursor-pointer hover:text-secondary" @click="ManageProductImages(data.value.id)">
                    <button type="button">
                        <icon-gallery/>
                    </button>
                </div>
                <div class="btn btn-white w-4 cursor-pointer hover:text-success" @click="editRow(data.value.id, data.value)">
                    <button type="button">
                        <icon-edit />
                    </button>
                </div>
                <div v-if="dataType == 'Store'" class="btn btn-white w-4 cursor-pointer hover:text-info" @click="previewRow(data.value.id)">
                    <button type="button">
                        <IconEye/>
                    </button>
                </div>
                <div v-if="dataType == 'Order'" class="btn btn-white w-4 cursor-pointer hover:text-orange-600" @click="showTimeLine(data.value.id)">
                    <button>
                        <icon-clock  />
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
</template>
<script lang="ts">
    // Import Vue & Pinia
    import { defineComponent } from 'vue';
    import { storeToRefs } from 'pinia'
    import { useI18n } from 'vue-i18n'
    import Vue3Datatable from '@bhplugin/vue3-datatable';
    import { useConnectionStore } from '../stores/module/DataModule'
    // Import Icons
    import IconClock from '@/components/icon/icon-clock.vue';
    import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
    import IconCircleCheck from '@/components/icon/icon-circle-check.vue';
    import IconGallery from '@/components/icon/icon-gallery.vue';
    import IconXCircle from '@/components/icon/icon-x-circle.vue';
    import IconX from '@/components/icon/icon-x.vue';
    import IconPlus from '@/components/icon/icon-plus.vue';
    import IconEdit from '@/components/icon/icon-edit.vue';
    import IconEye from '@/components/icon/icon-eye.vue';

    export default defineComponent({
        props:['dataType','rows','columns','sortable'],
        emits: ['edit', 'preview','delete','add','showTimeLine','showOrderDetails','ManageProductImages'],
        components: {
            Vue3Datatable,
            IconTrashLines,
            IconCircleCheck,
            IconClock,
            IconGallery,
            IconXCircle,
            IconX,
            IconPlus,
            IconEdit,
            IconEye
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
        data(props){
            const dataType = props.dataType
            const rows = props.rows
            const columns = props.columns
            const sortable = props.sortable
            //////////////////
            const DataStore = useConnectionStore()
            const { loading, imgLocation, firstArrow, lastArrow, previousArrow, nextArrow } 
            = storeToRefs(DataStore)
            const { t, locale } = useI18n()
            const tableOption = {
                perPage: 15,
                perPageValues: [15], //  20, 30, 50, 100
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
                sortable: sortable,
                sortIcon: {
                    base: 'sort-icon-none',
                    up: 'sort-icon-asc',
                    down: 'sort-icon-desc'
                }
            };
            const status_colors = [
                { status: 'pending', color: 'primary' },
                { status: 'preparing', color: 'secondary' },
                { status: 'ready_to_upload_shipping', color: 'warning' },
                { status: 'upload_shipping', color: 'gray-700' },
                { status: 'shipping', color: 'orange' },
                { status: 'replacement', color: 'info' },
                { status: 'delivered', color: 'success' },
                { status: 'returned', color: 'red-400' },
                { status: 'canceled', color: 'danger' }
            ]
            return{
                status_colors,
                // Arrows
                firstArrow,
                lastArrow,
                previousArrow,
                nextArrow,
                // Data Connection
                DataStore,
                imgLocation,
                dataType,
                columns,
                rows,
                loading,
                ////////
                t,locale,
                tableOption,
                /// Values ///
                search: '',
            }
        },
        async mounted() {},
        methods:{
            statusColor(status: string){
                for (let index = 0; index < this.status_colors.length; index++) {
                    if(this.status_colors[index].status == status){
                        return this.status_colors[index].color
                    }
                }
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
            DateFormatDetails(date: any) {
                let time
                let hours
                const dateTime = new Date(`${date}`)
                var month = dateTime.toLocaleString('default', { month: 'short' })
                if (dateTime.getHours() < 12) time = 'AM'
                else time = 'PM'
                if (dateTime.getHours() > 12) hours = dateTime.getHours() - 12
                else hours = dateTime.getHours()
                return `${dateTime.getFullYear()}, ${month} ${dateTime.getDate()} | ${hours} : ${dateTime.getMinutes()}  ${time}`
            },
            categoryName(data: any = { id: 0, category_id: 0, name_ar: '', name_en: '' }){
                let value = { id: 0, category_id: 0, name_ar: '', name_en: '' }
                value = data
                if(this.locale == 'eg') return value.name_ar
                else return value.name_en
            },
            ///////////////////////////
            addRow(){
                this.$emit('add')
            },
            editRow(id: number, data: any){
                this.$emit('edit', id, data)
            },
            previewRow(id: number){
                this.$emit('preview', id)
            },
            deleteRow(id: number){
                this.$emit('delete', id)
            },
            showTimeLine(id: number){
                this.$emit('showTimeLine', id)
            },
            showOrderDetails(id: number){
                this.$emit('showOrderDetails', id)
            },
            ManageProductImages(id: number){
                this.$emit('ManageProductImages', id)
            }
        }
    })
</script>