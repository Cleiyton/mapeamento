package com.example.mapeamento.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Calendar;
import java.util.Date;

@Entity
public class ProcessosModel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String inicializar;

    private Date dataCriacao;

    private String Situacao;

    private String indentificadorDocumento;

   @ManyToOne(fetch = FetchType.LAZY)
   @JoinColumn()
    private InstituicaoModel instituicaoModel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn()
    private SetorModel setorModel;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInicializar() {
        return inicializar;
    }

    public void setInicializar(String inicializar) {
        this.inicializar = inicializar;
    }

    public Date getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(Date dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public String getSituacao() {
        return Situacao;
    }

    public void setSituacao(String situacao) {
        Situacao = situacao;
    }

    public String getIndentificadorDocumento() {
        return indentificadorDocumento;
    }

    public void setIndentificadorDocumento(String indentificadorDocumento) {
        this.indentificadorDocumento = indentificadorDocumento;
    }

    public InstituicaoModel getInstituicaoModel() {
        return instituicaoModel;
    }

    public void setInstituicaoModel(InstituicaoModel instituicaoModel) {
        this.instituicaoModel = instituicaoModel;
    }

    public SetorModel getSetorModel() {
        return setorModel;
    }

    public void setSetorModel(SetorModel setorModel) {
        this.setorModel = setorModel;
    }
}
