const initialState = {
  popup: false,
  isLogin: false,
  isLoaing: false,
  user: {},
  catatan:[]
}

const reducer = (state = initialState, action) => {
  if (action.type === 'CHANGE_POPUP') {
    return {
      ...state,
      popup: action.value
    }
  }
  if (action.type === 'CHANGE_ISLOGIN') {
    return {
      ...state,
      isLogin: action.value
    }
  }
  if (action.type === 'CHANGE_USERNAME') {
    return {
      ...state,
      user: action.value
    }
  }
  if (action.type === 'CHANGE_ISLOADING') {
    return {
      ...state,
      isLoading: action.value
    }
  }
  if (action.type === 'SET_CATATAN') {
    return {
      ...state,
      catatan: action.value
    }
  }
  return state;
}

export default reducer;