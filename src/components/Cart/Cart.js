import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    
    //const total = cart.reduce((total,prd) => total + prd.price, 0);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;

    }
    let shipping = 0;
    if (total > 35) {
        shipping = 0;
    }
    else if (total > 15) {
        shipping = 4.99;
    }
    else if (total > 0) {
        shipping = 12.99;
    }
    // const tax = Math.round(total / 10);

    const tax = (total / 10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);
    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    return (
        <div>
            <h3>Order Summery</h3>
            <h5>Items Ordered : ${cart.length}</h5>
            <h4>Product Price: ${formatNumber(total)}</h4>
            <p>Shipping Cost : ${shipping}</p>
            <p>Tax + VAT : ${tax}</p>
            <p>Total Price : ${grandTotal}</p>
            <br />
            {props.children}
       
        </div>
    );
};

export default Cart;