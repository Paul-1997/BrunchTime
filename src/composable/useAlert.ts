import Swal from 'sweetalert2';

export default async function useAlert(options: object) {
  const result = await Swal.fire({ ...options });
  return result;
}
