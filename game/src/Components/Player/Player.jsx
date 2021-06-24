//modules
import React from 'react'

//components
import Level1Basic from '../Tanks/level1/level1Basic'
import Bullet from '../Bullet/Bullet'

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
        },
        bullets: []
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

    calculateAngle = () => {
        
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
        this.playerMove()
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
        this.playerMove()
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
        if(this.rightPressed){
            window.scrollBy(moveSpeed, 0)
        }
        if(this.leftPressed){
            window.scrollBy(-moveSpeed, 0)
        }
        if(this.upPressed){
            window.scrollBy(0, -moveSpeed)
        }
        if(this.downPressed){
            window.scrollBy(0, moveSpeed)
        }
    }

    calculateSlope = (directionObject) => {
        //position 1 is the point from where we will be traveling from
        let pos1 = directionObject.pos1
        //position 2 is where we will be going
        let pos2 = directionObject.pos2

        //now we just need to find the line between these two points
        //we will do this by calculating the slope
        //aka change in y over change in x
        let rise = pos2.y - pos1.y
        let run = pos2.x - pos1.y

        return {rise: rise, run: run}
    }   

    generateRandomID = () => {
        return Math.random().toString(36).substring(2, 9)
    }

    playerShoot = (e) => {
        let slope = this.calculateSlope({
            pos1: this.getCenter(document.getElementById('player-container')),
            pos2: {x: e.clientX, y: e.clientY}
        })
        console.log(
            <Bullet
                directionSlope={slope}
                speed={1000}
                damage={10}
                id={"bullet-" + this.generateRandomID()}
                initialPos={this.getCenter(document.getElementById('player-container'))}
            />
        )
        let bullets = [...this.state.bullets]
        bullets.push({
            directionSlope: slope,
            speed: 1000,
            damage: 10,
            id: "bullet-" + this.generateRandomID(),
            initialPos: this.getCenter(document.getElementById('player-container'))
        })
        this.setState({
            bullets: bullets
        })
    }

    componentDidUpdate = () => {
        this.calculateTree()
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

                onClick={e => {
                    e.stopPropagation()
                    e.preventDefault()
                    if(e.target !== document.getElementById('control-area')){
                        return
                    }
                    this.playerShoot(e)
                }}
            >
                <div 
                    className="player__container" 
                    id="player-container"
                >
                    <Level1Basic/>
                </div>
                <div className="player__bullet-container">
                    {
                        this.state.bullets.map(bullet => (
                            <Bullet
                                directionSlope={bullet.directionSlope}
                                speed={bullet.speed}
                                damage={bullet.damage}
                                id={"bullet-" + this.generateRandomID()}
                            />
                        ))
                    }
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
