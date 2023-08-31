import styles from "./styles/login.module.css"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import * as yup from "yup"
import { useFormik} from "formik"
import 'react-toastify/dist/ReactToastify.css';
import { api } from "../../services/api"

 export const Login = ()=>{

    const navigate = useNavigate()

    const loginSchema = yup.object().shape({
        email: yup.string().email("Email inválido").required("O email é obrigatório"),
        password: yup.string().required("A senha é obrigatória").min(6,"A senha deve ter mais de 6 dígitos")
    })

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: loginSchema,
        onSubmit: async (values, actions) =>{
            
            await api.post("/oapi/login", values)
                .then((resp)=>{
                    toast.success(resp.data.success)
                    navigate("/home")
                    
                }).catch((err)=>{
                    toast.error(err.response.data.error)
                    actions.resetForm()
                   
                })
        }
    })

    
    return(
        <div className={styles.wrapper}>
                <form onSubmit={formik.handleSubmit} className={styles.box_login} >
                    <h2 className={styles.title}>Login</h2>
                    <label htmlFor="email" className={styles.label}>E-mail:</label>
                    <input id="email"
                        name="email" 
                        className={`${styles.input_login} ${formik.errors.email && formik.touched.email ? styles.input_error : ""}`}
                        type="text" 
                        placeholder="Insira o email"
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}/>
                    {formik.errors.email ? <span className={styles.error}>{formik.errors.email}</span> : null}
                    <label htmlFor="password" className={styles.label}>Senha:</label>
                    <input id="password"
                        name="password" 
                        className={`${styles.input_login} ${formik.errors.password ? styles.input_error : ""}`} 
                        type="password" 
                        placeholder="Insira a senha"
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        onChange={formik.handleChange}/>
                    {formik.errors.password ? <span className={styles.error}>{formik.errors.password}</span> : null}
                    <button className={styles.btn_submit} type="submit">Entrar</button>

                    <p>Não tem uma conta? <span className={styles.create_acc} onClick={()=>{navigate("/signup")}}>Inscreva-se</span></p>
                </form>
        </div>
    )
}