import Swal from 'sweetalert2';
import type { SweetAlertOptions } from 'sweetalert2';
// 要高複雜度自定義的
async function useAlert(options: SweetAlertOptions) {
  const result = await Swal.fire({ ...options });
  return result;
}
// 錯誤反饋
async function errorAlert(Title?: string, Text?: string, options?: SweetAlertOptions) {
  let obj: SweetAlertOptions = {
    title: Title || '異常',
    text: Text || '發生錯誤，請重新嘗試',
    icon: 'error',
    showConfirmButton: true,
  };
  if (options) {
    obj = { ...obj, ...options } as SweetAlertOptions;
  }
  const result = await Swal.fire(obj);
  return result;
}
// 操作提醒
async function warningAlert(Title?: string, Text?: string) {
  const result = await Swal.fire({
    title: Title || '異常',
    text: Text || '發生錯誤，請重新嘗試',
    icon: 'error',
    showConfirmButton: true,
  });
  return result;
}
// 狀態toast提示
async function toast(Title: string) {
  const result = await Swal.fire({
    toast: true,
    timer: 1500,
    showConfirmButton: false,
    position: 'top-right',
    showClass: {
      popup: `
        animate__animated
        animate__fadeInDown
        animate__faster
      `,
    },
    hideClass: {
      popup: `
        animate__animated
        animate__fadeOutUp
        animate__fast
      `,
    },
    title: `<p class='fw-bold fs-lg'>${Title}</p>`,
    icon: 'success',
  });
  return result;
}

export { useAlert, errorAlert, warningAlert, toast };
