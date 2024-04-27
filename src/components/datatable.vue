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
                    :paginationInfo="t('page-control.table.rows-count', { from:'{0}', to:'{1}', count:'{2}'})"
                    :pageSizeOptions="tableOption.perPageValues"
                    skin="whitespace-nowrap bh-table-hover"
                    :firstArrow= "firstArrow"
                    :lastArrow="lastArrow"
                    :previousArrow="previousArrow"
                    :nextArrow="nextArrow"
                >
                <!-- Store -->
                <template v-if="dataType == 'Store' || dataType == 'Brand' || dataType == 'Product'" #name="data">
                        <div class="text-center" v-if="data.value.id > 0">{{ data.value.name }}</div>
                </template>
                <template v-if="dataType == 'Store'" #location="data">
                    <div class="text-center" v-if="data.value.id > 0">{{ data.value.location }}</div>
                </template>
                <template v-if="dataType == 'Brand'" #logo="data">
                    <div v-if="data.value.id > 0" class="flex items-center justify-center font-semibold">
                        <div class="p-0.5 bg-white-dark/30 rounded-md w-max ltr:mr-2 rtl:ml-2">
                            <img class="h-20 w-20 rounded-md object-cover" :src="`${imgLocation}${data.value.logo}`" />
                        </div>
                    </div>
                </template>
                <template v-if="dataType == 'M-Category' || dataType == 'S-Category'" #name_ar="data">
                    <div class="text-center">{{ data.value.name_ar }}</div>
                </template>
                <template v-if="dataType == 'M-Category' || dataType == 'S-Category'" #name_en="data">
                    <div class="text-center">{{ data.value.name_en }}</div>
                </template>
                <template v-if="dataType == 'S-Category'" #category_id="data">
                    <div class="text-center">{{ data.value.category_name_ar }}-{{ data.value.category_name_en }}</div>
                </template>
                <template v-if="dataType == 'M-Category'" #image="data">
                    <div v-if="data.value.id > 0" class="flex items-center justify-center font-semibold">
                        <div class="p-0.5 bg-white-dark/30 rounded-md w-max ltr:mr-2 rtl:ml-2">
                            <img class="h-20 w-20 rounded-md object-cover" :src="`${imgLocation}${data.value.image}`" />
                        </div>
                    </div>
                </template>
                <template v-if="dataType == 'Customer'" #name="data">
                    <div class="text-center">{{ data.value.name }}</div>
                </template>
                <template v-if="dataType == 'Customer'" #phone="data">
                    <div class="text-center">{{ data.value.phone_number }}</div>
                </template>
                <template v-if="dataType == 'Customer'" #address="data">
                    <div class="text-center">{{ data.value.city }}</div>
                </template>
                <template v-if="dataType == 'Customer'" #email="data">
                    <div class="text-center">{{ data.value.email }}</div>
                </template>
                <template v-if="dataType == 'Product'" #model="data">
                        <div class="text-center">{{ data.value.model}}</div>
                </template>
                <template v-if="dataType == 'Product'" #belongTo="data">
                    <div class="text-center">{{ data.value.belongTo}}</div>
                </template>
                <template v-if="dataType == 'Product'" #price="data">
                    <div class="text-center">{{ data.value.price}}</div>
                </template>
                <template v-if="dataType == 'Product'" #available="data">
                    <div class="items-center justify-center">
                        <div class="text-success text-center" v-if="data.value.available == true"><icon-circle-check class="w-6 h-6" /></div>
                        <div class="text-danger text-center" v-else><icon-x-circle class="w-6 h-6" /></div>
                    </div>
                </template>
                <template v-if="dataType == 'Product'" #popular="data">
                    <div class="items-center justify-center">
                        <div class="text-success" v-if="data.value.popular == true"><icon-circle-check class="w-6 h-6" /></div>
                        <div class="text-danger" v-else><icon-x-circle class="w-6 h-6" /></div>
                    </div>
                </template>
                <template v-if="dataType == 'Product'" #new="data">
                    <div class="items-center justify-center">
                        <div class="text-success" v-if="data.value.new == true"><icon-circle-check class="w-6 h-6" /></div>
                        <div class="text-danger" v-else><icon-x-circle class="w-6 h-6" /></div>
                    </div>
                </template>
                <template #actions="data">
                    <div v-if="data.value.id > 0" class="flex gap-4 items-center justify-center">
                        <div v-if="dataType == 'Product'" class="btn btn-white w-4 cursor-pointer hover:text-secondary">
                            <router-link to="/apps/categories/main-categories/edit" class="hover:text-info">
                                <icon-gallery/>
                            </router-link>
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
        emits: ['edit', 'preview','delete','add'],
        components: {
            Vue3Datatable,
            IconTrashLines,
            IconCircleCheck,
            IconGallery,
            IconXCircle,
            IconX,
            IconPlus,
            IconEdit,
            IconEye
        },
        computed:{},
        data(props){
            const dataType = props.dataType
            const rows = props.rows
            const columns = props.columns
            const sortable = props.sortable
            //////////////////
            const DataStore = useConnectionStore()
            const { loading, imgLocation, firstArrow, lastArrow, previousArrow, nextArrow } = storeToRefs(DataStore)
            const { t, locale } = useI18n()
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
                sortable: sortable,
                sortIcon: {
                    base: 'sort-icon-none',
                    up: 'sort-icon-asc',
                    down: 'sort-icon-desc'
                }
            };
            return{
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
        
        methods:{
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
            }
        }
    })
</script>