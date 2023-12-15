import { Component, OnInit } from '@angular/core';
import { getStorage, ref, listAll, Storage, getDownloadURL } from '@angular/fire/storage';
@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {
  images:any=[]
  constructor(private storage:Storage) { }

  ngOnInit() {
    this.listarProdutos()
  }

  listarProdutos() {
    const listRef = ref(this.storage, 'Produtos');
    listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          getDownloadURL(itemRef).then((res) => {
          this.images.push(res)
          })
        });
      }).catch((error) => {
      });
  }
}

// listAll(ref(this.af, 'cardapio')).then(imgs => {
//   imgs.items.forEach((im) => {
//     //console.log(im.fullPath)
//     //console.log(im.bucket)
//     getDownloadURL(im).then((res) => {
//       //console.log(res)
//       this.cardapioImages.push(res)
//     })
//   })
// })
