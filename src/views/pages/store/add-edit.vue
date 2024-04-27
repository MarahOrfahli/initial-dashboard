<template>
    <div class="space-y-5">
        <!--  -------------------------------  Store title input field  --------------------------------------  -->
        <div :class="isSubmmit ? { 'has-error': errorn} : ''">
            <label for="name">{{ t('pages.store.fields.name') }}</label>
            <input id="name" type="text" :placeholder="t('pages.store.modals.enter-name')" class="form-input" 
            @keyup="isSubmmit = false,errorn = false" v-model="storen" />
            <template v-if="isSubmmit && errorn == true">
            <p class="text-danger mt-1">{{errorName}}</p>
            </template>
        </div>
        <!-------------------------------------------------------------------------------------------->
        <!--  -------------------------------  Store location input field  --------------------------------------  -->
        <div :class="isSubmmit ? { 'has-error': errorl } : ''">
            <label for="title-in-arabic">{{ t('pages.store.fields.location') }}</label>
            <input id="title-in-arabic" type="text" :placeholder="t('pages.store.modals.enter-location')" class="form-input" 
            @keyup="isSubmmit = false,errorl = false" v-model="storel" />
            <template v-if="isSubmmit && errorl == true">
            <p class="text-danger mt-1">{{errorLocation}}</p>
            </template>
        </div>
        
        <!---------------------------------------------------------------------------->
        <div class="flex justify-end items-center mt-8">
            <button type="button" @click="saveInfo" class="btn btn-primary ltr:ml-4 rtl:mr-4">
                <div v-if="ID == 0">
                    <span v-if="loading == false">
                        {{ t('page-control.add') }}
                    </span>
                    <span v-else>
                        <IconRefresh class="animate-[spin_1s_linear_infinite] w-5 h-5" />
                    </span>
                </div>
                <div v-else-if="ID != 0">
                    <span v-if="loading == false">{{ t('page-control.save-changes') }}</span>
                    <span v-else>
                        <IconRefresh class="animate-[spin_1s_linear_infinite] w-5 h-5" />
                    </span>
                </div>
            </button>
            <button type="button" @click="ondismiss" class="btn btn-outline-danger ltr:ml-4 rtl:mr-4">{{ t('page-control.cancel') }}</button>
        </div>
        
    </div>
</template>
<script lang="ts">

import { defineComponent } from 'vue';
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useConnectionStore } from '../../../stores/module/DataModule'
import { useMeta } from '@/composables/use-meta';
import IconRefresh from '@/components/icon/icon-refresh.vue';
import { Store } from '@/model/Classes';

export default defineComponent({
    props: ['dataid', 'data'],
    emits: ['close', 'load-data'],
    components: {
        IconRefresh,
    },
    setup(){
            useMeta({ title: 'Add-Edit Store' });
    },
    data(props){
        const DataStore = useConnectionStore()
        const { stores, loading } = storeToRefs(DataStore)
        const { t } = useI18n()
        let currentData: Store = props.data
       const ID = props.dataid
        return{
            t,
            // Data Connection
            currentData,
            DataStore,
            loading,
            stores,
            //// 
            ID,
            storen: '',
            storel: '',
            counter: 0,
            ///////// Validation  ////
            isSubmmit: false,
            errorn: false,
            errorl: false,
            errorLocation: '',
            errorName: '',
        }
    },
    async mounted(){ this.FillData() },
    methods: {
        FillData(){
            if(this.ID != 0){
                this.storen = this.currentData.name
                this.storel = this.currentData.location
            }
        },
        formValidate(){  // Validation Method
            this.isSubmmit = true
            if(this.storen == ''){
                this.errorn = true
                this.errorName = 'Please fill the Name'
            }
            if(this.storel == ''){
                this.errorl = true
                this.errorLocation = 'Please fill the Location'
            }
            if (this.errorn == true || this.errorl == true) {
                this.counter++
            } else {
                this.counter = 0
            }
            return this.counter
        },
        saveInfo(){
            // Prepare Data To Create New Store
            let DataConnect = { id: this.ID, name: this.storen, location: this.storel  }
            var isValid = this.formValidate()
            if (isValid == 0) {
                if (this.ID === 0) { // Add New Store
                    this.DataStore.createData('Store', DataConnect).then(() => {
                    this.$emit('load-data')
                    this.ondismiss()
                    })
                } else { // Edit Store
                    this.DataStore.updateData('Store', this.ID, DataConnect).then(() => {
                    this.$emit('load-data')
                    this.ondismiss()
                    })
                }
            }
        },
        ondismiss() {
        this.$emit('close')
        },
    }
})


</script>