import pda_img from "../../assets/pda.png";
import desk_img from "../../assets/desk_3.jpg";
import "./index.css"


function PdaPage(){
    return (
		<>
            <div id="pda-page-main-div">
                <div id="image-container">
                    <PdaWrapper/>               
                </div>
                <img src={desk_img} id="desk-img"/>
            </div>
		</>
    )
}

function PdaWrapper() {
	return (
		<>
            <img src={pda_img} className="pda-class"/>
		</>
	);
}

export default PdaPage;
