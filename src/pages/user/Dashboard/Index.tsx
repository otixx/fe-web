import Card from "../../../components/user/Hero/Card"
import Carousel from "../../../components/user/Hero/Carousel"
import Data from "../../../components/user/Hero/Data"
const Index = () => {
    // useEffect(() => {
    //     const getRefresh = async () => {
    //         try {
    //             const response = await axios.get(`/user/token`, {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`
    //                 }
    //             })
    //             setToken(response.data)
    //             console.log(token, "initoken")
    //             const decode = jwtDecode(response.data)
    //             console.log(decode, "ini token decode ")
    //         } catch (error: any) {
    //             console.log(error.response)
    //         }
    //     }
    //     getRefresh()
    // }, [])
    return (
        <div>
            <Carousel />
            <div className="container mx-auto py-5 md:block lg:block">
                <div className="flex justify-end w-full">
                    <form>
                        <label htmlFor="default-search" className=" mb-2 text-sm font-medium text-white sr-only">Search</label>
                        <div className="relative">
                            <div className="absolute text-white text-[20px] inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="text" className="w-full block py-3.5 px-60 pl-10 text-[14px] text-black border-2 border-gray-300 rounded-full bg-gray-50 focus:outline-none" placeholder="Search Events..." />
                            {/* <button type="submit" className="text-white absolute text-[14px] right-2 bottom-1.5 bg-secondColors hover:bg-mainColors font-medium rounded-full text-sm px-4 py-2">Search</button> */}
                        </div>
                    </form>
                </div>
            </div>
            <div className="container mx-auto grid grid-cols-2 lg:grid-cols-5 pb-10 mb-2 justify-center items-center">
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