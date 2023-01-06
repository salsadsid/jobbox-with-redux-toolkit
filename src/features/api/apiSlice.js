import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_DEV_URL
    }),
    endpoints: (builer) => ({}),
    tagTypes: ["Jobs", "Job"]
})

export default apiSlice