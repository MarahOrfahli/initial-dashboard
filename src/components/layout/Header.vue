<template>
    <header class="z-40" :class="{ dark: store.semidark && store.menu === 'horizontal' }">
        <div class="shadow-sm">
            <div class="relative bg-white flex w-full items-center px-5 py-2.5 dark:bg-[#0e1726]">
                <div class="horizontal-logo flex lg:hidden justify-between items-center ltr:mr-2 rtl:ml-2">
                    <router-link to="/" class="main-logo flex items-center shrink-0">
                        <img class="w-8 ltr:-ml-1 rtl:-mr-1 inline" src="/assets/images/logo.svg" alt="" />
                        <span
                            class="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle hidden md:inline dark:text-white-light transition-all duration-300"
                            >{{ project_name }}</span>
                    </router-link>

                    <a
                        href="javascript:;"
                        class="collapse-icon flex-none dark:text-[#d0d2d6] hover:text-primary dark:hover:text-primary flex lg:hidden ltr:ml-2 rtl:mr-2 p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
                        @click="store.toggleSidebar()"
                    >
                        <icon-menu class="w-5 h-5" />
                    </a>
                </div>
                <div class="ltr:mr-2 rtl:ml-2 hidden sm:block">
                    <ul class="flex items-center space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
                        <li>
                            <router-link
                                to="/apps/calendar"
                                class="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                            >
                                <icon-calendar />
                            </router-link>
                        </li>
                        <!-- <li>
                            <router-link
                                to="/apps/todolist"
                                class="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                            >
                                <icon-edit />
                            </router-link>
                        </li> -->
                       
                    </ul>
                </div>
                <div
                    class="sm:flex-1 ltr:sm:ml-0 ltr:ml-auto sm:rtl:mr-0 rtl:mr-auto flex items-center space-x-1.5 lg:space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]"
                >
                    <div class="sm:ltr:mr-auto sm:rtl:ml-auto" style="width: 100%;">
                        <form
                            class="sm:relative absolute inset-x-0 sm:top-0 top-1/2 sm:translate-y-0 -translate-y-1/2 sm:mx-0 mx-4 z-10 sm:block hidden"
                            :class="{ '!block': search }"
                            @submit.prevent="search = false"
                        >
                            <div class="relative">
                                <input
                                    type="text"
                                    class="form-input ltr:pl-9 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                                    :placeholder="$t('page-control.search-placeholder')"
                                />
                                <button type="button" class="absolute w-9 h-9 inset-0 ltr:right-auto rtl:left-auto appearance-none peer-focus:text-primary">
                                    <icon-search class="mx-auto" />
                                </button>
                                <button
                                    type="button"
                                    class="hover:opacity-80 sm:hidden block absolute top-1/2 -translate-y-1/2 ltr:right-2 rtl:left-2"
                                    @click="search = false"
                                >
                                    <icon-x-circle />
                                </button>
                            </div>
                        </form>

                        <button
                            type="button"
                            class="search_btn sm:hidden p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
                            @click="search = !search"
                        >
                            <icon-search class="w-4.5 h-4.5 mx-auto dark:text-[#d0d2d6]" />
                        </button>
                    </div>
                    <div>
                        <a
                            href="javascript:;"
                            v-show="store.theme === 'dark'"
                            class="flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                            @click="store.toggleTheme('light')"
                        >
                            <icon-sun />
                        </a>
                        <a
                            href="javascript:;"
                            v-show="store.theme === 'light'  || store.theme === 'system'"
                            class="flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                            @click="store.toggleTheme('dark')"
                        >
                            <icon-moon />
                        </a>
                        <!-- <a
                            href="javascript:;"
                            v-show="store.theme === 'system'"
                            class="flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                            @click="store.toggleTheme('light')"
                        >
                            <icon-laptop />
                        </a> -->
                    </div>

                    <div class="dropdown shrink-0">
                        <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-end' : 'bottom-start'" offsetDistance="8">
                            <button
                                type="button"
                                class="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                            >
                                <img :src="currentFlag" alt="flag" class="w-5 h-5 object-cover rounded-full" />
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
                                                <span class="ltr:ml-3 rtl:mr-3" v-if="item.name == 'Arabic'">{{ $t('header.arabic') }}</span>
                                                <span class="ltr:ml-3 rtl:mr-3" v-if="item.name == 'English'">{{ $t('header.english') }}</span>
                                            </button>
                                        </li>
                                    </template>
                                </ul>
                            </template>
                        </Popper>
                    </div>

                    <!-- <div class="dropdown shrink-0">
                        <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'" offsetDistance="8">
                            <button
                                type="button"
                                class="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                            >
                                <icon-mail-dot />
                            </button>
                            <template #content="{ close }">
                                <ul class="top-11 !py-0 text-dark dark:text-white-dark w-[300px] sm:w-[375px] text-xs">
                                    <li class="mb-5">
                                        <div class="overflow-hidden relative rounded-t-md !p-5 text-white">
                                            <div
                                                class="absolute h-full w-full bg-[url('/assets/images/menu-heade.jpg')] bg-no-repeat bg-center bg-cover inset-0"
                                            ></div>
                                            <h4 class="font-semibold relative z-10 text-lg">Messages</h4>
                                        </div>
                                    </li>
                                    <template v-for="msg in messages" :key="msg.id">
                                        <li>
                                            <div class="flex items-center py-3 px-5">
                                                <div v-html="msg.image"></div>
                                                <span class="px-3 dark:text-gray-500">
                                                    <div class="font-semibold text-sm dark:text-white-light/90" v-text="msg.title"></div>
                                                    <div v-text="msg.message"></div>
                                                </span>
                                                <span
                                                    class="font-semibold bg-white-dark/20 rounded text-dark/60 px-1 ltr:ml-auto rtl:mr-auto whitespace-pre dark:text-white-dark ltr:mr-2 rtl:ml-2"
                                                    v-text="msg.time"
                                                ></span>
                                                <button type="button" class="text-neutral-300 hover:text-danger" @click="removeMessage(msg.id)">
                                                    <icon-x-circle />
                                                </button>
                                            </div>
                                        </li>
                                    </template>
                                    <template v-if="messages.length">
                                        <li class="border-t border-white-light text-center dark:border-white/10 mt-5">
                                            <div
                                                class="flex items-center py-4 px-5 text-primary font-semibold group dark:text-gray-400 justify-center cursor-pointer"
                                                @click="close()"
                                            >
                                                <span class="group-hover:underline ltr:mr-1 rtl:ml-1">VIEW ALL ACTIVITIES</span>

                                                <icon-arrow-left class="group-hover:translate-x-1 transition duration-300 ltr:ml-1 rtl:mr-1" />
                                            </div>
                                        </li>
                                    </template>
                                    <template v-if="!messages.length">
                                        <li class="mb-5">
                                            <div class="!grid place-content-center hover:!bg-transparent text-lg min-h-[200px]">
                                                <div class="mx-auto ring-4 ring-primary/30 rounded-full mb-4 text-primary">
                                                    <icon-info-circle :fill="true" class="w-10 h-10" />
                                                </div>
                                                No data available.
                                            </div>
                                        </li>
                                    </template>
                                </ul>
                            </template>
                        </Popper>
                    </div> -->

                    <!-- <div class="dropdown shrink-0">
                        <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-end' : 'bottom-start'" offsetDistance="8">
                            <button
                                type="button"
                                class="relative block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                            >
                                <icon-bell-bing />

                                <span class="flex absolute w-3 h-3 ltr:right-0 rtl:left-0 top-0">
                                    <span
                                        class="animate-ping absolute ltr:-left-[3px] rtl:-right-[3px] -top-[3px] inline-flex h-full w-full rounded-full bg-success/50 opacity-75"
                                    ></span>
                                    <span class="relative inline-flex rounded-full w-[6px] h-[6px] bg-success"></span>
                                </span>
                            </button>
                            <template #content="{ close }">
                                <ul class="!py-0 text-dark dark:text-white-dark w-[300px] sm:w-[350px] divide-y dark:divide-white/10">
                                    <li>
                                        <div class="flex items-center px-4 py-2 justify-between font-semibold">
                                            <h4 class="text-lg">Notification</h4>
                                            <template v-if="notifications.length">
                                                <span class="badge bg-primary/80" v-text="notifications.length + 'New'"></span>
                                            </template>
                                        </div>
                                    </li>
                                    <template v-for="notification in notifications" :key="notification.id">
                                        <li class="dark:text-white-light/90">
                                            <div class="group flex items-center px-4 py-2">
                                                <div class="grid place-content-center rounded">
                                                    <div class="w-12 h-12 relative">
                                                        <img
                                                            class="w-12 h-12 rounded-full object-cover"
                                                            :src="`/assets/images/${notification.profile}`"
                                                            alt=""
                                                        />
                                                        <span class="bg-success w-2 h-2 rounded-full block absolute right-[6px] bottom-0"></span>
                                                    </div>
                                                </div>
                                                <div class="ltr:pl-3 rtl:pr-3 flex flex-auto">
                                                    <div class="ltr:pr-3 rtl:pl-3">
                                                        <h6 v-html="notification.message"></h6>
                                                        <span class="text-xs block font-normal dark:text-gray-500" v-text="notification.time"></span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        class="ltr:ml-auto rtl:mr-auto text-neutral-300 hover:text-danger opacity-0 group-hover:opacity-100"
                                                        @click="removeNotification(notification.id)"
                                                    >
                                                        <icon-x-circle />
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    </template>
                                    <template v-if="notifications.length">
                                        <li>
                                            <div class="p-4">
                                                <button class="btn btn-primary block w-full btn-small" @click="close()">Read All Notifications</button>
                                            </div>
                                        </li>
                                    </template>
                                    <template v-if="!notifications.length">
                                        <li>
                                            <div class="!grid place-content-center hover:!bg-transparent text-lg min-h-[200px]">
                                                <div class="mx-auto ring-4 ring-primary/30 rounded-full mb-4 text-primary">
                                                    <icon-info-circle :fill="true" class="w-10 h-10" />
                                                </div>
                                                No data available.
                                            </div>
                                        </li>
                                    </template>
                                </ul>
                            </template>
                        </Popper>
                    </div> -->

                    <div class="dropdown shrink-0">
                        <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-end' : 'bottom-start'" offsetDistance="8" class="!block">
                            <button type="button" class="relative group block">
                                <img
                                    class="w-9 h-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                                    src="/assets/images/user-profile.jpeg"
                                    alt=""
                                />
                            </button>
                            <template #content="{ close }">
                                <ul class="text-dark dark:text-white-dark !py-0 w-[250px] font-semibold dark:text-white-light/90">
                                    <li>
                                        <div class="flex items-center px-4 py-4">
                                            <div class="flex-none">
                                                <img class="rounded-md w-10 h-10 object-cover" src="/assets/images/user-profile.jpeg" alt="" />
                                            </div>
                                            <div class="ltr:pl-4 rtl:pr-4 truncate">
                                                <h4 class="text-base">
                                                    John Doe
                                                    <span class="text-xs bg-success-light rounded text-success px-1 ltr:ml-2 rtl:ml-2">{{ $t('header.admin') }}</span>
                                                </h4>
                                                <a class="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white" href="javascript:;"
                                                    >johndoe@gmail.com</a
                                                >
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <router-link to="/users/profile" class="dark:hover:text-white" @click="close()">
                                            <icon-user class="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                                            {{ $t('header.profile') }}
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link to="/auth/boxed-lockscreen" class="dark:hover:text-white" @click="close()">
                                            <icon-lock-dots class="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                                            {{ $t('header.lock-screen') }}
                                        </router-link>
                                    </li>
                                    <li class="border-t border-white-light dark:border-white-light/10">
                                        <div class="text-danger !py-3 cursor-pointer flex pr-4" @click="close(),logout()">
                                            <icon-logout class="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 rotate-90 shrink-0" />
                                            {{ $t('header.sign-out') }}
                                        </div>
                                    </li>
                                </ul>
                            </template>
                        </Popper>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script lang="ts">
    // Import Vue & useI18n
    import { defineComponent } from 'vue';
    import { storeToRefs } from 'pinia'
    import { useI18n } from 'vue-i18n'
    // Import appSetting & useAppStore
    import appSetting from '@/app-setting';
    import { useAppStore } from '@/stores/index';
    // Data Connection
    import { useConnectionStore } from '../../stores/module/DataModule'
    import { useRouter } from 'vue-router';
    // Import Icons
    import IconMenu from '@/components/icon/icon-menu.vue';
    import IconCalendar from '@/components/icon/icon-calendar.vue';
    import IconEdit from '@/components/icon/icon-edit.vue';
    import IconChatNotification from '@/components/icon/icon-chat-notification.vue';
    import IconSearch from '@/components/icon/icon-search.vue';
    import IconXCircle from '@/components/icon/icon-x-circle.vue';
    import IconSun from '@/components/icon/icon-sun.vue';
    import IconMoon from '@/components/icon/icon-moon.vue';
    import IconLaptop from '@/components/icon/icon-laptop.vue';
    import IconMailDot from '@/components/icon/icon-mail-dot.vue';
    import IconArrowLeft from '@/components/icon/icon-arrow-left.vue';
    import IconInfoCircle from '@/components/icon/icon-info-circle.vue';
    import IconBellBing from '@/components/icon/icon-bell-bing.vue';
    import IconUser from '@/components/icon/icon-user.vue';
    import IconMail from '@/components/icon/icon-mail.vue';
    import IconLockDots from '@/components/icon/icon-lock-dots.vue';
    import IconLogout from '@/components/icon/icon-logout.vue';
    import IconMenuDashboard from '@/components/icon/menu/icon-menu-dashboard.vue';
    import IconCaretDown from '@/components/icon/icon-caret-down.vue';
    import IconMenuApps from '@/components/icon/menu/icon-menu-apps.vue';
    import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
    import IconMenuElements from '@/components/icon/menu/icon-menu-elements.vue';
    import IconMenuDatatables from '@/components/icon/menu/icon-menu-datatables.vue';
    import IconMenuForms from '@/components/icon/menu/icon-menu-forms.vue';
    import IconMenuPages from '@/components/icon/menu/icon-menu-pages.vue';
    import IconMenuMore from '@/components/icon/menu/icon-menu-more.vue';

    export default defineComponent({
        components:{
            IconMenu,
            IconCalendar,
            IconEdit,
            IconChatNotification,
            IconSearch,
            IconXCircle,
            IconSun,
            IconMoon,
            IconLaptop,
            IconMailDot,
            IconArrowLeft,
            IconInfoCircle,
            IconBellBing,
            IconMail,
            IconUser,
            IconLockDots,
            IconLogout,
            IconMenuDashboard,
            IconCaretDown,
            IconMenuApps,
            IconMenuComponents,
            IconMenuElements,
            IconMenuDatatables,
            IconMenuForms,
            IconMenuPages,
            IconMenuMore
        },
        computed: {
            currentFlag(){
                return `/assets/images/flags/${this.locale.toUpperCase()}.svg`;
            }
        },
        data(){
            const store = useAppStore()
            const router = useRouter()
            const { locale } = useI18n()
            const DataStore = useConnectionStore()
            const { project_name } = storeToRefs(DataStore)
            const notifications = [
                {
                    id: 1,
                    profile: 'user-profile.jpeg',
                    message: '<strong class="text-sm mr-1">John Doe</strong>invite you to <strong>Prototyping</strong>',
                    time: '45 min ago',
                },
                {
                    id: 2,
                    profile: 'profile-34.jpeg',
                    message: '<strong class="text-sm mr-1">Adam Nolan</strong>mentioned you to <strong>UX Basics</strong>',
                    time: '9h Ago',
                },
                {
                    id: 3,
                    profile: 'profile-16.jpeg',
                    message: '<strong class="text-sm mr-1">Anna Morgan</strong>Upload a file',
                    time: '9h Ago',
                },
            ]
            const messages = [
                {
                    id: 1,
                    image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-success-light dark:bg-success text-success dark:text-success-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></span>',
                    title: 'Congratulations!',
                    message: 'Your OS has been updated.',
                    time: '1hr',
                },
                {
                    id: 2,
                    image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-info-light dark:bg-info text-info dark:text-info-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></span>',
                    title: 'Did you know?',
                    message: 'You can switch between artboards.',
                    time: '2hr',
                },
                {
                    id: 3,
                    image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-danger-light dark:bg-danger text-danger dark:text-danger-light"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span>',
                    title: 'Something went wrong!',
                    message: 'Send Reposrt',
                    time: '2days',
                },
                {
                    id: 4,
                    image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-warning-light dark:bg-warning text-warning dark:text-warning-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">    <circle cx="12" cy="12" r="10"></circle>    <line x1="12" y1="8" x2="12" y2="12"></line>    <line x1="12" y1="16" x2="12.01" y2="16"></line></svg></span>',
                    title: 'Warning',
                    message: 'Your password strength is low.',
                    time: '5days',
                },
            ]
            return{
                router,
                DataStore,
                store,
                locale,
                messages,
                project_name,
                notifications,
                // values
                search: false,
            }
        },
        async mounted() { },
        methods: {
            changeLanguage(item: any){
                this.locale = item.code;
                appSetting.toggleLanguage(item);
            },
            removeNotification(value: number){
                this.notifications = this.notifications.filter((d) => d.id !== value);
            },
            removeMessage(value: number){
                this.messages = this.messages.filter((d) => d.id !== value);
            },
            logout(){
                this.DataStore.logout().then(()=>{
                    this.router.push({ name: 'login' })
                })
            }
        }
    })
</script>
