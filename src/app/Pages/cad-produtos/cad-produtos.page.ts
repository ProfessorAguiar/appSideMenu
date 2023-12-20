import { Component, OnInit } from '@angular/core';
import { uploadBytes, ref, Storage, listAll, getDownloadURL } from '@angular/fire/storage';
import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-cad-produtos',
  templateUrl: './cad-produtos.page.html',
  styleUrls: ['./cad-produtos.page.scss'],
})
export class CadProdutosPage implements OnInit {
  foto: any
  imageRef: any
  images:any=[]
  imgSrc:any
  isImg:boolean=false
  constructor(private storage: Storage) { }
  ngOnInit() {
    this.listarProdutos()
    console.log(uuidv4())
  }
  carregarFoto(e: any) {
    this.foto = e.target.files[0]
    const newName=uuidv4(this.foto.name)
    this.imageRef = ref(this.storage, `Produtos/${newName}`)
    uploadBytes(this.imageRef, this.foto)
  }

  valorFormat(preco:any){
    const a = Number(preco.value)
    const b =preco.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    console.log(b)
  }

  selectImage(img:any, modal:any){
    this.imgSrc=img
    this.isImg=true
    modal.dismiss()//fechar modal
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
