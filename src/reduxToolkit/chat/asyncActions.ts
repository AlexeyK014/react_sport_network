import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const auth = createAsyncThunk<{}>(
    'auth/setAuthUserData',    // тип преффиксаб название которое используется внутри логики
    async (params) => {


        const {data} = await axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`)
      
      return data;
    },
  )