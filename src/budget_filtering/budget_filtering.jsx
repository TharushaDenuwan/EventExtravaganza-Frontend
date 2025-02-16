import React from 'react'
import Navigation from '../components/navigation/navigation'
import '../budget_filtering/budget_filtering.css'
import GoogleMapComponent from '../map/google_map_component'

export default function budget_filtering() {
  return (
    <div className='box1'>
      <Navigation/>

      <h3 className='h3'><span className='green-pipe'>|</span> Extravaganza unit</h3>
      <p className='p1'>Loved By Event Organizers.<br/>Built for <span className="box-text">Budget Filtering</span></p>

      <p className='p2'>Finding the perfect event planner within your budget has never been easier!  Simply <br />enter your
         desired  budget range, and our system will instantly display a list of  <br />available event planners that match  your 
         price preferences.  This feature ensures <br /> that you can plan your dream event without   exceeding your financial limits,<br /> 
         making event planning hassle-free and affordable.</p>
      <div className='trangle'> 
        
      </div>   

     
      <span className='span1'>Rs:</span><input className='input1' type="number" placeholder='Enter Your Budget Range'/>    
      <button className='button1'>Search</button>  
    </div>
  )
}
