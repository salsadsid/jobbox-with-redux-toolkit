import { useState } from "react"
import { useForm } from "react-hook-form"
import { BsArrowReturnRight, BsArrowRightShort } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Loading from "../components/reusable/Loading"
import { useGetUserDetailsQuery, useSendMessageMutation, useSendMsgReplyMutation } from "../features/auth/authApi"


const CandidateDetail = () => {
    const [reply, setReply] = useState("")
    const { id } = useParams()
    console.log(id)
    const { data, isLoading } = useGetUserDetailsQuery(id, { pollingInterval: 1000 })
    const { register, handleSubmit, reset } = useForm()
    const { user } = useSelector(state => state.auth)
    const [sendMessage] = useSendMessageMutation()
    const [sendMsgReply] = useSendMsgReplyMutation()
    if (isLoading) {
        return <Loading></Loading>
    }
    const { _id, firstName, lastName, address, gender, email, chat } = data?.data
    console.log(firstName, lastName)
    const handleMessage = (data) => {
        const msgData = {
            ...data,
            userId: _id,
            employerId: user._id,
        }
        console.log(msgData)
        sendMessage(msgData)
        reset()
    }
    const handleReply = (id) => {
        const data = {
            reply: reply,
            employerId: id
        }
        console.log(data)
        sendMsgReply(data)
    }
    return <div className="flex flex-col items-center pt-14 bg-orange-200 rounded-2xl shadow-xl">
        <h1>{firstName} {lastName}</h1>
        <p>Sex: {gender}</p>
        <p>Email: {email}</p>
        <p>Address: {address}</p>
        <div>
            <h1 className='text-xl font-semibold text-primary mb-5'>
                Chat
            </h1>
            <div className='text-primary my-2'>
                {chat?.map(({ message, reply, employerId }) => (
                    <div>
                        <p className='text-lg font-medium'>{message}</p>
                        {reply?.map((item) => (
                            <p className='flex items-center gap-2 relative left-5'>
                                <BsArrowReturnRight /> {item}
                            </p>
                        ))}

                        {<div className='flex gap-3 my-5'>
                            <input placeholder='Reply' type='text' className='w-full'
                                onBlur={(e) => setReply(e.target.value)} />
                            <button
                                className='shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white'
                                type='button'
                                onClick={() => handleReply(employerId)}
                            >
                                <BsArrowRightShort size={30} />
                            </button>
                        </div>}
                    </div>
                ))}
            </div>

            {user.role === "employer" && <form onSubmit={handleSubmit(handleMessage)}>
                <div className='flex gap-3 my-5'>
                    <input
                        placeholder='Ask a question...'
                        type='text'
                        className='w-full'
                        {...register("message")}
                    />
                    <button
                        className='shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white'
                        type='submit'
                    >
                        <BsArrowRightShort size={30} />
                    </button>
                </div>
            </form>}
        </div>
    </div>
}

export default CandidateDetail