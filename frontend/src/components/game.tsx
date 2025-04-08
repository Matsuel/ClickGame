"use client"
import React from 'react'
import { io } from 'socket.io-client'

const socket = io("http://localhost:3002")

const Game = () => {

    const [left, setLeft] = React.useState(0)
    const [right, setRight] = React.useState(0)

    socket.on("sync", (data) => {
        setLeft(data.left)
        setRight(data.right)
    })

    socket.on("left", (data) => {
        setLeft(data.left)
    })
    socket.on("right", (data) => {
        setRight(data.right)
    })
    const handleLeftClick = () => {
        socket.emit("left")
    }
    const handleRightClick = () => {
        socket.emit("right")
    }


    return (
        <>
            <h1 className="text-4xl font-bold text-center">
                Left: {left}
            </h1>
            <h1 className="text-4xl font-bold text-center">
                Right: {right}
            </h1>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLeftClick}
            >
                Left
            </button>
            <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleRightClick}
            >
                Right
            </button>
        </>
    )
}

export default Game