import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { AppStateType } from "../Components/Redux/redux-store.js";
import { useLocation, useNavigate } from "react-router-dom";
import { POSTS_URL } from "../Constants/constants.js";

export const useGetPosts = () => {
  return useQuery<CharacterData, Error>('posts', () => {
    return axios.get(POSTS_URL)
      .then(res => res.data)
      .catch(err => {
        throw new Error(err)
      })
  })
}

export const useGetSinglePost = (postId: string) => {
  return useQuery(['posts', postId], () => {
    return axios.get(POSTS_URL + postId)
      .then(res => res.data)
      .catch(err => {
        throw new Error(err)
      })
  })
}

export const useLikePost= () => {
  const queryClient = useQueryClient();

  return useMutation(
    (updatedPost) => {
      //@ts-ignore
      return axios.put(`${POSTS_URL}${updatedPost.id}`, updatedPost)
        .then(res => res.data)
        .catch(err => {
          throw new Error(err)
        })
    }, {
      onSuccess: (updatedPost) => {
        queryClient.invalidateQueries('posts');
        queryClient.setQueryData(['post', updatedPost.id], updatedPost)
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )
}

export const useDeletePost = () => {
  const userId = useSelector((state: AppStateType) => state.auth.userId);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  return useMutation(
    (blogPost) => {
      //@ts-ignore
      return axios.delete(`${POSTS_URL}${blogPost.id}`)
        .then(res => res.data)
        .catch(err => {
          throw new Error(err)
        })
    }, {
      onSuccess: () => {
        queryClient.invalidateQueries('posts');
        //@ts-ignore
        if (location !== `/profile/${userId}`) {
          navigate(`/profile/${userId}`);
        }
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )
}

export const useEditPost = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (updatedPost) => {
      //@ts-ignore
      return axios.put(`${POSTS_URL}${updatedPost.id}`, updatedPost)
        .then(res => res.data)
        .catch(err => {
          throw new Error(err)
        })
    }, {
      onSuccess: (updatedPost) => {
        queryClient.invalidateQueries('posts');
        queryClient.setQueryData(['post', updatedPost.id], updatedPost)
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )
}

export const useAddPost = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (newBlogPost) => {
      return axios.post(POSTS_URL, newBlogPost)
        .then(res => res.data)
        .catch(err => {
          throw new Error(err)
        })
    }, {
      onSuccess: (data) => {
        console.log('success', data);
        queryClient.invalidateQueries('posts');
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )
}