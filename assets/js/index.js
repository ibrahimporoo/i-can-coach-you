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

window.onload = () => {
	// selecting the coaches Row
	const coachesContent = document.getElementById('coaches-content');
	let html = '';
	// Fetching 'Getting' Data
	getDocs(colRef)
	.then((snapshot) => {
		let restaurants = []
		snapshot.docs.forEach((doc) => {
			restaurants.push({ ...doc.data(), id: doc.id })
		})
		restaurants.map(restaurant => {
			html += `
			<div class="col-lg-4 col-md-6">
				<div class="member" data-aos="zoom-in">
					<div class="pic"><img src="${restaurant.photo}" class="img-fluid" alt=""></div>
					<div class="member-info">
						<h4>${restaurant.name}</h4>
						<span>${restaurant.category}</span>
						<div class="social">
							<ul className="details">
							<li>${restaurant.price}</li>
								<li>${restaurant.city}</li>
								<li>${restaurant.numRating}</li>
							</ul>
							// <a href="https://twitter.com/EbrahemAnwar" target="_blank"><i class="bi bi-twitter"></i></a>
							// <a href="https://www.facebook.com/EbrahemAnwarMohamed" target="_blank"><i class="bi bi-facebook"></i></a>
							// <a href="https://www.instagram.com/ebrahemanwar" target="_blank"><i class="bi bi-instagram"></i></a>
							// <a href="https://www.linkedin.com/in/ebrahemanwar" target="_blank"><i class="bi bi-linkedin"></i></a>
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