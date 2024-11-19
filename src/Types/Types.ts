import { FormikErrors, FormikTouched } from "formik"
import { LoginFormValuesTypeKeys } from "../Components/Login/LoginForm"
import { FieldValidatorType } from "../Components/utils/validators/validators"
import { FilterType } from "../Components/Redux/users-reducer"


export type PostDataType = {
    id: number,
    post: string,
    like: number,
    idLike: number,
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type ProfileType = {
    userId: number | null,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    aboutMe: string,
    contacts: ContactsType,
    photos: PhotosType
    status: string
    savePhoto: () => void
}

export type UserType = {
    id: number,
    name: string,
    status: string,
    photos: PhotosType,
    followed: boolean
}

export type DialogType = {
    id: number
    name: string
}
export type MessageType = {
    id: number
    message: string
}

export type AimDataType = {
    id: number
    aim: string,
    description: string,
}

export type HeaderPropsType = {
    profile: ProfileType | null;
    savePhoto: (photos: PhotosType) => void;
    // status: string;
    updateStatus: (status: string) => void;
    saveProfile: (profile: ProfileType) => Promise<any>;
    userIdState: number
    goToEditeMode: () => void
}

export type Params = {
    userId: string | undefined
}

export type ProfileDataType = {
    profile: ProfileType
    isOwner: boolean
    goToEditeMode: () => void
    userId: string | undefined
    userIdState: number | null
}

export type InputPropsType = {
    name?: string
    errors?: FormikErrors<{
      [field: string]: any
    }>
    touched?: FormikTouched<{
      [field: string]: any
    }>
    exitToEditForm: () => void
    profile: ProfileType
}

export type DisaptchPropsType = {
  saveProfileTC?: (profile: ProfileType) => Promise<any>
}
export type FormikPropsType = InputPropsType & DisaptchPropsType

export type FormControlPropsType = {
    meta: {
        touched: boolean
        error: string
    }
}

export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}


export type LoginFormOwnProps = {
    captchaUrl: string 
    placeholder: string
    name: LoginFormValuesTypeKeys
    component: string | React.Component
    validate: Array<FieldValidatorType>
}

export type PaginatorPropsType = {
    totalUsersCount: number, 
    pageSize: number, 
    currentPage: number, 
    onPageChanged: (pageNumber: number) => void, 
    portionSize?: number
}


export type PostCartType = {
    title: string,
    description: string,
    liked: boolean,
    likePost?: () => void,
    deletePost?: () => void,
    handleEditFormShow?: (() => void) | undefined,
    handleSelectPost?: ((blogPost: any) => void) | undefined,
}

export type EditPostFormType = {
    selectedPost: SelectedPostType,
    editBlogPost: (post: PostCartType) => void,
    handleEditFormHide: () => void,
}


export type SelectedPostType = {
    title: string
    description: string
    id: number
    liked: boolean
} 

export type AddPostFormType = {
    addNewBlogPost: (post: PostCartType) => void
}

export type TaskType = {
    id: number
    completed: any
    task: string
}
  export type AimType = {
    task: TaskType,
    deleteTodo: (id: number) => void,
    editTodo: (id: number) => void,
    toggleComplete: (id: number) => void
}

export type AimFormType = {
    addTodo: (value: string) => void
}

export type NewDataType = {
    title: string
    description: string
    author: boolean
}

export type UserPropsType = {
    user: UserType
    followingInProgress: Array<number>
    followTC: (userId: number) => void,
    unfollowTC: (userId: number) => void,
}

export type UsersSearchType = {
    onFilterChanged: (filter: FilterType) => void
}

export type FriendFormType = "true" | "false" | "null"
export type FormType = {
    term: string,
    friend: FriendFormType
}