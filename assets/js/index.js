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

const colRef = collection(db, 'coaches', 'languages', 'en');

// selecting the coaches Row
const coachesContent = document.getElementById('coaches-content');
let coaches = []; // for fulling firebase' coaches
// let topCoaches = []; // for fulling firebase' coaches
let html = '';

async function getData() {
	// Fetching 'Getting' Data
	await getDocs(colRef)
	.then((snapshot) => {
		snapshot.docs.forEach((doc) => {
			coaches.push({ ...doc.data(), id: doc.id });
		})
		console.log(coaches);
		coaches.map(coach => {
			html += `
				<div class="col-lg-4 col-md-6 mb-10">
					<div class="member" data-aos="zoom-in">
						<div class="pic"><img src="${coach.image}" class="img-fluid" alt="Coach Image"></div>
							<div class="member-info coaches pricing">
								<h4>${coach.name} - ${coach.jobTitle}</h4>
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
		console.log("Error: " + err);
	})
	/*
		{
    "country": "مصر",
    "summary": "",
    "category": "المبيعات والتسويق، إدارة الأعمال، التكنولوجيا، العمليات، الشؤون القانونية، ريادة الأعمال ، تنمية الأطفال، أسلوب الحياة والصحة",
    "rating": "5",
    "jobTitle": "مساعد رئيس تنفيذي، مؤسس/صاحب عمل",
    "city": "القاهرة",
    "image": "https://drive.google.com/file/d/10QyOuOvjkgjD-qmWuT8isDZLMbngdBiq/view?usp=share_link",
    "paymentLink": "https://easykash.net/TEI2615",
    "pricing": "500 حنية مصري",
    "name": "أدهم",
    "order": "3",
    "SM_accounts": "https://www.linkedin.com/in/dr-adham-molokhia-752282b1/",
    "id": "I2dR6tDU4nlG1GozazEk"
}
	*/ 
}

getData().then(() => {
	coachesContent.innerHTML = ''
	coachesContent.innerHTML = html
});


// getDocs(colRef).then((snapshot) => {
// 	console.log(snapshot);
// 	console.log(snapshot.docs);
// })

// const colRef = collection(db, `/restaurants/1G3OUuNQw80cKcIZu9E6/exams`);
// const colRef = collection(db, `restaurants`);

// getDocs(colRef).then((snapshot) => {
// 	console.log(snapshot);
// 	console.log(snapshot.docs);
// 	console.log(snapshot.docs[0]);
// 	console.log(snapshot.docs[0].id);
// })

// const docRef = doc(db, "restaurants", "languages");
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // doc.data() will be undefined in this case
//   console.log("No such document!");
// }


