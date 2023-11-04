import { useEffect } from 'react'
import { themeChange } from 'theme-change'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPalette, faCircle } from '@fortawesome/free-solid-svg-icons'

const ThemeChange=()=>{
    useEffect(() => {
        themeChange(false)
      }, [])
      themeChange()
    return(
        <div className="dropdown dropdown-hover">
            <div tabIndex={0} className="btn btn-ghost m-1"><FontAwesomeIcon icon={faPalette}/></div>
                <div tabIndex={0} className="dropdown-content z-10 menu p-2 shadow bg-base-100 rounded-box w-80 flex-row flex-wrap gap-5 justify-center">
                    <button data-set-theme="dark" className='btn btn-ghost'><FontAwesomeIcon icon={faCircle} className='text-black'/> DARK</button>
                    <button data-set-theme="light" className='btn btn-ghost'><FontAwesomeIcon icon={faCircle} className='text-white'/> LIGHT</button>
                    <button data-set-theme="valentine" className='btn btn-ghost'><FontAwesomeIcon icon={faCircle} className='text-pink-400'/> PINK</button>
                    <button data-set-theme="aqua" className='btn btn-ghost'><FontAwesomeIcon icon={faCircle} className='text-blue-400'/> AQUA</button>
                </div>
        </div>
    )
}
export default ThemeChange