import styles from "./styles/login.module.css"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import {useFormik} from "formik"
import * as yup from "yup"
import 'react-toastify/dist/ReactToastify.css';
import {api} from "../../services/api"

export const Signup = ()=> {
    const navigate = useNavigate()

    const signupSchema = yup.object().shape({
        name: yup.string().required("O nome é obrigatório").min(3, "O nome deve ter mais de 3 caracteres"),
        email: yup.string().email("Email inválido").required("O email é obrigatório"),
        password: yup.string().min(6, "A senha deve ter mais de 6 dígitos").required("A senha é obrigatória"),
        confirmPassword: yup.string().oneOf([yup.ref("password"), ""],"A confirmação de senha deve ser igual a senha").required("A confirmação de senha é obrigatória")

    })

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: signupSchema,
        onSubmit: async (values, actions)=> {
            await api.post("/oapi/signup", values)
            .then((resp)=>{
                toast.success(resp.data.success)
                navigate("/")
                
            })
            .catch((err)=>{
                console.log(err.response.data);
                toast.error(err.response.data.error)
                actions.resetForm()
            })
        }
    })

    return(
        <div className={styles.wrapper}>
            <form className={styles.box_login} onSubmit={formik.handleSubmit}>
                <h2 className={styles.title}>Criar conta</h2>
                <label htmlFor="name" className={styles.label}>Nome:</label>
                <input type="text"
                    name="name"
                    id="name"
                    className={`${styles.input_login} ${formik.errors.name && formik.touched.name ? styles.input_error : ""}`}
                    placeholder="Insira o nome"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}/>
                {formik.errors.name ? <span className={styles.error}>{formik.errors.name}</span> : null}

                <label htmlFor="email" className={styles.label}>E-mail:</label>
                <input type="text"
                    id="email"
                    name="email" 
                    className={`${styles.input_login} ${formik.errors.email && formik.touched.email ? styles.input_error : ""}`}
                    placeholder="Insira o email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}/>
                {formik.errors.email ? <span className={styles.error}>{formik.errors.email}</span> : null}

                <label htmlFor="password" className={styles.label}>Senha:</label>
                <input type="password" 
                    id="password"
                    name="password"
                    className={`${styles.input_login} ${formik.errors.password && formik.touched.password ? styles.input_error : ""}`}
                    placeholder="Insira a senha"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}/>
                {formik.errors.password ? <span className={styles.error}>{formik.errors.password}</span> : null}

                <label htmlFor="confirmPassword" className={styles.label}>Confirme a senha:</label>
                <input type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className={`${styles.input_login} ${formik.errors.confirmPassword && formik.touched.confirmPassword ? styles.input_error : ""}`}
                    placeholder="Insira a senha"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}/>
                {formik.errors.confirmPassword ? <span className={styles.error}>{formik.errors.confirmPassword}</span> : null}

                <button className={styles.btn_submit} type="submit">Enviar</button>
            </form>
        </div>
    )
}