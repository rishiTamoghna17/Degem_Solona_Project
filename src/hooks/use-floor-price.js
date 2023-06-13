import { useEffect, useState } from "react";
import axios from "axios";

const useFloorPrice = () => {
  const [floorPrice, setFloorPrice] = useState(0);

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        "https://api-mainnet.magiceden.io/rpc/getCollectionEscrowStats/degensweepers"
      );
      const floor_price = response.data.results.floorPrice / Math.pow(10, 9);
      setFloorPrice(floor_price);
    })();
  }, [floorPrice]);

  return { floorPrice };
};

export default useFloorPrice;
