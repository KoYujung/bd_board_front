import React, { useEffect, useState } from 'react'

interface todoItem {
    item : string
}

interface ItodoItems {
    id : number,
    item : string,
    isDelete : boolean,
    onDelete? : Function
}

interface ItodoList {
    todoItems : ItodoItems[]
}

export default function ToDoList() {

    const [ todoItem, setTodoItem ] = useState<todoItem>({
        item : ''
    })

    const [ todoList, setTodoList ] = useState<ItodoItems>({
        id : 0,
        item : '',
        isDelete : false
    })

    const [ todoData, setTodoData ] = useState<ItodoList>({
        todoItems : [ todoList ]  
    })

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) : void => {
        e.preventDefault();
        setTodoList({
            id : todoList.id + 1,
            item : todoItem.item,
            isDelete : false
        })
    }

    useEffect(() => {
        //input창 초기화
        setTodoItem({
            item : ''
        })

        setTodoData({
            todoItems : todoData.todoItems.concat(todoList),
        })
    },[todoList])

    useEffect(() => {
        //console.log('todoData 변경 ', todoData)
    },[todoData])

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type='text'></input>
                <button type='submit'>추가</button>
            </form>
        </div>
    )
}
