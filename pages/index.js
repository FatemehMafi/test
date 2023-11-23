import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "next/router";
import { getMarketsActions } from "../redux/actions/MarketAction";
import { MarketRows } from "components/MarketRows";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

function Home(props) {
  const [marketList, setMarketList] = useState([]);
  const [socket, setSocket] = useState(null);

  const getMarketsList = async () => {
    const response = await props.submitGetMarketsActions();
    if (response?.payload.status === 200 || response?.payload.status === 201) {
      setMarketList(response.payload.data.results);
    } else if (response) {
      console.log(response.error);
    }
  };

  const ws = new WebSocket("wss://ws.bitpin.ir/");

  useEffect(() => {
    ws.onopen = () => {
      console.log("WebSocket connection opened");

      ws.send(JSON.stringify({ sub_to_price_info: { method: "subscribe" } }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.event === "currency_price_info_update") {
        const updatedMarkets = marketList.map((market) => {
          if (marketList.market_id === data.data.market_id) {
            return {
              ...marketList,
              price: data.data.price,
              change: data.data.change,
              min: data.data.min,
              max: data.data.max,
            };
          }
          return market;
        });
        setMarketList(updatedMarkets);
      }
    };
  }, [ws]);

  useEffect(() => {
    getMarketsList();
  }, []);

  return (
    <div>
      <div className="header">
        <div>نام ارز</div>
        <div>قیمت</div>
        <div>تغییرات</div>
      </div>
      <div className="separator" />
      <MarketRows markets={marketList} />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  submitGetMarketsActions: () => dispatch(getMarketsActions()),
});
const withConnect = connect(null, mapDispatchToProps);
export default compose(withRouter, withConnect)(Home);
