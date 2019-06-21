import { Component, OnInit } from '@angular/core';


declare var $:any;
declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})


export class DashboardComponent implements OnInit{
    
      public tableData1: TableData;
      public tableData2: TableData;
      ngOnInit(){
          this.tableData1 = {
              headerRow: [ 'Nome', 'Setor de Inicio', 'Autor', 'Data de Criação','Ação'],
              dataRows: [
                  [ 'Processo1', 'Corae', 'Joao', '13/02/97'],
                  [ 'Processo2', 'Diretoria', 'Joao', '13/02/97'],
                  [ 'Processo3', 'Corae', 'Joao', '13/02/97'],
                  [ 'Processo4', 'Protocolo', 'Joao','13/02/97',],
                  [ 'Processo5', 'Financeiro', 'Joao', '$63,542',],
                  [ 'Processo6', 'Administrativo', 'Joao', '13/02/97']
              ]
          };
    }
  }
