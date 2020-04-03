import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import Reviewitem from '../Reviewitem/Reviewitem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderdPlaced, setOrderPlaced] = useState(false);
    const auth = useAuth();

    const handlePlaceOrder = () => {
        setCart([]);
        setOrderPlaced(true);
        processOrder();

    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKyes = Object.keys(savedCart);

        const cartProducts = productKyes.map(key => {
            const product = fakeData.find(pd => pd.key === key)
            product.quantity = savedCart[key];
            return product;

        });
        setCart(cartProducts);

    }, []);
    let thankyou;
    if (orderdPlaced) {
        thankyou = <img src={happyImage} alt="" />
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(pd => <Reviewitem
                        key={pd.key}
                        removeProduct={removeProduct}
                        product={pd}></Reviewitem>)
                }
                { thankyou }
                {
                    !cart.length && <h1>you cart is empty. <br/> <a href="/shop">Keep Shopping</a></h1>
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="shipment">
                        {
                            auth.user ?
                                <button className="main-button">Proceed Chakeout</button>
                                :
                                <button className="main-button">Login to Proceed</button>

                        }
                    </Link>
                </Cart>

            </div>
        </div>
    );
};

export default Review;