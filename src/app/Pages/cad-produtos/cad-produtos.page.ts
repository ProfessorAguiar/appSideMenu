import { Component, OnInit } from '@angular/core';
import { uploadBytes, ref, Storage } from '@angular/fire/storage';
@Component({
  selector: 'app-cad-produtos',
  templateUrl: './cad-produtos.page.html',
  styleUrls: ['./cad-produtos.page.scss'],
})
export class CadProdutosPage implements OnInit {
  foto:any
  imageRef:any
  constructor(private storage:Storage) { }
  ngOnInit() {
  }
  carregarFoto(e:any){
    this.foto = e.target.files[0]
    this.imageRef = ref(this.storage, `Produtos/${this.foto.name}`)
    uploadBytes(this.imageRef, this.foto)
  }
}
