import { useState } from 'react';
import styles from '../styles/login.module.css'
import { toast } from 'react-toastify';


const Login=()=>{

    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [logginIn, setLogginIn]=useState(false);

    const handleSubmit=(e)=>{

        e.preventDefault();
     
        setLogginIn(true);
        if(!email || !password){
            toast.error("Please Enter Both Email & Password" ,{
                position: "top-right"
            });
        }
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
      <div className={styles.field} disabled={logginIn}>
        <button>{logginIn ? 'Loggin In..' : 'Log In'}</button>
      </div>
    </form>
}


export default Login;