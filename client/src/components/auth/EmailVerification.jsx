import React, { useEffect, useRef, useState } from 'react'
import Container from '../Container'
import Title from '../../form/Title'
import FormInput from '../../form/FormInput'
import Submit from '../../form/Submit'
import CustomLink from '../../form/CustomLink'

const OTP_LENGTH = 6

const EmailVerification = () => {
  const [otp ,setOtp] =useState(new Array(OTP_LENGTH).fill(""))
  const [activeOtpIndex , setActiveOtpIndex] = useState(0)

  const inputRef = useRef()

  const handleOtpChange = ({target},index)=>{
    const {value} = target;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length-1,value.length)
    setOtp([...newOtp])
    setActiveOtpIndex(index+1)
  }

  useEffect(()=>{
    inputRef.current?.focus()
  },[activeOtpIndex])

  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
    <Container>
      <form className="bg-secondary rounded p-6 space-y-6">
        <div>
        <Title>Please Enter the OTP to verify your account.</Title>
        <p className='text-center text-dark-subtle'>OTP has been sent to your email</p>
        </div>
        <div className='flex justify-center items-center space-x-4'>

        {
          otp.map((_,index)=>{
            return( 
            <input
            ref={activeOtpIndex === index? inputRef:null} 
            key={index}
            type='number'
            value={otp[index] || ""}
            onChange={(e)=>handleOtpChange(e,index)}
            className='w-12 h-12 border-2 border-dark-subtle focus:border-white rounded bg-transparent outline-none text-center text-white font-semibold text-xl'/>)
          })
        }
        </div>
        <Submit value='Send Link'/>
      </form>
    </Container>
  </div>
  )
}

export default EmailVerification