import styles from "./styles/login.module.css"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import {api} from "../../services/api"

export const Signup = ()=> {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()
    const handleSignup = async ()=>{
        await api.post("/oapi/signup",{name, email, password, confirmPassword})
        .then((data)=>{
            toast.success(data.data.success)
            console.log(data.data);
            setName("")
            setEmail("")
            setPassword("")
            setConfirmPassword("")
            navigate("/")
            
        })
        .catch((err)=>{
            console.log(err.response.data);
            toast.error(err.response.data.error)
        })
    }

    return(
        <div className={styles.wrapper}>
            <div className={styles.box_login}>
                <h2 className={styles.title}>Criar conta</h2>
                <label htmlFor="">Nome:</label>
                <input type="text" 
                    className={styles.input_login}
                    placeholder="Insira o nome"
                    value={name}
                    onChange={(e: ChangeEvent<HTMLInputElement>)=>{setName(e.target.value)}}/>
                <label htmlFor="">E-mail:</label>
                <input type="text" 
                    className={styles.input_login}
                    placeholder="Insira o email"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>)=>{setEmail(e.target.value)}}/>
                <label htmlFor="">Senha:</label>
                <input type="text" 
                    className={styles.input_login}
                    placeholder="Insira a senha"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>)=>{setPassword(e.target.value)}}/>
                <label htmlFor="">Confirme a senha:</label>
                <input type="text" 
                    className={styles.input_login}
                    placeholder="Insira a senha"
                    value={confirmPassword}
                    onChange={(e: ChangeEvent<HTMLInputElement>)=>{setConfirmPassword(e.target.value)}}/>
                <button className={styles.btn_submit} onClick={handleSignup}>Enviar</button>
            </div>
        </div>
    )
}