import { Component, OnInit, ViewChild, ElementRef, Input, HostListener, AfterViewInit } from "@angular/core";
import { Imagem } from "app/desenhos";
import { Figura } from "./formas/figura";
import { Linha } from "./formas/linha";

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Teste } from './teste.component';
import { Texto } from './formas/texto';
import { ShortcutInput, ShortcutEventOutput, AllowIn, KeyboardShortcutsComponent } from 'ng-keyboard-shortcuts';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Setores } from './formas/setores';

//import { ScrollDispatcher } from '@angular/cdk/scrolling';


export interface DialogData {
  titulo: string;
  descricao: string;
}



@Component({
    selector: 'fluxograma-cmp',
    moduleId: module.id,
    templateUrl: 'fluxograma.component.html'
})


export class fluxogramaComponent implements OnInit, AfterViewInit{
  @ViewChild("canvas") myCanvas;
  ctx:CanvasRenderingContext2D;
 width = 1000;
 height = 480;

  numero  =  0;
  x = 400;//posição horizontal do objeto (com valor inicial)
  y = 400;//posição vertical do objeto (com valor inicial)
  imageObj = new Image();
  imageName = 'assets/img/formas/inicio.png';
  desenhos = [];
  canvas:any;
  dados:any
  px = 0;
  py = 1;
  xx = 0;
  yy = 0;
  atual:string;
  balaceamentox;
  balaceamentoy;
  titulo: string;
  descricao: string;
  figuraTexto:Texto;
  total: number;
  objetoColisao: Figura;
 


  closeResult: string;
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(Teste, {
      width: '400px',
      height:'300px',
      data: {titulo: this.titulo, descricao: this.descricao}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      if(result != null && result != undefined){
     this.figuraTexto = result;
     this.titulo = result.titulo;
     this.descricao = result.descricao;
     this.salvarEdicao();
      }
    });
  }

  
  
  shortcuts: ShortcutInput[] = [];  
    @ViewChild('input') input: ElementRef;  
  ngAfterViewInit() {
    this.shortcuts.push(
      {  
        key: "ctrl + z",  
        preventDefault: true,  
        allowIn: [AllowIn.Textarea, AllowIn.Input],  
        command: e => { 
          console.log(e);
            if(this.desenhos.length>0){
                this.desenhos.pop();
                this.ctx.clearRect(0, 0, this.width, this.height);
                this.limpar();
            }

        } 
    },
      {
        key: ["ctrl"],
        label: "Sequences",
        description: "Konami code!",
        command: (output: ShortcutEventOutput) =>
          console.log("Konami code!!!", output)
      },
      {
        key: ["cmd + b"],
        label: "Help",
        description: "Cmd + b",
        command: e => console.log(e),
        preventDefault: true
      }
    );
    this.keyboard.select("cmd + f").subscribe(e => console.log(e));  
  }
  @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;

  
  onMouseMove(e) {
   
    this.desenhar4(e);
  }



  ngOnInit(): void {
    let valor = 160;
    this.imageObj.src = this.imageName;
    this.canvas = this.myCanvas.nativeElement;
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.atual = "";
    this.imageName = 'assets/img/formas/inicio.png';
    this.balaceamentox = 350;
    this.balaceamentoy = 190;
    this.figuraTexto = new Texto();
    this.figuraTexto.titulo = '';
    this.figuraTexto.descricao = '';
    this.total = 0;
    this.objetoColisao = new Figura();
    for(let i = 0;i<4;i++){
      console.log("valor",valor);
      this.desenharSetores(valor,valor);
      valor = (valor + 160);
    }
   
    
    
    

  }
  desenharc(event){
    this.ctx.beginPath();
    this.ctx.arc((event.clientX- this.balaceamentox), (event.clientY- this.balaceamentoy), 5, 0, Math.PI*2, true);
    this.ctx.fill();
    this.px = (event.clientX- this.balaceamentox);
    this.py = (event.clientY- this.balaceamentoy); 
    
  }



  limpar(){
    this.objetoColisao = null;
    this.desenhos.forEach(element => {
      if(element.nome == "figura"){
        this.ctx.drawImage(element.imagem, element.posicaoX, element.posicaoY);
        this.detectarObjeto(element,this.xx,this.yy);
        this.criarTexto(element); 
      }
      if(element.nome == "bolinha"){
        this.ctx.beginPath();
        this.ctx.arc(element.posicaoX, element.posicaoY, 5, 0, Math.PI*2, true);
        this.ctx.fill();
      }
      if(element.nome == "linha"){
        
      this.ctx.beginPath();
      this.ctx.moveTo(element.posicaoIX,element.posicaoIY);
      this.ctx.lineTo(element.posicaoX, element.posicaoY);
      this.ctx.stroke();
      }

      if(element.nome == "setor"){
        this.ctx.font = "15px Arial";
        this.ctx.fillText(element.texto, element.x, element.y);
        }
      
   });
   
   }

   criarTexto(element){
    this.ctx.font = "15px Arial";
    this.ctx.fillText(element.titulo, element.posicaoX + 11, element.posicaoY + 33);
   }

   detectarObjeto(element,xx,yy){
        if((element.posicaoX > (xx-30) && element.posicaoX < (xx+30)) && (element.posicaoY > (yy-20) && element.posicaoY < (yy+20))){
          this.objetoColisao = element;
         
        }
      
   }

   desenharSetores(x,y){
       let linha  = new Linha;
       linha.nome = "linha"
       linha.posicaoIX = 0;
       linha.posicaoIY = x;
       linha.posicaoX = 1000;
       linha.posicaoY = y;
       this.desenhos.push(linha);
       let setor = new Setores();
      this.ctx.beginPath();
      this.ctx.moveTo(0,x);
      this.ctx.lineTo(1000, y);
      this.ctx.stroke();
      this.ctx.font = "15px Arial";
      this.ctx.fillText('Setor', 0 + 11, x);
      setor.texto = "Setor";
      setor.nome = "setor";
      setor.x = 11;
      setor.y = x;
      this.desenhos.push(setor);
   }
  
  editarFigura(){
          this.titulo = this.objetoColisao.titulo;
          this.descricao = this.objetoColisao.descricao;
          this.openDialog();
      }
    
