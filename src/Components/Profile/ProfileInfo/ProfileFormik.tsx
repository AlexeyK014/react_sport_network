import React from "react";
import { Field, Form, Formik } from "formik";
//@ts-ignore
import s from './ProfileInfo.module.css';
import * as yup from 'yup';
import classNames from "classnames";
import { ProfileFormikType, ProfileType } from "../../../Types/Types.ts";
import Preloader from "../../common/Preloader/Preloader.tsx";


const validationSchema = yup.object().shape({
  fullName: yup.string().required('Заполните пустое поле'),
  lookingForAJobDescription: yup.string().required('Заполните пустое поле'),
  aboutMe: yup.string().required('Заполните пустое поле'),
})


const ProfileFormik: React.FC<ProfileFormikType> = ({
  profile,
  exitToEditForm,
  updatedProfile,
  isLoading,
  refetch
}) => {


  const handleSubmit = async (profile: ProfileType) => {
    console.log(profile);
    await updatedProfile({ ...profile });
    refetch();
    exitToEditForm();
  };

  if (isLoading) {
    return <Preloader />
  }


  return (

    <div className={s.formBlog}>
      <Formik name={'profile-edite'}
        initialValues={profile}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >

        {({ errors, touched }) => (
          <Form className={s.profileForm}>
            <div className={s.points}>
              <b>Имя: </b> <span>
                <Field type="text" name="fullName" className={classNames(s.field, { [s.errorInput]: errors.fullName && touched.fullName })} />
                {errors.fullName && touched.fullName && (
                  <div className={s.error}>{errors.fullName}</div>
                )}
              </span>
            </div>

            <div className={s.points}>
              <b>Есть ли опыт занятий спортом: </b>
              <span>
                <Field type="checkbox" name="lookingForAJob" />
              </span>
            </div>

            <div className={s.points}>
              <b>Мой любимый вид спорта: </b>
              <span>
                <Field type="text" component={"textarea"} name="lookingForAJobDescription" className={classNames(s.field, { [s.errorInput]: errors.lookingForAJobDescription && touched.lookingForAJobDescription })} />
                {errors.lookingForAJobDescription && touched.lookingForAJobDescription && (
                  <div className={s.error}>{errors.lookingForAJobDescription}</div>
                )}
              </span>

            </div>

            <div className={s.points}>
              <b>Немного про меня: </b>
              <span>
                <Field type="text" component={"textarea"} name="aboutMe" className={classNames(s.field, { [s.errorInput]: errors.aboutMe && touched.aboutMe })} />
                {errors.aboutMe && touched.aboutMe && (
                  <div className={s.error}>{errors.aboutMe}</div>
                )}
              </span>
            </div>
            <div>
              <button type="submit" className={s.changeProfile}>Подтвердить</button>
            </div>
          </Form>
        )}

      </Formik>
    </div>


  );
}

export default ProfileFormik;