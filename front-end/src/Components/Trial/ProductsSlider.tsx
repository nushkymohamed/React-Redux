import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import ProductSliderWrapperProps from '../../Containers/Trial/ProductSliderWrapper';
import { ProductTypes } from '../../redux/trial/TrialReducer';

interface AvailableSliderProps {
  products: ProductTypes[];
  openFullViewModel: (index: number) => void;
  selectProduct: (id: string) => void;
  page: number;
  size: number;
  totalRecords: number;
  loadMoreProducts: Function;
  selectedProducts: ProductTypes[];
}
const AvailableProductsSlider: FC<AvailableSliderProps> = ({
  products,
  openFullViewModel,
  selectProduct,
  page,
  size,
  totalRecords,
  loadMoreProducts,
  selectedProducts,
}) => {
  const { t } = useTranslation();
  const [sliderRef, setSliderRef] = useState<any>();
  const slidesToShow = 3;

  const [currentSlider, setCurrentSlider] = useState(0);

  const visibleSlideCount = () => {
    if (!sliderRef) return settings.slidesToShow;

    if (!sliderRef.state.breakpoint) {
      return sliderRef.props.slidesToShow;
    } else {
      if (sliderRef.props.responsive.length) {
        return sliderRef.props.responsive.find(
          (item: any) => item.breakpoint === sliderRef.state.breakpoint
        ).settings.slidesToShow;
      }
    }
  };
  const checkForSliderEnd = (current: number, next: number) => {
    if (current <= next && visibleSlideCount() + next >= products.length) {
      loadMoreProducts();
    }
  };

  useEffect(() => {
    products.length &&
      currentSlider <= 1 &&
      sliderRef &&
      sliderRef.slickGoTo(0);
  }, [products, currentSlider]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow,
    slidesToScroll: 3,
    initialSlide: 0,
    beforeChange: (current: number, next: number) => {
      checkForSliderEnd(current, next);
      setCurrentSlider(Math.ceil(next / visibleSlideCount()) + 1);
    },

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="product--slider">
      <Slider {...settings} ref={setSliderRef}>
        {products.map((product, index: number) => {
          return (
            <div key={index}>
              <ProductSliderWrapperProps
                openFullViewModel={() => openFullViewModel(index)}
                product={product || {}}
                selectProduct={selectProduct}
              />
            </div>
          );
        })}
      </Slider>
      {products.length ? (
        <div className="product--card-area-footer">
          <p className="product--card-area-footer__count">
            {`${currentSlider === 0 ? 1 : currentSlider} / ${Math.ceil(
              slidesToShow < totalRecords
                ? totalRecords / visibleSlideCount()
                : 1
            )}`}
          </p>
          <p className="product--card-area-footer__selectedCount">
            {t('Selected')} {selectedProducts?.length || 0}
          </p>
        </div>
      ) : null}
    </div>
  );
};
export default AvailableProductsSlider;
