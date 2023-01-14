import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import Loading from "../components/reusable/Loading"
import { useGetUserDetailsQuery } from "../features/auth/authApi"


const CandidateDetail = () => {
    const { id } = useParams()
    console.log(id)
    const { data, isLoading } = useGetUserDetailsQuery(id)
    if (isLoading) {
        return <Loading></Loading>
    }
    const { firstName, lastName, address, gender, email } = data?.data
    console.log(firstName, lastName)
    return <div className="flex flex-col items-center pt-14 bg-orange-200 rounded-2xl shadow-xl">
        <h1>{firstName} {lastName}</h1>
        <p>Sex: {gender}</p>
        <p>Email: {email}</p>
        <p>Address: {address}</p>
    </div>
}

export default CandidateDetail