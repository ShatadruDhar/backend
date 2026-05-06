authentication-Indentify karna ki request kis user ke pas se aayi hai

authorization-user kya kya kar sakta hai

validation-input ka format sahi hai ki nhi check karna


verification-input ka value sahi hai nhi check karna(email verification)


once a user registers with its data like name,email,password , a token is created for the user , and this token is sent everytime the user makes a request to the server.

Every token is signed by a JWT TOKEN to identify whether this token was made by the server or not