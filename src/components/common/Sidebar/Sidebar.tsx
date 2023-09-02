import { useState } from "react"

const Sidebar = () => {
    const [activeIndex, setactiveIndex] = useState(0)
    const dataSide = [
        {
            name: "Event"
        }, {
            name: "Riwayat Pembeli"
        }, {
            name: "Edit Profile EO"
        }
    ]
    return (
        <div className="w-1/6 h-screen border-r-2 border">
            <div className="flex flex-col">
                <div className="sd">
                    <img src="" alt="" />
                </div>
                <div className="px-4 py-10">
                    {
                        dataSide.map((element, index) => (
                            <div key={index} className="py-2">
                                <div className={`${activeIndex === index ? `bg-secondColors text-white` : " "} rounded-sm px-2 cursor-pointer font-bold text-lg`}>
                                    {element.name}
                                </div>
                            </div>
                        ))
                    }
                </div>


            </div>
        </div>
    )
}

export default Sidebar