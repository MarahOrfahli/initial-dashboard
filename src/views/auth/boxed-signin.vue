<template>
    <div>
        <div class="absolute inset-0">
            <img src="/assets/images/auth/bg-gradient.png" alt="image" class="h-full w-full object-cover" />
        </div>

        <div
            class="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16"
        >
            <img src="/assets/images/auth/coming-soon-object1.png" alt="image" class="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
            <img src="/assets/images/auth/coming-soon-object2.png" alt="image" class="absolute left-24 top-0 h-40 md:left-[30%]" />
            <img src="/assets/images/auth/coming-soon-object3.png" alt="image" class="absolute right-0 top-0 h-[300px]" />
            <img src="/assets/images/auth/polygon-object.svg" alt="image" class="absolute bottom-0 end-[28%]" />
            <div
                class="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]"
            >
                <div class="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[500px] py-20">
                    <div class="absolute top-6 end-6">
                        <div class="dropdown">
                            <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'" offsetDistance="8">
                                <button
                                    type="button"
                                    class="flex items-center gap-2.5 rounded-lg border border-white-dark/30 bg-white px-2 py-1.5 text-white-dark hover:border-primary hover:text-primary dark:bg-black"
                                >
                                    <div>
                                        <img :src="currentFlag" alt="image" class="h-5 w-5 rounded-full object-cover" />
                                    </div>
                                    <div class="text-base font-bold uppercase">{{ store.locale }}</div>
                                    <span class="shrink-0">
                                        <icon-caret-down />
                                    </span>
                                </button>
                                <template #content="{ close }">
                                    <ul class="!px-2 text-dark dark:text-white-dark grid grid-cols-2 gap-2 font-semibold dark:text-white-light/90 w-[280px]">
                                        <template v-for="item in store.languageList" :key="item.code">
                                            <li>
                                                <button
                                                    type="button"
                                                    class="w-full hover:text-primary"
                                                    :class="{ 'bg-primary/10 text-primary': locale === item.code }"
                                                    @click="changeLanguage(item), close()"
                                                >
                                                    <img
                                                        class="w-5 h-5 object-cover rounded-full"
                                                        :src="`/assets/images/flags/${item.code.toUpperCase()}.svg`"
                                                        alt=""
                                                    />
                                                    <span class="ltr:ml-3 rtl:mr-3" v-if="item.name == 'Arabic'">{{ t('header.arabic') }}</span>
                                                    <span class="ltr:ml-3 rtl:mr-3" v-if="item.name == 'English'">{{ t('header.english') }}</span>
                                                </button>
                                            </li>
                                        </template>
                                    </ul>
                                </template>
                            </Popper>
                        </div>
                    </div>
                    <div class="mx-auto w-full max-w-[440px]">
                        <div class="mb-10">
                            <h1 class="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">{{ t('signin.name') }}</h1>
                            <p class="text-base font-bold leading-normal text-white-dark">{{ t('signin.title') }}</p>
                        </div>
                        <div class="space-y-5 dark:text-white">
                            <!--  -------------------------------  Email input field  --------------------------------------  -->
                            <div :class="isSubmmit ? { 'has-error': email.error } : ''">
                                <label for="email">{{ t('signin.email') }}</label>
                                <div class="relative text-white-dark">
                                    <input id="email" type="text" :placeholder="t('signin.enter-email')" 
                                    class="form-input ps-10 placeholder:text-white-dark" 
                                    @keyup="isSubmmit = false,email.error = false" v-model="userEmail" />
                                    <span class="absolute start-4 top-1/2 -translate-y-1/2">
                                        <icon-user :fill="true" />
                                    </span>
                                </div>
                                <template v-if="isSubmmit && email.error == true">
                                <p class="text-danger mt-1">{{email.message}}</p>
                                </template>
                            </div>
                            <!--  -------------------------------  Email input field  --------------------------------------  -->
                             <div :class="isSubmmit ? { 'has-error': pass.error } : ''">
                                <label for="Password">{{ t('signin.password') }}</label>
                                <div class="relative text-white-dark">
                                    <input id="Password" type="text" :placeholder="t('signin.enter-pass')" 
                                    class="form-input ps-10 placeholder:text-white-dark" 
                                    @keyup="isSubmmit = false,pass.error = false" v-model="password" />
                                    <span class="absolute start-4 top-1/2 -translate-y-1/2">
                                        <icon-lock-dots :fill="true" />
                                    </span>
                                </div>
                                <template v-if="isSubmmit && pass.error == true">
                                <p class="text-danger mt-1">{{pass.message}}</p>
                                </template>
                            </div>
                            <!--  -------------------------------------------------------------------------------------------  -->
                            <!-- <div>
                                <label class="flex cursor-pointer items-center">
                                    <input type="checkbox" class="form-checkbox bg-white dark:bg-black" />
                                    <span class="text-white-dark">{{ t('signin.remember-me') }}</span>
                                </label>
                            </div> -->
                            <button @click="submit" :disabled="loading"
                            class="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                <span v-if="!loading">{{ t('signin.name') }}</span>
                                <span v-else>
                                    <IconRefresh class="animate-[spin_1s_linear_infinite] w-5 h-5" />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import { defineComponent } from 'vue';
    import { storeToRefs } from 'pinia'
    import { useI18n } from 'vue-i18n';
    import appSetting from '@/app-setting';
    import { useAppStore } from '@/stores/index';
    import { useRouter } from 'vue-router';
    import { useMeta } from '@/composables/use-meta';
    import { validationStore } from '@/components/validation'
    import { useConnectionStore } from '../../stores/module/DataModule'
    import { notificationStore } from '@/components/notifications'
    // Icons
    import IconRefresh from '@/components/icon/icon-refresh.vue';
    import IconCaretDown from '@/components/icon/icon-caret-down.vue';
    import IconUser from '@/components/icon/icon-user.vue';
    import IconLockDots from '@/components/icon/icon-lock-dots.vue';

    export default defineComponent({
        components: {
            // Datatable & Modals
            IconCaretDown,
            IconUser,
            IconLockDots,
            IconRefresh
        },
        setup(){
            useMeta({ title: 'Login' });
        },
        computed:{
            currentFlag(){
                return `/assets/images/flags/${this.locale.toUpperCase()}.svg`;
           },
        },
        data(){
            const DataStore = useConnectionStore()
            const notification = notificationStore()
            const { authStatue, loading } = storeToRefs(DataStore)
            const validationForm = validationStore()
            const { isSubmmit, email, pass } = storeToRefs(validationForm)
            const router = useRouter();
            const store = useAppStore();
            const { t, locale } = useI18n()
            return {
                loading,
                t, locale,
                authStatue,
                DataStore,
                router,
                store,
                userEmail: '',
                password: '',
                /// Validation
                validationForm,
                isSubmmit,
                email,
                pass,
            }
        },
        async mounted() {
           this.validationForm.clear()
        },
        methods: {
            changeLanguage(item: any){
                this.locale = item.code;
                appSetting.toggleLanguage(item);
            },
            submit(){
                let log = { email: this.userEmail, password: this.password  }
                var isValid = this.validationForm.checkAuthInfo(log)
                if(isValid == 0){
                    this.DataStore.login(log).then(() => {
                        if (this.authStatue == true) {
                            this.router.push({ name: 'home' })
                        }
                    })
                }
            }
        }
    })
</script>
