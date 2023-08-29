import styles from "./styles/login.module.css"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

 export const Login = ()=>{

    const [email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = ()=>{
        console.log("login", email,password);
        navigate("/home")
    }
    return(
        <div className={styles.wrapper}>
            <div className={styles.box_login}>
                <h2 className={styles.title}>Login</h2>
                <label htmlFor="email">E-mail:</label>
                <input id="email" 
                    className={styles.input_login} 
                    type="text" 
                    placeholder="Insira o email"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>)=>{setEmail(e.target.value)}}/>
                <label htmlFor="password">Senha:</label>
                <input id="password" 
                    className={styles.input_login} 
                    type="text" 
                    placeholder="Insira a senha"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>)=>{setPassword(e.target.value)}}/>
                <button className={styles.btn_submit} onClick={handleSubmit}>Entrar</button>
                <p>Não tem uma conta? <span className={styles.create_acc} onClick={()=>{navigate("/signup")}}>Inscreva-se</span></p>
            </div>
        </div>
    )
}