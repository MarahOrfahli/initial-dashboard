<template>
    <div>
        <div class="panel px-0 pb-1.5 border-[#e0e6ed] dark:border-[#1b2e4b]">
            <div class="datatable invoice-table">
                <div class="grid sm:grid-cols-2 gap-3 mb-4.5 px-5">
                    <div style="width: 160px">
                        <router-link to="/pages/products/add" class="btn btn-primary gap-2">
                            <icon-plus />
                            {{ t('add') }}
                        </router-link>
                    </div>
                    <div>
                        <input v-model="search" type="text" class="form-input" :placeholder="t('search-ph')" />
                    </div>
                </div>
                <vue3-datatable
                    ref="datatable"
                    :rows="items"
                    :columns="cols"
                    :totalRows="items?.length"
                    :hasCheckbox="true"
                    :sortable="true"
                    :search="search"
                    skin="whitespace-nowrap bh-table-hover"
                    firstArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                    lastArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg> '
                    previousArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                    nextArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                >
                    <template #available="data">
                        <div class="text-success" v-if="data.value.available == true"><icon-circle-check class="w-6 h-6" /></div>
                        <div class="text-danger" v-else><icon-x-circle class="w-6 h-6" /></div>
                    </template>
                    <template #popular="data">
                        <div class="text-success" v-if="data.value.popular == true"><icon-circle-check class="w-6 h-6" /></div>
                        <div class="text-danger" v-else><icon-x-circle class="w-6 h-6" /></div>
                    </template>
                    <template #new="data">
                        <div class="text-success" v-if="data.value.new == true"><icon-circle-check class="w-6 h-6" /></div>
                        <div class="text-danger" v-else><icon-x-circle class="w-6 h-6" /></div>
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
                                <button type="button" @click="deleteRow(`${data.value.id}`)" class="hover:text-danger">
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
                { field: 'name', title: t('name') },
                { field: 'model', title: t('model')  },
                { field: 'belongTo', title: 'Belong To'  },
                { field: 'price', title: 'Price'  },
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
                sortable: ['name', 'model', 'belongTo', 'price'],
                sortIcon: {
                    base: 'sort-icon-none',
                    up: 'sort-icon-asc',
                    down: 'sort-icon-desc',
                },
            };
            return {
                datatable,
                t,locale,
                search,
                items,
                columns,
                searchText,
                tableOption
            }
        },
        async mounted() {},
        methods: {
            deleteRow(item: any = null){
                if (confirm(this.t('check-delete'))) {
            if (item) {
                this.items = this.items.filter((d) => d.id != item);
                this.datatable.clearSelectedRows();
            } else {
                let selectedRows = this.datatable.getSelectedRows();
                const ids = selectedRows.map((d) => {
                    return d.id;
                });
                this.items = this.items.filter((d) => !ids.includes(d.id as never));
                this.datatable.clearSelectedRows();
            }
        }
            }
        }
    })


</script>
