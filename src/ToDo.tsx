import React, { useState } from 'react'

interface ItodoItem {
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

export default function ToDo() {
    
    const [ state, setState ] = useState<ItodoItem>({
        item : ''
    })

    const addItem = () => {
        setState({item : state.item});
    }
  return (
    <div>
        <input type='text'></input>&nbsp;
        <button onClick={addItem}>추가</button>
    </div>
  )
}
