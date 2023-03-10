import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectClientPopup } from 'store/popupReducer';
import { selectClientBoard } from 'store/boardReducer';
import { useCookies } from 'react-cookie';
import AOS from 'aos';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import classNames from 'classnames';
import Modal from './PopupForm';
import 'aos/dist/aos.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

SwiperCore.use([Navigation, Pagination]);
gsap.registerPlugin(ScrollTrigger);

const MainForm = () => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollCur, setScrollCur] = useState(0);
  const [scrollView, setScrollView] = useState(false);
  const scrollRef = useRef();
  const scrollStyleChange = useRef();
  const [popupCookies, setPopupCookies] = useCookies();

  const dispatch = useDispatch();
  const popupList = useSelector((state) => state.popupReducer.data);
  const boardList = useSelector((state) => state.boardReducer.data);

  useEffect(() => {
    const newList = { popupId: 'POP', pageIndex: 1 };
    dispatch(selectClientPopup(newList));
  }, [dispatch]);

  useEffect(() => {
    const newList = { boardId: 'PRE', pageIndex: 1 };
    dispatch(selectClientBoard(newList));
  }, [dispatch]);

  useEffect(() => {
    AOS.init();
  });

  function onScroll() {
    setScrollTop(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    setScrollCur(scrollRef.current.getBoundingClientRect().top);
  }, [scrollCur]);

  useEffect(() => {
    if (scrollCur > scrollTop) {
      setScrollView(false);
    } else if (scrollTop > scrollCur && scrollTop < Number(scrollCur + 500)) {
      setScrollView(true);
      scrollStyleChange.current.style = '';
    } else if (scrollTop > Number(scrollCur + 500)) {
      setScrollView(false);
      scrollStyleChange.current.style = 'transform:scale(1);bottom:0';
    }
  }, [scrollCur, scrollTop]);

  useEffect(() => {
    const sections = gsap.utils.toArray('.panel');
    gsap.to(sections, {
      scrollTrigger: {
        trigger: '.container',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      yPercent: -100 * (sections.length - 1),
    });

    ScrollTrigger.refresh();
  }, []);

  // useEffect(() => {
  //   // popupList.data.forEach((el) => mainPopup(el.popupId, el.popupHeight, el.popupWidth));
  //   popupList.data.forEach((el) => mainPopup(el.popupLink, el.popupId, el.popupClose1, el.popupClose2, dayPopupClose, modalClose));
  // }, [popupList]);

  // const mainPopup = (id, top, left) => {
  //   if (!popupCookies['POPUP_' + id]) {
  //     let tops = Number(parseInt(top) + 220);
  //     const popupX = window.screen.width / 2 - left / 2;
  //     const popupY = window.screen.height / 2 - tops / 2;
  //     window.open('/popup/' + id, id, 'width=' + left + ',height=' + tops + ',left=' + popupX + ',top=' + popupY);
  //   }
  // };

  return (
    <>
      {popupList
        .filter((list) => list.popupId !== popupCookies['POPUP_' + list.popupId])
        .map((list) => (
          <Modal
            popupLink={list.popupLink}
            fileNm={list.thumbNm}
            popupId={list.popupId}
            popupHeight={list.popupHeight}
            popupWidth={list.popupWidth}
            popupClose1={list.popupClose1}
            popupClose2={list.popupClose2}
          ></Modal>
        ))}
      <div className="main">
        <div className="main-visual">
          <div className="wrap">
            <h1 data-aos="fade-right" data-aos-duration="1000">
              <span>EV Charging Innovation</span>
              <span>for tomorrow</span>
            </h1>
            <div className="search" data-aos="fade-up" data-aos-duration="1000">
              <div className="input">
                <input type="text" placeholder="?????????????????? ??????" />
                <button>
                  <img src="/img/main/ico-search.svg" alt="??????" />
                </button>
              </div>
              <div className="recom">
                <NavLink to="">#??????</NavLink>
                <NavLink to="">#??????</NavLink>
                <NavLink to="">#??????</NavLink>
              </div>
            </div>
          </div>
          <div className="video-wrap">
            <video muted autoPlay loop>
              <source src="/video/main.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="con1">
          <div className="wrap">
            <div className="tit" data-aos="fade-right" data-aos-duration="1000" data-aos-once="true">
              LS E-Link??? ?????? ???????????? ?????????
              <br />
              ????????? ?????? ???????????????
              <br />??? ??? ????????? ????????? ????????????.
            </div>
            <ul>
              <li data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
                <NavLink to="">
                  <div className="s-tit">????????? ????????????</div>
                  <p>????????? ?????? ????????? ????????? ???????????????????</p>
                </NavLink>
              </li>
              <li data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
                <NavLink to="">
                  <div className="s-tit">????????????</div>
                  <p>????????? ????????????? ????????? ?????????????????????.</p>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="con2" ref={scrollRef}>
          <div className={classNames('con2-container', { on: scrollView })} ref={scrollStyleChange}>
            <section className="section intro" data-section-color="transparent">
              <div>
                <article className="_intro">
                  <div className="intro-head-wrapper is-active">
                    <strong className="main-section-headline">BUSINESS</strong>
                    <div className="btn-area">
                      <span>
                        LS E-Link??? <br className="m-block" />
                        ????????? ???????????? ?????????
                        <br /> EV Charging ?????? ????????? <br className="m-block" />
                        ????????? ???????????? ?????????
                        <br />
                        ????????? ????????? ????????????.<i className="icon-arrow-right-bk-30"></i>
                      </span>
                    </div>
                  </div>
                  <div className="visual">
                    <div className="_visual">
                      <video muted autoPlay loop>
                        <source src="/video/con2-video.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </div>
                </article>
              </div>
            </section>
          </div>
        </div>

        <div className="con3">
          <div className="container">
            <div className="swiper mySwiper">
              <div className="swiper-wrapper">
                <Swiper
                  slidesPerView={1}
                  spaceBetween={0}
                  loop={true}
                  speed={1000}
                  mousewheel={true}
                  pagination={{
                    el: '.swiper-pagination',
                    clickable: true,
                  }}
                >
                  <SwiperSlide>
                    <div className="swiper-slide slide1">
                      <div className="slide-bg" style={{ background: '#EC6800 url(/img/main/car.png) center no-repeat'}}>
                        <div className="slide-inner">
                          <h3 className="text">????????? ????????????</h3>
                          <p className="desc">
                            ?????? ????????? ?????? ????????? ?????? <br />??? ??????????????? ??????
                          </p>
                          <NavLink to="/business/ev/transportation" className="link">
                            VIEW MORE
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="swiper-slide slide2">
                      <div className="slide-bg" style={{ background: '#12A84E url(/img/main/con3-img2.png) right center no-repeat'}}>
                        <div className="slide-inner">
                          <h3 className="text">
                            ?????????????????? ?????????
                            <br />
                            ?????? ????????? ??????
                          </h3>
                          <p className="desc">
                            ????????? ????????? ????????? ?????? ???????????? ??????, <br />
                            ?????????????????? ?????? ??????
                          </p>
                          <NavLink to="/business/e-link/renewable" className="link">
                            VIEW MORE
                          </NavLink>
                          <span class="cloud1"><img src="/img/main/con3-img2-cloud1.png" alt="" /></span>
                          <span class="cloud2"><img src="/img/main/con3-img2-cloud2.png" alt="" /></span>
                          <span class="cloud3"><img src="/img/main/con3-img2-cloud3.png" alt="" /></span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="swiper-slide slide3">
                      <div className="slide-bg" style={{ background: '#1E2F63 url(/img/main/con3-pad.png) right center no-repeat'}}>
                        <div className="slide-inner">
                          <h3 className="text">
                            ??????????????? ?????????????? <br />
                            ?????????
                          </h3>
                          <p className="desc">
                            ?????? ?????? ????????? ??????????????? <br />
                            ?????? ????????? ??????
                          </p>
                          <NavLink to="/business/e-link/control" className="link">
                            VIEW MORE
                          </NavLink>
                          <span class="air"><img src="/img/main/air.png" alt="" /></span>
                          <span class="cloud1"><img src="/img/main/cloud1.png" alt="" /></span>
                          <span class="cloud2"><img src="/img/main/cloud2.png" alt="" /></span>
                          <span class="cloud3"><img src="/img/main/cloud3.png" alt="" /></span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </div>
        </div>

        <div className="con4">
          <div className="wrap index-action">
            <div id="ourvalue" className="pc-show">
              <div className="area-wrap">
                <div className="left" data-aos="fade-right" data-aos-duration="1000" data-aos-once="true">
                  <div className="lf-wrap">
                    <div className="big-tit">
                      ????????? ????????????
                      <br />
                      ???????????????.
                    </div>
                    <img src="/img/common/logo.svg" alt="" />
                  </div>
                </div>
                <div className="right">
                  <div data-aos="zoom-in-up" data-aos-duration="1000" data-aos-once="true">
                    <img src="/img/main/con4-img1.png" alt="" />
                    <div className="txt">
                      <div className="small">????????????????????</div>
                      <div className="big">????????? ???????????? LS</div>
                    </div>
                  </div>
                  <div data-aos="zoom-in-up" data-aos-duration="1000" data-aos-once="true">
                    <img src="/img/main/con4-img2.png" alt="" />
                    <div className="txt">
                      <div className="small">??????????????? ????????????????????? LS???</div>
                      <div className="big">??????????????????????????? ???????????? E1</div>
                    </div>
                  </div>
                  <div data-aos="zoom-in-up" data-aos-duration="1000" data-aos-once="true">
                    <img src="/img/main/con4-img3.png" alt="" />
                    <div className="txt">
                      <div className="big">Fleet Management???</div>
                      <div className="small">???????????? ????????? ????????????????????? ????????? ??????</div>
                    </div>
                  </div>
                  <div data-aos="zoom-in-up" data-aos-duration="1000" data-aos-once="true">
                    <img src="/img/main/con4-img4.png" alt="" />
                    <div className="txt">
                      <div className="small">'???????????? ??? ??? ??????'</div>
                      <div className="big">LS Partnetship</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mobile-show">
              <div className="left">
                <div className="big-tit">
                  ????????? ????????????
                  <br />
                  ???????????????.
                </div>
                <img src="/img/common/mainlogo.svg" alt="" />
              </div>
              <div className="right">
                <div>
                  <img src="/img/main/con4-img1.png" alt="" />
                  <div className="txt">
                    <div className="small">????????????????????</div>
                    <div className="big">????????? ???????????? LS</div>
                  </div>
                </div>
                <div>
                  <img src="/img/main/con4-img2.png" alt="" />
                  <div className="txt">
                    <div className="small">??????????????? ????????????????????? LS???</div>
                    <div className="big">??????????????????????????? ???????????? E1</div>
                  </div>
                </div>
                <div>
                  <img src="/img/main/con4-img3.png" alt="" />
                  <div className="txt">
                    <div className="big">Fleet Management???</div>
                    <div className="small">???????????? ????????? ????????????????????? ????????? ??????</div>
                  </div>
                </div>
                <div>
                  <img src="/img/main/con4-img4.png" alt="" />
                  <div className="txt">
                    <div className="small">'???????????? ??? ??? ??????'</div>
                    <div className="big">LS Partnetship</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="con5">
          <div className="con5-textarea">
            <div className="s-tit" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
              TECHNOLOGICAL INNOVATION
            </div>
            <div className="main-tit" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true" data-aos-delay="300">
              LS E-Link??? <br className="m-block" />
              ??????????????? ??????????????? <br className="m-block" />
              ????????? ???????????? <br className="pc-block" />
              ???????????? <br className="m-block" />
              ????????? ???????????? ????????????.
              <br />
              ???????????? LS E-Link??? <br className="m-block" />
              ?????? ???????????? ??????????????????.
            </div>
            <Swiper
              slidesPerView={2.4}
              centeredSlides={true}
              spaceBetween={0}
              loop={true}
              speed={1200}
              navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }}
              breakpoints={{
                780: {
                  slidesPerView: 2.4,
                  spaceBetween: 0,
                },
              }}
              onSwiper={(swiper) => {
                swiper.params.navigation.prevEl = navigationPrevRef.current;
                swiper.params.navigation.nextEl = navigationNextRef.current;

                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();
              }}
            >
              <SwiperSlide>
                {/* <div className="swiper-slide"> */}
                <div className="img">
                  <img src="/img/main/con5-img1.png" alt="" />
                </div>
                <div className="txt">
                  <div className="slide-tit">
                    ????????? / ????????? / ???????????? /<br />
                    ??????????????? ???????????????
                  </div>
                  <p>
                    LS E-Link??? ??????????????? ??????????????? ????????? <br />
                    ???????????? ???????????? ????????? ???????????? ????????????. <br />
                    ???????????? LS E-Link??? ?????? ???????????? ????????? ?????????.
                  </p>
                </div>
                {/* </div> */}
              </SwiperSlide>
              <SwiperSlide>
                {/* <div className="swiper-slide"> */}
                <div className="img">
                  <img src="/img/main/con5-img2.png" alt="" />
                </div>
                <div className="txt">
                  <div className="slide-tit">
                    ???????????? / ???????????? ????????? <br />
                    ????????? ELVIS ???????????????
                  </div>
                  <p>
                    ELVIS ?????????????????? ??????????????? ???????????? ?????????????????? <br />
                    ????????????/??????????????? ???????????? ????????? ?????? ????????? <br />
                    ???????????? / ????????????????????? ???????????? ????????????.
                    <br />
                    ELVIS?????? ????????? ???????????? ?????? ????????? ?????????
                  </p>
                </div>
                {/* </div> */}
              </SwiperSlide>
              <SwiperSlide>
                {/* <div className="swiper-slide"> */}
                <div className="img">
                  <img src="/img/main/con5-img3.png" alt="" />
                </div>
                <div className="txt">
                  <div className="slide-tit">
                    ???????????? ???????????????????????? <br />
                    ????????????
                  </div>
                  <p>
                    LS E-Link??? ???????????? ??????????????? ??????????????? IT ???????????? <br />
                    ???????????? ??????????????? ??????????????? ????????? ?????? ????????????. <br />
                    LS E-Link??? ?????? ????????? ?????????.
                  </p>
                </div>
                {/* </div> */}
              </SwiperSlide>
              <SwiperSlide>
                {/* <div className="swiper-slide"> */}
                <div className="img">
                  <img src="/img/main/con5-img4.png" alt="" />
                </div>
                <div className="txt">
                  <div className="slide-tit">
                    ????????? ?????? / ???????????? / ?????? Total <br />
                    Solution??? ???????????? ????????? ?????????
                  </div>
                  <p>
                    LS E-Link??? ??????????????? ????????? ???????????? ????????? ??????, <br />
                    ????????????, ??? ?????? ??? ????????? ??????????????? ????????? total solution??? <br />
                    ???????????? ????????? ???????????? ???????????? ????????????.
                    <br />
                    LS E-Link??? ???????????? ???????????????.
                  </p>
                </div>
                {/* </div> */}
              </SwiperSlide>
              <div className="control">
                <div className="swiper-button-prev" ref={navigationPrevRef}></div>
                <div className="swiper-button-next" ref={navigationNextRef}></div>
              </div>
            </Swiper>
            {/* </div> */}
            {/* </div> */}
          </div>
          <div className="con5-video">
            <video muted autoPlay loop>
              <source src="/video/technological-innovation.mp4" type="video/mp4" />
            </video>
            <img style={{ position: 'absolute', zIndex: 1, top: 0, height: '100%', width: '100%' }} src="/img/main/1296.png" alt="" />
          </div>
        </div>
        <div className="con6">
          <div className="in"></div>
        </div>
        <div className="con7">
          <div className="wrap">
            <div className="main-tit" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
              ????????????
            </div>
            <NavLink to="/pr/press-list" className="more">
              <img src="/img/main/ico-plus.svg" alt="" />
            </NavLink>
            <ul data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
              {boardList
                .filter((list, index) => index < 3)
                .map((list, index) => (
                  <li key={index}>
                    <NavLink to={`/pr/press-view/${list.boardId}`}>
                      <div className="news-name">{list.createdDatetime}</div>
                      <div className="news-tit">{list.boardTitle}</div>
                      <p>{list.boardContents.length > 126 ? list.boardContents.substr(0, 126) + '...' : list.boardContents}</p>
                    </NavLink>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="con8">
          <div className="wrap">
            <div className="txt-area">
              <div className="main-tit" data-aos="fade-right" data-aos-duration="1000" data-aos-once="true">
                LS E-Link??????
                <br />
                ?????? ????????? ????????? ???????????????.
              </div>
              <NavLink to="/recruit/posting" className="more" data-aos="fade-right" data-aos-duration="1000" data-aos-once="true">
                VIEW MORE
              </NavLink>
            </div>
            <ul>
              <li data-aos="fade-up" data-aos-duration="1000" data-aos-once="true" data-aos-delay="700">
                <NavLink to="/recruit/people">
                  <i></i>
                  ?????????
                </NavLink>
              </li>
              <li data-aos="fade-up" data-aos-duration="1000" data-aos-once="true" data-aos-delay="700">
                <NavLink to="/recruit/benefits">
                  <i></i>
                  ????????????
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainForm;
