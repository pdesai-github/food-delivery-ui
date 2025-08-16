import { useEffect, useState } from "react"
import { SqsQueueAttributes } from "../models/queue-attr"
import axios from "axios";
import OrderDLQProcessor from "./OrderDLQProcessor";
import API_URL from "../config";

const OrderDashboard: React.FC = () => {
    const [attributes, setAttributes] = useState<SqsQueueAttributes>();

    useEffect(() => {
        axios.get<SqsQueueAttributes>(`${API_URL}api/orders/attributes`).then(res => {
            setAttributes(res.data)
        })
    }, []);
    const onRefreshClick = () => {
        axios.get<SqsQueueAttributes>(`${API_URL}api/orders/attributes`).then(res => {
            setAttributes(res.data)
        })
    }

    return (<div>
        <h2>Dashboard</h2>
        <hr />
        <div>
            <h6>ApproximateNumberOfMessages : {attributes?.ApproximateNumberOfMessages}</h6>
            <h6>ApproximateNumberOfMessagesDelayed : {attributes?.ApproximateNumberOfMessagesDelayed}</h6>
            <h6>ApproximateNumberOfMessagesNotVisible : {attributes?.ApproximateNumberOfMessagesNotVisible}</h6>
        </div>
        <hr />
        <div>
            <button className="btn btn-success" onClick={onRefreshClick}>Refresh</button>
        </div>
        <hr />
        <div>
            <OrderDLQProcessor></OrderDLQProcessor>
        </div>

    </div>)
}

export default OrderDashboard