import React from 'react'
import ContactUsForm from '../ContactPage/ContactUsForm'

function ContactFormSection() {
  return (
    <div className='mx-auto flex flex-col gap-6'>
        <h1 className='text-center text-[36px] font-semibold leading-[44px] text-richblack-5'>Get in Touch </h1>
        <p className='text-[#838894] text-[16px] font-medium text-center leading-[24px] '>We’d love to here for you, Please fill out this form.</p>
        <div>

            <ContactUsForm />
        </div>

    </div>
  )
}

export default ContactFormSection