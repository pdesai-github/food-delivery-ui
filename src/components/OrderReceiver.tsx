import axios from "axios";
import { useState } from "react";
import { SqsMessage } from "../models/message";
import API_URL from "../config";

const OrderReceiver: React.FC = () => {
    const [messages, setMessages] = useState<SqsMessage[]>([]);

    // Fetch messages from Spring Boot API
    const fetchMessages = () => {
        axios.get(`${API_URL}api/orders/receive`)
            .then(res => setMessages(res.data))
            .catch(err => console.error(err));
    };

    // Delete message by receiptHandle
    const deleteMessage = (receiptHandle: any) => {
        axios.delete(`${API_URL}api/orders/messages`, {
            params: { receiptHandle }
        })
            .then(() => {
                // Refresh the list after deletion
                fetchMessages();
            })
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h2>Order Queue</h2>
            <button className="btn btn-success" onClick={fetchMessages}>Refresh</button>

            {messages.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <table border={1} cellPadding="8" style={{ marginTop: "20px", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>

                            <th>Body</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map((msg) => (
                            <tr key={msg.messageId}>

                                <td>{msg.body}</td>

                                <td>
                                    <button onClick={() => deleteMessage(msg.receiptHandle)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default OrderReceiver;