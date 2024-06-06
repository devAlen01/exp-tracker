import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyWallet = () => {
  const { cash, expenses, product } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [addCash, setAddCash] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const addByProduct = () => {
    if (productName && productPrice !== "") {
      let newProd = {
        id: Date.now(),
        productName,
        productPrice,
        buy: false,
      };
      dispatch({ type: "ADD_PRODUCT", payload: newProd });
    } else {
      alertError("Пустое поле");
    }
  };

  const buyProduct = (product) => {
    dispatch({
      type: "BUY_PRODUCT",
      payload: +product,
    });
  };

  const alertError = (text) => {
    toast.error(text, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <div id="wallet">
      <div className="wallet">
        <h2>Expense tracker</h2>
        {/* start money */}
        <div className="money">
          <div className="expenses">
            <h2>Expenses:</h2>
            <h3>$ {expenses}</h3>
            <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
          </div>
          <div className="cash">
            <input
              placeholder="ADD MONEY..."
              value={addCash}
              type="number"
              onChange={(e) => setAddCash(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  dispatch({ type: "ADD_MONEY", payload: +addCash });
                  setAddCash("");
                }
              }}
            />
            <h2
              onClick={() => {
                dispatch({ type: "ADD_MONEY", payload: +addCash });
                setAddCash("");
              }}
            >
              Income:
            </h2>

            <h3>$ {cash}</h3>
          </div>
        </div>
        {/* end money */}

        {/* inputs */}

        <div className="inputs">
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setProductName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            onChange={(e) => setProductPrice(e.target.value)}
          />
          <div className="btn">
            <button onClick={addByProduct}>ADD</button>
          </div>
        </div>

        {/* end inputs */}

        {/* product  */}
        <div className="product">
          <div className="product_table">
            <div className="table_head">
              <h3>Products</h3>
            </div>
            {product.map((el) => (
              <div className="table_body">
                <p>{el.productName}</p>
                <span>${el.productPrice}</span>
                <div className="action">
                  <button
                    onClick={() =>
                      cash < el.productPrice
                        ? alertError("Недостаточно средств ...")
                        : buyProduct(el.productPrice)
                    }
                  >
                    Buy
                  </button>
                  <button
                    className="delete"
                    onClick={() => dispatch({ type: "DELETE", payload: el.id })}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* product end */}
      </div>
      <ToastContainer />
    </div>
  );
};

export default MyWallet;
