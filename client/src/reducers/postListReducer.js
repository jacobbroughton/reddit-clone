export const postListReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_POSTS_SUCCESS" :
      return action.payload
      
    case "CREATE_POST_SUCCESS": 
      return [...state, action.payload]

    case "GET_SUBREDDIT_POSTS_SUCCESS" :
        return action.payload

    case "DELETE_POST_SUCCESS": 
      
      const { id } = action.payload
      console.log(id)

      return state.map(post => post.id === id ?  {
        ...post,
        title: '[DELETED]',
        body: '[DELETED]',
        username: '[DELETED]'
      } : post  )
    
    case "EDIT_POST": 
      const { idForEdit, updates } = action

      if(state) {
        console.log(state)
        console.log(idForEdit)

        return state.map(post => post.id === idForEdit ? {
          ...post, 
          body: updates.body
        }: post)
      }

    case "POST_VOTE_SUCCESS":
      const { userId, postId, value } = action.payload
      console.log(userId, postId, value)

      return state
        
    default:
      return state
  }
}