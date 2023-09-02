import Sidebar from "../../../components/common/Sidebar/Sidebar"
import dataEvent from "../../../api/dummy.json"
const Riwayat = () => {
    return (
        <div className="flex flex-row">
            <Sidebar />
            <div className="py-4 px-4 w-full">
                <div className="">
                    <h1 className="font-bold text-2xl">
                        Tiket
                    </h1>
                </div>
                <div className="py-4">
                    <div className=" bg-red-200 shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                                List Tiket
                                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Lihat Semua Data anda disini</p>
                            </caption>
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Nama Tiket
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Harga
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Tags
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Tgl Preorder
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Tgl Exp
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dataEvent.map((element, index) => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {element?.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {element?.harga}
                                            </td>
                                            <td className="px-6 py-4">
                                                {element?.tags}
                                            </td>
                                            <td className="px-6 py-4">
                                                {element?.tgl_pre}
                                            </td>
                                            <td className="px-6 py-4">
                                                {element?.tgl_exp}
                                            </td>
                                            <td className="flex gap-4 text-center px-6 py-4">
                                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Riwayat