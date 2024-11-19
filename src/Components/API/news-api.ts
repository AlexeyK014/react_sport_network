import axios from "axios"
import { useState } from "react";

export const newsAPI = async () => {

    const resp = await axios.get("https://newsapi.org/v2/top-headlines?country=us&apiKey=9302c67949d945ecb3270ebee2bf7557&category=sport");

    return resp
}