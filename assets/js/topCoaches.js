// let html = '';
// window.onload = () => {
// 	// selecting the coaches Row
// 	const topCoachesContent = document.getElementById('top-coaches');
// 	// Fetching 'Getting' Data
// 	getDocs(colRef)
// 	.then((snapshot) => {
// 		let topCoaches = [];
// 		snapshot.docs.forEach((doc) => {
// 			topCoaches.push({ ...doc.data(), id: doc.id });
// 		})
// 		topCoaches.map(restaurant => {
// 			html += `
// 				<div class="col-lg-4 col-md-6 mb-10">
// 					<div class="member" data-aos="zoom-in">
// 						<div class="pic"><img src="${restaurant.photo}" class="img-fluid" alt=""></div>
// 							<div class="member-info coaches pricing">
// 								<h4>${restaurant.name}</h4>
// 								<span>price: ${restaurant.price}</span>
// 								<p class='detail-item mb-1 mt-1'>Details</p>
// 								<span>${restaurant.category} - ${restaurant.city} - ${restaurant.numRating} stars</span>
// 								<a href="" target="_blank" class="btn-buy mt-2">Buy Now</a>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 				`;
// 		})
// 		coachesContent.innerHTML = '';
// 		coachesContent.innerHTML = html;
// 	})
// 	.catch(err => {
// 		alert("Error: ", err);
// 	})
// 	console.log(topCoaches)
// }
