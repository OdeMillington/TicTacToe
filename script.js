const gameBoard = (() => {
    const board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]

    const setMarker = (boardRow, boardColumn, marker) => {
        board[boardRow][boardColumn] = marker;
    }

    const displayBoard = () => {
        console.log(board)
    }

    return {setMarker, displayBoard}
})()

const Player = (name, playerMarker) => {
    const setName = (Newname) => {
        name = Newname;
    }

    return {setName, name, Playermarker}
    
}