package com.example.mapeamento.vo;

import com.example.mapeamento.model.InstituicaoModel;
import com.example.mapeamento.model.SetorModel;

import java.util.Calendar;

public class ProcessosVO {


    private Long id;

    private String inicializar;

    private Calendar dataCriacao;

    private String Situacao;

    private String indentificadorDocumento;

    private InstituicaoModel instituicaoModel;

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

    public Calendar getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(Calendar dataCriacao) {
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
