import axios from 'axios';
import {Dimensions, Image, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SliderBox} from 'react-native-image-slider-box';

const Banner = () => {
  const [bannerUrl, setBannerUrl] = useState('');
  useEffect(() => {
    axios({
      url: 'https://admin.kaizen-sushi.uz/api/get_slides',
      method: 'get',
    })
      .then(result => {
        let banners_count = result.data.slides.length;
        let index = Math.random() * (banners_count - 1);
        setBannerUrl(result.data.slides[Math.floor(index)].url);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  let width = Dimensions.get('screen').width;
  if (bannerUrl !== '') {
    return (
      <Image
        style={{
          width: width - 40,
          height: ((width - 40) / 16) * 5,
        }}
        source={{
          uri: bannerUrl,
        }}
      />
    );
  } else {
    return null;
  }
};

let gal = '';
const setGal = p => {
  gal = p;
};
let width = Dimensions.get('screen').width;
const BannerCarousel = () => {
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    axios({
      url: 'https://admin.kaizen-sushi.uz/api/get_slides',
      method: 'get',
    })
      .then(result => {
        setBanners(result.data.slides);
        let gallery = [];
        gallery = banners;
        gallery.unshift(banners[0]);
        gallery = gallery.map(element => {
          return element.url;
        });
        setGal(gallery);
      })
      .catch(error => {
        console.log(error);
      });
  }, [banners]);
  if (banners.length === 0) {
    return null;
  } else {
    return (
      <SliderBox
        images={gal}
        sliderBoxHeight={((width - 40) / 16) * 5}
        onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
        parentWidth={width - 40}
      />
    );
  }
};

export {Banner, BannerCarousel};