salvarEdicao(){
  for(let i = 0; i<this.desenhos.length;i++){
      if(this.desenhos[i].identificador == this.objetoColisao.identificador){
        this.desenhos[i].titulo = this.titulo;
        this.desenhos[i].descricao = this.descricao;
      }
    } this.objetoColisao = null;
}

  inicio(){
    this.imageName = 'assets/img/formas/inicio.png'
    this.atual = "figura"
    this.openDialog()
  }

  bolinha(){
    this.atual = "bolinha"
    
  }

  etapa(){
    this.imageName = 'assets/img/formas/etapa.png'
    this.atual = "figura"
    this.openDialog();
    
  }

  fim(){
    this.imageName = 'assets/img/formas/Fim.png'
    this.atual = "figura"
    this.openDialog();
  
  }

  desicao(){
    this.imageName = 'assets/img/formas/desicao.png'
    this.atual = "figura"
    this.openDialog();
  }

  criar(figura){
  if(this.atual == "figura"){
    figura.imagem.onload = ()=>{
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.drawImage(figura.imagem, figura.posicaoX, figura.posicaoY);
      this.limpar();
    }
    
     }

   if(this.atual == "bolinha"){
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.beginPath();
    this.ctx.arc(figura.posicaoX, figura.posicaoY, 5, 0, Math.PI*2, true);
    this.ctx.fill();
    this.limpar();
   }  

  }

  desenharLinhas(figura){
    if(this.numero == 0){
      this.px = figura.posicaoX;
      this.py = figura.posicaoY;
     
  }
  if(this.numero == 1){
    this.desenhar(figura.posicaoX,figura.posicaoY);
    let linha = new Linha();
    linha.nome = "linha";
    linha.posicaoX = figura.posicaoX;
    linha.posicaoY = figura.posicaoY;
    linha.posicaoIX = this.px;
    linha.posicaoIY = this.py;
    this.desenhos.push(linha);
    
    
  }
  if(this.numero == 0){
      this.numero = this.numero+1;
     }else{
       this.numero = 0;
  }
}

  desenhar4(e){
    this.xx = (e.clientX - this.balaceamentox);
    this.yy = (e.clientY - this.balaceamentoy);
    if(this.atual != ""){
       if(this.atual == "figura"){
            let figura  =  new Figura();
            figura.nome = "figura";
            figura.titulo = this.figuraTexto.titulo;
            figura.descricao = this.figuraTexto.descricao;
            figura.urlImagem = this.imageName;
            figura.posicaoX = (e.clientX - this.balaceamentox);
            figura.posicaoY = (e.clientY - this.balaceamentoy);
            figura.height = this.height;
            figura.width = this.width;
            figura.desenharObjeto();
            this.criar(figura);
            this.dados = figura;
    }
    if(this.atual == "bolinha"){
      let figura  =  new Figura();
      figura.posicaoX = (e.clientX- (this.balaceamentox - 50));
      figura.posicaoY = (e.clientY- (this.balaceamentoy - 25));
      figura.nome = "bolinha";
      this.criar(figura);
      this.dados = figura;
    }
   
   }else{
   this.ctx.clearRect(0, 0, this.width, this.height);
   this.limpar();
   }
  }

  
  salvar(){
    if(this.atual != ""){
      if(this.dados.nome == "bolinha"){
          this.desenharLinhas(this.dados);
          
    }
    this.dados.identificador = this.total;
    this.desenhos.push(this.dados);
    this.total = this.total + 1;
    this.atual = "";
  }
 
}

  desenhar(x,y){
    this.ctx.beginPath();
    this.ctx.moveTo(this.px,this.py);
    this.ctx.lineTo(y, x); ;
    this.ctx.stroke();
  }
 
}