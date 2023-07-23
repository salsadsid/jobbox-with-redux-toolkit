import apiSlice from "../api/apiSlice";
import { getUser } from "./authSlice";


const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                method: "POST",
                url: "/user",
                body: data
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                try {
                    const res = await queryFulfilled;
                    dispatch(getUser(data.email))
                } catch (error) {

                }
            }
        }),
        getUserDetails: builder.query({
            query: (id) => ({
                url: `/user-detail/${id}`
            })
        }),
        sendMessage: builder.mutation({
            query: (data) => ({
                url: "/send",
                method: "PATCH",
                body: data
            }),
        }),
        sendMsgReply: builder.mutation({
            query: (data) => ({
                url: "/msg-reply",
                method: "PATCH",
                body: data
            }),
        }),
    })
})

export const { useRegisterMutation, useGetUserDetailsQuery, useSendMessageMutation, useSendMsgReplyMutation } = authApi