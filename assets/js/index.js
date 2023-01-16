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

let windowLocation;
windowLocation = window.location.pathname

window.onload = () => {
	// Fetching 'Getting' Data
	getDocs(colRef)
	.then((snapshot) => {
		let coaches = [];
		let html = '';
		snapshot.docs.forEach((doc) => {
			coaches.push({ ...doc.data(), id: doc.id });
		})
		if (windowLocation == '/coaches.html') {
			// selecting the coaches Row
			const coachesContent = document.getElementById('coaches-content');
			coaches.map(coach => {
				html += `
					<div class="col-lg-4 col-md-6 mb-10">
						<div class="member" data-aos="zoom-in">
							<div class="pic"><img src="${coach.photo}" class="img-fluid" alt=""></div>
								<div class="member-info coaches pricing">
									<h4>${coach.name}</h4>
									<span>price: ${coach.price}</span>
									<p class='detail-item mb-1 mt-1'>Details</p>
									<span>${coach.category} - ${coach.city} - ${coach.numRating} stars</span>
									<a href="" target="_blank" class="btn-buy mt-2">Buy Now</a>
								</div>
							</div>
						</div>
					</div>
					`;
			})
			coachesContent.innerHTML = '';
			coachesContent.innerHTML = html;
		}
		if (windowLocation == '/index.html') {
			// selecting the coaches Row
			const topCoaches = document.getElementById('top-coaches');
			coaches.slice(0, 3).map(coach => {
				html += `
					<div class="col-lg-4 col-md-6 mb-10">
						<div class="member" data-aos="zoom-in">
							<div class="pic"><img src="${coach.photo}" class="img-fluid" alt=""></div>
								<div class="member-info coaches pricing">
									<h4>${coach.name}</h4>
									<span>price: ${coach.price}</span>
									<p class='detail-item mb-1 mt-1'>Details</p>
									<span>${coach.category} - ${coach.city} - ${coach.numRating} stars</span>
									<a href="" target="_blank" class="btn-buy mt-2">Buy Now</a>
								</div>
							</div>
						</div>
					</div>
					`;
			})
			topCoaches.innerHTML = '';
			topCoaches.innerHTML = html;
		}
	})
	.catch(err => {
		alert("Error: ", err);
	})
}
