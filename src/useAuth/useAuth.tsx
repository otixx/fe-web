import axios from "../api/axios"
import jwtDecode from "jwt-decode"


export const refreshToken = async () => {
    try {
        const response = await axios.get('/user/token')
        const responseData = response.data
        jwtDecode(responseData.data)
    } catch (error) {
        console.log(error)
    }
}