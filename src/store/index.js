import { createStore } from 'redux'
import _ from 'lodash'

const FILL_FACTORY_DISPLAYS = 'FILL_FACTORY_DISPLAYS'
const START_GAME = 'START_GAME'
const PICK_TILES = 'PICK_TILES'
const PLACE_TILES = 'PLACE_TILES'
const DROP_TILES = 'DROP_TILES'
const CREATE_WALL = 'CREATE_WALL'
const COUNT_ROUND_POINTS ='COUNT_ROUND_POINTS'
const SET_PLAYER = 'SET_PLAYER'
const ADD_PLAYER = 'ADD_PLAYER'
const REMOVE_PLAYER = 'REMOVE_PLAYER'
const RESTORE_STATE ='RESTORE_STATE'
const RESTART = 'RESTART'

const initialState = {
  bag: [],

  playerBoards: [
    {
        patternLines: [{}, {}, {}, {}, {}],//color: 'green', full: true, tilesQ: 1
        floorLine: [],
        wall:[],
        // wall:[[{color: 'blue', filled: true}, {color: 'yellow', filled: true}, {color: 'red', filled: true}, {color: 'black', filled: true}, {color: 'green', filled: false}],
        // [{color: 'green', filled: true}, {color: 'blue', filled: true}, {color: 'yellow', filled: false}, {color: 'red', filled: false}, {color: 'black', filled: false}],
        // [{color: 'black', filled: true}, {color: 'green', filled: false}, {color: 'blue', filled: true}, {color: 'yellow', filled: false}, {color: 'red', filled: false}],
        // [{color: 'red', filled: true}, {color: 'black', filled: false}, {color: 'green', filled: false}, {color: 'blue', filled: true}, {color: 'yellow', filled: false}],
        // [{color: 'yellow', filled: true}, {color: 'red', filled: false}, {color: 'black', filled: false}, {color: 'green', filled: false}, {color: 'blue', filled: true}]],
        score: 0
    },
    {
        patternLines: [{}, {}, {}, {}, {}],
        floorLine: [],
        wall:[],
        score: 0
    },
    {
        patternLines: [{}, {}, {}, {}, {}],
        floorLine: [],
        wall:[],
        score: 0
    },
    {
        patternLines: [{}, {}, {}, {}, {}],
        floorLine: [],
        wall:[],
        score: 0
    }
  ],

  table: [[], [], [], [], [], []],
  minusOneIsOnTable: true,

  pickedTiles: [],
  dropTiles: [],

  player: 0,
  players: 2,
  playersNames: [],

  roundStarted: false,
  roundEnded: false,
//   roundEnded: true,
  roundNum: 0,

  gameEnded: false,
  gameEndedInfo: '',

}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLAYER:
            return {...state, players: ++state.players}

        case REMOVE_PLAYER:
            return {...state, players: --state.players}
        case SET_PLAYER:
            const playersNames = _.cloneDeep(state.playersNames)
            const {name, playerNo} = action.payload
            playersNames[playerNo] = name
            return { ...state, playersNames: playersNames}

        case START_GAME:
            let blankTable  
            switch (state.players) {
                case 2: 
                    blankTable = Array(6).fill([])
                    break
                case 3: 
                    blankTable = Array(8).fill([])
                    break
                case 4: 
                    blankTable = Array(10).fill([])
                    break
                default:
                    console.log('?');
            }
            let bag = Array(100) //fill the bag
                .fill('red', 0, 20)
                .fill('yellow', 20, 40)
                .fill('green', 40, 60)
                .fill('blue', 60, 80)
                .fill('black', 80, 100)
            bag = _.shuffle(bag)
            return { ...state, bag: bag, table: blankTable, roundStarted: false}

            case CREATE_WALL:
            const PB = _.cloneDeep(state.playerBoards)
            for (let p = 0; p < state.players; p++) {
                let wall = []
                const colors = ['blue', 'yellow', 'red', 'black', 'green']
                for (let i = 0; i < 5; i ++) {
                    wall[i] = []
                    for (let j =0; j < 5; j ++) {
                        const k = ((j - i) >= 0) ? (j - i) : (j - i + 5)
                        wall[i].push({color: colors[k], filled: false})
                    }
                }
                PB[p].wall = wall
            }
           
            return { ...state, playerBoards: PB}
            
            case FILL_FACTORY_DISPLAYS:
                const table = [ ...state.table]
                for (let i = 1; i < table.length; i++) {
                    const preTable = state.bag.splice(-4)
                    table[i] = preTable.map(color => {
                        return {
                            color: color,
                            display: i
                        }
                    })
                } 
            return { ...state, table: table, roundStarted: true, player: state.roundNum % state.players}

            case PICK_TILES:
                
            const {display: pickedDisplay, color: pickedColor} = action.payload
            const pickedTable = _.cloneDeep(state.table)
            const tilesOnDisplay = pickedTable[pickedDisplay]

            const pickedTiles = tilesOnDisplay.filter(tile => { 
                return pickedColor === tile.color
            })
            const dropTiles = tilesOnDisplay.filter(tile => {
                return pickedColor !== tile.color
            })
            dropTiles.forEach(tile => {
                tile.display = 0
            })
            pickedTable[pickedDisplay] = dropTiles
            
            return { ...state, pickedTiles: pickedTiles, dropTiles: dropTiles} 
            
        case DROP_TILES :
            return { ...state, pickedTiles: [], dropTiles: [] }   

        case PLACE_TILES:
            const stateCopy = _.cloneDeep(state)
            const player = state.player
            const {color, display} = state.pickedTiles[0]
            const tilesQuantity = state.pickedTiles.length
            const lineN = action.payload
            const tilesAlreadyInLine = state.playerBoards[player].patternLines[lineN].tilesQ || 0
            const lineLength = lineN + 1
            const lineSpace = lineLength - (tilesAlreadyInLine)
            const extraTilesQuantity = tilesQuantity > lineSpace ? (tilesQuantity - lineSpace) : 0
            const playerBoard = stateCopy.playerBoards[player] 
            const lines = playerBoard.patternLines
            let extraTiles
            let filled
            for(let tileSpace of playerBoard.wall[lineN]) {
                if (color === tileSpace.color) {
                    filled = tileSpace.filled
                }
            }
            
            if((color === lines[lineN].color || !lines[lineN].color) && !filled) {  // check if tiles suit for this pattern line 
                
                extraTiles = Array(extraTilesQuantity).fill(color)
                
                lines[lineN] = {
                    color: color, 
                    tilesQ: extraTilesQuantity ? lineLength : (tilesQuantity + tilesAlreadyInLine)
                }
                lines[lineN].full = (lineLength === lines[lineN].tilesQ) ? true : false
                
                stateCopy.pickedTiles = []
                stateCopy.dropTiles = []
                
            } else {
                extraTiles = Array(tilesQuantity).fill(color)  
            }
            
            stateCopy.table[display] = [] // update display(or center)
            stateCopy.table[0] = stateCopy.table[0].concat([ ...state.dropTiles])
            
            if(display === 0 && state.minusOneIsOnTable) { // handling (-1) tile if it is on table
                extraTiles = ['minusOne'].concat(extraTiles) 
                stateCopy.minusOneIsOnTable = false    
            } 
            playerBoard.floorLine = playerBoard.floorLine.concat(extraTiles)
            
            stateCopy.player = (player + 1 < stateCopy.players) ? (player + 1) : (player + 1 - stateCopy.players) // changing player
            
            const theTable = stateCopy.table // if all displays are empty
            
            
            if (theTable.every(display => display.length === 0)) {
                stateCopy.player = null
                stateCopy.roundEnded = true
                stateCopy.roundNum += 1
            }

            sessionStorage.setItem('state', JSON.stringify(stateCopy))
            // const lastState = sessionStorage.getItem('state')
            // console.log(lastState);

            return stateCopy
        
        case COUNT_ROUND_POINTS:
            const playerBoards = _.cloneDeep(state.playerBoards)
            let bagRefilled = _.cloneDeep(state.bag) 
            let gameEnded
            let gameEndedInfo = ''
            
            for (let p = 0; p < state.players; p++) {
                for(let [lineId, lineInfo] of playerBoards[p].patternLines.entries()) {
                    if (lineInfo.full === true) {
                        for (let [id, tileSpace] of playerBoards[p].wall[lineId].entries()) {
                            if (tileSpace.color === lineInfo.color) {
                                playerBoards[p].wall[lineId][id].filled = true
                                playerBoards[p].score += 1
                                const countRight = (q) => {
                                    if (playerBoards[p].wall[lineId][id + q]?.filled === true) {
                                        playerBoards[p].score += 1
                                        countRight(q + 1)
                                    }
                                }
                                const countLeft = (q) => {
                                    if (playerBoards[p].wall[lineId][id - q]?.filled === true) {
                                        playerBoards[p].score += 1
                                        countLeft(q + 1)
                                    }
                                }
                                const countUp = (q) => {
                                    if (playerBoards[p].wall[lineId + q]?.[id].filled === true) { 
                                        playerBoards[p].score += 1
                                        countUp(q + 1)
                                    }
                                }
                                const countDown = (q) => {
                                    if (playerBoards[p].wall[lineId - q]?.[id].filled === true) { 
                                        playerBoards[p].score += 1
                                        countDown(q + 1)
                                    }
                                }
                                countRight(1)
                                countLeft(1)
                                countUp(1)
                                countDown(1)
                            }
                        }
                        const tilesLeft = Array(lineId).fill(lineInfo.color)
                        bagRefilled = bagRefilled.concat(tilesLeft)
                        playerBoards[p].patternLines[lineId] = {}
                    }
                }
                for (let n of playerBoards[p].floorLine.keys()) {
                    if (n < 2) {
                        playerBoards[p].score -= 1
                    } else if (n > 1 && n < 5) {
                        playerBoards[p].score -= 2
                    } else if (n > 4) {
                        playerBoards[p].score -= 3
                    }
                    const floorLineTiles = playerBoards[p].floorLine.filter(tile => tile !== "minusOne")
                    bagRefilled = bagRefilled.concat(floorLineTiles)
                    playerBoards[p].floorLine = []
                }

                bagRefilled = _.shuffle(bagRefilled)
                for (let wallLine of playerBoards[p].wall) {
                    if (wallLine.every(tileSpace => tileSpace.filled)) { //check if game is finished
                        gameEnded = true
                    }
                }
                if (gameEnded) {
                    let verticalFilledTiles = [0, 0, 0, 0, 0]
                    let colorCounter = {blue: 0, yellow: 0, red: 0, black: 0, green: 0}

                    for (let wallLine of playerBoards[p].wall) { 
                        if (wallLine.every(tileSpace => tileSpace.filled)) {
                            playerBoards[p].score += 2
                            console.log(`player ${p + 1} line filled`)
                        }
                        for(let i = 0; i < 5; i++) {
                            if (wallLine[i].filled) {
                                verticalFilledTiles[i]++
                                if (verticalFilledTiles[i] === 5) {
                                    playerBoards[p].score += 7
                                    console.log(`player ${p + 1} column ${i + 1} filled`);
                                }
                            }
                        }
                    
                        
                        for (let tileSpace of wallLine) {
                            if (tileSpace.filled === true) {
                                colorCounter[tileSpace.color]++
                                if (colorCounter[tileSpace.color] === 5) {
                                    playerBoards[p].score += 10
                                    console.log(`player ${p + 1} color ${tileSpace.color} filled`);
                            }
                            }
                            
                        } 
                    }
                }
                

            }
            if (gameEnded) {
                const scores = playerBoards.map(pB => pB.score)
                const winArr = scores.reduce((prev, curr, id) => {
                    if (prev.score === curr) {
                        return {id: [ ...prev.id, id], score: prev.score}
                    } else if (prev.score < curr) {
                        return {id: [id], score: curr}
                    } else return prev
                    
                }, {id: [], score: (-Infinity)})
                console.log(state.playersNames);
                if (winArr.id.length === 1) {
                    gameEndedInfo = state.playersNames[winArr.id[0]] || 'player ' + (winArr.id[0] + 1) + ' won!'
                } else {
                    gameEndedInfo = state.playersNames[winArr.id[0]] + ' and ' + state.playersNames[winArr.id[1]] + ' have equal maximum points!' 
                }
            }
            
            return { ...state, bag: bagRefilled, playerBoards: playerBoards, roundStarted: false, roundEnded: false, minusOneIsOnTable: true, gameEnded: gameEnded, gameEndedInfo: gameEndedInfo}
        
        case RESTORE_STATE: 
            const lastState = JSON.parse(sessionStorage.getItem('state'))
            return lastState

        case RESTART:
            sessionStorage.clear()
            return initialState
        default:
            return state
    }
}
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
window.store = store;
export default store;