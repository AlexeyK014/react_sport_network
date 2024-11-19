import profileReducer, { actions } from "./profile-reducer";

  
 // новый State при переданном старом State, будет такой же какой мы ожидаем получить


it('length new post should be incremented', () => {
  // 1. test data
  let action = actions.addPost('freestyle');
  let state = {
    postData: [
        {id: 1, post: "Привет", like: 5},
        {id: 2, post: "Как дела?", like: 10},
    ],
    profile: null,
    status: "",
    newPostText: ''
}

  // 2. action
  let newState = profileReducer(state, action);

  // 3. ожидания
  expect( newState.postData.length).toBe(3)
});

/// Удаление поста
it('delete post', () => {
  // 1. test data
  let action = actions.deletePost(1);
  let state = {
    postData: [
        {id: 1, post: "Привет", like: 5},
        {id: 2, post: "Как дела?", like: 10},
    ],
    profile: null,
    status: "",
    newPostText: ''
}

  // 2. action
  let newState = profileReducer(state, action);

  // 3. ожидания
  // expect( newState.postData.length).toBe(1)
});