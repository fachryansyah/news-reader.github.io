var base_url = "https://readerapi.codepolitan.com/";

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getArticles(){

	if ('caches' in window) {
		caches.match(base_url + "articles").then(function(response){
			if (response) {
				response.json().then(function (data){
					var articlesHTML = ""
					data.result.forEach(function(article){
						articlesHTML += `
							<div class="card">
			                <a href="./article.html?id=${article.id}">
			                  <div class="card-image waves-effect waves-block waves-light">
			                    <img src="${article.thumbnail}" />
			                  </div>
			                </a>
			                <div class="card-content">
			                  <span class="card-title truncate">${article.title}</span>
			                  <p>${article.description}</p>
			                </div>
			              </div>
						`
					})
					document.getElementById("articles").innerHTML = articlesHTML;
				})
			}
		})
	}

	fetch(base_url + "articles")
		.then(status)
		.then(json)
		.then(function(data){
			// Object/array Javascript dari response.json() masuk lewat data.

			// Menyusun komponen card artikel secara dinamis
			var articlesHTML = "";
			data.result.forEach(function(article){
				articlesHTML += `
					<div class="card">
	                <a href="./article.html?id=${article.id}">
	                  <div class="card-image waves-effect waves-block waves-light">
	                    <img src="${article.thumbnail}" />
	                  </div>
	                </a>
	                <div class="card-content">
	                  <span class="card-title truncate">${article.title}</span>
	                  <p>${article.description}</p>
	                </div>
	              </div>
				`
			})
			// sisipkan komoponen card ke dalam element dengan id #content
			document.getElementById("articles").innerHTML = articlesHTML;
		})
		.catch(error)
}


function getArticleById() {
	// bambil nilai parameter ?id=
	var urlParams = new URLSearchParams(window.location.search)
	var idParam = urlParams.get('id')

	fetch(base_url + "article/" + idParam)
	.then(status)
	.then(json)
	.then(function(data){
		// object javascript dari response.json() masuk lewat variable data
		console.log(data)
		// menyusun komponencard artikel secara dinamis
		var articlesHTML = `
			<div class="card">
	            <div class="card-image waves-effect waves-block waves-light">
	              <img src="${data.result.cover}" />
	            </div>
	            <div class="card-content">
	              <span class="card-title">${data.result.post_title}</span>
	              ${snarkdown(data.result.post_content)}
	            </div>
          	</div>
		`
		// sisipkan komponen card ke dalam elemen engan id #content
		document.getElementById("body-content").innerHTML = articlesHTML
	})
}