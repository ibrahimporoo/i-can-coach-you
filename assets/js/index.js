import { initializeApp } from 'firebase/app'
import {
	getFirestore, collection, getDocs
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDnpUv6FkAyt3eGai3AtCm65exvwFwvOyE",
  authDomain: "collection-practice.firebaseapp.com",
  projectId: "collection-practice",
  storageBucket: "collection-practice.appspot.com",
  messagingSenderId: "1054284320639",
  appId: "1:1054284320639:web:5ad00474d208b0c1eed44a"
};

initializeApp(firebaseConfig)

const db = getFirestore()

const lang = document.querySelector('html').lang;

const colRef = collection(db, 'coaches', 'languages', lang);

// selecting the coaches Row
const coachesContent = document.getElementById('coaches-content');
let coaches = []; // for fulling coaches in coaches page
let topCoachesCount = 3;
let html = '';

async function getData() {
	// Fetching 'Getting' Data
	await getDocs(colRef)
	.then((snapshot) => {
		// Check if we in the home page or top coaches page
		snapshot.docs.forEach((doc) => {
			coaches.push({ ...doc.data(), id: doc.id });
		})
		// Adding Content of Data coming from Firebase to HTML
		if(coachesContent.classList.contains('top-coaches')){
			coaches = coaches.slice(0, topCoachesCount)
		}
		coaches.map(coach => {
			html += `
				<div class="col-lg-4 col-md-6 mb-10">
					<div class="member" data-aos="zoom-in">
						<div class="pic"><img src="${coach.image}" class="img-fluid" alt="Coach Image"></div>
							<div class="member-info coaches pricing">
								<div class='ps-3 pe-3'>
									<h5>${coach.name}</h5>
									<h4>${coach.jobTitle}</h4>
								</div>
								<span>price: ${coach.pricing}</span>
								<p class='detail-item mb-1 mt-1'>Details</p>
								<span>${coach.category}</span>
								<span>${coach.summary}</span>
								<span>${coach.country}/${coach.city} - ${coach.rating} stars</span>
								<div class="social">
									<a href="${coach.SM_accounts}" target="_blank"><i class="bi bi-linkedin"></i></a>
								</div>
								<a href="${coach.paymentLink}" target="_blank" class="btn-buy mt-2">Buy Now</a>
							</div>
						</div>
					</div>
				</div>
				`;
		})
	})
	.catch(err => {
		alert("Error: " + err);
	})
}

getData().then(() => {
	coachesContent.innerHTML = ''
	coachesContent.innerHTML = html
});
