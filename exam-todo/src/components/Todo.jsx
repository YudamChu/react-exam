import React from 'react';
import {styled} from 'styled-components';

const MyTodo = styled.div`

    width: 550px;
    height: 50px;
    border: 1px solid gainsboro;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    gap: 10px;
    text-decoration: ${(props) => props.isDisabled ? 'line-through' : 'none'};
    
`;

function Todo({todo, checked, isChecked,isDisabled, doneBtn, deleteBtn}) {
    return (
        <>
            <MyTodo>
                <input type='checkbox' className='check-box' checked={isChecked} onChange={checked}/>
                <p style={{ textDecoration: isDisabled ? 'line-through' : 'none' }}>{todo}</p>
                <div className='btn-box'>
                    <button className='done-btn' type='button' onClick={doneBtn} disabled={isDisabled}>완료</button>
                    <button className='delete-btn' type='button' onClick={deleteBtn}>삭제</button>
                </div>
            </MyTodo>
        </>
    );
}

export default Todo;