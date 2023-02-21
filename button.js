const tombolSelesaikan = () => {
  const tombol = document.createElement('button');
  tombol.classList.add("green");
  tombol.innerText = "Sudah selesai dibaca";
  tombol.onclick = function(){
    rakSelesai(tombol);
  };
  return tombol;
}

const rakSelesai = (tombol) => {
  const bookElement = tombol.parentElement.closest('article').getAttribute('id');
  const containernya = document.getElementById(bookElement);
  const title = containernya.querySelector(".book_item > h3").innerText;
  const author = containernya.querySelector(".book_item > h4").innerText;
  const year = containernya.querySelector(".book_item > p").innerText;

  const bukuBaru = buatBuku(title, author, year, true);
  const bukuStorage = cariBuku(bookElement);
  bukuStorage.isComplete = true;
  bukuBaru.setAttribute("id",bookElement);
  bukuSelesai.append(bukuBaru);
  containernya.remove();
  updateBuku();
}

const tombolBlmSelesaikan = () => {
  const tombol = document.createElement('button');
  tombol.classList.add("green");
  tombol.innerText = "Belum selesai dibaca";
  tombol.onclick = function(){
    rakBlmSelesai(tombol);
  };
  return tombol;
}

const rakBlmSelesai = (tombol) => {
  const bookElement = tombol.parentElement.closest('article').getAttribute('id');
  const containernya = document.getElementById(bookElement);
  const title = containernya.querySelector(".book_item > h3").innerText;
  const author = containernya.querySelector(".book_item > h4").innerText;
  const year = containernya.querySelector(".book_item > p").innerText;

  const bukuBaru = buatBuku(title, author, year, false);
  const bukuStorage = cariBuku(bookElement);
  bukuStorage.isComplete = false;
  bukuBaru.setAttribute("id",bookElement);
  bukuBlmSelesai.append(bukuBaru);
  containernya.remove();
  updateBuku();
}


const buangBuku = (tombol)  => {
  if (confirm("Yakin menghapus buku?") == true){
  const bookElement = tombol.parentElement.closest('article').getAttribute('id');
  const containernya = document.getElementById(bookElement);
  const posisiBuku = cariIndex(bookElement);
  rak.splice(posisiBuku, 1);
  containernya.remove();
  updateBuku();
  alert("Berhasil menghapus buku!");
  }

}

const tombolDelete = () => {
  const tombol = document.createElement('button');
  tombol.classList.add("red");
  tombol.innerText = "Hapus Buku";
  tombol.addEventListener('click', function(event) {
    buangBuku(tombol);
  });
  return tombol;
}

const pencarianBuku = () => {
  try {
    const cariJudul = document.getElementById("searchBookTitle").value;
    const rakParse = JSON.parse(localStorage.getItem(LOCAL_KEY));
    let obj = rakParse.find(({ title }) => title == cariJudul);

    const containernya = document.getElementById("hasilPencarian");
    const title = obj.title;
    const author = obj.author;
    const year = obj.year;
    const isComplete = obj.isComplete;
    const bukuBaru = buatBuku(title, author, year, isComplete);
    bukuBaru.setAttribute("id",obj.id);
    containernya.append(bukuBaru);

  } catch (e) {
    alert("Nama Tidak Ditemukan!");
  } finally {

  }

}
