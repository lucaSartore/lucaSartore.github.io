import pda_img from "../../assets/pda.png";
import "./index.css"


function PdaPage(){
    return (
		<>
            <div className="pda-page-main-div">
                <PdaWrapper/>               
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
