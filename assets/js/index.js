import { initializeApp } from 'firebase/app'
import {
	getFirestore, collection, getDocs
} from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyBsBaihwh8F_UY8oYEsfcMlQEwEIgXcbxc",
  authDomain: "elmawkaabeta.firebaseapp.com",
  databaseURL: "https://elmawkaabeta.firebaseio.com",
  projectId: "elmawkaabeta",
  storageBucket: "elmawkaabeta.appspot.com",
  messagingSenderId: "808588970288",
  appId: "1:808588970288:web:6fb8d6b492c746efa820f5",
  measurementId: "G-GZZM542VN3"
};

initializeApp(firebaseConfig)
const db = getFirestore()

const lang = document.querySelector('html').lang; // get page's Lang to assign it to database

const colRef = collection(db, 'coaches', 'languages', lang);

// selecting the coaches Row in html file
const coachesContent = document.getElementById('coaches-content');
let coaches = []; // for fulling coaches in coaches page
let html = ''; // content that we put in html
// let html_filtered_coaches = ''; // content that we put in html
coachesContent.innerHTML = ''; // empty coaches content before getting data

async function getData() {
	// Fetching 'Getting' Data
	await getDocs(colRef)
	.then((snapshot) => {
		// Check if we in the home page or top coaches page
		snapshot.docs.forEach((doc) => {
			coaches.push({ ...doc.data(), id: doc.id });
		})
		coaches.sort((a, b) => a.order - b.order); // sort the array according to it's order
		// in the index 'top coaches' page
		if(coachesContent.classList.contains('top-coaches')) {
			// Adding Content of Data coming from Firebase to HTML
			coaches = coaches.filter(coach => coach.order <= 3)
		}
		coaches.map(coach => {
			html += `
			<div class="col-lg-4 col-md-6">
				<div class="member" data-aos="zoom-in">
					<div class="pic"><img src="${coach.image}" class="img-fluid" alt="Coach Image"></div>
						<div class="member-info coaches pricing">
							<div class='ps-3 pe-3'>
								<h5>${coach.name}</h5>
								<h4>${coach.jobTitle}</h4>
							</div>
							<span>${coach.pricing}</span>
							<p class='detail-item mb-1 mt-1'>Details</p>
							<span>${coach.category}</span>
							<span>${coach.summary}</span>
							<span>${coach.country}/${coach.city} - ${coach.rating} stars</span>
							<div class="social">
								<a href="${coach.SM_account}" target="_blank"><i class="bi bi-linkedin"></i></a>
							</div>
							<a href="${coach.paymentLink}" target="_blank" class="btn-buy mt-2">Buy Now</a>
						</div>
					</div>
				</div>
			</div>
		`;
		})
	})
	.catch( _ => {
		coachesContent.innerHTML = 'No Coaches till now';
	});
};

getData().then(() => {
	if(coachesContent.classList.contains('top-coaches')) {
		coachesContent.innerHTML = html;
	} else if (coachesContent.classList.contains('filtered-coaches')) {
		coachesContent.innerHTML = html;
	} else {
		coachesContent.innerHTML = 'No Coaches till now';
	}
});

/* Filtering with select box */
const industryBox = document.getElementById('industry');
const searchField = document.getElementById('search-field');
const searchCountry = document.getElementById('search-country');


industryBox.onchange = () => {
	let userIndustry = industryBox.value;
	let html_filtering_by_user = '';
	if(userIndustry !== '') {
		coaches.filter( coach => coach.category.toLowerCase().indexOf(userIndustry) != -1)
		.map(coach => {
			html_filtering_by_user += `
				<div class="col-lg-4 col-md-6">
					<div class="member" data-aos="zoom-in">
						<div class="pic"><img src="${coach.image}" class="img-fluid" alt="Coach Image"></div>
							<div class="member-info coaches pricing">
								<div class='ps-3 pe-3'>
									<h5>${coach.name}</h5>
									<h4>${coach.jobTitle}</h4>
								</div>
								<span>${coach.pricing}</span>
								<p class='detail-item mb-1 mt-1'>Details</p>
								<span>${coach.category}</span>
								<span>${coach.summary}</span>
								<span>${coach.country}/${coach.city} - ${coach.rating} stars</span>
								<div class="social">
									<a href="${coach.SM_account}" target="_blank"><i class="bi bi-linkedin"></i></a>
								</div>
								<a href="${coach.paymentLink}" target="_blank" class="btn-buy mt-2">Buy Now</a>
							</div>
						</div>
					</div>
				</div>
			`
		});
		coachesContent.innerHTML = html_filtering_by_user;
	} else {
		coachesContent.innerHTML = html;
	};
};

searchField.addEventListener('keyup', () => {
	let userSearch = searchField.value;
	let html_filtering_by_user = '';
	if(userSearch !== '') {
		coaches.filter( coach => {
			if(
				coach.category.toLowerCase().indexOf(userSearch) != -1 ||
				coach.name.toLowerCase().indexOf(userSearch) != -1 ||
				coach.jobTitle.toLowerCase().indexOf(userSearch) != -1 ||
				coach.country.toLowerCase().indexOf(userSearch) != -1
			) {
				return coach;
			}
		})
		.map(coach => {
			html_filtering_by_user += `
				<div class="col-lg-4 col-md-6">
					<div class="member" data-aos="zoom-in">
						<div class="pic"><img src="${coach.image}" class="img-fluid" alt="Coach Image"></div>
							<div class="member-info coaches pricing">
								<div class='ps-3 pe-3'>
									<h5>${coach.name}</h5>
									<h4>${coach.jobTitle}</h4>
								</div>
								<span>${coach.pricing}</span>
								<p class='detail-item mb-1 mt-1'>Details</p>
								<span>${coach.category}</span>
								<span>${coach.summary}</span>
								<span>${coach.country}/${coach.city} - ${coach.rating} stars</span>
								<div class="social">
									<a href="${coach.SM_account}" target="_blank"><i class="bi bi-linkedin"></i></a>
								</div>
								<a href="${coach.paymentLink}" target="_blank" class="btn-buy mt-2">Buy Now</a>
							</div>
						</div>
					</div>
				</div>
			`
		});
		coachesContent.innerHTML = html_filtering_by_user;
	} else {
		coachesContent.innerHTML = html;
	};
})

searchCountry.onchange = () => {
	let userCountry = searchCountry.value;
	let html_filtering_by_user = '';
	if(userCountry !== '') {
		coaches.filter( coach => coach.country.toLowerCase().indexOf(userCountry) != -1)
		.map(coach => {
			html_filtering_by_user += `
				<div class="col-lg-4 col-md-6">
					<div class="member" data-aos="zoom-in">
						<div class="pic"><img src="${coach.image}" class="img-fluid" alt="Coach Image"></div>
							<div class="member-info coaches pricing">
								<div class='ps-3 pe-3'>
									<h5>${coach.name}</h5>
									<h4>${coach.jobTitle}</h4>
								</div>
								<span>${coach.pricing}</span>
								<p class='detail-item mb-1 mt-1'>Details</p>
								<span>${coach.category}</span>
								<span>${coach.summary}</span>
								<span>${coach.country}/${coach.city} - ${coach.rating} stars</span>
								<div class="social">
									<a href="${coach.SM_account}" target="_blank"><i class="bi bi-linkedin"></i></a>
								</div>
								<a href="${coach.paymentLink}" target="_blank" class="btn-buy mt-2">Buy Now</a>
							</div>
						</div>
					</div>
				</div>
			`
		});
		coachesContent.innerHTML = html_filtering_by_user;
	} else {
		coachesContent.innerHTML = html;
	};
};