import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Payment() {
    const navigate = useNavigate();
    const iframeRef = useRef(null);
    
    let data = null;
    try {
        data = JSON.parse(localStorage.getItem('data'));
    } catch (e) {
        data = null;
    }
    
    const url = data && data.checkoutUrl ? data.checkoutUrl : null;

    useEffect(() => {
        if (!url) {
            navigate('/checkout');
            return;
        }
        
        const checkIframeUrl = () => {
            try {
                const iframeUrl = new URL(iframeRef.current.contentWindow.location.href);
                if (iframeUrl.searchParams.get('status') === 'PAID') {
                    navigate('/thank-you');
                } else if (iframeUrl.searchParams.get('cancel') === 'true' || iframeUrl.searchParams.get('status') === 'CANCELLED') {
                    navigate('/cart');
                }
            } catch (error) {
                // Cross-origin restriction - expected when iframe shows payment page
            }
        };

        const interval = setInterval(checkIframeUrl, 2000);
        return () => clearInterval(interval);
    }, [navigate, url]);

    if (!url) {
        return (
            <div className="container-fluid py-5 text-center">
                <h3>Redirecting...</h3>
                <p>No payment data found. Redirecting to checkout.</p>
            </div>
        );
    }

    return (
        <iframe ref={iframeRef} src={url} width="100%" height={800} title="PayOS" style={{border: 'none'}}></iframe>
    );
}

export default Payment;
