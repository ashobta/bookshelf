const checkbox = document.querySelector("#inputBookIsComplete");
const bukuSelesai = document.getElementById("completeBookshelfList");
const bukuBlmSelesai = document.getElementById("incompleteBookshelfList");
let rak = [];

const SUDAH_BACA = "sudah_baca";
const BELUM_BACA = "belum_baca";
const BOOK_ITEMID = "itemId";
const LOCAL_KEY = "BOOKSHELF";

const cekStorage = () => {
  if(typeof(Storage) == undefined) {
    alert('Your browser not support web storage');
    return false;
  }
  else {
    return true;
  }
}

const updateBuku = () => {
  if(cekStorage()){
    simpanBuku();
    location.reload();
  }
}

const simpanBuku = () => {
  const parseBuku = JSON.stringify(rak);
  localStorage.setItem(LOCAL_KEY, parseBuku);
  document.dispatchEvent(new Event('bukuTersimpan'));
}

const submitBuku = () =>  {
  const judulBuku = document.getElementById("inputBookTitle").value;
  const penBuku = document.getElementById("inputBookAuthor").value;
  const terbitBuku = document.getElementById("inputBookYear").value;
  const bacaBuku = document.querySelector("#inputBookIsComplete").checked;

  const bukuWeb = buatBuku(judulBuku, penBuku, terbitBuku, bacaBuku);
  const bukuStore = objekBuku(judulBuku, penBuku, terbitBuku, bacaBuku);
  bukuWeb.setAttribute("id",bukuStore.id)
  rak.push(bukuStore);
  if (bacaBuku){
    bukuSelesai.append(bukuWeb);
  }
  else {
    bukuBlmSelesai.append(bukuWeb)
  }
  updateBuku();
}

const buatBuku = (judul, penulis, tahun, sudahbaca) => {
  const articlenya = document.createElement("article");
  const judulnya = document.createElement("h3");
  const penulisnya = document.createElement("h4");
  const tahunnya = document.createElement("p");
  const tombolnya = document.createElement("div");

  articlenya.classList.add("book_item");
  judulnya.innerText = judul;
  penulisnya.innerText = penulis;
  tahunnya.innerText = `${tahun}`;
  tombolnya.classList.add("action");

  articlenya.append(judulnya, penulisnya, tahunnya, tombolnya)
  if (sudahbaca){
    tombolnya.append(
      tombolBlmSelesaikan(),
      tombolDelete()
    );
  }
  else if (!sudahbaca) {
    tombolnya.append(
      tombolSelesaikan(),
      tombolDelete()
    );
  }
  else {

  }
  return articlenya;
}

const objekBuku = (title, author, year, isComplete) => {
  return {
    id: +new Date(),
    title,
    author,
    year,
    isComplete,
  }

}

const cariBuku = (idBuku) => {
  for (buku of rak) {
    if(buku.id == idBuku)
      return buku;
  }

  return null;
}

const cariIndex = (idBukunya) => {
  let index = 0
  for (buku of rak) {
    if(buku.id === idBukunya) {
      return index;
    }
    index++;
  }

  return -1;
}

const upadateJumlahBuku = () => {
  const jumlahnya = document.getElementById('jumlahBuku');
  jumlahnya.innerText = rak.length;
}

const refreshWeb = () => {
  const bookUncompleted = document.getElementById("incompleteBookshelfList");
  let bookCompleted = document.getElementById("completeBookshelfList");

  for (buku of rak) {
    const newBook = buatBuku(buku.title, buku.author, buku.year, buku.isComplete);
    newBook.setAttribute("id", buku.id);

    if (buku.isComplete) {
      bookCompleted.append(newBook);
    } else {
      bookUncompleted.append(newBook);
    }
  }
}

const loadBuku = () => {
  const dataBuku = JSON.parse(localStorage.getItem(LOCAL_KEY));

  if(dataBuku !== null) {
    rak = dataBuku;
  }

  document.dispatchEvent(new Event('ondataloaded'));
}

document.addEventListener("ondataloaded", () => {
  refreshWeb();
  upadateJumlahBuku();
});

document.addEventListener("DOMContentLoaded", function () {
  const inputBuku = document.getElementById("inputBook");
  inputBuku.addEventListener("submit", function() {
    event.preventDefault();
    submitBuku();
  });
  const cariBuku = document.getElementById("searchBook");
  cariBuku.addEventListener("submit", function() {
    event.preventDefault();
    pencarianBuku();
  });
  if(cekStorage()){
    loadBuku();
  }
});

checkbox.addEventListener('change', function(){
  let sudah = document.getElementById("sudah");
  let belum = document.getElementById("belum");
  if (this.checked) {
    belum.setAttribute('hidden', true);
    sudah.removeAttribute('hidden');
  }
  else {
    sudah.setAttribute('hidden', true);
    belum.removeAttribute('hidden');
  }
});

document.addEventListener("bukuTersimpan", () => {
  console.log("Data berhasil disimpan.");
  upadateJumlahBuku();
});
