import React, { useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from '../../../node_modules/react-bootstrap/esm/ToastContainer';
import { resetToast, selectUtility } from '../../redux/utility.slice';
import { useDispatch, useSelector } from 'react-redux';

export default function DashboardToast() {

    const { toast } = useSelector(selectUtility);
    const dispatch = useDispatch();

    useEffect(() => {
        if (toast.show) {
            setTimeout(() => {
                dispatch(resetToast());
            }, toast.timeOut);
        }

    }, [toast.show]);

    return (
        toast.show ?
            <ToastContainer position={'top-end'} className='mt-4 mr-4'>
                <Toast>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">{toast.data.heading}</strong>
                    </Toast.Header>
                    <Toast.Body>{toast.data.content}</Toast.Body>
                </Toast>
            </ToastContainer> : null
    );
}

