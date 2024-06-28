import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Payment() {
    const data = JSON.parse(localStorage.getItem('data'));
    const url = data.checkoutUrl;
    const navigate = useNavigate();
    const iframeRef = useRef(null);

    useEffect(() => {
        const checkIframeUrl = () => {
            try {
                const iframeUrl = new URL(iframeRef.current.contentWindow.location.href);
                if (iframeUrl.searchParams.get('status') === 'PAID') {
                    navigate('/thank-you');
                } else {
                    navigate('/cart');
                }
            } catch (error) {
                console.error('Cannot access iframe URL:', error);
            }
        };

        const interval = setInterval(checkIframeUrl, 2000);

        return () => clearInterval(interval);
    }, [navigate]);

    return (
        <iframe ref={iframeRef} src={url} height={800} title="PayOS"></iframe>
    );
}

export default Payment;
