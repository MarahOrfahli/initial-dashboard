<template>
    <div class="space-y-5">
        <!--  -------------------------------  Arabic title input field  --------------------------------------  -->
        <div :class="isSubmmit ? { 'has-error': errora, 'has-success': !errora } : ''">
            <label for="title-in-arabic">Title In Arabic</label>
            <input id="title-in-arabic" type="text" placeholder="Enter Title" class="form-input" @keyup="isSubmmit = false,errora = false" v-model="artitle" />
            <template v-if="isSubmmit && errora == false">
            <p class="text-[#1abc9c] mt-1">Looks Good!</p>
            </template>
            <template v-if="isSubmmit && errora == true">
            <p class="text-danger mt-1">{{errorArabic}}</p>
            </template>
        </div>
        <!---------------------------------------------------------------------------------------------------------->
        <!--  -------------------------------  English title input field  --------------------------------------  -->
        <div :class="isSubmmit ? { 'has-error': errorE, 'has-success': !errorE } : ''">
            <label for="title-in-english">Title In English</label>
            <input id="title-in-english" type="text" placeholder="Enter Title" class="form-input" @keyup="isSubmmit = false,errorE = false" v-model="entitle" />
            <template v-if="isSubmmit && errorE == false">
            <p class="text-[#1abc9c] mt-1">Looks Good!</p>
            </template>
            <template v-if="isSubmmit && errorE == true">
            <p class="text-danger mt-1">{{errorEnglish}}</p>
            </template>
        </div>
        <!-------------------------------------------------------------------------------------------->
        <!--  -------------------------------  Image field  --------------------------------------  -->
        <div :class="isSubmmit ? { 'has-error': errorI, 'has-success': !errorI } : ''">
            <label for="cat-img">Upload an image category</label>
            <input id="cat-img" type="file" class="" @change="handleFileUpload"
            accept="image/*" @click="" :model-value="file"/>
            <template v-if="isSubmmit && errorI == true">
            <p class="text-danger mt-1">{{errorImage}}</p>
            </template>
        </div>
        
        <!---------------------------------------------------------------------------->
        <div class="flex justify-end items-center mt-8">
            <button type="button" @click="saveInfo" class="btn btn-primary ltr:ml-4 rtl:mr-4">
                <span v-if="ID == 0">Add Category</span>
                <span v-else>Edit</span>
            </button>
            <button type="button" @click="ondismiss" class="btn btn-outline-danger ltr:ml-4 rtl:mr-4">Discard</button>
        </div>
        
    </div>
</template>
<script lang="ts">

import { ref, defineComponent } from 'vue';
import { useMeta } from '@/composables/use-meta';

export default defineComponent({
    props: ['dataid'],
    emits: ['close', 'load-data'],
    components: {
    },
    setup(){
            useMeta({ title: 'Adding Main Category' });
    },
    data(props){
       // const data = props.data
       const file = ref<File | null>(null);
       const ID = props.dataid
        return{
            //// 
            ID,
            file,
            artitle: '',
            entitle: '',
            imgval: '',
            ///////// Validation  ////
            isSubmmit: false,
            errora: false,
            errorE: false,
            errorI: false,
            errorEnglish: '',
            errorImage: '',
            errorArabic: '',
        }
    },
    async mounted(){ console.log(this.ID) },
    methods: {
        handleFileUpload(event: Event){
            this.isSubmmit = false
            this.errorI = false
            const target = event.target as HTMLInputElement;
            if (target.files) {
                this.file = target.files[0]
                console.log(this.file)
            }
        },
        saveInfo(){
            this.isSubmmit = true
            if(this.artitle == ''){
                this.errora = true
                this.errorArabic = 'Please fill the Name'
            }
            if(this.entitle == ''){
                this.errorE = true
                this.errorEnglish = 'Please fill the Name'
            }
            if(this.file == null){
                this.errorI = true
                this.errorImage = 'Please fill the Name'
            }
        },
        ondismiss() {
        this.$emit('close')
        },
    }
})


</script>