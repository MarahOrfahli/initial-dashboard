<template>
    <div>
        <div class="panel px-0 pb-1.5 border-[#e0e6ed] dark:border-[#1b2e4b]">
            <div class="datatable invoice-table">
                <div class="grid sm:grid-cols-2 gap-3 mb-4.5 px-5">
                    <div style="width: 160px">
                        <router-link to="/apps/categories/main-categories/add" class="btn btn-primary gap-2">
                            <icon-plus />
                            {{ t('add-category') }}
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
                    <template #titleArabic="data">
                        <div>{{ data.value.titleArabic }}</div>
                    </template>
                    <template #titleEnglish="data">
                        <div>{{ data.value.titleEnglish }}</div>
                    </template>
                    <template #catImg="data">
                        <div class="flex items-center font-semibold">
                            <div class="p-0.5 bg-white-dark/30 rounded-md w-max ltr:mr-2 rtl:ml-2">
                                <img class="h-20 w-20 rounded-md object-cover" :src="`${data.value.catImg}`" />
                            </div>
                        </div>
                    </template>
                    <template #actions="data">
                        <div class="flex gap-4 items-center justify-center">
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
    import IconPlus from '@/components/icon/icon-plus.vue';
    import IconEdit from '@/components/icon/icon-edit.vue';
    import IconEye from '@/components/icon/icon-eye.vue';
    export default defineComponent({
        components: {
            Vue3Datatable,
            IconTrashLines,
            IconPlus,
            IconEdit,
            IconEye
        },
        setup(){
            useMeta({ title: 'Invoice List' });
        },
        computed:{
           cols(){
            let { t, locale } = useI18n()
            let cols = [
                // { field: 'invoice', title: 'Invoice' },
                { field: 'titleArabic', title: t('title-arabic') },
                { field: 'titleEnglish', title: t('title-english')  },
                { field: 'catImg', title: t('img')  },
                { field: 'actions', title: t('action.name') , sort: false, headerClass: 'justify-center' },
            ];
            return cols;
           }
        },
        data() {
            const datatable: any = null;
            const { t, locale } = useI18n()
            const search = '';
            const cols1 = [
                // { field: 'invoice', title: 'Invoice' },
                { field: 'titleArabic', title: t('title-arabic') },
                { field: 'titleEnglish', title: t('title-english')  },
                { field: 'catImg', title: t('img')  },
                { field: 'actions', title: t('action.name') , sort: false, headerClass: 'justify-center' },
            ];
            const items = [
                {
                    id: 1,
                    titleArabic: 'وجه',
                    titleEnglish: 'Face',
                    catImg: 'https://test.mightcinema.com/storage/images/categories/hqdelKiprK4sZbrRYcNTVrwCStQUeTV9798fcGDF.jpg'
                },
                {
                    id: 2,
                    titleArabic: 'وجه',
                    titleEnglish: 'Face',
                    catImg: 'https://test.mightcinema.com/storage/images/categories/hqdelKiprK4sZbrRYcNTVrwCStQUeTV9798fcGDF.jpg'
                },
                {
                    id: 3,
                    titleArabic: 'وجه',
                    titleEnglish: 'Face',
                    catImg: 'https://test.mightcinema.com/storage/images/categories/hqdelKiprK4sZbrRYcNTVrwCStQUeTV9798fcGDF.jpg'
                },
                {
                    id: 4,
                    titleArabic: 'وجه',
                    titleEnglish: 'Face',
                    catImg: 'https://test.mightcinema.com/storage/images/categories/hqdelKiprK4sZbrRYcNTVrwCStQUeTV9798fcGDF.jpg'
                },
            ];
            const searchText = '';
            const columns = ['id', 'titleArabic', 'titleEnglish', 'catImg','actions'];
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
                sortable: ['titleArabic', 'titleEnglish'],
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
                cols1,
                items,
                columns,
                searchText,
                tableOption
            }
        },
        watch:{
            col(){
                const cols = [
                // { field: 'invoice', title: 'Invoice' },
                { field: 'titleArabic', title: this.t('title-arabic') },
                { field: 'titleEnglish', title: this.t('title-english')  },
                { field: 'catImg', title: this.t('img')  },
                { field: 'actions', title: this.t('action.name') , sort: false, headerClass: 'justify-center' },
            ];
            }
            // cols(newValue, oldValue) {
            // console.log(`تم تغيير القيمة من ${oldValue} إلى ${newValue}`);
            // }
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
