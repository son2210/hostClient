import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiLogIn } from 'react-icons/bi';
import { FcSearch, FcMenu } from 'react-icons/fc';
import { GrBottomCorner } from 'react-icons/gr';
import { RiCloseLine } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';

import {
  WrapHeader,
  HeaderInner,
  HeaderLeft,
  HeaderMenu,
  HeaderRight,
  ItemMenuNew,
  BoxNew,
  FormSearch,
  SubMenu,
  SubMeuItem,
  MenuResponse,
  HeaderBar,
  BodyBar,
  GroupUser,
  GroupLogin,
} from './header.styles';
import LogoFpt from './../../assets/images/logo.png';
import { menubar } from './../../routes/routes.constants';
import { postLogout } from './../../features/auth/redux/auth.slice';

const Header = () => {
  const { pathname } = useLocation();
  const [isSearchHeader, setIsSearchHeader] = useState(false);
  const [isUserAction, setIsUserAction] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    pathname === '/' ? setIsSearchHeader(false) : setIsSearchHeader(true);
    const searchHeader = () => {
      if (pathname === '/') {
        window.scrollY >= 500
          ? setIsSearchHeader(true)
          : setIsSearchHeader(false);
      }
    };
    window.addEventListener('scroll', searchHeader);
    return () => {
      window.removeEventListener('scroll', searchHeader);
    };
  }, [pathname]);

  const { userLogin } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(postLogout());
  };

  return (
    <WrapHeader>
      <div className="container ">
        <HeaderInner>
          <HeaderLeft>
            <Link to="/">
              <img src={LogoFpt} alt="" />
            </Link>

            <HeaderMenu>
              {menubar.map((menu, index) =>
                menu?.items.length <= 1 ? (
                  <li className="item-menu" key={index}>
                    <Link to="/" className="link-menu">
                      {menu.items[0].navigationTitle}
                    </Link>
                  </li>
                ) : (
                  <ItemMenuNew className="item-menu" key={index}>
                    <div>
                      <div className="link-disabled link-menu">
                        {menu?.cate}
                      </div>
                      <BoxNew>
                        <span className="text-new">New</span>
                      </BoxNew>
                    </div>
                    <SubMenu>
                      {menu?.items.map((item) => (
                        <SubMeuItem key={item.id}>
                          <Link to="/category" className="link-sub">
                            {item?.icon && <span>{item.icon}</span>}
                            <span>{item.navigationTitle}</span>
                          </Link>
                        </SubMeuItem>
                      ))}
                    </SubMenu>
                  </ItemMenuNew>
                )
              )}
            </HeaderMenu>
          </HeaderLeft>

          <HeaderRight>
            {isSearchHeader && (
              <FormSearch>
                <input type="text" placeholder="T??m ki???m ..." />
                <span className="icon-search">
                  <FcSearch />
                </span>
              </FormSearch>
            )}

            <MenuResponse className="lg-0">
              <label className="icon-menu" htmlFor="checked-mobile">
                <FcMenu />
              </label>
              <input type="checkbox" id="checked-mobile" hidden />
              <label htmlFor="checked-mobile" className="overlay-bar"></label>
              <div className="menu-bar">
                <HeaderBar>
                  <div className="user-login">
                    <img
                      src="https://cdn.pixabay.com/photo/2021/10/05/16/53/kimono-6683245__480.jpg"
                      alt=""
                      className="user-avatar"
                    />
                    L?? Quang S??n
                  </div>
                  <label htmlFor="checked-mobile" className="close-bar">
                    <RiCloseLine />
                  </label>
                </HeaderBar>

                <BodyBar>
                  {menubar.map((menu, index) => (
                    <React.Fragment key={index}>
                      {!menu.title && <div className="line-menu" />}
                      {menu?.items.map((item) => (
                        <li className="item-bar" key={item.id}>
                          <Link to={item.path} className="link-bar">
                            <span className="icon-bar">
                              {item?.icon && item.icon}
                            </span>
                            <span className="txt-bar">
                              {item.navigationTitle}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </React.Fragment>
                  ))}
                </BodyBar>
              </div>
            </MenuResponse>
            <div className="group-user">
              {userLogin?.avatar ? (
                <GroupLogin>
                  <GroupUser>
                    <img
                      src={userLogin?.avatar}
                      alt=""
                      className="user-avatar"
                    />
                    <span className="user-name">{userLogin?.email}</span>
                    <span
                      className="icon-drop"
                      onClick={() => setIsUserAction(!isUserAction)}
                    >
                      <GrBottomCorner />
                    </span>
                  </GroupUser>

                  {isUserAction && (
                    <div className="action-user">
                      <button className="item-user" onClick={handleLogout}>
                        Logout out
                      </button>
                    </div>
                  )}
                </GroupLogin>
              ) : (
                <Link to="/sign-in" className="link-menu">
                  Login
                  <span className="icon-login">
                    <BiLogIn />
                  </span>
                </Link>
              )}
            </div>
          </HeaderRight>
        </HeaderInner>
      </div>
    </WrapHeader>
  );
};

export default Header;
