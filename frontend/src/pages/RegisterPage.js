import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import { registerUser } from "../api/authApi";

const RegisterPage = ()=>{

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();

        setError("");
        setSuccessMessage("");

        try{
            const response = await registerUser({
                name:name,
                email:email,
                password:password,
                password_confirmation:passwordConfirmation,
            });

            console.log("ユーザ登録成功:,response");
            setSuccessMessage("ユーザ登録が完了しました。ログインページへ移動します。");

            setTimeout(()=>{
                navigate("/login");
            },2000)

        }catch(err){
            console.error("ユーザ登録エラー",err);

            if(err.reponse){
                if(err.response.status === 422){
                    const errors = err.response.data;
                    let errorMessages = "";
                    for (const key in errors){
                        if(errors.hasOwnProPerty(key)){
                            errorMessages += `${errors[key].join(", ")}\n`;
                        }
                    }
                    setError(errorMessages);
                }else {
        setError(`エラーが発生しました: ${err.response.status} - ${err.response.statusText}`);
        }
    } else if (err.request) {
        setError('ネットワークエラー: サーバーに接続できませんでした。');
    } else {
        setError('予期せぬエラーが発生しました。');
    }
        }
    };

    return (
        <div>
            <h2>ユーザ登録</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">
                        名前:
                    </label>
                    <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="email">メールアドレス:</label>
                    <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                    />
                </div>
                <div>
                    <label htmlFor = "password">パスワード:</label>
                    <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                    />
                </div>
                <div>
                    <label htmlFor = "password_confirmation">パスワード確認:</label>
                    <input
                    type="password"
                    id="password_cofirmation"
                    value={passwordConfirmation}
                    onChange={(e)=>setPasswordConfirmation(e.target.value)}
                    required
                    />
                </div>
                {error && <p style={{ color: 'red', whiteSpace: 'pre-wrap' }}>{error}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                <button type="submit">登録</button>
            </form>
        </div>
    )
}
export default RegisterPage;