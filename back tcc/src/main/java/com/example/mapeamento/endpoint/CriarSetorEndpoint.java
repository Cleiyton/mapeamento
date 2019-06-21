package com.example.mapeamento.endpoint;


import com.example.mapeamento.model.SetorModel;
import com.example.mapeamento.repository.SetorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("setor")
public class CriarSetorEndpoint {

    @Autowired
    private SetorRepository setorRepository;

    @RequestMapping(method = RequestMethod.POST, path = "/cadastrar")
    public ResponseEntity<?> setorSalvar(@RequestBody SetorModel setorModel) {
        return new ResponseEntity<>(setorRepository.save(setorModel), HttpStatus.OK);
    }
}
