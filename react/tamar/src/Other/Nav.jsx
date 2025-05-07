import { NavLink } from 'react-router-dom'
import './Style.css'
import { useSelector } from 'react-redux';

export const Nav = () => {
    debugger
  const currentAdvertiser = useSelector(myStore => myStore.currentAdvertiser)
    console.log({currentAdvertiser});
    

    return <>
    <div className='backNav'>
        <div className='Nav'>
            <NavLink to={'HomePage'} className='link'>דירות</NavLink>
            <NavLink to={'Login'} className='link'>פרסום דירה</NavLink>
            {currentAdvertiser&&currentAdvertiser._id && <NavLink to={'connectAdvertiser'} className='link'>מפרסם</NavLink>}
        </div>
        </div>
    </>
}