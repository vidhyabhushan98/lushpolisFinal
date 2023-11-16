import Navbar from "../components/Navbar.jsx";
import { ListItem } from "@mui/material";

function Search(){
    

	return (
		<>
		<Navbar />
		<div className="container marketing padno11">
            <div className="baner_banerContainer__CuhkQ container-fluid p-5">
                <img src="https://plantcaregarden.com/images/baner/icon1.svg" alt="" className="baner_icon__X1w22"/>
                <div style={{display:'flex'}} className="baner_title__iN7P4"><h4>LushPolis</h4>
				
				</div>
				<br></br>
				<div style={{display:'flex'}} className="baner_title__iN7P4">
				
				<h5>Urban Jungles Awaken</h5></div>
                        <p className=" py-3">
                            LushPolis which means Green Cities, is a social media cum informatory website that encourages people for home gardening. 
							<ListItem>
							<li>
							<br></br>
							Go to "Write-Posts" to write your stories.
							<br></br>
							Go to "Explore" to read others stories.
							<br></br>
							Go to "Chat" to talk with others.
							<br></br>
							Go to "Plant Search" to search for plants using image identification or by its name.
							</li>
							</ListItem>
                        </p>
            </div>
        </div>
		</>
	);
}

export default Search