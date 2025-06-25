import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const { id } = router.query;
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (router.isReady && id) {
      setShowModal(true);
    }
  }, [router.isReady, id]);

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
          <h2 className="text-xl font-bold mb-4">Paument</h2>
          <button
            className="absolute top-2 right-2 text-gray-500"
            onClick={()=>{setShowModal(false)}}
          >
            ✕
          </button>
        </div>
      </div>
      )}

      <h1>Payment Success Page</h1>
      <p>Your payment was successful. Reference: {id}</p>
    </>
  );
}
