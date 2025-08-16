import axios from "axios";
import { useState } from "react";
import API_URL from "../config";

const OrderProducer: React.FC = () => {
    const [message, setMessage] = useState("");

    const onButtonClick = () => {
     
        axios.get(`${API_URL}api/orders`, {
            params: { message: message }
        })
            .then(res => console.log("Order added"))
            .catch(err => console.error(err));
    }

    return (<div>
        <h2>Place Order</h2>
        <hr />       
        <input onChange={(e)=> setMessage(e.target.value)} type="text" value={message} />
        <button className="mx-2 btn btn-success" onClick={onButtonClick} >Submit</button>
    </div>)
}

export default OrderProducer;