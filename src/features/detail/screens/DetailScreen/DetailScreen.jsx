import React, { memo, useState, useEffect } from 'react';
import Slider from 'react-slick';
import { MdContentPaste } from 'react-icons/md';
import { GoCommentDiscussion } from 'react-icons/go';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import CarouselProduct from './../../components/CarouselProduct/CarouselProduct';

import {
  WrapDetail,
  ListCurrentImg,
  TitleProject,
  GroupMember,
  LabelProject,
  BoxProject,
  GroupDetail,
  GroupBox,
  TitleMain,
  ContentPost,
  GroupFeedback,
  Video,
} from './DetailScreen.styles';
import RatingStar from './../../components/RatingStar/RatingStar';
import ShareSocial from './../../components/ShareSocial/ShareSocial';
import ToolsDetail from './../../components/ToolsDetail/ToolsDetail';
import AttachDoc from './../../components/AttachDoc/AttachDoc';
import RatingDetail from './../../components/Feedback/RatingDetail';
import Feedback from './../../components/Feedback/Feedback';

import { getDetailProduct } from './../../redux/detail.slice';
import Loading from 'components/Loading/Loading';
import store from 'redux/store';
import { GiConsoleController } from 'react-icons/gi';

const DetailScreen = () => {
  const params = useParams();
  const id = Number(params?.id);
  const dispatch = useDispatch();
  const { userLogin } = store.getState().auth;
  const { isLoadingDetailProduct, detailProduct } = useSelector(
    (state) => state.detailProduct
  );
  const settings = {
    customPaging: function (i) {
      return (
        <ListCurrentImg>
          <img
            src={detailProduct?.product_galleries[i].image_url}
            className="current-slide"
            alt=""
          />
        </ListCurrentImg>
      );
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [valueSendCmt, setValueSendCmt] = useState({
    userId: '',
    value: '',
    rating: null,
  });
  console.log('detailProduct?.video_url', detailProduct?.video_url);
  useEffect(() => {
    if (id) {
      dispatch(getDetailProduct(id));
    }
  }, [dispatch, id]);
  // video_url
  if (isLoadingDetailProduct) {
    return <Loading />;
  }
  return (
    <WrapDetail>
      <div className="container">
        {detailProduct ? (
          <>
            {detailProduct.status !== 3 ? (
              // status !=3 chi c?? th???ng ???? v?? gi??o vi??n ???????c xem
              <>
                {userLogin.id === detailProduct.user_id ||
                userLogin.id === detailProduct.teacher_id ? (
                  <>
                    <div className="row">
                      <div className="xl-7">
                        <Slider {...settings}>
                          {detailProduct?.product_galleries.map(
                            (item, index) => (
                              <div key={index}>
                                <img
                                  src={item?.image_url}
                                  alt=""
                                  className="image-gallery"
                                />
                              </div>
                            )
                          )}
                        </Slider>
                      </div>
                      <div className="xl-5">
                        <div>
                          <TitleProject>{detailProduct?.name}</TitleProject>
                          <GroupMember>
                            <LabelProject>Th??nh vi??n nh??m: </LabelProject>
                            <div className="list-member">
                              {detailProduct?.students.map((student) => (
                                <span className="item-member" key={student.id}>
                                  {student.email} - {student.student_code}
                                </span>
                              ))}
                            </div>
                          </GroupMember>
                          <BoxProject>
                            <LabelProject>Kh??a:</LabelProject>
                            16.3
                          </BoxProject>
                          <BoxProject>
                            <LabelProject>Gi???ng vi??n h?????ng d???n:</LabelProject>
                            {detailProduct?.teacher?.name}
                          </BoxProject>
                          <BoxProject>
                            <LabelProject>Chuy??n ng??nh:</LabelProject>
                            Thi???t k??? website
                          </BoxProject>
                          <BoxProject>
                            <LabelProject>M?? m??n h???c:</LabelProject>
                            PRO2016
                          </BoxProject>
                          <BoxProject>
                            <LabelProject>K?? h???c:</LabelProject>
                            {detailProduct?.semester?.name}
                          </BoxProject>
                        </div>
                      </div>
                    </div>

                    <GroupDetail>
                      <div className="row">
                        <div className="xl-8">
                          <div className="group-des">
                            <TitleMain>
                              <MdContentPaste />
                              <span>B??i vi???t gi???i thi???u</span>
                            </TitleMain>
                            <Video>
                              <ReactPlayer
                                width="100%"
                                className="video"
                                height="100%"
                                playing
                                controls={true}
                                url={detailProduct?.video_url}
                              />
                            </Video>
                            <ContentPost
                              dangerouslySetInnerHTML={{
                                __html: detailProduct?.description,
                              }}
                            />

                            <CarouselProduct />
                          </div>
                        </div>
                        <div className="xl-4">
                          <GroupBox>
                            <AttachDoc data={detailProduct} />
                          </GroupBox>
                        </div>
                      </div>
                    </GroupDetail>
                  </>
                ) : (
                  <div className="messenger"> Kh??ng t??m th???y s???n ph???m ! </div>
                )}
              </>
            ) : (
              // status = 3
              <>
                <div className="row">
                  <div className="xl-7">
                    <Slider {...settings}>
                      {detailProduct?.product_galleries.map((item, index) => (
                        <div key={index}>
                          <img
                            src={item?.image_url}
                            alt=""
                            className="image-gallery"
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                  <div className="xl-5">
                    <div>
                      <TitleProject>{detailProduct?.name}</TitleProject>

                      <RatingStar
                        valueSendCmt={valueSendCmt}
                        setValueSendCmt={setValueSendCmt}
                      />

                      <GroupMember>
                        <LabelProject>Th??nh vi??n nh??m: </LabelProject>
                        <div className="list-member">
                          {detailProduct?.students.map((student) => (
                            <span className="item-member" key={student.id}>
                              {student.email} - {student.student_code}
                            </span>
                          ))}
                        </div>
                      </GroupMember>
                      <BoxProject>
                        <LabelProject>Kh??a:</LabelProject>
                        16.3
                      </BoxProject>
                      <BoxProject>
                        <LabelProject>Gi???ng vi??n h?????ng d???n:</LabelProject>
                        {detailProduct?.teacher?.name}
                      </BoxProject>
                      <BoxProject>
                        <LabelProject>Chuy??n ng??nh:</LabelProject>
                        Thi???t k??? website
                      </BoxProject>
                      <BoxProject>
                        <LabelProject>M?? m??n h???c:</LabelProject>
                        PRO2016
                      </BoxProject>
                      <BoxProject>
                        <LabelProject>K?? h???c:</LabelProject>
                        {detailProduct?.semester?.name}
                      </BoxProject>
                    </div>
                  </div>
                </div>
                <GroupDetail>
                  <div className="row">
                    <div className="xl-8">
                      <div className="group-des">
                        <TitleMain>
                          <MdContentPaste />
                          <span>B??i vi???t gi???i thi???u</span>
                        </TitleMain>
                        <Video>
                          {/* <iframe
                            src="https://drive.google.com/file/d/1KyStM_QNfWgaJrgAHFOwUGa8Dl6ZVxXW/view"
                            width="650"
                            height="400"
                            frameborder="0"
                            webkitallowfullscreen
                            mozallowfullscreen
                            allowfullscreen
                          ></iframe> */}
                          <ReactPlayer
                            width="100%"
                            className="video"
                            height="100%"
                            playing
                            controls={true}
                            volume
                            url={detailProduct?.video_url}
                          />
                        </Video>

                        <ContentPost
                          dangerouslySetInnerHTML={{
                            __html: detailProduct?.description,
                          }}
                        />

                        <GroupFeedback>
                          <TitleMain>
                            <GoCommentDiscussion />
                            <span>????nh gi??</span>
                          </TitleMain>

                          <RatingDetail />

                          <Feedback
                            valueSendCmt={valueSendCmt}
                            setValueSendCmt={setValueSendCmt}
                          />
                        </GroupFeedback>

                        <CarouselProduct />
                      </div>
                    </div>
                    <div className="xl-4">
                      <GroupBox>
                        <AttachDoc data={detailProduct} />
                      </GroupBox>
                      {/* c??ng c???  */}

                      <GroupBox>
                        <ToolsDetail />
                      </GroupBox>

                      <GroupBox>
                        <ShareSocial />
                      </GroupBox>
                    </div>
                  </div>
                </GroupDetail>{' '}
              </>
            )}
          </>
        ) : (
          <div className="messenger"> Kh??ng t??m th???y s???n ph???m ! </div>
        )}
      </div>
    </WrapDetail>
  );
};

export default memo(DetailScreen);
