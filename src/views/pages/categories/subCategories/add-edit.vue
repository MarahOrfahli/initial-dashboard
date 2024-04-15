<template>
    <div class="space-y-5">
        <!--  -------------------------------  Arabic title input field  --------------------------------------  -->
        <div :class="isSubmmit ? { 'has-error': errora } : ''">
            <label for="title-in-arabic">Title In Arabic</label>
            <input id="title-in-arabic" type="text" placeholder="Enter Title" class="form-input" @keyup="isSubmmit = false,errora = false" v-model="artitle" />
            <!-- <template v-if="isSubmmit && errora == false">
            <p class="text-[#1abc9c] mt-1">Looks Good!</p>
            </template> -->
            <template v-if="isSubmmit && errora == true">
            <p class="text-danger mt-1">{{errorArabic}}</p>
            </template>
        </div>
        <!---------------------------------------------------------------------------------------------------------->
        <!--  -------------------------------  English title input field  --------------------------------------  -->
        <div :class="isSubmmit ? { 'has-error': errorE } : ''">
            <label for="title-in-english">Title In English</label>
            <input id="title-in-english" type="text" placeholder="Enter Title" class="form-input" @keyup="isSubmmit = false,errorE = false" v-model="entitle" />
            <!-- <template v-if="isSubmmit && errorE == false">
            <p class="text-[#1abc9c] mt-1">Looks Good!</p>
            </template> -->
            <template v-if="isSubmmit && errorE == true">
            <p class="text-danger mt-1">{{errorEnglish}}</p>
            </template>
        </div>
        <!-------------------------------------------------------------------------------------------->
        <!--  -------------------------------  Select field  --------------------------------------  -->
        <div :class="isSubmmit ? { 'has-error': errorS } : ''">
            <label for="cat-img">Choose one of these category</label>
            <!-- searchable -->
            <multiselect
            v-model="category"
            :options="options"
            @click="isSubmmit = false,errorS = false"
            class="custom-multiselect"
            :searchable="true"
            placeholder="Select an option"
            selected-label=""
            select-label=""
            deselect-label=""
            ></multiselect>
            <template v-if="isSubmmit && errorS == true">
            <p class="text-danger mt-1">{{errorSelection}}</p>
            </template>
        </div>
        
        <!---------------------------------------------------------------------------->
        <div class="flex justify-end items-center mt-8">
            <button type="button" @click="saveInfo" class="btn btn-primary ltr:ml-4 rtl:mr-4">
                <span v-if="ID == 0">Add SubCategory</span>
                <span v-else>Edit</span>
            </button>
            <button type="button" @click="ondismiss" class="btn btn-outline-danger ltr:ml-4 rtl:mr-4">Discard</button>
        </div>
        
    </div>
</template>
<script lang="ts">

import { ref, defineComponent } from 'vue';
import { useMeta } from '@/composables/use-meta';
import Multiselect from '@suadelabs/vue3-multiselect';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
export default defineComponent({
    props: ['dataid'],
    emits: ['close', 'load-data'],
    components: {
        Multiselect,
    },
    setup(){
            useMeta({ title: 'Adding SubCategory' });
    },
    data(props){
       const ID = props.dataid
        return{
            //// 
            ID,
            category: '',
            artitle: '',
            entitle: '',
            options: ['Face','Eyes','Lips','Body Care'],
            ///////// Validation  ////
            isSubmmit: false,
            errora: false,
            errorE: false,
            errorS: false,
            errorEnglish: '',
            errorSelection: '',
            errorArabic: '',
        }
    },
    async mounted(){ console.log(this.ID) },
    methods: {
        saveInfo(){
            console.log(this.category)
            this.isSubmmit = true
            if(this.artitle == ''){
                this.errora = true
                this.errorArabic = 'Please fill the Name'
            }
            if(this.entitle == ''){
                this.errorE = true
                this.errorEnglish = 'Please fill the Name'
            }
            if(this.category == ''){
                this.errorS = true
                this.errorSelection = 'Please fill the Name'
            }
        },
        ondismiss() {
        this.$emit('close')
        },
    }
})


</script>