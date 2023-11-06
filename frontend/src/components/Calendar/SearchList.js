const SearchList = (props) =>{
    const {username,setStudentCheckedList,studentCheckedList,checked} = props
    const handleCheked = (e) =>{
        if(e.target.checked){
            setStudentCheckedList([...studentCheckedList,username])
        }else{
            setStudentCheckedList(studentCheckedList.filter(e=>e!==username))
        }
    }
    return (
        <>
        <label className="cursor-pointer label">
            <span className="label-text" >{username}</span>
            <input name={username} onChange={(e) => handleCheked(e)} checked={checked} type="checkbox" className="checkbox checkbox-secondary" />
        </label>
        </>
    )
}
export default SearchList