
import { tokenType, userType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type UserStateType = {
  user: userType
  tokens: {
    refresh: string,
    access: string,
  }


}

export const DEFAULT_USER = {
  id: null,
  username: '',
  first_name: '',
  last_name: '',
  email: '',
}

// первоначальное состояние
const initialState: UserStateType = {
  user: {
    id: null,
    username: '',
    first_name: '',
    last_name: '',
    email: '',
  },

  tokens: {
    refresh: '',
    access: '',
  }
}



const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userType>) => {
      state.user = action.payload
    },
    setToken: (state, action: PayloadAction<tokenType>) => {
      console.log(action.payload);
      state.tokens = action.payload
    },
  }
})


export const userReducer = userSlice.reducer

export const { setUser } = userSlice.actions
export const { setToken } = userSlice.actions
