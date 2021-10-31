import React, { useState, memo, useEffect, useCallback } from 'react';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  WrapPage,
  Title,
  WrapForm,
  ContentForm,
  FormLeft,
  FormRight,
  WrapButton,
  ListImage,
  GroupStudents,
  GroupInput,
  GroupLabel,
} from './ProductAddScreen.styles';

// import ReactPlayer from 'react-player';
import { RiDeleteBin2Line } from 'react-icons/ri';
// import ReviewProduct from '../components/Review/Review';
import { initForm } from './../helpers/add-product.helpers';
import InputElement from 'components/FormElement/InputElement/InputElement';
import InputFileElement from 'components/FormElement/InputElement/InputFileElement';
import SelectElement from 'components/FormElement/SelectElement/SelectElement';
import {
  postAddProduct,
  getInfo,
  getProductTypes,
} from '../redux/add-product.slice';
import store from 'redux/store';
import CKEditor from '../components/Editor/CKEditor';
import { WarEditor } from '../components/Editor/Editor.styles';
import { MapOptions } from 'helpers/convert/map-options';

const AddProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userLogin } = store.getState().auth;
  const [statusDocument, setStatusDocument] = useState(false);
  const [statusVideo, setStatusVideo] = useState(false);
  const fetchProductTypes = useCallback(() => {
    dispatch(getProductTypes());
  }, [dispatch]);

  useEffect(() => {
    fetchProductTypes();
  }, [fetchProductTypes]);

  const productTypes = useSelector((state) => state.addProduct.productTypes);
  const infoProduct = useSelector((state) => state.addProduct.infoProduct);
  const selectProductTypes = MapOptions(productTypes);
  const fetchInfoProduct = useCallback(() => {
    dispatch(getInfo(userLogin));
  }, [dispatch, userLogin]);
  useEffect(() => {
    fetchInfoProduct();
  }, [dispatch, fetchInfoProduct]);

  const [listImages, setListImage] = useState([]);
  // const [linkVideo, setLinkVideo] = useState(null);
  let email = [];

  const [Group, setGroup] = useState([userLogin?.email]);

  const remove = (i) => {
    setGroup(Group.filter((_, index) => index !== i));
  };

  const RemoveImage = (i) => {
    setListImage(listImages.filter((item, index) => index !== i));
  };

  const EmailChange = (e, key) => {
    email = [...Group];
    email[key] = e.target.value;
    setGroup(email);
  };
  const optionSelect =
    infoProduct &&
    infoProduct.map((item) => {
      return item[0];
    });
  const [valueSelect, setValueSelect] = useState({ label: '', value: '' });
  const arrayValue =
    infoProduct &&
    infoProduct.filter(
      // lọc các trường có id subject
      (element) => element[0].id === valueSelect.value
    );
  const valueOptions = MapOptions(optionSelect); // giá trị value
  if (!infoProduct) {
    history.push('/page404');
  }
  return (
    <WrapPage className="container">
      <Title> Sản phẩm mới</Title>
      <WrapForm>
        <Formik
          initialValues={{
            ...initForm,
          }}
          onSubmit={({ product_type_id, ...rest }) => {
            const { value } = product_type_id;
            const newObjProduct = { ...rest, product_type_id: value };
            newObjProduct.students = Group;
            newObjProduct.galleries = listImages;
            newObjProduct.subject_id = arrayValue[0][0].id;
            newObjProduct.teacher_id = arrayValue[0][1].id;
            newObjProduct.campus_id = arrayValue[0][2].id;
            newObjProduct.semester_id = arrayValue[0][3].id;
            newObjProduct.email = userLogin.email;
            dispatch(postAddProduct(newObjProduct))
              .then(unwrapResult)
              .then(() => {
                toast.success('Thêm sản phẩm thành công !');
                setTimeout(() => history.push('/'), 1000);
              });
          }}
        >
          {() => (
            <Form encType="multipart/form-data">
              <ContentForm>
                <FormLeft>
                  <InputElement
                    label="Tên sản phẩm"
                    name="name"
                    placeholder="Nhập tên sản phẩm"
                  />
                  <InputElement
                    label="Đường dẫn video"
                    name="video_url"
                    placeholder="Link video "
                  />
                  {/* <InputFileElement
                    name="video_url"
                    label="Video "
                    id="file-document"
                    content="Chọn Video"
                    setStatusVideo={setStatusVideo}
                    setLinkVideo={setLinkVideo}
                  /> */}
                  <SelectElement
                    label="môn học "
                    name="subject_id"
                    placeholder="Môn học "
                    options={valueOptions || []}
                    setValueSelect={setValueSelect}
                  />
                  {arrayValue && arrayValue.length > 0 && (
                    <>
                      <GroupLabel className="group-label">
                        <InputElement
                          label="Giảng viên"
                          name="teacher_id"
                          hidden
                          value={null}
                        />
                        <div className="text-label">
                          {arrayValue && arrayValue.length > 0
                            ? arrayValue[0][1].name
                            : 'Tên giảng viên '}
                        </div>
                      </GroupLabel>

                      <GroupLabel className="group-label">
                        <InputElement
                          label="Kì học"
                          name="semester_id"
                          placeholder="Nhập tên sản phẩm"
                          hidden
                          value={null}
                        />
                        <div className="text-label">
                          {arrayValue && arrayValue.length > 0
                            ? arrayValue[0][3].name
                            : 'Kỳ Học'}
                        </div>
                      </GroupLabel>
                    </>
                  )}
                  <GroupStudents>
                    <Title> Thành viên </Title>
                    <GroupInput>
                      {Group.map((item, index) => {
                        return (
                          <div className="group" key={index}>
                            <input
                              className="inputE"
                              type="email"
                              placeholder="email"
                              value={item}
                              onChange={(e) => EmailChange(e, index)}
                              disabled={index === 0 ? true : false}
                            />
                            <button
                              className="remove"
                              type="button"
                              onClick={() => remove(index)}
                              disabled={index === 0 ? true : false}
                            >
                              <RiDeleteBin2Line />
                            </button>
                          </div>
                        );
                      })}
                      <button
                        type="button"
                        className="add"
                        onClick={() => setGroup([...Group, ''])}
                      >
                        Thêm +
                      </button>
                    </GroupInput>
                  </GroupStudents>

                  <SelectElement
                    label="Loại"
                    name="product_type_id"
                    placeholder="Loại sản phẩm"
                    options={selectProductTypes || []}
                  />

                  <InputFileElement
                    name="image_url"
                    label="Ảnh đại diện"
                    id="file-avatar"
                    content="Chọn ảnh đại diện"
                  />
                  <InputFileElement
                    name="resource_url"
                    label="Tài liệu"
                    id="file-document"
                    content="Chọn tài liệu"
                    setStatusDocument={setStatusDocument}
                    statusDocument={statusDocument}
                  />
                  <InputFileElement
                    name="galleries"
                    label="Hình ảnh"
                    id="file-gallery"
                    content={
                      listImages.length > 0
                        ? `Danh sách ảnh  ${listImages.length} `
                        : ' Chọn bộ sưu tập'
                    }
                    multiple
                    setListImage={setListImage}
                    listImages={listImages}
                    disabled={listImages && listImages.length >= 6}
                  />
                  <ListImage>
                    {listImages &&
                      listImages.map((item, index) => {
                        return (
                          <div className="box-item" key={index}>
                            <img src={item} alt="" />
                            <div className="delete">
                              <RiDeleteBin2Line
                                onClick={() => RemoveImage(index)}
                              />
                            </div>
                          </div>
                        );
                      })}
                  </ListImage>
                  {/* {!linkVideo && (
                    <ReactPlayer
                      controls
                      volume
                      playing={true}
                      width="80%"
                      style={({ padding: 10 }, { margin_top: 200 })}
                      height="260px"
                      playbackRate
                      previewTabIndex="10"
                      playIcon
                      onReady={() => console.log('play')}
                      url="https://www.youtube.com/watch?v=MMRP5lh-gJ4"
                    />
                  )} */}
                </FormLeft>

                <FormRight>
                  <WarEditor>
                    <CKEditor />
                  </WarEditor>
                </FormRight>
              </ContentForm>
              <WrapButton>
                {/* <label onClick={() => setShow(!show)} className="review">
                  Xem trước
                </label> */}
                {statusDocument && statusVideo && listImages.length > 0 ? (
                  <button type="submit" className="button-add">
                    Thêm sản phẩm
                  </button>
                ) : (
                  <button type="submit" className="button-add">
                    Thêm sản phẩm
                  </button>
                )}
              </WrapButton>
            </Form>
          )}
        </Formik>
      </WrapForm>
      {/* <ReviewProduct show={show} setShow={setShow} data={formik} /> */}

      <ToastContainer position="top-right" autoClose={1500} />
    </WrapPage>
  );
};

export default memo(AddProduct);
