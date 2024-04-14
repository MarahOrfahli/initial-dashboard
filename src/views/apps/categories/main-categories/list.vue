<template>
    <div>
        <div class="panel px-0 pb-1.5 border-[#e0e6ed] dark:border-[#1b2e4b]">
            <div class="datatable invoice-table">
                <div class="grid sm:grid-cols-2 gap-3 mb-4.5 px-5">
                    <div style="width: 160px">
                        <div @click="add" class="btn btn-primary gap-2 hover:cursor-pointer">
                            <icon-plus />
                            {{ t('add-category') }}
                        </div>
                        <!-- <router-link to="/apps/categories/main-categories/add" >
                            
                        </router-link> -->
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
                            <div class="btn btn-white w-4 cursor-pointer hover:text-success" @click="editRow(`${data.value.id}`)">
                                <button type="button">
                                    <icon-edit />
                                </button>
                            </div>
                            <div class="btn btn-white w-4 cursor-pointer hover:text-danger" @click="deleteRow(`${data.value.id}`)">
                                <button type="button">
                                    <icon-trash-lines />
                                </button>
                            </div>
                            
                        </div>
                    </template>
                </vue3-datatable>
            </div>
        </div>

        <div>
                                <!-- Modal -->
                                <TransitionRoot appear :show="addeditMainCategory" as="template">
                            <Dialog as="div" class="relative z-[51]">
                                <TransitionChild
                                    as="template"
                                    enter="duration-300 ease-out"
                                    enter-from="opacity-0"
                                    enter-to="opacity-100"
                                    leave="duration-200 ease-in"
                                    leave-from="opacity-100"
                                    leave-to="opacity-0"
                                >
                                    <DialogOverlay class="fixed inset-0 bg-[black]/60" />
                                </TransitionChild>

                                <div class="fixed inset-0 overflow-y-auto">
                                    <div class="flex min-h-full items-start justify-center px-4 py-8">
                                        <TransitionChild
                                            as="template"
                                            enter="duration-300 ease-out"
                                            enter-from="opacity-0 scale-95"
                                            enter-to="opacity-100 scale-100"
                                            leave="duration-200 ease-in"
                                            leave-from="opacity-100 scale-100"
                                            leave-to="opacity-0 scale-95"
                                        >
                                            <DialogPanel class="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                                <button
                                                    type="button"
                                                    class="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                                    @click="addeditMainCategory = false"
                                                >
                                                    <icon-x />
                                                </button>
                                                <div
                                                    class="text-lg font-bold bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]"
                                                >
                                                    <span>{{ addedit }}</span>
                                                </div>
                                                <div class="p-5">
                                                    <AddEditCategory :dataid="categoryID" @close="close" />

                                                    <!-- <div class="flex justify-end items-center mt-8">
                                                        <button type="button" @click="addeditMainCategory = false" class="btn btn-outline-danger">Discard</button>
                                                        <button type="button" @click="addeditMainCategory = false" class="btn btn-primary ltr:ml-4 rtl:mr-4">Save</button>
                                                    </div> -->
                                                </div>
                                            </DialogPanel>
                                        </TransitionChild>
                                    </div>
                                </div>
                            </Dialog>
                        </TransitionRoot>
                            </div>
    </div>
</template>
<script lang="ts">
    import { defineComponent } from 'vue';
    import { useI18n } from 'vue-i18n'
    import AddEditCategory from '@/views/apps/categories/main-categories/add-edit.vue'
    import Vue3Datatable from '@bhplugin/vue3-datatable';
    import { useMeta } from '@/composables/use-meta';
    import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
    import IconX from '@/components/icon/icon-x.vue';
    import IconPlus from '@/components/icon/icon-plus.vue';
    import IconEdit from '@/components/icon/icon-edit.vue';
    import IconEye from '@/components/icon/icon-eye.vue';
    import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay }
     from '@headlessui/vue';
    export default defineComponent({
        components: {
            AddEditCategory,
            Vue3Datatable,
            TransitionRoot,
            TransitionChild,
            IconTrashLines,
            DialogPanel,
            Dialog,
            IconX,
            IconPlus,
            IconEdit,
            IconEye
        },
        setup(){
            useMeta({ title: 'Main Category List' });
        },
        computed:{
           cols(){
            let { t } = useI18n()
            let cols = [
                { field: 'titleArabic', title: t('title-arabic') },
                { field: 'titleEnglish', title: t('title-english')  },
                { field: 'catImg', title: t('img')  },
                { field: 'actions', title: t('action.name') , sort: false, headerClass: 'justify-center' },
            ];
            return cols;
           },
        },
        data() {
            const datatable: any = null;
            const { t, locale } = useI18n()
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
                // Values
                addeditMainCategory: false,
                addedit: '',
                search: '',
                searchText: '',
                categoryID: 0,
                ////////
                datatable,
                t,locale,
                items,
                columns,
                tableOption
            }
        },
        async mounted() {},
        methods: {
            close(){
                this.addeditMainCategory = false
            },
            add(){
                this.addeditMainCategory = true
                this.addedit = 'Adding New Category'
                this.categoryID = 0
            },
            editRow(id: any = null){
                this.addeditMainCategory = true
                this.addedit = 'Edit Category'
                this.categoryID = id
            },
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
