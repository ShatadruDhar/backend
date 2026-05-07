const express=require("express")
const app=express()
const AuthRouter=require("./routes/auth.routes")
const  cookieParser=require("cookie-parser")
//package imported and used as a middleware so that we can store data in cookie storage
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth",AuthRouter)
//this is necessary to import the AuthRouter through which we created an api in different file to import here and write it in the middleware Otherwise Express does not know those routes  and api exist.
//| Inside AuthRouter | Final API Route      |
// | ----------------- | -------------------- |
// | `/login`          | `/api/auth/login`    |
// | `/register`       | `/api/auth/register` |

module.exports=app