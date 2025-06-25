'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PaymentSuccessPage() {
  const { id, Transactionid } = useParams();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (id) {
      setShowModal(true);
    }
  }, [id]);

  if (!showModal) return null;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f4fdf7',
      padding: '20px',
      textAlign: 'center',
    }}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
        alt="Success"
        style={{ width: '120px', height: '120px', marginBottom: '20px' }}
      />
      <h1 style={{
        fontSize: '2rem',
        color: '#155724',
        marginBottom: '10px'
      }}>
        Payment Successful!
      </h1>
      <p style={{
        fontSize: '1rem',
        color: '#155724',
        backgroundColor: '#d4edda',
        padding: '10px 20px',
        borderRadius: '6px',
        marginTop:"10px"
      }}>
        Your payment was processed successfully. <br />
        Transaction ID: <strong>{Transactionid}</strong>
      </p>
      <Link href={'/'} className='btn mt-3'>Back to Home</Link>
    </div>
  );
}
