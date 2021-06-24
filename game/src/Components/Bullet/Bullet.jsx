//modules
import React, { useEffect, useState } from 'react'

//components

//files
import './Bullet.scss'

function Bullet(props) {
    let directionSlope = props.directionSlope
    let speed = props.speed
    let id = props.id
    let damage = props.damage

    let getPrimeFactors = (numberToFactor) => {
        let primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59]
        let factors = [1]
        for(let i = 0; i <= primes.length; i++){
            while (numberToFactor % primes[i] === 0){
                if(primes.includes(numberToFactor)){
                    factors.push(numberToFactor)
                    return factors
                }
                numberToFactor = numberToFactor / primes[i]
                factors.push(primes[i])
            }
        }
    }
    
    let reduceFraction = (num, dom) => {
        let numFactors = getPrimeFactors(num)
        let domFactors = getPrimeFactors(dom)
        let numerator = [...numFactors]
        let denominator = [...domFactors]
    
        // console.log(`Numerator: ${num}`)
        // console.log(`Denominator: ${dom}`)
    
        // console.log(`Numerator factors: ${numFactors}`)
        // console.log(`Denominator factors: ${domFactors}`)
    
        //find and remove all common factors
        for(let i = 0; i <= numFactors.length; i++){
            // console.log(`Iteration: ${i}`)
            // console.log(`NumFactors at postion ${i} is ${numFactors[i]}`)
            if(domFactors.includes(numFactors[i]) && numFactors[i] !== 1){
                // console.log(`Removing duplicate number: ${numFactors[i]}`)
                numerator.splice(i, 1, 1)
                denominator.splice(denominator.findIndex(el => el === numFactors[i]), 1, 1)
            }
            
        }
        //reduce arrays to their total value
        numerator = numerator.reduce((acc, curr) => {
            return acc * curr
        })
    
        denominator = denominator.reduce((acc, curr) => {
            return acc * curr
        })
    
        //return an object with both
        return {numerator: numerator, denominator: denominator}
    }

    const [ riseCount, setRiseCount ] = useState(0)
    const [ runCount, setRunCount ] = useState(0)

    let moveBulletInDirection = (rise, run, bullet) => {
        //move bullet 
        //create a loop that translates the object in the given direction until either
        //y or x equals 0 or 10,000
        bullet.style.transform = `translate(${run}px, ${rise}px)`// :)
        console.log('moving')
    }

    useEffect(() => {
        let bullet = document.getElementById(id)
        console.log(bullet)
        console.log(id)

        //reducing the slope to its simplest form
        reduceFraction(directionSlope.rise, directionSlope.run)

        //using setinterval, we'll update the position of the bullet every few milliseconds
        let moveBulletBySpeed = setInterval(() => {
            moveBulletInDirection(directionSlope.rise, directionSlope.run, bullet)
        }, speed);

        //check to see if we need to stop the interval
        let {right, left, bottom, top} = bullet.getBoundingClientRect()
        if(
            left === 0 ||
            right === 10000 ||
            top === 0 ||
            bottom === 0
        ){
            clearInterval(moveBulletBySpeed)
            bullet.remove()
        }
    }, [])

    return (
        <div className="bullet" id={id}>
            
        </div>
    )
}

export default Bullet
