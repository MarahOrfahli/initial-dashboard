<template>
    <TransitionRoot appear :show="showModal" as="template">
        <Dialog as="div" class="relative z-[51]">
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0">
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
                        leave-to="opacity-0 scale-95">
                            <DialogPanel class="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                <button
                                    type="button"
                                    class="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                    @click="closeModal">
                                    <icon-x />
                                </button>
                                <div class="text-lg font-bold bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                    <span>{{ modalTitle }}</span>
                                </div>
                                <div class="p-5" v-if="dataType == 'Brand'">
                                    <AddEditBrand :dataid="ID" @close="closeModal" :data="data" @load-data="loadData"/>
                                </div>
                                <div class="p-5" v-if="dataType == 'M-Category'">
                                    <AddEditCategory :dataid="ID" @close="closeModal" :data="data" @load-data="loadData"/>
                                </div>
                                <div class="p-5" v-if="dataType == 'S-Category'">
                                    <AddEditSubcategory :dataid="ID" @close="closeModal" :data="data" @load-data="loadData"/>
                                </div>
                                <div class="p-5" v-if="dataType == 'Customer'">
                                    <AddEditCustomer :dataid="ID" @close="closeModal" :data="data" @load-data="loadData"/>
                                </div>
                                <div class="p-5" v-if="dataType == 'Order'">
                                    <AddEditOrder :dataid="ID" @close="closeModal" :data="data" @load-data="loadData"/>
                                </div>
                                <div class="p-5" v-if="dataType == 'Store'">
                                    <AddEditStore :dataid="ID" @close="closeModal" :data="data" @load-data="loadData"/>
                                </div>
                            </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay }
    from '@headlessui/vue';
// Pages
import AddEditBrand from '@/views/pages/brand/add-edit.vue'
import AddEditCategory from '@/views/pages/categories/mainCategories/add-edit.vue'
import AddEditSubcategory from '@/views/pages/categories/subCategories/add-edit.vue'
import AddEditCustomer from '@/views/pages/Customers/add-edit.vue'
import AddEditOrder from '@/views/pages/orders/add-edit.vue'
import AddEditStore from '@/views/pages/store/add-edit.vue'
// Icon
import IconX from '@/components/icon/icon-x.vue';
export default defineComponent({
    props: ['dataType','show','dataID','data','modalTitle'],
    emits: ['loadData','closeModal'],
    components: {
        TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay, IconX,
        AddEditBrand, AddEditCategory, AddEditSubcategory, AddEditCustomer,
        AddEditOrder, AddEditStore, 
    },
    data(props){
        const dataType = props.dataType
        const showModal = props.show
        const ID = props.dataID
        const modalTitle = props.modalTitle
        const data: any = props.data
        return{
            ID,
            dataType,
            showModal,
            modalTitle,
            data,
        }
    },
    async mounted() { },
    methods:{
        loadData(){
            this.$emit('loadData')
        },
        closeModal(){
            this.$emit('closeModal')
        }
    }
})
</script>