import React, { useState } from 'react'
import {sidebarLinks} from '../../../data/dashboard-links'
import {logout} from '../../../services/operations/authAPI';
import { useNavigate} from 'react-router-dom';
import  SidebarLink  from '../Dashboard/SidebarLink';
import {useDispatch, useSelector} from 'react-redux';
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from '../../common/ConfirmationModal';
function Sidebar() {

    const {user, loading: profileLoading} = useSelector((state) => state.profile);
    const {loading: authLoading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState(null);


    if(profileLoading || authLoading) {
        return (
            <div className='text-xl text-richblack-5 text-center mt-[250px]'>
                Loading...
            </div>
        )
    }

  return (
    <div className='text-richblack-5'>
        <div className='flex min-w-[222px] flex-col border-r-[1px] border-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10'>

            <div className='flex flex-col'>
                {
                    sidebarLinks.map((link) => {
                        if(link.type && user?.accountType !== link.type) return null;
                        return (
                            <SidebarLink link={link} iconName={link.icon} key={link.id}/>
                        )
                    })
                }
            </div>

            <div className='mx-auto my-6 h-[1px] w-10/12 bg-richblack-600'></div>

            <div className='flex flex-col'>
                <SidebarLink link={{name:"Setting", path:"dashboard/settings"}}
                iconName="VscSettings"/>

                <button 
                
                onClick={() => setConfirmationModal({
                        text1:"Are You Sure ?",
                        text2:"You will be logged out of your Account",
                        btn1Text:"Log out",
                        btn2Text:"Cancel",
                        btn1Handler: () => dispatch(logout(navigate)),
                        btn2Handler: () => setConfirmationModal(null),
                    }
                )}
                className='text-sm font-medium w-10/12 px-8 py-2'
                >

                    <div className='flex items-center gap-x-2'>
                        <VscSignOut className='text-lg'/>
                        <span>Log Out</span>
                    </div>
                </button>
            </div>

        </div>

        {confirmationModal && <ConfirmationModal  modalData={confirmationModal}/>}
    </div>
  )
}

export default Sidebar