import React from 'react';
import ImageDev from './../../../../assets/images/undraw_Developer_activity_re_39tg.png';
import ImageDesign from './../../../../assets/images/undraw_winter_designer_a2m7.png';
import ImageMarketing from './../../../../assets/images/undraw_Marketing_re_7f1g.png';
import ImageBeauty from './../../../../assets/images/undraw_girl_just_wanna_have_fun_9d5u.png';
import ImageAuto from './../../../../assets/images/undraw_logistics_x4dc.png';
import ImageTravel from './../../../../assets/images/undraw_Travelers_re_y25a.png';

import { ContentIntro, ContentWrap, ContentBox } from './majors.styles';
import { TitleMain } from './../../../../styles/common/index';

const Majors = () => {
  return (
    <ContentIntro>
      <TitleMain>Chuyên ngành</TitleMain>
      <ContentWrap>
        <ContentBox>
          <img src={ImageDev} alt="" className="box-img" />
          <div className="box-title">Công nghệ thông tin</div>
        </ContentBox>

        <ContentBox>
          <img src={ImageDesign} alt="" className="box-img" />
          <div className="box-title">Thiết kế đồ họa</div>
        </ContentBox>

        <ContentBox>
          <img src={ImageMarketing} alt="" className="box-img" />
          <div className="box-title">Kinh tế kinh doanh</div>
        </ContentBox>

        <ContentBox>
          <img src={ImageBeauty} alt="" className="box-img" />
          <div className="box-title">Thẩm mĩ làm đẹp</div>
        </ContentBox>

        <ContentBox>
          <img src={ImageAuto} alt="" className="box-img" />
          <div className="box-title">Cơ khí, tự động hóa</div>
        </ContentBox>

        <ContentBox>
          <img src={ImageTravel} alt="" className="box-img" />
          <div className="box-title">Du lịch - Khách sạn - Nhà hàng</div>
        </ContentBox>
      </ContentWrap>
    </ContentIntro>
  );
};

export default Majors;
