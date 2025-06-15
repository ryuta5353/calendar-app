import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import { loginUser } from "../api/authApi";

const LoginPage =()=>{

    const [email,setEmail]= useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');


    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();

        setError("");
        setSuccessMessage("");

        try{
            const response = await loginUser({
                email:email,
                password:password
            });

            console.log("ログイン成功")
            setSuccessMessage("ログインが成功しました")

            localStorage.setItem("access_token",response.access_token);
            navigate("/");


        }catch(err){
            console.error("ログインエラー",err)

            if(err.response){
                if(err.response.status === 422){
                    const errors = err.response.data;
                    let errorMessages = "";
                    for (const key in errors){
                        if(errors.hasOwnProperty(key)){
                            errorMessages += `${errors[key].join(", ")}\n`;
                        }
                    }
                    setError(errorMessages);
                }else {
        setError(`エラーが発生しました: ${err.response.status} - ${err.response.statusText}`);
        }
    }else if (err.request) {
        setError('ネットワークエラー: サーバーに接続できませんでした。');
    } else {
        setError('予期せぬエラーが発生しました。');
    }
        }


    };
    return (
        <div>
            <h2>ログイン</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor = "email">
                        メールアドレス:
                    </label>
                    <input
                    type="email"
                    id="email"
                    value = {email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                    />
                </div>
                <div>
                    <label htmlFor = "password">
                        パスワード:
                    </label>
                    <input
                    type="password"
                    id="password"
                    value={password}
                    onChange ={(e)=>setPassword(e.target.value)}
                    required
                    />
                </div>
                {error && <p style={{ color: 'red', whiteSpace: 'pre-wrap' }}>{error}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                <button type="submit">ログイン</button>
            </form>
        </div>
    )

}
export default LoginPage;