import React from "react";
import { useDispatch } from "react-redux";
import {  saveProfileTC } from "../../Redux/profile-reducer.ts";
import { Field, Form, Formik } from "formik";
//@ts-ignore
import s from './ProfileInfo.module.css';
import * as yup from 'yup';
import classNames from "classnames";
import { FormikPropsType, ProfileType } from "../../../Types/Types.ts";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

type State = { formData: ProfileType }; 
type AppDispatch = ThunkDispatch<State, any, AnyAction>;

const validationSchema = yup.object().shape({
    fullName: yup.string().required('Заполните пустое поле'),
    lookingForAJobDescription: yup.string().required('Заполните пустое поле'),
    aboutMe: yup.string().required('Заполните пустое поле'),
})


const ProfileFormik: React.FC<FormikPropsType> = (props) => {
    let dispatch: AppDispatch = useDispatch();

    const handleSubmit = (formData: ProfileType) => {
      console.log(formData);
      dispatch(saveProfileTC(formData)as unknown as AnyAction);
      props.exitToEditForm()
    };  
  
    return (
      
      <div>
          <Formik name={'profile-edite'}
                initialValues={props.profile} 
                onSubmit={handleSubmit} 
                validationSchema={validationSchema}>

              {({ errors, touched }) => (
                    <Form className={s.profileForm}>

                      <div className={s.points}>
                        <b>Имя: </b> <span>
                            <Field type="text" name="fullName" className={classNames(s.field, {[s.errorInput]: errors.fullName && touched.fullName})}/>
                            {errors.fullName && touched.fullName && (
                              <div className={s.error}>{errors.fullName}</div>
                            )}
                        </span>
                        
                      </div>

                      <div className={s.points}>
                        <b>Ищу работу: </b> 
                        <span>
                            <Field type="checkbox" name="lookingForAJob" />
                        </span>
                      </div>

                      <div className={s.textareaForm}>
                        <b>Мой любимый вид спорта: </b> <span>
                            <Field type="text" component={"textarea"} name="lookingForAJobDescription" className={classNames(s.field, {[s.errorInput]: errors.lookingForAJobDescription && touched.lookingForAJobDescription})}/>
                            {errors.lookingForAJobDescription && touched.lookingForAJobDescription && (
                              <div className={s.error}>{errors.lookingForAJobDescription}</div>
                            )}
                        </span>
                        
                      </div>

                      <div className={s.textareaForm}>
                        <b>Немного про меня: </b> <span>
                            <Field type="text" component={"textarea"}  name="aboutMe" className={classNames(s.field, {[s.errorInput]: errors.aboutMe && touched.aboutMe})}/>
                            {errors.aboutMe && touched.aboutMe && (
                              <div className={s.error}>{errors.aboutMe}</div>
                            )}
                        </span>
                      </div>
                      <button type="submit" >Submit</button>
                    </Form>
               )} 
              
          </Formik>
      </div>
      
      
    );
}

export default ProfileFormik;