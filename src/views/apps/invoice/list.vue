<template>
    <div>
        <div class="panel px-0 pb-1.5 border-[#e0e6ed] dark:border-[#1b2e4b]">
            <div class="datatable invoice-table">
                <div class="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                    <div class="flex items-center gap-2">
                        <button type="button" class="btn btn-danger gap-2" @click="deleteRow()">
                            <icon-trash-lines />
                            {{ $t('delete') }}
                        </button>
                        <router-link to="/apps/invoice/add" class="btn btn-primary gap-2">
                            <icon-plus />
                            {{ $t('add-new-section') }}
                        </router-link>
                    </div>
                    <div class="ltr:ml-auto rtl:mr-auto">
                        <input v-model="search" type="text" class="form-input" :placeholder="$t('search-ph')" />
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
                            <router-link to="/apps/invoice/edit" class="hover:text-info">
                                <icon-edit class="w-4.5 h-4.5" />
                            </router-link>
                            <router-link to="/apps/invoice/preview" class="hover:text-primary">
                               <icon-eye />
                            </router-link>
                            <button type="button" class="hover:text-danger" @click="deleteRow(`${data.value.id}`)">
                                <icon-trash-lines />
                            </button>
                        </div>
                    </template>
                </vue3-datatable>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
    import { useI18n } from 'vue-i18n'
    import Vue3Datatable from '@bhplugin/vue3-datatable';
    import { useMeta } from '@/composables/use-meta';
    import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
    import IconPlus from '@/components/icon/icon-plus.vue';
    import IconEdit from '@/components/icon/icon-edit.vue';
    import IconEye from '@/components/icon/icon-eye.vue';

    useMeta({ title: 'Invoice List' });

    const datatable: any = ref(null);
    const { t, locale } = useI18n()
    const search = ref('');
    const cols = ref([
        // { field: 'invoice', title: 'Invoice' },
        { field: 'titleArabic', title: t('title-arabic') },
        { field: 'titleEnglish', title: t('title-english')  },
        { field: 'catImg', title: t('img')  },
        { field: 'actions', title: t('action') , sort: false, headerClass: 'justify-center' },
    ]);
    const items = ref([
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
    ]);
    const searchText = ref('');
    const columns = ref(['id', 'titleArabic', 'titleEnglish', 'catImg','actions']);
    const tableOption = ref({
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
    });

    const deleteRow = (item: any = null) => {
        if (confirm('Are you sure want to delete selected row ?')) {
            if (item) {
                items.value = items.value.filter((d) => d.id != item);
                datatable.value.clearSelectedRows();
            } else {
                let selectedRows = datatable.value.getSelectedRows();
                const ids = selectedRows.map((d) => {
                    return d.id;
                });
                items.value = items.value.filter((d) => !ids.includes(d.id as never));
                datatable.value.clearSelectedRows();
            }
        }
    };
</script>
