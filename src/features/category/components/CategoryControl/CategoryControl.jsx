import React, { memo, useState, useRef, useEffect } from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { BsFilter } from 'react-icons/bs';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { CgSearch } from 'react-icons/cg';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

import {
  WrapControl,
  ControlFilterCate,
  ButtonControlFilter,
  GroupFilterBasic,
  SearchAdvance,
  GroupLinkFilter,
  GroupFilterAdvance,
  CustomerSelect,
} from './CategoryControl.styles';
import {
  LIST_OBJECT,
  LIST_TEACHER,
  LIST_SORT,
  LIST_STATUS,
} from './../../constants/category.constants';
import { getMajors } from './../../redux/category.slice';

const CategoryControl = () => {
  const { url } = useRouteMatch();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isToggle, setIsToggle] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMajors());
  }, [dispatch]);

  const { listMajors } = useSelector((state) => state.category);
  const slidesLength = listMajors.length;

  const WrapCate = useRef(null);
  const handlePrev = () => {
    const cateSlide = WrapCate.current;
    cateSlide.scrollLeft -= cateSlide.offsetWidth;
    if (cateSlide.scrollLeft <= 0) {
      cateSlide.scrollLeft = 0;
    }
  };

  const handleNext = () => {
    const cateSlide = WrapCate.current;
    cateSlide.scrollLeft += cateSlide.offsetWidth;
    if (cateSlide.scrollLeft > 0) {
      cateSlide.scrollLeft = cateSlide.offsetWidth;
    }
    // setCurrentSlide(currentSlide === slidesLength - 1 ? 0 : currentSlide + 1);
  };

  const customTheme = (theme) => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary: '#f58f53',
        primary25: '#DEEBFF',
        primary50: '#B2D4FF',
        primary75: '#4C9AFF',
      },
    };
  };

  return (
    <WrapControl>
      <div className="container">
        <GroupFilterBasic>
          <ControlFilterCate>
            <span className="title-filter">Ch???n chuy??n ng??nh</span>
          </ControlFilterCate>
          <GroupLinkFilter>
            <span
              className="btn-carousel btn-prev"
              onClick={() => handlePrev()}
            >
              <AiOutlineLeft />
            </span>
            <span
              className="btn-carousel btn-next"
              onClick={() => handleNext()}
            >
              <AiOutlineRight />
            </span>
            <div className="list-cate" ref={WrapCate}>
              <div className="group-cate">
                <NavLink to={url} className="link-cate">
                  All
                </NavLink>
                {listMajors &&
                  listMajors.length > 0 &&
                  listMajors.map((cate, index) => (
                    <NavLink
                      to={`${url}/${cate.name}`}
                      className="link-cate"
                      key={cate.name}
                    >
                      {cate.name}
                    </NavLink>
                  ))}
              </div>
            </div>
          </GroupLinkFilter>

          <ButtonControlFilter
            onClick={() => {
              setIsToggle(!isToggle);
            }}
            className={`${isToggle ? 'active' : ''}`}
          >
            <BsFilter className="icon-filter" />
            <span>Filter</span>
          </ButtonControlFilter>
        </GroupFilterBasic>

        <GroupFilterAdvance
          className={`control-advance ${isToggle ? 'active' : ''}`}
        >
          <SearchAdvance>
            <label htmlFor="" className="label-search">
              T??m ki???m
            </label>
            <div className="input-group">
              <span className="input-group__icon">
                <CgSearch />
              </span>
              <input
                type="text"
                className="input-filter"
                placeholder="T??n s???n ph???m, m?? sinh vi??n..."
              />
            </div>
          </SearchAdvance>
          <SearchAdvance>
            <label htmlFor="" className="label-search">
              M??n h???c
            </label>
            <CustomerSelect>
              <Select
                options={LIST_OBJECT}
                placeholder="T??m theo m??n h???c"
                theme={customTheme}
              />
            </CustomerSelect>
          </SearchAdvance>

          <SearchAdvance>
            <label htmlFor="" className="label-search">
              Gi??o vi??n
            </label>
            <CustomerSelect>
              <Select
                options={LIST_TEACHER}
                placeholder="T??m theo gi??o vi??n"
                theme={customTheme}
                noOptionsMessage="le quang son"
              />
            </CustomerSelect>
          </SearchAdvance>

          <SearchAdvance>
            <label htmlFor="" className="label-search">
              Tr???ng Th??i
            </label>
            <CustomerSelect>
              <Select
                options={LIST_STATUS}
                placeholder="Tr???ng th??i"
                theme={customTheme}
              />
            </CustomerSelect>
          </SearchAdvance>

          <SearchAdvance>
            <label htmlFor="" className="label-search">
              X???p x???p
            </label>
            <CustomerSelect>
              <Select
                options={LIST_SORT}
                placeholder="X???p x???p theo"
                theme={customTheme}
              />
            </CustomerSelect>
          </SearchAdvance>
        </GroupFilterAdvance>
      </div>
    </WrapControl>
  );
};

export default memo(CategoryControl);
