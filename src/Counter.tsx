import React, { useState } from 'react'

interface numState {
    num : number
}

export default function Counter() {

    const [state, setState] = useState<numState>({
        num : 0
    })

    const addNum = () => {
        setState({num : state.num + 1});
    }

    const minNum = () => {
        setState({num : state.num - 1});
    }

    return (
        <div>
            <div>숫자 : {state.num}</div>
            <button onClick={addNum}>증가</button>
            <button onClick={minNum}>감소</button>
        </div>
    )
}
