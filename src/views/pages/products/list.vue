<template>
    <div>
        <div class="panel px-0 pb-1.5 border-[#e0e6ed] dark:border-[#1b2e4b]">
            <div class="datatable invoice-table">
                <div class="grid sm:grid-cols-2 gap-3 mb-4.5 px-5">
                    <div style="width: 160px">
                        <router-link to="/pages/products/add" class="btn btn-primary gap-2">
                            <icon-plus />
                            {{ t('page-control.add') }}
                        </router-link>
                    </div>
                    <div>
                        <input v-model="search" type="text" class="form-input" :placeholder="t('page-control.search-placeholder')" />
                    </div>
                </div>
                <vue3-datatable
                    ref="datatable"
                    :rows="items"
                    :columns="cols"
                    :totalRows="items?.length"
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
                        <div class="text-center">{{ data.value.name}}</div>
                    </template>
                    <template #model="data">
                        <div class="text-center">{{ data.value.model}}</div>
                    </template>
                    <template #belongTo="data">
                        <div class="text-center">{{ data.value.belongTo}}</div>
                    </template>
                    <template #price="data">
                        <div class="text-center">{{ data.value.price}}</div>
                    </template>
                    <template #available="data">
                        <div class="items-center justify-center">
                            <div class="text-success text-center" v-if="data.value.available == true"><icon-circle-check class="w-6 h-6" /></div>
                            <div class="text-danger text-center" v-else><icon-x-circle class="w-6 h-6" /></div>
                        </div>
                    </template>
                    <template #popular="data">
                        <div class="items-center justify-center">
                            <div class="text-success" v-if="data.value.popular == true"><icon-circle-check class="w-6 h-6" /></div>
                            <div class="text-danger" v-else><icon-x-circle class="w-6 h-6" /></div>
                        </div>
                    </template>
                    <template #new="data">
                        <div class="items-center justify-center">
                            <div class="text-success" v-if="data.value.new == true"><icon-circle-check class="w-6 h-6" /></div>
                            <div class="text-danger" v-else><icon-x-circle class="w-6 h-6" /></div>
                        </div>
                    </template>
                    <template #actions="data">
                        <div class="flex gap-4 items-center justify-center">
                            <div class="btn btn-white w-4">
                                <router-link to="/apps/categories/main-categories/edit" class="hover:text-info">
                                    <icon-gallery/>
                                </router-link>
                            </div>
                            <div class="btn btn-white w-4">
                                <router-link to="/apps/categories/main-categories/edit" class="hover:text-success">
                                    <icon-edit />
                                </router-link>
                            </div>
                            <div class="btn btn-white w-4">
                                <button type="button" @click="deleteRow(data.value.id)" class="hover:text-danger">
                                    <icon-trash-lines />
                                </button>
                            </div>
                            
                        </div>
                    </template>
                </vue3-datatable>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import { defineComponent } from 'vue';
    import { useI18n } from 'vue-i18n'
    import Vue3Datatable from '@bhplugin/vue3-datatable';
    import { useMeta } from '@/composables/use-meta';
    import { storeToRefs } from 'pinia'
    import Swal from 'sweetalert2';
    import { Products } from '../../../model/Classes'
    import { useConnectionStore } from '../../../stores/module/DataModule'
    // Import Icons
    import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
    import IconCircleCheck from '@/components/icon/icon-circle-check.vue';
    import IconGallery from '@/components/icon/icon-gallery.vue';
    import IconXCircle from '@/components/icon/icon-x-circle.vue';
    import IconPlus from '@/components/icon/icon-plus.vue';
    import IconEdit from '@/components/icon/icon-edit.vue';
    import IconEye from '@/components/icon/icon-eye.vue';
    export default defineComponent({
        components: {
            Vue3Datatable,
            IconCircleCheck,
            IconTrashLines,
            IconGallery,
            IconXCircle,
            IconPlus,
            IconEdit,
            IconEye
        },
        setup(){
            useMeta({ title: 'Products List' });
        },
        computed:{
           cols(){
            let { t } = useI18n()
            let cols = [
                { field: 'name', title: t('name'), headerClass: 'justify-center' },
                { field: 'model', title: t('model'), headerClass: 'justify-center'  },
                { field: 'belongTo', title: 'Belong To', headerClass: 'justify-center'  },
                { field: 'price', title: 'Price', headerClass: 'justify-center'  },
                { field: 'available', title: 'Available', sort: false, headerClass: 'justify-center'  },
                { field: 'popular', title: 'Popular', sort: false, headerClass: 'justify-center' },
                { field: 'new', title: 'New', sort: false, headerClass: 'justify-center' },
                { field: 'actions', title: t('action.name') , sort: false, headerClass: 'justify-center' },
            ];
            return cols;
           }
        },
        data() {
            const datatable: any = null;
            const { t, locale } = useI18n()
            const DataStore = useConnectionStore()
            const { products, loading , firstArrow, lastArrow, previousArrow, nextArrow} = storeToRefs(DataStore)
            // firstArrow, lastArrow, previousArrow, nextArrow
            const search = '';
            const items = [
                {
                    id: 1,
                    name: 'هايلايتر سائل',
                    model: 1584,
                    belongTo: 'هاي لايترز - وجه',
                    price: 35,
                    available: true,
                    popular: false,
                    new: true
                },
                {
                    id: 2,
                    name: 'نيو ليب ستيك',
                    model: 2503,
                    belongTo: 'ليب ستيك - شفاة',
                    price: 15,
                    available: false,
                    popular: true,
                    new: false
                },
                {
                    id: 3,
                    name: 'مخمرية - ست عطور',
                    model: 1997,
                    belongTo: 'مخمرية - عناية بالجسم',
                    price: 0,
                    available: true,
                    popular: true,
                    new: false
                },
            ];
            const searchText = '';
            const columns = ['id', 'name', 'model', 'belongTo', 'price', 'available', 'popular', 'new', 'actions'];
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
                sortable: ['name', 'model', 'belongTo', 'price'],
                sortIcon: {
                    base: 'sort-icon-none',
                    up: 'sort-icon-asc',
                    down: 'sort-icon-desc',
                },
            };
            return {
                // Arrows
                firstArrow,
                lastArrow,
                previousArrow,
                nextArrow,
                /////////////////
                // Data Connection
                products, loading,
                DataStore,
                //////////
                datatable,
                t,locale,
                search,
                items,
                columns,
                searchText,
                tableOption
            }
        },
        async mounted() { this.startPage() },
        methods: {
            startPage(){
                this.DataStore.getData('Products').then(() => {})
            },
            onDeleteCallback(idrow: number) {
                this.DataStore.deleteData('Products', idrow).then(() => {
                    Swal.fire({ 
                        title: this.t('page-control.deleted'),
                        text:  this.t('page-control.text-success-deleted'),
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
                    title: this.t('page-control.title-delete'),
                    text: this.t('page-control.text-delete'),
                    confirmButtonText: this.t('page-control.delete'),
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
