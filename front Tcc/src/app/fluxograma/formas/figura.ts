
export class Figura{
    nome: string
    urlImagem: string
    imagem =  new Image();
    posicaoX: number
    posicaoY: number
    width: number
    height: number
    titulo: string
    descricao: string
    identificador: number

     desenharObjeto(){
        this.imagem.src = this.urlImagem;
        
         
    }

}