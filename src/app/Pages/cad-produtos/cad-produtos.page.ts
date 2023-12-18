import { Component, OnInit } from '@angular/core';
import { uploadBytes, ref, Storage, listAll, getDownloadURL } from '@angular/fire/storage';
import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';
@Component({
  selector: 'app-cad-produtos',
  templateUrl: './cad-produtos.page.html',
  styleUrls: ['./cad-produtos.page.scss'],
})
export class CadProdutosPage implements OnInit {
  foto: any
  imageRef: any
  images:any=[];
  constructor(private storage: Storage) { }
  ngOnInit() {
    this.listarProdutos()
  }
  carregarFoto(e: any) {
    this.foto = e.target.files[0]
    this.imageRef = ref(this.storage, `Produtos/${this.foto.name}`)
    uploadBytes(this.imageRef, this.foto)
  }

  readonly PrecoMask: MaskitoOptions = {
    mask: ['R', '$', ' ', /\d/, /\d/,',' ,/\d/,/\d/],
  };

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();

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
