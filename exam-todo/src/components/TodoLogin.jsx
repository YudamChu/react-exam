import React, {useContext} from 'react';
import { TodoContext } from '../context/TodoContext';

function TodoLogin(props) {


     //상위컴포넌트가 넘겨준 값 useContext로 받기 
    const {isLogin, loginName, isDisabled, select, login, logout} = useContext(TodoContext);


    

    return (
        <>
         <section className='login-container'>
            <div className='title'>
                <h1>TodoList</h1>
            </div>
            <div className='login-box'>
                <select className='select-box' onChange={select} value={loginName} disabled={isDisabled}>
                    <option value="" disabled>성함을 선택하세요</option>
                    <option value='김철수'>김철수</option>
                    <option value='이영희'>이영희</option>
                    <option value='홍길동'>홍길동</option>
                </select>
              
                {isLogin && loginName?
                <>
                    <button type='button' onClick={logout}>로그아웃</button>
                    <span className='login-name'>{loginName}</span>

                </>
                :
                
                <button type='button' onClick={login}>로그인</button>
                }
            </div>
         </section>   
        </>
    );
}

export default TodoLogin;