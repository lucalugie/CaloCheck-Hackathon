
function Login() {
    return (
        <>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button className="btn" onClick={()=>document.getElementById('my_modal_4').showModal()}>เข้าสู่ระบบ</button>
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box p-0">
                    <h3 className="p-4 text-lg  bg-neutral flex justify-center text-neutral-content ">เข้าสู่ระบบ / สมัครสมาชิก</h3>
                <div className="modal-action flex flex-col">
                <div className="p-2 flex justify-center text-xl">
                    <button  className="btn w-full flex flex-row">
                    <img alt='google' className="w-9 h-9" src='https://img.icons8.com/color/48/000000/google-logo.png' />
                        <span className='text-sm'>Continue with Google</span>
                    </button>
                </div>
                
                <p className="p-2 flex justify-center text-xl"> หรือ </p>
                <div className="p-2 flex justify-center flex-col">
                <input type="text" placeholder="กรุณากรอกอีเมล" className="input input-bordered w-full max-w-xl" />
                </div>
                <div className="p-2 flex justify-end">

                </div>
                <div className="p-2 flex justify-center text-xl">
                <button className="btn text-base">ดำเนินการต่อ</button>
                </div>

                </div>
            </div>
            
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
</dialog>
        </>
    );
}
export default Login;