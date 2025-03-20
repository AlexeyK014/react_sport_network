import React, { useEffect, useState } from 'react'
import { Field, Form, Formik } from "formik";
import { useLoginMutation, useSetAuthQuery } from '../../reduxToolkit/auth/slice.ts';
import { useNavigate } from 'react-router-dom';
//@ts-ignore
import s from './LoginForm.module.css';
import { useGetProfileQuery } from '../../reduxToolkit/profile/slice.ts';
import { AuthResponseDataType, LoginRequest } from '../../Types/Types.ts';
import dangerous from '../../img/dangerous.svg'

const LoginFormik: React.FC = () => {

    const [formData] = useState<LoginRequest>({
        email: "",
        password: "",
        rememberMe: false,
        captcha: '',
    })
    const [login] = useLoginMutation()
    const navigate = useNavigate()

    const [skip, setSkip] = useState(true)
    const [skipProfile, setSkipProfile] = useState(true)

    //@ts-ignore
    const { userId, resultCode } = useSetAuthQuery('authUser', {
        skip: skip,
        refetchOnMountOrArgChange: true,
        selectFromResult: ({ data }: { data?: AuthResponseDataType }) => ({
            userId: data?.userId,
            resultCode: data?.resultCode
        })
    })
    const { data } = useGetProfileQuery(userId!, {
        skip: skipProfile || !userId,
    })


    useEffect(() => {
        navigate({
            pathname: `/login`
        })
        console.log('2');
        setSkipProfile(true);
        setSkip(true)
    }, [])


    useEffect(() => {
        console.log(resultCode);

        if (resultCode === 0) {
            navigate({
                pathname: `/profile/${userId}`
            })
            console.log('Данные из LoginForm');

        } else if (resultCode === 1) {
            navigate({
                pathname: `/login`
            })
            setSkipProfile(true);
            setSkip(true)
            console.log('33');
        }

    }, [resultCode, navigate, userId])

    return (
        <Formik
            initialValues={formData}
            validate={values => {
                const errors: Partial<LoginRequest> = {};
                if (!values.email) {
                    errors.email = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }
                return errors;
            }}
            onSubmit={async (values, { resetForm }) => {
                await login(values);
                console.log(values);
                resetForm();
                setSkip(false);
            }}
        >
            <Form className={s.formPage}>
                <div className={s.inputForm}>
                    <h1>Войти</h1>

                    <div>
                        {resultCode === 1 && <div className={s.incorrectForm}>
                            <img src={dangerous}/>
                            <div className={s.incorrectText}>
                                Неверный пароль или логин
                            </div>
                        </div>
                        }
                    </div>

                    <div className={s.fieldForm}>
                        <Field type="text" name="email" component={"input"} placeholder={'login...'} />
                    </div>
                    <div  className={s.fieldForm}>
                        <Field type="password" name="password" component={"input"} placeholder={'password...'} />
                    </div>
                </div>

                <div>
                    <button type="submit" className={s.btnLogin}>Войти</button>
                </div>
            </Form>
        </Formik>

    )
}

export default LoginFormik