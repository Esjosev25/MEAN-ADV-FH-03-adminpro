import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public registerForm = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    password2: ['', [Validators.required]],
    terminos: [false, [Validators.required]],
  },{
    validators: this.passwordIguales('password','password2')
  });
  formSubmitted: boolean = false;
  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService) {}

  crearUsuario() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);
    if (!this.registerForm.valid) {
      console.log('Form invalido');
      return;
    }

    this.usuarioService.crearUsuario(this.registerForm.value);
  }

  campoNoValido(campo: string): boolean {
    return (
      (this.formSubmitted && this.registerForm.get(campo)?.invalid) || false
    );
  }

  aceptaTerminos(): boolean {
    return (
      (this.formSubmitted && !this.registerForm.get('terminos')?.value) || false
    );
  }

  passwordNoValido(): boolean {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    return (
      (pass1 != pass2 && !this.registerForm.get('terminos')?.value) || false
    );
  }

  passwordIguales(pass1Name:string, pass2Name:string){
    return (formgrop: FormGroup)=>{
      const pass1Control = formgrop.get(pass1Name);
      const pass2Control = formgrop.get(pass2Name);
      
      pass1Control?.value == pass2Control?.value ?
        pass2Control?.setErrors(null):pass2Control?.setErrors({noEsIgual:true})
      
    }
  }
}
