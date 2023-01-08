import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';

export default function NotFound() {

  const navigate = useNavigate();

  async function alertError() {
    await (Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'This page was not found!',
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: 'Back to main page',
    })).then(result => {
      if (!result.isConfirmed) {
        navigate('/');
      }
    });
  }

  alertError();

  return (
    <>
      <Navbar />
    </>
  );
}