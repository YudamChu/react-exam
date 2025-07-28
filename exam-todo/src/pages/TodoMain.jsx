import React,{useState} from 'react';
import TodoLogin from '../components/TodoLogin';
import UserTodo from '../components/UserTodo';
import '../assets/css/TodoLayout.css'
import { TodoContext } from '../context/TodoContext';


function TodoMain(props) {


    const[isLogin, setIsLogin] = useState(false); //로그인 상태
    const [loginName, setLoginName] = useState(''); // 로그인한 사람 저장
    const [userTodo, setUserTodo] = useState({});//사용자별 할일 및 정보 저장
    const [isDisabled, setIsDisabled] = useState(false); //체크박스 로그인시 선택 못함
    const [isBtnDisabled, setIsBtnDisabled] = useState(true); //버튼 로그인 전까지 클릭 못함

    //셀렉트 박스 클릭시
    const select = (e) =>{
         setLoginName(e.target.value);
         //selectbox에서 option만 바꿔도 자동 로그인 되는 거 방지 (무조건 로그인 버튼 누르도록)
         setIsLogin(false); 
    }

    //로그인 버튼 클릭시
    const login = () =>{
        
        if(!loginName.trim()){
            alert('로그인할 이름을 선택하세요')
            return;
        }
        setIsLogin(true);
        setIsDisabled(true);
        setIsBtnDisabled(false);
    }

     //로그아웃 버튼 클릭시
    const logout = () =>{

        setIsLogin(false); 
        setIsDisabled(false); 
        setIsBtnDisabled(true);  
    }

    return (
        <div className='contatiner'>
            <TodoContext.Provider value={{isLogin, loginName, userTodo, isDisabled,isBtnDisabled, select, login, logout, setUserTodo }}>
                <TodoLogin/> 
                <UserTodo/>
            </TodoContext.Provider>
        </div>
    );
}

export default TodoMain;