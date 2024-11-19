import { Field, Form, Formik } from "formik";
import React from "react";
import { FilterType } from "../Redux/users-reducer";
//@ts-ignore
import style from './Users.module.css'
import { FormType, UsersSearchType } from "../../Types/Types";

const usersFormValidate = (values: any) => {
    const errors = {};
    return errors;
}


const UsersFormSearch: React.FC<UsersSearchType> = React.memo(({onFilterChanged}) => {

    const submit = (values: FormType,  { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void}) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }
        onFilterChanged(filter);
        setSubmitting(false);
    }

    return <div>
        <h3>Поиск друзей</h3>
        <Formik
            initialValues={{term: '', friend: 'null'}}
            validate={usersFormValidate}
            //@ts-ignore
            onSubmit={submit}
        >
            {({ isSubmitting }) => (
                <Form className={style.searchForm}>
                    <Field type="text" name="term" />
                    <Field as="select" name="friend">
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Найти
                    </button>
                </Form>
            )}
        </Formik>
    </div>
})

export default UsersFormSearch