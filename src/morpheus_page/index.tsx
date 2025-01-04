import image from '../assets/morpheus.jpg'
import blue_pill_border from '../assets/blue_pill_border.png'
import red_pill_border from '../assets/red_pill_border.png'
import "./index.css"

function MorpheusPage() {

    
            // <img className='image' id="blue_pill_border" style={{ filter: "drop-shadow(0 0 10px #0000ff)" }} src={blue_pill_border}   />
            // <img className='image' id="red_pill_border" style={{ filter: "drop-shadow(0 0 10px #ff0000)" }} src={red_pill_border}   />


  return (
    <>
      <div id='main_div'>
        <div id='img_div'>
            <div id="red_pill_div"></div>
            <div id="blue_pill_div"></div>
            <img className='image' src={image}   />
            <img className='image' id="blue_pill_border"  src={blue_pill_border}   />
            <img className='image' id="red_pill_border"  src={red_pill_border}   />
        </div>
      </div>
    </>
  )
}

export default MorpheusPage
