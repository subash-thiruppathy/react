import React from "react";
import { useAppSelector, useAppDispatch } from '../hooks/hook';
import { getUserDetail } from "../reducers/sampleReducer";
import { addData } from "../core/utils/util";


const Home: React.FC = () => {

    const dispatch = useAppDispatch()
    const data = useAppSelector((state) => state.user.data)
    const handleClick = () => {
        dispatch(getUserDetail())
        const addNumber =  addData(5,2)
    }

    return(
        <div>
            <p>This is home page</p>
            <button onClick={() => handleClick()}>Click</button>
        </div>
    )
}

export default Home;