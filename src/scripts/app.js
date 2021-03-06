import React from 'react';
import { render } from 'react-dom';
import * as util from './lib/util';
import * as yuki540 from './lib/yuki540';
import preload_json from './config/preload';

// components
import Product from './components/product.jsx';
import Memories from './components/memories.jsx';
import News from './components/news.jsx';

// style
import '../scss/function.scss';
import '../scss/keyframes.scss';
import '../scss/mixin.scss';
import '../scss/variable.scss';
import '../scss/modules/base.scss';
import '../scss/modules/app.scss';
import '../scss/modules/pc/load-view.scss';
import '../scss/modules/sp/load-view.scss';
import '../scss/modules/pc/content.scss';
import '../scss/modules/sp/content.scss';
import '../scss/modules/pc/navigation-area.scss';
import '../scss/modules/sp/navigation-area.scss';
import '../scss/modules/pc/page-area.scss';
import '../scss/modules/sp/page-area.scss';
import '../scss/modules/pc/profile.scss';
import '../scss/modules/sp/profile.scss';
import '../scss/modules/pc/history.scss';
import '../scss/modules/sp/history.scss';
import '../scss/modules/pc/product.scss';
import '../scss/modules/sp/product.scss';
import '../scss/modules/pc/memories.scss';
import '../scss/modules/sp/memories.scss';
import '../scss/modules/pc/news.scss';
import '../scss/modules/sp/news.scss';

document.body.style.display = 'block';

const device = util.isPC() ? 'pc' : 'sp';
const navigation_area = document.getElementById('navigation-area');
const nav_btn = document.querySelector('.nav-btn');
const nav_close_btn = document.querySelector('.nav-close-btn');
const nav_li = document.querySelectorAll('.nav-li');
const page_area = document.getElementById('page-area');
const page_close_btn = document.querySelector('.page-close-btn');

render(
  <Product />,
  document.getElementById('product')
);
render(
  <Memories />,
  document.getElementById('memories')
);
render(
  <News />,
  document.getElementById('news')
);

// images preload
util.preload(preload_json[device], () => {
  yuki540.introAnimation();
}, (data) => {
  yuki540.setPer(data.per);
});

const setSize = () => {
  // devices
  if(device === 'pc') {
    const width = window.innerWidth >= 1100 ? window.innerWidth : 1100;
    const main_illust = document.querySelectorAll('.main-illust-li div'); 
    main_illust.forEach((node) => {
      node.style.width = `${ width / 2 - 40 }px`;
    });
  } else {
    const width = screen.width;
    const main_illust = document.querySelectorAll('.main-illust-li div');
    main_illust.forEach((node) => {
      node.style.width = `${ width }px`;
    });
  }
};

window.addEventListener('load', setSize, false);
window.addEventListener('resize', setSize, false);

nav_btn.addEventListener('click', () => {
  navigation_area.setAttribute('data-state', 'active');
}, false);

nav_close_btn.addEventListener('click', () => {
  navigation_area.setAttribute('data-state', 'passive');
}, false);

nav_li.forEach((li) => {
  li.addEventListener('click', function(e) {
    e.preventDefault();
    const href = this.href.match(/#(.*)/)[1];
    
    page_area.style.display = 'block';
    page_area.setAttribute('data-href', href);
  }, false);
});

page_close_btn.addEventListener('click', () => {
  setTimeout(() => { page_area.style.display = 'none'; }, 500);
  page_area.setAttribute('data-href', '');
}, false);
