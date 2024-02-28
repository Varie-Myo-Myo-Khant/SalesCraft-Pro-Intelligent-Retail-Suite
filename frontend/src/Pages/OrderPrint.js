import { useReactToPrint } from "react-to-print";
import "../Styles/invoice.css"
import { useSelector, useDispatch } from 'react-redux';
import { getProfile} from '../Slice/profileSlice'
import React, { useEffect, useRef } from 'react';
import { toast } from "react-toastify";

export const OrderPrint = ({ order }) => {
  const componentRef = useRef();

  //to get shop details
  const { user } = useSelector((store) => store.auth);
  const { profile } = useSelector((store) => store.profile);
   const dispatch = useDispatch();
     useEffect(() => {
    dispatch(getProfile(user.id));
  }, [dispatch, user.id]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => toast.success('Successfully Printed the Invocie!')
  });

  function formatDateTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);
  const formattedDate = dateTime.toLocaleDateString([], {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  const formattedTime = dateTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
  return `${formattedDate} ${formattedTime}`;
}


  return (
    <>
      <div style={{ display: "none" }}>
        <div ref={componentRef} style={{ width: "100%", height: "100vh" }}>
          <div className="invoice">
            <div className="invoice_left">
              <div className="i_logo">
                <img src={profile.shopLogo} className="shopLogo"/>
                <p>{profile.shopName}</p>
              </div>
              <div className="i_to">
                <div className="main_title">
                  <p>Customer Detail</p>
                  <div className="divline"></div>
                </div>

                <div className="p_title">
                  <div>
                    <span className="c_detail">Customer: </span>
                    <span className="c_title">{order.customer}</span>
                  </div>
                </div>
               
              </div>


                <div className="i_payment">
                <div className="main_title">
                  <p>Payment Method</p>
                  <div className="divline"></div>
                </div>
                <div className="p_title">
                  <p className="c_detail">Payment Type:</p>
                  <span className="o_detail">{order.paymentType}</span>
                </div>
              </div>

              <div className="i_details">
                <div className="main_title">
                  <p>Shop details</p>
                  <div className="divline"></div>
                </div>
                <div className="p_title">
                  <p className="o_name">Shop Address:</p>
                  <span className="o_detail">{profile.shopAddress}</span>
                </div>
                <div className="p_title">
                  <p className="o_name">Phone Number:</p>
                  <span className="o_detail">+{profile.shopPhoneNumber}</span>
                </div>
              </div>
            
            </div>
            <div className="invoice_right">
              <div className="rightTopInvoice">
              <div className="title">
                <p>ORDER DETAILS</p>
                <div className="divline"></div>
              </div>

              <div className="title">
                <p>Order No : {order.orderNumber} </p>
                <div className="divline"></div>
              </div>

              </div>
              <div className="title">
                <p> {formatDateTime(order.createdTime)} </p>
              </div>

              <div className="i_table">
                <div className="i_table_head">
                  <div className="i_row">
                    <div className="i_col w_55">
                      <p className="p_title">Product Name</p>
                    </div>
                    <div className="i_col w_15 text_center">
                      <p className="p_title">Price</p>
                    </div>
                    <div className="i_col w_15 text_center">
                      <p className="p_title">Quantity</p>
                    </div>
                    
                    <div className="i_col w_15 text_right">
                      <p className="p_title">Total</p>
                    </div>
                  </div>
                </div>
                <div className="i_table_body">
                  {order.cartItems.map((item) => (
                    <div key={item.id} className="i_row">
                      <div className="i_col w_55">
                        <p>{item.productName}</p>
                      </div>
                      
                      <div className="i_col w_15 text_center">
                        <p> {item.productPrice} MMK</p>
                      </div>
                      <div className="i_col w_15 text_center">
                        <p>{item.quantity}</p>
                      </div>

                      <div className="i_col w_15 text_right">
                        <p> {item.productPrice * item.quantity} MMK</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="i_table_foot">
                  <div className="i_row">
                    <div className="i_col w_50">
                      <p>Sub Total:</p>
                      <p>Tax {profile.shopTax}%:</p>
                      <p>TOTAL:</p>
                    </div>
                    <div className="i_col w_50 text_right">
                      <p> {order.subTotal.toFixed(2)} MMK</p>
                      <p>{order.tax.toFixed(2)}MMK</p>
                      <p>{order.totalAmount.toFixed(2)} MMK</p>
                    </div>
                  </div>
                  <div className="i_row grand_total_wrap">
                    <div className="i_col w_50">
                      <p>GRAND TOTAL:</p>
                    </div>
                    <div className="i_col w_50 text_right">
                      <p>{order.totalAmount.toFixed(2)} MMK</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="terms">
                <div className="main_title">
                  <p>Thank You</p>
                  <div className="divline"></div>
                </div>
                <p>{profile.shopReceiptMessage}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="order-status" onClick={handlePrint}>
        {" "}
        Print Invoice{" "}
      </p>
    </>
  );
};


