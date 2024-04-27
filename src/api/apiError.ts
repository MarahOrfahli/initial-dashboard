import Swal from 'sweetalert2';
// Notification Form
const toast = Swal.mixin({
    toast: true,
    showConfirmButton: false,
    timer: 3000,
    showCloseButton: true,
    customClass: {
        popup: `color-danger`,
    },
    target: document.getElementById('danger-toast') || 'body',
});

export function handleApiError(error: any,rtlClass = 'rtl', title = 'Error') {
    if (error.response) {
      console.log('Server Error:', error?.response?.data)
      toast.fire({
        title: `<h1>${ title }</h1><p>${ error.message }</p>`,
        position: rtlClass === 'rtl' ? 'top-start' : 'top-end',
    });
    } else if (error.request) {
        let message = 'Request error occurred. Please try again.'
      console.log('Request Error:', error.request)
      toast.fire({
        title: `<h1>${ title }</h1><p>${ message }</p>`,
        position: rtlClass === 'rtl' ? 'top-start' : 'top-end',
    });
    } else {
      console.log('Error:', error.message)
      toast.fire({
        title: `<h1>${ title }</h1><p>${ error.message }</p>`,
        position: rtlClass === 'rtl' ? 'top-start' : 'top-end',
    });
    }
  }

/*

        
*/





