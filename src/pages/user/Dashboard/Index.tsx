import { useEffect,useState } from "react"
import Card from "../../../components/user/Hero/Card"
import Carousel from "../../../components/user/Hero/Carousel"
import Data from "../../../components/user/Hero/Data"
import axios from "../../../api/axios"
import jwtDecode from "jwt-decode"
const Index = () => {
    const [token, setToken] = useState('')
    useEffect(() => {
        const getRefresh = async () => {
            try {
                const response = await axios.get(`/user/token`,{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                setToken(response.data)
                console.log(token,"initoken")
                const decode = jwtDecode(response.data)
                console.log(decode,"ini token decode ")  
            } catch (error: any) {
                console.log(error.response)
            }
        }
        getRefresh()
    }, [])
    return (
        <div>
            <Carousel />
            <div className="container mx-auto grid grid-cols-2 lg:grid-cols-5 px-5 pb-10 mb-2 justify-center items-center">
                {Data.map((item, index) => (
                    <div className="p-2" key={index}>
                        <Card image={item.image} title={item.title} date={item.date} price={item.price} oldPrice={item.oldPrice} location={item.location} />
                    </div>
                ))}
            </div>

        </div >
    )
}

export default Index