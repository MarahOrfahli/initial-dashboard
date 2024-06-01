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
        onDeleteCallback(id:number , dataname: string, SecID = 0, type = 'Delete'){
            this.DataStore.deleteData(dataname, id, type).then(() => {
                Swal.fire({ 
                    title: this.t('page-control.delete.done'),
                    text:  this.t('page-control.delete.text-success'),
                    confirmButtonText: this.t('page-control.done'),
                    icon: 'success',
                    customClass: 'sweet-alerts' 
                }).then((result) => {
                    if (result.value) {
                        if(dataname == 'ProductImages') this.DataStore.getData(dataname,SecID, 'GET-byProduct')
                        else if(dataname == 'Orders' && type == 'DeleteItem') this.DataStore.getData('Orders',SecID, 'GETByID')
                        else this.DataStore.getData(dataname) 
                    }
                });
            })
        },
        async deleteNotification(id:number , dataname: string, SecID = 0, type = 'Delete'){
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
                    this.onDeleteCallback(id, dataname,SecID, type)
                }
            });
        }
    }
})