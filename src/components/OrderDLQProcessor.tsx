import { useEffect, useState } from "react";
import { SqsMessage } from "../models/message";
import axios from "axios";
import API_URL from "../config";

const OrderDLQProcessor: React.FC = () => {

    const [dlqMessages, setDlqMessages] = useState<SqsMessage[]>([]);

    useEffect(() => {
        axios.get(`${API_URL}api/ordersdlq`).then((res) => {
            setDlqMessages(res.data)
        })
    }, []);

    const onRefreshFailedOrders = () => {
        axios.get(`${API_URL}api/ordersdlq`).then((res) => {
            setDlqMessages(res.data)
        })
    }

    const onRedrive = (message: String) => {
        axios.post(`${API_URL}api/ordersdlq`, {
            message: message
        })
    }
    return (<>
        <h1>DLQ</h1>
        {
            dlqMessages.length === 0 ? (<b>No failed orders found.</b>) : (
                <div>
                    {
                        dlqMessages.map(m => (
                            <div className="d-flex flex-row">
                                <div>{m.body}</div>
                                <div><button className="btn btn-success" onClick={() => onRedrive(m.body)}>Re-Drive</button></div>
                            </div>
                        ))
                    }
                </div>
            )
        }
        <hr />
        <button onClick={onRefreshFailedOrders}>Refresh Failed Orders</button>
    </>)
}

export default OrderDLQProcessor;