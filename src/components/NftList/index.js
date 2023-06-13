import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { ScaleLoader } from "react-spinners";

import SliderElement from "../SliderElement";
import EmptyNft from "../EmptyNft";

import { useMediaQuery } from "react-responsive";

import "swiper/swiper.min.css";
import "swiper/swiper-bundle.css";
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
import "./style.css";

const NftList = ({
  stacked,
  isLoadingWalletNfts,
  walletNfts,
  stakedNfts,
  isLoading,
  handleStake,
  handleUnstake,
}) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  //1663279415 4:22
  console.log(stakedNfts);
  return (
    <div className="NftList">
      <p className="nftlistTitle">
        {stacked ? "STAKED NFTS" : "UNSTAKED NFTS"}
      </p>
      {isLoadingWalletNfts || isLoading ? (
        <div className="emptynft">
          <ScaleLoader loading color="white" size={80} />
          {/* <FadeLoader loading color='white' /> */}
          {/* #3CFEF5 */}
        </div>
      ) : stacked ? (
        stakedNfts.length > 0 ? (
          <Swiper
            // install Swiper modules
            modules={[Navigation, A11y]}
            // spaceBetween={-100}
            slidesPerView={isMobile ? 2 : 4}
            navigation
            // pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            {stakedNfts.map((val, id) => (
              <SwiperSlide key={id}>
                <SliderElement
                  data={val}
                  stacked={stacked}
                  handleUnstake={handleUnstake}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <EmptyNft stacked={stacked} />
        )
      ) : walletNfts.length > 0 ? (
        <Swiper
          // install Swiper modules
          modules={[Navigation, A11y]}
          // spaceBetween={-100}
          slidesPerView={isMobile ? 2 : 4}
          navigation
          // pagination={{ clickable: true }}
          // scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {walletNfts.map((val, id) => (
            <SwiperSlide key={id}>
              <SliderElement
                data={val}
                stacked={stacked}
                handleStake={handleStake}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <EmptyNft stacked={stacked} />
      )}
    </div>
  );
};

export default NftList;
