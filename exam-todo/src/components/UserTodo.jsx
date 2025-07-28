import React, {useContext, useCallback, useRef} from 'react';
import Todo from './Todo';
import { useState } from 'react';
import { TodoContext } from '../context/TodoContext';
import { useEffect } from 'react';

function UserTodo(props) {

    //상위컴포넌트가 넘겨준 값 useContext로 받기 
    const {isLogin, loginName, isBtnDisabled, userTodo, setUserTodo} = useContext(TodoContext);


    const [todoInput, setTodoInput] = useState(''); //할일 input 저장
    const [todo, setTodo] = useState(0); //할일 정보
    const [done, setDone] = useState(0); //한일 정보
    const [percent, setPercent] = useState(0); //달성률
 
    

    //정보 업데이트 함수
    //로그인 되었거나, 사용자의 할일 리스트가 변경되었거나, 로그인 성함이 바뀌었을 경우 정보 업데이트
    useEffect(() => {

        if (isLogin && loginName && userTodo[loginName]) {
            const newTodo = userTodo[loginName].length;
            const newDone = userTodo[loginName].filter(todo => todo.isChecked).length;
            const newPercent = newTodo === 0 ? 0 : (newDone / newTodo) * 100;

            setTodo(newTodo);
            setDone(newDone);
            setPercent(newPercent);
     

        }else{
            setTodo(0);
            setDone(0);
            setPercent(0);
      
        }
    }, [isLogin, userTodo, loginName]);

    

    //등록 버튼
    const add = useCallback(() =>{

        //할일 입력칸이 비어있을 경우
        if(!todoInput.trim()){
            alert('할일을 입력하세요');
            return;
        }
    
        const newTodo = {
            id: Date.now(),
            text: todoInput,
            isChecked: false,
            isDisabled: false,
        }

        const prevList = userTodo[loginName] || [];
        const newList = [...prevList, newTodo];

        // userTodo 객체에 로그인 이름을 key값으로 주고 각자의 할일을 배열에 저장
        setUserTodo(prev => ({...prev,[loginName]: newList})); 
        setTodoInput('') //input창 초기화

    },[loginName, todoInput, userTodo, setUserTodo])



    //체크박스 체크시
    const checked = (index) =>{

        const newTodo = [...userTodo[loginName]];
        newTodo[index].isChecked = !newTodo[index].isChecked;
       
        setUserTodo(prev => ({
        ...prev,
        [loginName]: newTodo
        }));
    }




    // enter 치면 add
    const enterPressedRef = useRef(false);

    const enterEvent = useCallback((e) => {
        if (e.key === 'Enter') {
        e.preventDefault();

        if (enterPressedRef.current) return;  // 중복 차단

        enterPressedRef.current = true;
        add();

        setTimeout(() => {
        enterPressedRef.current = false;
        setTodoInput('')
        }, 300);
        }

        //console.log('todoInput:', todoInput);
    }, [add]);





    //완료 버튼
    const doneBtn = (index) =>{

        const newArr = [...userTodo[loginName]];

        newArr[index].isDisabled = true;
        
        setUserTodo(prev => ({...prev,[loginName]: newArr})); 
    }

    //삭제 버튼
    const deleteBtn = (index) =>{
        const newArr = [...userTodo[loginName]];

        const newList = newArr.filter((_,i)=> i !==index); //삭제 누른 배열의 인덱스 값이 아닌 배열만 추출
        setUserTodo(prev => ({...prev,[loginName]: newList})); 
    }


    //일괄완료
    const alldone = () =>{
        const newArr = [...userTodo[loginName]];
        const newList = newArr.map(todo => todo.isChecked === true ? {...todo, isDisabled:true}: todo);
        const checkedList = newArr.filter(todo => todo.isChecked === true);
        
        if(checkedList.length === 0){
            alert('일괄 완료할 일감을 선택하세요');
            return;
        }

        setUserTodo(prev => ({...prev,[loginName]: newList})); 
    }

    //일괄삭제
    const allDel = () =>{
        const newArr = [...userTodo[loginName]];
        const newList = newArr.filter(todo => todo.isChecked === false);
        const checkedList = newArr.filter(todo => todo.isChecked === true);


        if(checkedList.length === 0){
            alert('일괄 삭제할 일감을 선택하세요');
            return;
        }
        
        setUserTodo(prev => ({...prev,[loginName]: newList})); 
    }

    return (
        <>
            <div className='user-container'>
                <section className='user-info'>
                    <div className='btn-box'>
                        <button type='button'onClick={alldone} disabled={isBtnDisabled}>일괄 완료</button>
                        <button type='button' onClick={allDel} disabled={isBtnDisabled}>일괄 삭제</button>
                    </div>
                    <div className='info-box'>
                        <div>할일:{todo} </div>
                        <div>한일:{done} </div>
                        <div>달성률:{percent}% </div>
                    </div>                   
                </section>
                <section className='user-todo'>
                    <div className='user-input'>
                        <input  className= 'todo-input' type='text'
                            value={todoInput} //value를 줘야 입력창 초기화시 인터페이스에서도 이전 값 사라진다
                            onChange={(e)=> setTodoInput(e.target.value)}
                            onKeyUp={enterEvent}
                        />
                        <button type='button' onClick={add} disabled={isBtnDisabled}>등록</button>
                    </div>
                    <div className='todo-box'>
                        {
                            isLogin && userTodo[loginName]?.map((todo, index) =>(
                                <Todo
                                id={todo.id}
                                key={index}
                                todo={todo.text}
                                isChecked={todo.isChecked}
                                checked={()=>checked(index)}
                                isDisabled={todo.isDisabled}
                                doneBtn={()=>doneBtn(index)}
                                deleteBtn={()=> deleteBtn(index)}/>
                            ))
                        }
                    </div>
                </section>
            </div> 
        </>
    );
}

export default UserTodo;