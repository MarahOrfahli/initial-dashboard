import { defineStore } from 'pinia'
import Swal from 'sweetalert2';
import { useI18n } from 'vue-i18n'
import { useConnectionStore } from '../stores/module/DataModule'

export const notificationStore = defineStore('Notification',{
    state: () => {
        const { t } = useI18n()
        const DataStore = useConnectionStore()
        return{
            t, DataStore,
        }
    },
    actions: {
        ////////////////////////////////////
        ///// Delete Methods //////////////
        // Call a notification to confirm delete then delete the item
        onDeleteCallback(id:number , type: string){
            this.DataStore.deleteData(type, id).then(() => {
                Swal.fire({ 
                    title: this.t('page-control.delete.done'),
                    text:  this.t('page-control.delete.text-success'),
                    confirmButtonText: this.t('page-control.done'),
                    icon: 'success',
                    customClass: 'sweet-alerts' 
                }).then((result) => {
                    if (result.value) { this.DataStore.getData(type).then(() => { }) }
                });
            })
        },
        deleteNotification(id:number , type: string){
            Swal.fire({
                icon: 'warning',
                title: this.t('page-control.delete.check'),
                text: this.t('page-control.delete.text') + ' ' + this.t('page-control.delete.title'),
                confirmButtonText: this.t('page-control.delete.name'),
                cancelButtonText: this.t('page-control.cancel'),
                showCancelButton: true,
                showCloseButton: true,
                padding: '2em',
                customClass: 'sweet-alerts',
            }).then((result) => {
                if (result.value) {
                    this.onDeleteCallback(id, type)
                }
            });
        }
    }
})