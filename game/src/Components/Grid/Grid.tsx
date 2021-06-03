//modules
import { render } from '@testing-library/react'
import React from 'react'

//components

//files
import './Grid.scss'

function Grid() {
    let gridSquares: number[] = []

    let createGridSquares = () => {
        for(let i: number = 0; i < 1500; i++){
            gridSquares.push(i)
        }
    }
    createGridSquares()

    return (
        
        <div className='grid'>
            {
                gridSquares.map((el) => (
                    <div className="grid__square"></div>
                ))
            }
        </div>
    )
}

export default Grid
