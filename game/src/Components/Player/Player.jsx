//modules
import React from 'react'

//components
import Level1Basic from '../../Tanks/level1/level1Basic'

//files
import './Player.scss'

class Player extends React.Component {
    state={
        
        level: this.props.level,
        tankForm: this.props.tankForm,
        tankTree: this.props.formTree,
        stats: {
            speed: 25,
            health: 100,
        },
        playerState:{
            movingRight: false,
            movingLeft: false,
            movingUp: false,
            movingDown: false
        }
    }

    //controller state
    rightPressed = false;
    leftPressed = false;
    upPressed = false;
    downPressed = false;

    calculateTree = () => {
        let tankTree = this.state.tankTree

    }
    
    getCenter = (el) => {
        let {left, top, width, height} = el.getBoundingClientRect()
        return {x: left + width / 2, y: top + height /2}
    }

    keyDownHandler = (e) => {
        if(e.key === 'd'){
            this.rightPressed = true
        }
        if(e.key === 'a'){
            this.leftPressed = true
        }
        if(e.key === 'w'){
            this.upPressed = true
        }
        if(e.key === 's'){
            this.downPressed = true
        }
    }

    keyUpHandler = (e) => {
        if(e.key === 'd'){
            this.rightPressed = false
        }
        if(e.key === 'a'){
            this.leftPressed = false
        }
        if(e.key === 'w'){
            this.upPressed = false
        }
        if(e.key === 's'){
            this.downPressed = false
        }
    }

    playerPoint = (e) => {
        let playerContainer = document.getElementById('player-container')
        let playerContainerCenter = this.getCenter(playerContainer)
        let angle = Math.atan2(e.clientY - playerContainerCenter.y, e.clientX - playerContainerCenter.x)
        playerContainer.style.transform = `rotate(${angle}rad)`
    }

    playerMove = (key) => {
        let moveSpeed = this.state.stats.speed
        //detect which keys are pressed down
        
    }

    componentDidUpdate = () => {
        this.calculateTree()
        this.playerMove()
    }

    render(){
        return (
            <div 
                className="player"
                onPointerMove={e => {
                    e.stopPropagation()
                    e.preventDefault()
                    if(e.target !== document.getElementById('control-area')){
                        return
                    }
                    this.playerPoint(e)
                }}
                onKeyDown={e => {
                    this.keyDownHandler(e)
                }}
                onKeyUp={e => {
                    this.keyUpHandler(e)
                }}
                onScroll={e => {
                    window.scrollTo(0,0)
                }}
                tabIndex={0}
            >
                <div 
                    className="player__container" 
                    id="player-container"
                >
                    <Level1Basic/>
                </div>
                <div 
                    className="player__control-area"
                    id="control-area"
                ></div>
            </div>
        )
    }
}

export default Player
