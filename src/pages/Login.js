import { useState } from 'react';
import styles from '../styles/login.module.css'
import { toast } from 'react-toastify';
import { useAuth } from '../hooks';

const Login=()=>{

    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [logginIn, setLogginIn]=useState(false);

    const auth=useAuth();

    console.log("auth:", auth);

    const handleSubmit= async(e)=>{

        e.preventDefault();
        setLogginIn(true);

        if(!email || !password){
            toast.error("Please Enter Both Email & Password" ,{
                position: "top-right"
            });
        }

        const response=await auth.login(email, password);
        if(response.success){
            toast.success("Successfully Login" ,{
                position: "top-right"
            });
        }else {
            toast.error(response.message ,{
                position: "top-right"
            });
        }
        setLogginIn(false);
    }
    
    return <form className={styles.loginForm} onSubmit={handleSubmit}>
    <span className={styles.loginSignupHeader}>Log In</span>
      
      <div className={styles.field}>
        <input type='email' placeholder='Email' value={email}
        onChange={(e)=>{
            setEmail(e.target.value)
        }}
        />
      </div>
      <div className={styles.field}>
        <input type='password' placeholder='Password' value={password}
        onChange={(e)=>{
            setPassword(e.target.value)
        }}
        />
      </div>
      <div className={styles.field}>
        <button  disabled={logginIn}>{logginIn ? 'Loggin In..' : 'Log In'}</button>
      </div>
    </form>
}


export default Login;