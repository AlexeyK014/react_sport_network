import { FormikErrors, FormikTouched } from "formik"
// import { LoginFormValuesTypeKeys } from "../Components/Login/LoginForm"
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
    savePhoto: () => void
}

export type ProfileInfoType = {
    profile: ProfileType | undefined;
    id: number | null;
    userId: number | null;
    refetch: () => void;
    targets: TargetType[] | undefined;
    updatedTarget: (target: TargetType) => Promise<void>;
}

export type StatusType = {
    status: string | null;
    statusText: string;
}

export type ProfileStatusHOOKSType = {
    userId: number | null;
    id: number | null;
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
    userId: number,
    loginUser: string,
}

export type Params = {
    userId: number | undefined
}

export type ProfileDataType = {
    profile: ProfileType | undefined
    goToEditeMode: () => void
    userId: number | null
    id: number | null
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
    // name: LoginFormValuesTypeKeys
    component: string | React.Component
    validate: Array<FieldValidatorType>
}

export type PaginatorPropsType = {
    totalUsersCount: number,
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
    refetch: () => void
    follow: (id: UserType) => void,
    unfollow: (userId: UserType) => void,
}

export type UsersSearchType = {
    onFilterChanged: (filter: FilterType) => void
}

export type FriendFormType = "true" | "false" | "null"
export type FormType = {
    term: string,
    friend: FriendFormType
}

export type TargetType = {
    id: number;
    target?: string | null;
    completed?: boolean;
}

export type EditTargetFormProps = {
    editTargetText: (target: { id: number; target: string | null | undefined }) => void;
    handleEditFormHide: () => void;
    selectedTarget: TargetType | null;
    updatedTargetText: (target: { id: number; target: string | null | undefined }) => void;
}

export type TargetProps = {
    target: TargetType;
    updatedTarget: (target: TargetType) => void;
    deleteTarget: (args: { id: number }) => void;
    handleEditFormShow: () => void;
    handleSelectTarget: (target: TargetType) => void;
}

export type TargetFromProps = {
    addTarget: (target: TargetType) => void;
}

export type BlogPropsType = {
    userId: number;
}

export type PostType = {
    id: string;
    title: string;
    description: string;
    liked: boolean;
}

export type PostPropsType = {
    userId: number;
    post: PostType;
    updatedPost: (post: PostType) => void;
    likeCount: number;
    deletePost: (post: { id: string }) => void;
    handleEditFormShow: () => void;
    handleSelectPost: () => void;
}

export type ProfileFormikType = {
    profile: ProfileType;
    exitToEditForm: () => void;
    updatedProfile: (profile: ProfileType) => Promise<void>;
    isLoading: boolean;
    refetch: () => void;
};


export type NewsItem = {
    author: string | null;
    content: string;
    title: string;
    description: string;
    source: SourceNewstype
    url: string;
    urlToImage: string;
    publishedAt: string;
}

export type SourceNewstype = {
    id: string | null;
    name: string
}

export type LoginRequest = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha?: string;
}

export type AuthResponse = {
    data: {
        userId: number;
        login: string;
        email: string;
    };
    resultCode: number;
    messages: string[];
}

export type AuthResponseDataType = {
    userId: number; // userId опционален
    resultCode: number;
}