const DetailPayment = () => {
    return (
        <div className="container mx-auto">
            <div className="p-4">
                <div className="grid grid-cols-5 gap-4">
                    <div className="col-span-5 lg:col-span-3 rounded-sm p-4 gap-2 lg:order-1 order-2">
                        <div className="mt-2 py-4">
                            <h1 className="font-bold text-2xl">Detail Pemesanan</h1>
                        </div>
                        <div className="flex py-4 justify-between">
                            <h1 className="font-bold text-[16px]">Tiket Wibu</h1>
                            <h1 className="font-semibold text-[#666666]">Rp. 12000</h1>
                        </div>
                        <hr />
                        <div className="py-4">
                            <input type="text" className="w-full p-2 rounded-md border-2" placeholder="isi cosplay" />
                        </div>
                        <div className="flex py-4 justify-between">
                            <h1 className="font font-semibold text-[14px]">Qty</h1>
                            <h1 className="font-semibold text-[#666666]" >x 2</h1>
                        </div>
                        <hr />
                        <div className="flex py-4 justify-between">
                            <h1 className="font font-semibold text-[14px]">Total</h1>
                            <h1 className="font-semibold ">Rp. 24000</h1>
                        </div>
                        <div className="flex flex-col py-4">
                            <button className="bg-secondColors font-semibold text-[14px] px-8 py-2.5 rounded-sm text-white"> Buat Tagihan Pembayaran</button>
                            <p className="py-2 font-semibold text-[#666666] text-[12px]">
                                Dengan checkout, Anda setuju dengan Ketentuan Penggunaan kami dan mengonfirmasi bahwa Anda telah membaca Kebijakan Privasi kami. Anda dapat membatalkan biaya perpanjangan layanan kapan saja.
                            </p>
                        </div>

                    </div>
                    <div className="col-span-5 rounded-sm shadow-lg order-2 p-4 lg:col-span-2 lg:order-1">
                        <h1 className="font-bold text-2xl p-4"> Pilih Metode Pembayaran</h1>
                        <div className="flex-col flex gap-4">
                            <div className="flex border-2 justify-between cursor-pointer rounded-sm shadow-sm p-4">
                                <div className="flex  gap-2">
                                    <input type="radio" name="click" id="" />
                                    <h1 className="font-semibold text-[16px]">BRI Virtual Account</h1>
                                </div>
                                <img className="w-20 right-0" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/BANK_BRI_logo.svg/126px-BANK_BRI_logo.svg.png?20180118061811" alt="" />
                            </div>
                            <div className="flex border-2 rounded-sm justify-between shadow-sm p-4">
                                <div className="flex gap-2">
                                    <input type="radio" name="click" id="" />
                                    <h1 className="font-semibold text-[16px]">BCA Virtual Account</h1>
                                </div>
                                <img className="w-20 right-0" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/799px-Bank_Central_Asia.svg.png" alt="" />
                            </div>
                            <div className="flex border-2 justify-between cursor-pointer rounded-sm shadow-sm p-4">
                                <div className="flex  gap-2">
                                    <input type="radio" name="click" id="" />
                                    <h1 className="font-semibold text-[16px]">Mandiri Virtual Account</h1>
                                </div>
                                <img className="w-20 right-0" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/213px-Bank_Mandiri_logo_2016.svg.png?20211228163717" alt="" />
                            </div>
                            <div className="flex border-2 justify-between cursor-pointer rounded-sm shadow-sm p-4">
                                <div className="flex  gap-2">
                                    <input type="radio" name="click" id="" />
                                    <h1 className="font-semibold text-[16px]">BNI Virtual Account</h1>
                                </div>
                                <img className="w-20 right-0" src="https://upload.wikimedia.org/wikipedia/en/2/27/BankNegaraIndonesia46-logo.svg" alt="" />
                            </div>
                            <div className="flex border-2 justify-between cursor-pointer rounded-sm shadow-sm p-4">
                                <div className="flex  gap-2">
                                    <input type="radio" name="click" id="" />
                                    <h1 className="font-semibold text-[16px]">Gopay</h1>
                                </div>
                                <img className="w-24 right-0" src="https://upload.wikimedia.org/wikipedia/commons/8/86/Gopay_logo.svg" alt="" />
                            </div>
                            <div className="flex border-2 justify-between cursor-pointer rounded-sm shadow-sm p-4">
                                <div className="flex  gap-2">
                                    <input type="radio" name="click" id="" />
                                    <h1 className="font-semibold text-[16px]">Ovo</h1>
                                </div>
                                <img className="w-20 right-0" src="https://upload.wikimedia.org/wikipedia/commons/e/eb/Logo_ovo_purple.svg" alt="" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailPayment