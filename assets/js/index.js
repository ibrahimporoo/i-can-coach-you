import { initializeApp } from 'firebase/app'
import {
	getFirestore, collection, getDocs, query
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBsBaihwh8F_UY8oYEsfcMlQEwEIgXcbxc",
  authDomain: "elmawkaabeta.firebaseapp.com",
  databaseURL: "https://elmawkaabeta.firebaseio.com",
  projectId: "elmawkaabeta",
  storageBucket: "elmawkaabeta.appspot.com",
  messagingSenderId: "808588970288",
  appId: "1:808588970288:web:8fe9fcbf5e7ca8cca820f5",
  measurementId: "G-G8FTTQ0EB2"
};

initializeApp(firebaseConfig)

const db = getFirestore()

const colRef = collection(db, 'restaurants')

let html = '';
window.onload = () => {
	// selecting the coaches Row
	const coachesContent = document.getElementById('coaches-content');
	// Fetching 'Getting' Data
	getDocs(colRef)
	.then((snapshot) => {
		let restaurants = []
		snapshot.docs.forEach((doc) => {
			restaurants.push({ ...doc.data(), id: doc.id })
		})
		restaurants.map(restaurant => {
			html += `
				<div class="col-lg-4 col-md-6 mb-10">
					<div class="member" data-aos="zoom-in">
						<div class="pic"><img src="${restaurant.photo}" class="img-fluid" alt=""></div>
							<div class="member-info coaches pricing">
								<h4>${restaurant.name}</h4>
								<span>price: ${restaurant.price}</span>
								<p class='detail-item mb-1 mt-1'>Details</p>
								<span>${restaurant.category} - ${restaurant.city} - ${restaurant.numRating} stars</span>
								<a href="" target="_blank" class="btn-buy mt-2">Buy Now</a>
							</div>
						</div>
					</div>
				</div>
				`;
		})
		coachesContent.innerHTML = '';
		coachesContent.innerHTML = html;
	})
	.catch(err => {
		alert("Error: ", err);
	})
}

// $$$$$$$$$$$$$$$$$$$$$
/*
<div class="btn-wrap">
	<a href="https://calendly.com/icancoachyou/10min" target="_blank" class="btn-buy">Book Now</a>
</div>
// <ul class="details">
// 	<li>price: ${restaurant.price}</li>
// 	<li>from (city): ${restaurant.city}</li>
								// 	<li>rating: ${restaurant.numRating}</li>
								// </ul>
{
    "name": "Bar Eatin'",
    "category": "Italian",
    "price": 1,
    "avgRating": 0,
    "city": "Charlotte",
    "numRating": 0,
    "photo": "https://storage.googleapis.com/firestorequickstarts.appspot.com/food_11.png",
    "id": "1G3OUuNQw80cKcIZu9E6"
}
*/