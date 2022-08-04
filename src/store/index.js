import { createStore } from 'redux'
import _ from 'lodash'

const FILL_FACTORY_DISPLAYS = 'FILL_FACTORY_DISPLAYS'
const START_GAME = 'START_GAME'
const PICK_TILES = 'PICK_TILES'
const PLACE_TILES = 'PLACE_TILES'
const DROP_TILES = 'DROP_TILES'
const CREATE_WALL = 'CREATE_WALL'
const COUNT_ROUND_POINTS ='COUNT_ROUND_POINTS'

const initialState = {
  bag: [],

  playerBoards: [
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

  roundStarted: false

}

const scoreCounter = (condition, k, action) => {
    if(condition(k)) {
        scoreCounter(condition, k + 1, action)
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case START_GAME:
            const bag = Array(100)
                .fill('red', 0, 20)
                .fill('yellow', 20, 40)
                .fill('green', 40, 60)
                .fill('blue', 60, 80)
                .fill('black', 80, 100)
            bag.sort( () => Math.random() - 0.5 );
            console.log('замешали');
            return { ...state, bag: bag}

        case CREATE_WALL:
            let wall = []
            const colors = ['blue', 'yellow', 'red', 'black', 'green']
            for (let i = 0; i < 5; i ++) {
                wall[i] = []
                for (let j =0; j < 5; j ++) {
                    const k = ((j - i) >= 0) ? (j - i) : (j - i + 5)
                    wall[i].push({color: colors[k], filled: false})
                }
            }
            const PB = _.cloneDeep(state.playerBoards)
            PB[0].wall = wall
        return { ...state, playerBoards: PB}

        case FILL_FACTORY_DISPLAYS:
            const table = [ ...state.table]
            for (let i = 1; i <= 5; i++) {
                const preTable = state.bag.splice(-4)
                table[i] = preTable.map(color => {
                    return {
                        color: color,
                        display: i
                    }
                })
            } 
            console.log('роздали');
            return { ...state, table: table, roundStarted: true}

        case PICK_TILES:
            
            const {display: pickedDisplay, color: pickedColor} = action.payload
            const tilesOnDisplay = _.cloneDeep(state.table[pickedDisplay])

            const pickedTiles = tilesOnDisplay.filter(tile => {
                return pickedColor === tile.color
            })
            const dropTiles = tilesOnDisplay.filter(tile => {
                return pickedColor !== tile.color
            })
            dropTiles.forEach(tile => {
                tile.display = 0
            })
            console.log('взяли фишки')
            return { ...state, pickedTiles: pickedTiles, dropTiles: dropTiles} 
            
        case DROP_TILES :
            return { ...state, pickedTiles: [], dropTiles: [] }   

        case PLACE_TILES:
            const stateCopy = _.cloneDeep(state)

            const {color, display} = state.pickedTiles[0]
            const tilesQuantity = state.pickedTiles.length
            const lineN = action.payload
            const tilesAlreadyInLine = state.playerBoards[0].patternLines[lineN].tilesQ || 0
            const lineLength = lineN + 1
            const lineSpace = lineLength - (tilesAlreadyInLine)
            const extraTilesQuantity = tilesQuantity > lineSpace ? (tilesQuantity - lineSpace) : 0
            const playerBoard = stateCopy.playerBoards[0] 
            const lines = playerBoard.patternLines
            let extraTiles
            
            if(color === lines[lineN].color || !lines[lineN].color) {  // check if tiles suit for this pattern line 

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

            console.log('поместили фишки');
            return stateCopy
        
        case COUNT_ROUND_POINTS:
            const playerBoards = _.cloneDeep(state.playerBoards)
            for(let [lineId, lineInfo] of playerBoards[0].patternLines.entries()) {
                if (lineInfo.full === true) {
                    for (let [id, tileSpace] of playerBoards[0].wall[lineId].entries()) {
                        if (tileSpace.color === lineInfo.color) {
                            tileSpace.filled = true
                            playerBoards[0].score += 1
                            // console.log(playerBoards[0].wall[lineId], lineId);
                            if (playerBoards[0].wall[lineId][id + 1]?.filled === true) { // вот тут начинается это дерьмо
                                playerBoards[0].score += 1
                                if(playerBoards[0].wall[lineId][id + 1 + 1]?.filled === true) {
                                    playerBoards[0].score += 1
                                    if(playerBoards[0].wall[lineId][id + 1 + 1 + 1]?.filled === true) {
                                        playerBoards[0].score += 1
                                        if(playerBoards[0].wall[lineId][id + 1 + 1 + 1 + 1]?.filled === true) {
                                            playerBoards[0].score += 1
                                        }
                                    }
                                }
                            }
                            if (playerBoards[0].wall[lineId][id - 1]?.filled === true) {
                                playerBoards[0].score += 1
                                if(playerBoards[0].wall[lineId][id - 1 - 1]?.filled === true) {
                                    playerBoards[0].score += 1
                                    if(playerBoards[0].wall[lineId][id - 1 - 1 - 1]?.filled === true) {
                                        playerBoards[0].score += 1
                                        if(playerBoards[0].wall[lineId][id - 1 - 1 - 1 + 1]?.filled === true) {
                                            playerBoards[0].score += 1
                                        }
                                    }
                                }
                            }
                            
                            if (playerBoards[0].wall[lineId + 1]?.[id].filled === true) { // вот тут начинается это дерьмо
                                playerBoards[0].score += 1
                                if(playerBoards[0].wall[lineId + 2]?.[id].filled === true) {
                                    playerBoards[0].score += 1
                                    if(playerBoards[0].wall[lineId + 3]?.[id].filled === true) {
                                        playerBoards[0].score += 1
                                        if(playerBoards[0].wall[lineId + 4]?.[id].filled === true) {
                                            playerBoards[0].score += 1
                                        }
                                    }
                                }
                            }
                            if (playerBoards[0].wall[lineId - 1]?.[id].filled === true) { // вот тут начинается это дерьмо
                                playerBoards[0].score += 1
                                if(playerBoards[0].wall[lineId - 2]?.[id].filled === true) {
                                    playerBoards[0].score += 1
                                    if(playerBoards[0].wall[lineId - 3]?.[id].filled === true) {
                                        playerBoards[0].score += 1
                                        if(playerBoards[0].wall[lineId - 4]?.[id].filled === true) {
                                            playerBoards[0].score += 1
                                        }
                                    }
                                }
                            }
                        }
                    }
                    playerBoards[0].patternLines[lineId] = {}
                }
            }
            for (let n of playerBoards[0].floorLine.keys()) {
                if (n < 2) {
                    playerBoards[0].score -= 1
                } else if (n > 1 && n < 5) {
                    playerBoards[0].score -= 2
                } else if (n > 4) {
                    playerBoards[0].score -= 3
                }
                playerBoards[0].floorLine = []
            }
            return { ...state, playerBoards: playerBoards, roundStarted: false, minusOneIsOnTable: true}
            
      default:
        
        return state
    }
}
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
window.store = store;
export default store;