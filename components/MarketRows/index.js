import React from "react";
import "./style.css";

export const MarketRows = ({ markets }) => {
  function round(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <>
      {markets.map((market) => (
        <div key={market.id}>
          <div className="main">
            <div className="titleContent">
              <img
                className="logo"
                src={market.currency1.image}
                alt="market-image"
              />
              <div className="title">
                <div>{market.currency1.title_fa}</div>
                <div>{market.code}</div>
              </div>
            </div>
            <div className="price">{numberWithCommas(market.price)}</div>
            <div className="changes">
              <span className={market.price_info.change > 0 ? "green" : "red"}>
                {market.price_info.change > 0 && "+"}
                {round(market.price_info.change)}%
              </span>
            </div>
          </div>
          <div className="separator" />
        </div>
      ))}
    </>
  );
};
